<?php
require_once __DIR__ . '/../models/ProductoModel.php';

class ProductoController
{
    private $model;

    public function __construct()
    {
        $this->model = new ProductoModel();
    }

    public function index()
    {
        $data = $this->model->all();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function get($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Producto no encontrado"]);
            return;
        }
        $producto = $data[0];
        $producto['ingredientes'] = $this->model->getConIngredientes($id);
        echo json_encode(["error" => false, "data" => $producto]);
    }

    public function activos()
    {
        $data = $this->model->allActivos();
        echo json_encode(["error" => false, "data" => $data]);
    }

    public function show($id)
    {
        $data = $this->model->get($id);
        if (empty($data)) {
            http_response_code(404);
            echo json_encode(["error" => true, "mensaje" => "Producto no encontrado"]);
            return;
        }
        $producto = $data[0];
        $producto['ingredientes'] = $this->model->getConIngredientes($id);
        echo json_encode(["error" => false, "data" => $producto]);
    }

    public function store($input)
    {
        $requeridos = ['nombre', 'precio', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $descripcion = $input['descripcion'] ?? null;
        $imagen_url = $input['imagen_url'] ?? null;

        $id = $this->model->create($input['nombre'], $descripcion, $input['precio'], $imagen_url, $input['id_categoria']);

        // Si vienen ingredientes en el body, los asocia de una vez
        if (!empty($input['ingredientes']) && is_array($input['ingredientes'])) {
            foreach ($input['ingredientes'] as $id_ingrediente) {
                $this->model->agregarIngrediente($id, $id_ingrediente);
            }
        }

        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Producto creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        $requeridos = ['nombre', 'precio', 'id_categoria'];
        foreach ($requeridos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === '') {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $descripcion = $input['descripcion'] ?? null;
        $imagen_url = $input['imagen_url'] ?? null;
        $activo = $input['activo'] ?? true;

        $this->model->update($id, $input['nombre'], $descripcion, $input['precio'], $imagen_url, $input['id_categoria'], $activo);
        echo json_encode(["error" => false, "mensaje" => "Producto actualizado"]);
    }

    /* Soft delete recomendado: marca activo = false en vez de borrar */
    public function desactivar($id)
    {
        $this->model->desactivar($id);
        echo json_encode(["error" => false, "mensaje" => "Producto desactivado"]);
    }

    public function destroy($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Producto eliminado"]);
    }

    public function agregarIngrediente($id, $input)
    {
        if (empty($input['id_ingrediente'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "id_ingrediente es requerido"]);
            return;
        }
        $this->model->agregarIngrediente($id, $input['id_ingrediente']);
        echo json_encode(["error" => false, "mensaje" => "Ingrediente agregado"]);
    }

    public function quitarIngrediente($id, $id_ingrediente)
    {
        $this->model->quitarIngrediente($id, $id_ingrediente);
        echo json_encode(["error" => false, "mensaje" => "Ingrediente removido"]);
    }
}
