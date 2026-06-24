<?php
require_once __DIR__ . '/../models/SeguimientoCocinaModel.php';

class SeguimientoCocinaController
{
    private $model;

    public function __construct()
    {
        $this->model = new SeguimientoCocinaModel();
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
            echo json_encode(["error" => true, "mensaje" => "Registro no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]]);
    }

    /* Vista de cola por estación, para la pantalla de cocina */
    public function showByEstacion($id_estacion)
    {
        $data = $this->model->getByEstacion($id_estacion);
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function store($input)
    {
        if (empty($input['id_pedido_detalle']) || empty($input['id_estacion'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_pedido_detalle e id_estacion son requeridos"]);
            return;
        }
        $id = $this->model->create($input['id_pedido_detalle'], $input['id_estacion']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Seguimiento creado", "id" => $id]);
    }

    /* El cocinero toma el pedido: inicia preparación */
    public function iniciar($id, $input)
    {
        if (empty($input['id_usuario_cocina'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_usuario_cocina es requerido"]);
            return;
        }
        $this->model->iniciar($id, $input['id_usuario_cocina']);
        echo json_encode(["error" => false, "mensaje" => "Preparación iniciada"]);
    }

    /* El cocinero marca como terminado */
    public function finalizar($id)
    {
        $this->model->finalizar($id);
        echo json_encode(["error" => false, "mensaje" => "Preparación finalizada"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Registro eliminado"]);
    }
}
