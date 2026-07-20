<?php
require_once __DIR__ . '/../models/MenuModel.php';

class MenuController
{
    private $model;

    public function __construct()
    {
        $this->model = new MenuModel();
    }

    public function index()
    {
        $data = $this->model->all();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function get($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Menú no encontrado"]);
            return;
        }
        $menu = $data[0];
        $menu['items'] = $this->model->getItemsAgrupados($id);
        echo json_encode(["error" => false, "data" => $menu]);
    }

    public function activo()
    {
        $data = $this->model->getActivo();
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "No hay menú activo disponible"]);
            return;
        }
        $menu = $data[0];
        $menu['items'] = $this->model->getItemsAgrupados($menu['id']);
        echo json_encode(["error" => false, "data" => $menu]);
    }

    public function create()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $requeridos = ['nombre_menu', 'hora_apertura', 'hora_cierre', 'creado_por'];
        foreach ($requeridos as $campo) {
            if (empty($input[$campo])) {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }

        $fecha_inicio = $input['fecha_inicio'] ?? null;
        $fecha_fin    = $input['fecha_fin']    ?? null;

        $id = $this->model->create(
            $input['nombre_menu'],
            $fecha_inicio,
            $fecha_fin,
            $input['hora_apertura'],
            $input['hora_cierre'],
            $input['creado_por']
        );

        if (!empty($input['items']) && is_array($input['items'])) {
            foreach ($input['items'] as $item) {
                $id_producto = $item['id_producto'] ?? null;
                $id_combo    = $item['id_combo']    ?? null;
                $this->model->agregarItem($id, $id_producto, $id_combo);
            }
        }

        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Menú creado", "id" => $id]);
    }

    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $requeridos = ['nombre_menu', 'hora_apertura', 'hora_cierre'];
        foreach ($requeridos as $campo) {
            if (empty($input[$campo])) {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $fecha_inicio = $input['fecha_inicio'] ?? null;
        $fecha_fin    = $input['fecha_fin']    ?? null;
        $activo       = $input['activo']       ?? false;

        $this->model->update(
            $id,
            $input['nombre_menu'],
            $fecha_inicio,
            $fecha_fin,
            $input['hora_apertura'],
            $input['hora_cierre'],
            $activo
        );

        $this->model->quitarTodosItems($id);
        if (!empty($input['items']) && is_array($input['items'])) {
            foreach ($input['items'] as $item) {
                $id_producto = $item['id_producto'] ?? null;
                $id_combo    = $item['id_combo']    ?? null;
                $this->model->agregarItem($id, $id_producto, $id_combo);
            }
        }

        echo json_encode(["error" => false, "mensaje" => "Menú actualizado"]);
    }

    public function quitarItem($id_item)
    {
        $this->model->quitarItem($id_item);
        echo json_encode(["error" => false, "mensaje" => "Item removido del menú"]);
    }
}