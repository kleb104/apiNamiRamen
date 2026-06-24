<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class ComboModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT c.*, cat.nombre_categoria
                     FROM combos c
                     JOIN categorias cat ON c.id_categoria = cat.id;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM combos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener los productos que conforman un combo */
    public function getProductos($id_combo)
    {
        try {
            $vSql = "SELECT p.id, p.nombre, p.precio, cp.cantidad
                     FROM combo_productos cp
                     JOIN productos p ON cp.id_producto = p.id
                     WHERE cp.id_combo = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_combo]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_combo, $precio_especial, $id_categoria)
    {
        try {
            $vSql = "INSERT INTO combos (nombre_combo, precio_especial, id_categoria) VALUES (?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_combo, $precio_especial, $id_categoria]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_combo, $precio_especial, $id_categoria, $activo)
    {
        try {
            $vSql = "UPDATE combos SET nombre_combo = ?, precio_especial = ?, id_categoria = ?, activo = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$nombre_combo, $precio_especial, $id_categoria, $activo, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM combos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Agregar producto a un combo */
    public function agregarProducto($id_combo, $id_producto, $cantidad)
    {
        try {
            $vSql = "INSERT INTO combo_productos (id_combo, id_producto, cantidad) VALUES (?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$id_combo, $id_producto, $cantidad]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Quitar producto de un combo */
    public function quitarProducto($id_combo, $id_producto)
    {
        try {
            $vSql = "DELETE FROM combo_productos WHERE id_combo = ? AND id_producto = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_combo, $id_producto]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
