<?php
require_once __DIR__ . '/../models/PedidoDetalleModel.php';

class PedidoDetalleController
{
    private $model;

    public function __construct()
    {
        $this->model = new PedidoDetalleModel();
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
            echo json_encode(["error" => true, "mensaje" => "Detalle no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function showByPedido($id_pedido)
    {
        $data = $this->model->getByPedido($id_pedido);
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function store($input)
    {
        $id_producto = $input['id_producto'] ?? null;
        $id_combo = $input['id_combo'] ?? null;

        if (empty($input['id_pedido']) || !isset($input['precio_unitario'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_pedido y precio_unitario son requeridos"]);
            return;
        }
        if (empty($id_producto) && empty($id_combo)) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "Debe enviar id_producto o id_combo"]);
            return;
        }
        if (!empty($id_producto) && !empty($id_combo)) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "Solo puede enviar id_producto O id_combo, no ambos"]);
            return;
        }

        $cantidad = $input['cantidad'] ?? 1;
        $observaciones = $input['observaciones'] ?? null;

        $id = $this->model->create($input['id_pedido'], $id_producto, $id_combo, $cantidad, $observaciones, $input['precio_unitario']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Detalle creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        $cantidad = $input['cantidad'] ?? 1;
        $observaciones = $input['observaciones'] ?? null;
        $this->model->update($id, $cantidad, $observaciones);
        echo json_encode(["error" => false, "mensaje" => "Detalle actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Detalle eliminado"]);
    }
}
