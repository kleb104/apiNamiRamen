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

    public function store($input)
    {
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
            $input['nombre_menu'], $fecha_inicio, $fecha_fin,
            $input['hora_apertura'], $input['hora_cierre'], $input['creado_por']
        );
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Menú creado", "id" => $id]);
    }

    public function update($id, $input)
    {
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
            $id, $input['nombre_menu'], $fecha_inicio, $fecha_fin,
            $input['hora_apertura'], $input['hora_cierre'], $activo
        );
        echo json_encode(["error" => false, "mensaje" => "Menú actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Menú eliminado"]);
    }

    public function agregarItem($id, $input)
    {
        $id_producto = $input['id_producto'] ?? null;
        $id_combo    = $input['id_combo']    ?? null;
        if (empty($id_producto) && empty($id_combo)) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "Debe enviar id_producto o id_combo"]);
            return;
        }
        $idItem = $this->model->agregarItem($id, $id_producto, $id_combo);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Item agregado al menú", "id" => $idItem]);
    }

    public function quitarItem($id_item)
    {
        $this->model->quitarItem($id_item);
        echo json_encode(["error" => false, "mensaje" => "Item removido del menú"]);
    }
}