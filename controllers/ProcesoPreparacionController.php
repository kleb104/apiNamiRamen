<?php
require_once __DIR__ . '/../models/ProcesoPreparacionModel.php';

class ProcesoPreparacionController
{
    private $model;

    public function __construct()
    {
        $this->model = new ProcesoPreparacionModel();
    }

    public function index()
    {
        $data = $this->model->getAllConProducto();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function get($id)
    {
        $data = $this->model->getByProducto($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Proceso no encontrado"]);
            return;
        }
        echo json_encode([
            "error" => false,
            "data"  => [
                "id_producto"     => $id,
                "nombre_producto" => $data[0]['nombre_producto'],
                "cantidad_pasos"  => count($data),
                "estaciones"      => $data,
            ]
        ]);
    }

    public function create()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['id_producto'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "El producto es requerido"]);
            return;
        }
        if (empty($input['estaciones']) || !is_array($input['estaciones'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "Debe agregar al menos una estación"]);
            return;
        }

        $existe = $this->model->getByProducto($input['id_producto']);
        if (!empty($existe)) {
            http_response_code(409);
            echo json_encode(["error" => true, "mensaje" => "Ya existe un proceso para ese producto"]);
            return;
        }

        foreach ($input['estaciones'] as $estacion) {
            $this->model->create(
                $input['id_producto'],
                $estacion['id_estacion'],
                $estacion['orden_paso']
            );
        }

        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Proceso creado"]);
    }

    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['estaciones']) || !is_array($input['estaciones'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "Debe agregar al menos una estación"]);
            return;
        }

        $this->model->deleteByProducto($id);

        foreach ($input['estaciones'] as $estacion) {
            $this->model->create(
                $id,
                $estacion['id_estacion'],
                $estacion['orden_paso']
            );
        }

        echo json_encode(["error" => false, "mensaje" => "Proceso actualizado"]);
    }

    public function destroy($id_producto, $id_estacion)
    {
        $this->model->delete($id_producto, $id_estacion);
        echo json_encode(["error" => false, "mensaje" => "Paso eliminado"]);
    }
}