<?php
require_once __DIR__ . '/../models/UsuarioModel.php';

class UsuarioController
{
    private $model;

    public function __construct()
    {
        $this->model = new UsuarioModel();
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
            echo json_encode(["error" => true, "mensaje" => "Usuario no encontrado"]);
            return;
        }
        echo json_encode(["error" => false, "data" => $data[0]??null]);
    }

    public function create($input)
    {
        $requeridos = ['nombre', 'correo', 'contrasena', 'id_rol'];
        foreach ($requeridos as $campo) {
            if (empty($input[$campo])) {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }

        // Verificar correo único antes de insertar
        $existe = $this->model->getByCorreo($input['correo']);
        if (!empty($existe)) {
            http_response_code(409);
            echo json_encode(["error" => true, "mensaje" => "El correo ya está registrado"]);
            return;
        }

        $hash = password_hash($input['contrasena'], PASSWORD_BCRYPT);
        $telefono = $input['telefono'] ?? null;

        $id = $this->model->create($input['nombre'], $input['correo'], $hash, $telefono, $input['id_rol']);
        http_response_code(201);
        echo json_encode(["error" => false, "mensaje" => "Usuario creado", "id" => $id]);
    }

    public function update($id, $input)
    {
        $requeridos = ['nombre', 'correo', 'id_rol'];
        foreach ($requeridos as $campo) {
            if (empty($input[$campo])) {
                http_response_code(400);
                echo json_encode(["error" => true, "mensaje" => "El campo $campo es requerido"]);
                return;
            }
        }
        $telefono = $input['telefono'] ?? null;
        $this->model->update($id, $input['nombre'], $input['correo'], $telefono, $input['id_rol']);
        echo json_encode(["error" => false, "mensaje" => "Usuario actualizado"]);
    }

    public function updatePassword($id, $input)
    {
        if (empty($input['contrasena'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "contrasena es requerida"]);
            return;
        }
        $hash = password_hash($input['contrasena'], PASSWORD_BCRYPT);
        $this->model->updatePassword($id, $hash);
        echo json_encode(["error" => false, "mensaje" => "Contraseña actualizada"]);
    }

    public function delete($id)
    {
        $this->model->delete($id);
        echo json_encode(["error" => false, "mensaje" => "Usuario eliminado"]);
    }

    /* Login básico: valida correo + contraseña contra el hash guardado */
    public function login($input)
    {
        if (empty($input['correo']) || empty($input['contrasena'])) {
            http_response_code(400);
            echo json_encode(["error" => true, "mensaje" => "correo y contrasena son requeridos"]);
            return;
        }

        $usuarios = $this->model->getByCorreo($input['correo']);
        if (empty($usuarios)) {
            http_response_code(401);
            echo json_encode(["error" => true, "mensaje" => "Credenciales inválidas"]);
            return;
        }

        $usuario = $usuarios[0]??null;
        if (!password_verify($input['contrasena'], $usuario['contrasena_hash'])) {
            http_response_code(401);
            echo json_encode(["error" => true, "mensaje" => "Credenciales inválidas"]);
            return;
        }

        unset($usuario['contrasena_hash']); // nunca devolver el hash al cliente
        echo json_encode(["error" => false, "data" => $usuario]);
    }
}
