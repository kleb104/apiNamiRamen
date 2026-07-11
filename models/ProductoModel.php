<?php

class ProductoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar (con nombre de categoría incluido) */
    public function all()
    {
        try {
            $vSql = "SELECT p.*, c.nombre_categoria 
                     FROM productos p
                     JOIN categorias c ON p.id_categoria = c.id;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Listar solo activos */
    public function allActivos()
    {
        try {
            $vSql = "SELECT p.*, c.nombre_categoria 
                     FROM productos p
                     JOIN categorias c ON p.id_categoria = c.id
                     WHERE p.activo = TRUE;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM productos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener producto con sus ingredientes (JOIN a través de tabla puente) */
    public function getConIngredientes($id)
    {
        try {
            $vSql = "SELECT i.id, i.nombre_ingrediente
                     FROM producto_ingredientes pri
                     JOIN ingredientes i ON pri.id_ingrediente = i.id
                     WHERE pri.id_producto = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre, $descripcion, $precio, $imagen_url, $id_categoria)
    {
        try {
            $vSql = "INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categoria) 
                     VALUES (?, ?, ?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$nombre, $descripcion, $precio, $imagen_url, $id_categoria]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre, $descripcion, $precio, $imagen_url, $id_categoria, $activo)
    {
        try {
            $vSql = "UPDATE productos 
                     SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, id_categoria = ?, activo = ?
                     WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$nombre, $descripcion, $precio, $imagen_url, $id_categoria, $activo, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Desactivar en vez de borrar (soft delete, recomendado por las FK que dependen de productos) */
    public function desactivar($id)
    {
        try {
            $vSql = "UPDATE productos SET activo = FALSE WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM productos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Asociar un ingrediente a un producto */
    public function agregarIngrediente($id_producto, $id_ingrediente)
    {
        try {
            $vSql = "INSERT INTO producto_ingredientes (id_producto, id_ingrediente) VALUES (?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$id_producto, $id_ingrediente]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Quitar un ingrediente de un producto */
    public function quitarIngrediente($id_producto, $id_ingrediente)
    {
        try {
            $vSql = "DELETE FROM producto_ingredientes WHERE id_producto = ? AND id_ingrediente = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_producto, $id_ingrediente]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
