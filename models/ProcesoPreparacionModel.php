<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class ProcesoPreparacionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Obtener la ruta completa de estaciones de un producto, ordenada por paso */
    public function getByProducto($id_producto)
    {
        try {
            $vSql = "SELECT pp.id_estacion, e.nombre_estacion, pp.orden_paso
                     FROM procesos_preparacion pp
                     JOIN estaciones e ON pp.id_estacion = e.id
                     WHERE pp.id_producto = ?
                     ORDER BY pp.orden_paso ASC";
            return $this->enlace->ExecuteSQL($vSql, [$id_producto]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_producto, $id_estacion, $orden_paso)
    {
        try {
            $vSql = "INSERT INTO procesos_preparacion (id_producto, id_estacion, orden_paso) VALUES (?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$id_producto, $id_estacion, $orden_paso]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id_producto, $id_estacion, $orden_paso)
    {
        try {
            $vSql = "UPDATE procesos_preparacion SET orden_paso = ? WHERE id_producto = ? AND id_estacion = ?";
            return $this->enlace->ExecuteSQL($vSql, [$orden_paso, $id_producto, $id_estacion]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id_producto, $id_estacion)
    {
        try {
            $vSql = "DELETE FROM procesos_preparacion WHERE id_producto = ? AND id_estacion = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_producto, $id_estacion]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
