<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class IngredienteModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM ingredientes;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM ingredientes WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_ingrediente)
    {
        try {
            $vSql = "INSERT INTO ingredientes (nombre_ingrediente) VALUES (?)";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_ingrediente]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_ingrediente)
    {
        try {
            $vSql = "UPDATE ingredientes SET nombre_ingrediente = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_ingrediente, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM ingredientes WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
