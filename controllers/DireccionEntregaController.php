<?php
require_once __DIR__ . '/../models/DireccionEntregaModel.php';

class DireccionEntregaController
{
    private $model;

    public function __construct()
    {
        $this->model = new DireccionEntregaModel();
    }

    public function index()
    {
        $data = $this->model->all();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function show($id_pedido)
    {
        $data = $this->model->get($id_pedido);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Dirección no encontrada"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function store($input)
    {
        if (empty($input['id_pedido']) || empty($input['direccion_exacta'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_pedido y direccion_exacta son requeridos"]);
            return;
        }
        $detalles = $input['detalles_adicionales'] ?? null;
        $this->model->create($input['id_pedido'], $input['direccion_exacta'], $detalles);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Dirección registrada"]);
    }

    public function update($id_pedido, $input)
    {
        if (empty($input['direccion_exacta'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "direccion_exacta es requerida"]);
            return;
        }
        $detalles = $input['detalles_adicionales'] ?? null;
        $this->model->update($id_pedido, $input['direccion_exacta'], $detalles);
        echo json_encode(["error" => false, "mensaje" => "Dirección actualizada"]);
    }

    public function destroy($id_pedido)
    {
        $this->model->delete($id_pedido);
        echo json_encode(["error" => false, "mensaje" => "Dirección eliminada"]);
    }
}
