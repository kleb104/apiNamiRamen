<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class PedidoDetalleModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM pedido_detalles;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM pedido_detalles WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Todos los detalles (líneas) de un pedido, con nombre de producto/combo */
    public function getByPedido($id_pedido)
    {
        try {
            $vSql = "SELECT pd.*, p.nombre AS nombre_producto, c.nombre_combo
                     FROM pedido_detalles pd
                     LEFT JOIN productos p ON pd.id_producto = p.id
                     LEFT JOIN combos c ON pd.id_combo = c.id
                     WHERE pd.id_pedido = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_pedido, $id_producto, $id_combo, $cantidad, $observaciones, $precio_unitario)
    {
        try {
            $vSql = "INSERT INTO pedido_detalles (id_pedido, id_producto, id_combo, cantidad, observaciones, precio_unitario)
                     VALUES (?, ?, ?, ?, ?, ?)";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido, $id_producto, $id_combo, $cantidad, $observaciones, $precio_unitario]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $cantidad, $observaciones)
    {
        try {
            $vSql = "UPDATE pedido_detalles SET cantidad = ?, observaciones = ? WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$cantidad, $observaciones, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM pedido_detalles WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
