<?php

class CategoriaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM categorias;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM categorias WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_categoria)
    {
        try {
            $vSql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_categoria]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_categoria)
    {
        try {
            $vSql = "UPDATE categorias SET nombre_categoria = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_categoria, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM categorias WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
