<?php
require_once __DIR__ . '/../models/PagoModel.php';

class PagoController
{
    private $model;

    public function __construct()
    {
        $this->model = new PagoModel();
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
            echo json_encode(["error" => true, "mensaje" => "Pago no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function showByPedido($id_pedido)
    {
        $data = $this->model->getByPedido($id_pedido);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Este pedido no tiene pago registrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function store($input)
    {
        $requeridos = ['id_pedido', 'metodo_pago', 'monto_pagado'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }

        // id_pedido es UNIQUE: evitar doble pago para el mismo pedido
        $existente = $this->model->getByPedido($input['id_pedido']);
        if (!empty($existente)) {
            http_response_code(409);
            echo json_encode(["error" => true, "mensaje" => "Este pedido ya tiene un pago registrado"]);
            return;
        }

        $vuelto = $input['vuelto'] ?? 0.00;
        $id = $this->model->create($input['id_pedido'], $input['metodo_pago'], $input['monto_pagado'], $vuelto);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Pago registrado", "id" => $id]);
    }

    public function update($id, $input)
    {
        $requeridos = ['metodo_pago', 'monto_pagado'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $vuelto = $input['vuelto'] ?? 0.00;
        $this->model->update($id, $input['metodo_pago'], $input['monto_pagado'], $vuelto);
        echo json_encode(["error" => false, "mensaje" => "Pago actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Pago eliminado"]);
    }
}
