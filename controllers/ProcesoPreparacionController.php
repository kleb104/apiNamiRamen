<?php
require_once __DIR__ . '/../models/ProcesoPreparacionModel.php';

class ProcesoPreparacionController
{
    private $model;

    public function __construct()
    {
        $this->model = new ProcesoPreparacionModel();
    }

    public function showByProducto($id_producto)
    {
        $data = $this->model->getByProducto($id_producto);
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function store($input)
    {
        $requeridos = ['id_producto', 'id_estacion', 'orden_paso'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $this->model->create($input['id_producto'], $input['id_estacion'], $input['orden_paso']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Paso de preparación creado"]);
    }

    public function update($id_producto, $id_estacion, $input)
    {
        if (!isset($input['orden_paso'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "orden_paso es requerido"]);
            return;
        }
        $this->model->update($id_producto, $id_estacion, $input['orden_paso']);
        echo json_encode(["error" => false, "mensaje" => "Paso de preparación actualizado"]);
    }

    public function destroy($id_producto, $id_estacion)
    {
        $this->model->delete($id_producto, $id_estacion);
        echo json_encode(["error" => false, "mensaje" => "Paso de preparación eliminado"]);
    }
}
