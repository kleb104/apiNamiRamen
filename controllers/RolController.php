<?php
require_once __DIR__ . '/../models/RolModel.php';

class RolController
{
    private $model;

    public function __construct()
    {
        $this->model = new RolModel();
    }

    public function index()
    {
        $data = $this->model->all();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function show($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Rol no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function store($input)
    {
        if (empty($input['nombre_rol'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_rol es requerido"]);
            return;
        }
        $id = $this->model->create($input['nombre_rol']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Rol creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        if (empty($input['nombre_rol'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_rol es requerido"]);
            return;
        }
        $this->model->update($id, $input['nombre_rol']);
        echo json_encode(["error" => false, "mensaje" => "Rol actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Rol eliminado"]);
    }
}
