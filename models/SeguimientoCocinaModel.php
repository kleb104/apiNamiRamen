<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class SeguimientoCocinaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM seguimiento_cocina;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM seguimiento_cocina WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Vista útil para pantallas de cocina: todo lo que está en cola o en preparación, por estación */
    public function getByEstacion($id_estacion)
    {
        try {
            $vSql = "SELECT sc.*, pd.cantidad, pd.observaciones
                     FROM seguimiento_cocina sc
                     JOIN pedido_detalles pd ON sc.id_pedido_detalle = pd.id
                     WHERE sc.id_estacion = ? AND sc.estado_estacion != 'Terminado'
                     ORDER BY sc.id ASC";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_estacion]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($id_pedido_detalle, $id_estacion)
    {
        try {
            $vSql = "INSERT INTO seguimiento_cocina (id_pedido_detalle, id_estacion) VALUES (?, ?)";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_pedido_detalle, $id_estacion]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Marcar inicio de preparación */
    public function iniciar($id, $id_usuario_cocina)
    {
        try {
            $vSql = "UPDATE seguimiento_cocina 
                     SET estado_estacion = 'En preparación', tiempo_inicio = NOW(), id_usuario_cocina = ?
                     WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_usuario_cocina, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Marcar como terminado */
    public function finalizar($id)
    {
        try {
            $vSql = "UPDATE seguimiento_cocina SET estado_estacion = 'Terminado', tiempo_fin = NOW() WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM seguimiento_cocina WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
