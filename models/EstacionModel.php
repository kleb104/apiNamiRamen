<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class EstacionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM estaciones;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM estaciones WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_estacion)
    {
        try {
            $vSql = "INSERT INTO estaciones (nombre_estacion) VALUES (?)";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_estacion]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_estacion)
    {
        try {
            $vSql = "UPDATE estaciones SET nombre_estacion = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_estacion, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM estaciones WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
