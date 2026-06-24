<?php
require_once __DIR__ . '/../models/PedidoModel.php';

class PedidoController
{
    private $model;

    public function __construct()
    {
        $this->model = new PedidoModel();
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
            echo json_encode(["error" => true, "mensaje" => "Pedido no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    public function showByCliente($id_cliente)
    {
        $data = $this->model->getByCliente($id_cliente);
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function showByEstado($estado)
    {
        $data = $this->model->getByEstado($estado);
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function store($input)
    {
        $requeridos = ['id_cliente', 'metodo_entrega', 'subtotal', 'impuesto', 'costo_envio', 'total'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $id_empleado = $input['id_empleado'] ?? null;

        $id = $this->model->create(
            $input['id_cliente'],
            $id_empleado,
            $input['metodo_entrega'],
            $input['subtotal'],
            $input['impuesto'],
            $input['costo_envio'],
            $input['total']
        );
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Pedido creado", "id" => $id]);
    }

    /* Endpoint específico para mover el pedido entre estados del flujo de cocina/entrega */
    public function updateEstado($id, $input)
    {
        if (empty($input['estado_pedido'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "estado_pedido es requerido"]);
            return;
        }
        $this->model->updateEstado($id, $input['estado_pedido']);
        echo json_encode(["error" => false, "mensaje" => "Estado del pedido actualizado"]);
    }

    public function update($id, $input)
    {
        $requeridos = ['metodo_entrega', 'estado_pedido', 'subtotal', 'impuesto', 'costo_envio', 'total'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $id_empleado = $input['id_empleado'] ?? null;

        $this->model->update(
            $id,
            $id_empleado,
            $input['metodo_entrega'],
            $input['estado_pedido'],
            $input['subtotal'],
            $input['impuesto'],
            $input['costo_envio'],
            $input['total']
        );
        echo json_encode(["error" => false, "mensaje" => "Pedido actualizado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Pedido eliminado"]);
    }
}
