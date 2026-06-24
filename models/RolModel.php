<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class RolModel
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
            $vSql = "SELECT * FROM roles;";
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
            $vSql = "SELECT * FROM roles WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Crear */
    public function create($nombre_rol)
    {
        try {
            $vSql = "INSERT INTO roles (nombre_rol) VALUES (?)";
            $vResultado = $this->enlace->ExecuteSQLPrepared($vSql, [$nombre_rol]);
            return $vResultado; // retorna el id insertado
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Actualizar */
    public function update($id, $nombre_rol)
    {
        try {
            $vSql = "UPDATE roles SET nombre_rol = ? WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQLPrepared($vSql, [$nombre_rol, $id]);
            return $vResultado; // filas afectadas
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Eliminar */
    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM roles WHERE id = ?";
            $vResultado = $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
