<?php

class ProcesoPreparacionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function getAllConProducto()
    {
        try {
            $vSql = "SELECT p.id, p.nombre AS nombre_producto,
                            COUNT(pp.id_estacion) AS cantidad_pasos
                     FROM productos p
                     LEFT JOIN procesos_preparacion pp ON p.id = pp.id_producto
                     GROUP BY p.id, p.nombre
                     HAVING cantidad_pasos > 0
                     ORDER BY p.nombre ASC";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByProducto($id_producto)
    {
        try {
            $vSql = "SELECT pp.id_estacion, e.nombre_estacion, pp.orden_paso,
                            p.nombre AS nombre_producto
                     FROM procesos_preparacion pp
                     JOIN estaciones e ON pp.id_estacion = e.id
                     JOIN productos p ON pp.id_producto = p.id
                     WHERE pp.id_producto = $id_producto
                     ORDER BY pp.orden_paso ASC";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_producto, $id_estacion, $orden_paso)
    {
        try {
            $vSql = "INSERT INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
                     VALUES ($id_producto, $id_estacion, $orden_paso)";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id_producto, $id_estacion, $orden_paso)
    {
        try {
            $vSql = "UPDATE procesos_preparacion SET orden_paso = $orden_paso
                     WHERE id_producto = $id_producto AND id_estacion = $id_estacion";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id_producto, $id_estacion)
    {
        try {
            $vSql = "DELETE FROM procesos_preparacion
                     WHERE id_producto = $id_producto AND id_estacion = $id_estacion";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function deleteByProducto($id_producto)
    {
        try {
            $vSql = "DELETE FROM procesos_preparacion WHERE id_producto = $id_producto";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

}