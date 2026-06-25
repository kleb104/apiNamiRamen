<?php

class PagoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM pagos;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM pagos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* id_pedido es UNIQUE, así que esto trae a lo sumo un registro */
    public function getByPedido($id_pedido)
    {
        try {
            $vSql = "SELECT * FROM pagos WHERE id_pedido = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id_pedido]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_pedido, $metodo_pago, $monto_pagado, $vuelto)
    {
        try {
            $vSql = "INSERT INTO pagos (id_pedido, metodo_pago, monto_pagado, vuelto) VALUES (?, ?, ?, ?)";
            return $this->enlace->ExecuteSQL($vSql, [$id_pedido, $metodo_pago, $monto_pagado, $vuelto]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $metodo_pago, $monto_pagado, $vuelto)
    {
        try {
            $vSql = "UPDATE pagos SET metodo_pago = ?, monto_pagado = ?, vuelto = ? WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$metodo_pago, $monto_pagado, $vuelto, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM pagos WHERE id = ?";
            return $this->enlace->ExecuteSQL($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
