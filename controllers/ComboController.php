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

    public function store($input)
    {
        $requeridos = ['nombre_combo', 'precio_especial', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $id = $this->model->create($input['nombre_combo'], $input['precio_especial'], $input['id_categoria']);

        // Si vienen productos en el body, se asocian de una vez
        if (!empty($input['productos']) && is_array($input['productos'])) {
            foreach ($input['productos'] as $item) {
                $cantidad = $item['cantidad'] ?? 1;
                $this->model->agregarProducto($id, $item['id_producto'], $cantidad);
            }
        }

        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Combo creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        $requeridos = ['nombre_combo', 'precio_especial', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $activo = $input['activo'] ?? true;
        $this->model->update($id, $input['nombre_combo'], $input['precio_especial'], $input['id_categoria'], $activo);
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
