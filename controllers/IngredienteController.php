<?php
require_once __DIR__ . '/../models/IngredienteModel.php';

class IngredienteController
{
    private $model;

    public function __construct()
    {
        $this->model = new IngredienteModel();
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
            echo json_encode(["error" => true, "mensaje" => "Ingrediente no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function store($input)
    {
        if (empty($input['nombre_ingrediente'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_ingrediente es requerido"]);
            return;
        }
        $id = $this->model->create($input['nombre_ingrediente']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Ingrediente creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        if (empty($input['nombre_ingrediente'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "nombre_ingrediente es requerido"]);
            return;
        }
        $this->model->update($id, $input['nombre_ingrediente']);
        echo json_encode(["error" => false, "mensaje" => "Ingrediente actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Ingrediente eliminado"]);
    }
}
