<?php
require_once __DIR__ . '/../models/ComboModel.php';

class ComboController
{
    private $model;

    public function __construct()
    {
        $this->model = new ComboModel();
    }

    public function get($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Combo no encontrado"]);
            return;
        }
        $combo = $data[0];
        $combo['productos']       = $this->model->getProductos($id);
        $combo['imagen_principal'] = $this->model->getImagenPrincipal($id);
        echo json_encode(["error" => false, "data" => $combo]);
    }

    public function index()
    {
        $data = $this->model->allPorMenu();

        if (empty($data)) {
            // Fallback: si no hay menú activo, mostrar todos los combos activos
            $data = $this->model->all();
        }

        // Agregar imagen principal a cada combo
        foreach ($data as &$combo) {
            $combo['imagen_principal'] = $this->model->getImagenPrincipal($combo['id']);
        }

        echo json_encode(["error" => false, "data" => $data]);
    }

    public function todos()
    {
        $data = $this->model->all();
        $idsEnMenu = $this->model->getIdsEnMenuActivo();
        foreach ($data as &$combo) {
            $combo['imagen_principal'] = $this->model->getImagenPrincipal($combo['id']);
            $combo['en_menu_ahora']    = in_array($combo['id'], $idsEnMenu);
        }
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function show($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Combo no encontrado"]);
            return;
        }
        $combo = $data[0];
        $combo['productos'] = $this->model->getProductos($id);
        echo json_encode(["error" => false, "data" => $combo]);
    }

    public function create()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $requeridos = ['nombre_combo', 'precio_especial', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }

        $existe = $this->model->getByNombre($input['nombre_combo']);
        if (!empty($existe)) {
            http_response_code(409);
            echo json_encode(["error" => true, "mensaje" => "Ya existe un combo con ese nombre"]);
            return;
        }

        $id = $this->model->create(
            $input['nombre_combo'],
            $input['precio_especial'],
            $input['id_categoria']
        );

        if (!empty($input['productos']) && is_array($input['productos'])) {
            foreach ($input['productos'] as $item) {
                $id_prod      = $item['id_producto']  ?? $item;
                $es_principal = $item['es_principal'] ?? 0;
                $this->model->agregarProductoConPrincipal($id, $id_prod, 1, $es_principal);
            }
        }

        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Combo creado", "id" => $id]);
    }

    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $requeridos = ['nombre_combo', 'precio_especial', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $activo = $input['activo'] ?? true;
        $this->model->update(
            $id,
            $input['nombre_combo'],
            $input['precio_especial'],
            $input['id_categoria'],
            $activo
        );

        $this->model->quitarTodosProductos($id);
        if (!empty($input['productos']) && is_array($input['productos'])) {
            foreach ($input['productos'] as $item) {
                $id_prod      = $item['id_producto']  ?? $item;
                $es_principal = $item['es_principal'] ?? 0;
                $this->model->agregarProductoConPrincipal($id, $id_prod, 1, $es_principal);
            }
        }

        echo json_encode(["error" => false, "mensaje" => "Combo actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Combo eliminado"]);
    }

    public function agregarProducto($id, $input)
    {
        if (empty($input['id_producto'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_producto es requerido"]);
            return;
        }
        $cantidad = $input['cantidad'] ?? 1;
        $this->model->agregarProducto($id, $input['id_producto'], $cantidad);
        echo json_encode(["error" => false, "mensaje" => "Producto agregado al combo"]);
    }

    public function quitarProducto($id, $id_producto)
    {
        $this->model->quitarProducto($id, $id_producto);
        echo json_encode(["error" => false, "mensaje" => "Producto removido del combo"]);
    }
}
