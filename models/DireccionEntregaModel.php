<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class DireccionEntregaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM direcciones_entrega;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* La PK de esta tabla ES id_pedido, así que get() busca por ahí */
    public function get($id_pedido)
    {
        try {
            $vSql = "SELECT * FROM direcciones_entrega WHERE id_pedido = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_pedido, $direccion_exacta, $detalles_adicionales)
    {
        try {
            $vSql = "INSERT INTO direcciones_entrega (id_pedido, direccion_exacta, detalles_adicionales) VALUES (?, ?, ?)";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido, $direccion_exacta, $detalles_adicionales]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id_pedido, $direccion_exacta, $detalles_adicionales)
    {
        try {
            $vSql = "UPDATE direcciones_entrega SET direccion_exacta = ?, detalles_adicionales = ? WHERE id_pedido = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$direccion_exacta, $detalles_adicionales, $id_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id_pedido)
    {
        try {
            $vSql = "DELETE FROM direcciones_entrega WHERE id_pedido = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
