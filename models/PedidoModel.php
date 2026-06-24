<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class PedidoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT pe.*, uc.nombre AS nombre_cliente, ue.nombre AS nombre_empleado
                     FROM pedidos pe
                     JOIN usuarios uc ON pe.id_cliente = uc.id
                     LEFT JOIN usuarios ue ON pe.id_empleado = ue.id
                     ORDER BY pe.fecha_hora DESC;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM pedidos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Pedidos de un cliente específico */
    public function getByCliente($id_cliente)
    {
        try {
            $vSql = "SELECT * FROM pedidos WHERE id_cliente = ? ORDER BY fecha_hora DESC";
            return $this->enlace->ExecuteSQL($vSql, [$id_cliente]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Pedidos filtrados por estado (útil para pantallas de cocina/encargado) */
    public function getByEstado($estado_pedido)
    {
        try {
            $vSql = "SELECT * FROM pedidos WHERE estado_pedido = ? ORDER BY fecha_hora ASC";
            return $this->enlace->ExecuteSQL($vSql, [$estado_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_cliente, $id_empleado, $metodo_entrega, $subtotal, $impuesto, $costo_envio, $total)
    {
        try {
            $vSql = "INSERT INTO pedidos (id_cliente, id_empleado, metodo_entrega, subtotal, impuesto, costo_envio, total)
                     VALUES (?, ?, ?, ?, ?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$id_cliente, $id_empleado, $metodo_entrega, $subtotal, $impuesto, $costo_envio, $total]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Actualizar solo el estado (lo más usado en flujo de cocina/entrega) */
    public function updateEstado($id, $estado_pedido)
    {
        try {
            $vSql = "UPDATE pedidos SET estado_pedido = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$estado_pedido, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $id_empleado, $metodo_entrega, $estado_pedido, $subtotal, $impuesto, $costo_envio, $total)
    {
        try {
            $vSql = "UPDATE pedidos 
                     SET id_empleado = ?, metodo_entrega = ?, estado_pedido = ?, subtotal = ?, impuesto = ?, costo_envio = ?, total = ?
                     WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_empleado, $metodo_entrega, $estado_pedido, $subtotal, $impuesto, $costo_envio, $total, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM pedidos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
