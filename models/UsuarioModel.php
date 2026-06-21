<?php

class UsuarioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar */
    public function all()
    {
        try {
            $vSql = "SELECT id, nombre, correo, telefono, id_rol, creado_en FROM usuarios;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener */
    public function get($id)
    {
        try {
            $vSql = "SELECT id, nombre, correo, telefono, id_rol, creado_en FROM usuarios WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener por correo (útil para login) */
    public function getByCorreo($correo)
    {
        try {
            $vSql = "SELECT * FROM usuarios WHERE correo = ?";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$correo]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Crear */
    public function create($nombre, $correo, $contrasena_hash, $telefono, $id_rol)
    {
        try {
            $vSql = "INSERT INTO usuarios (nombre, correo, contrasena_hash, telefono, id_rol) VALUES (?, ?, ?, ?, ?)";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$nombre, $correo, $contrasena_hash, $telefono, $id_rol]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Actualizar */
    public function update($id, $nombre, $correo, $telefono, $id_rol)
    {
        try {
            $vSql = "UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, id_rol = ? WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$nombre, $correo, $telefono, $id_rol, $id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Actualizar contraseña */
    public function updatePassword($id, $contrasena_hash)
    {
        try {
            $vSql = "UPDATE usuarios SET contrasena_hash = ? WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$contrasena_hash, $id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Eliminar */
    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM usuarios WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQL($vSql, [$id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
