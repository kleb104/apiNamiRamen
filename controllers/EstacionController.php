<?php
require_once __DIR__ . '/../models/EstacionModel.php';

class EstacionController
{
    private $model;

    public function __construct()
    {
        $this->model = new EstacionModel();
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
            echo json_encode(["error" => true, "mensaje" => "Estación no encontrada"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function store($input)
    {
        if (empty($input['nombre_estacion'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_estacion es requerido"]);
            return;
        }
        $id = $this->model->create($input['nombre_estacion']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Estación creada", "id" => $id]);
    }

    public function update($id, $input)
    {
        if (empty($input['nombre_estacion'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_estacion es requerido"]);
            return;
        }
        $this->model->update($id, $input['nombre_estacion']);
        echo json_encode(["error" => false, "mensaje" => "Estación actualizada"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Estación eliminada"]);
    }
}
