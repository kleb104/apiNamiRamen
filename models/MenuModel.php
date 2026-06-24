<?php
require_once __DIR__ . '/../config/MySqlConnect.php';

class MenuModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM menus;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM menus WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener los items (productos/combos) de un menú */
    public function getItems($id_menu)
    {
        try {
            $vSql = "SELECT mi.id, mi.id_producto, mi.id_combo,
                            p.nombre AS nombre_producto, c.nombre_combo
                     FROM menu_items mi
                     LEFT JOIN productos p ON mi.id_producto = p.id
                     LEFT JOIN combos c ON mi.id_combo = c.id
                     WHERE mi.id_menu = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_menu]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $creado_por)
    {
        try {
            $vSql = "INSERT INTO menus (nombre_menu, fecha_inicio, fecha_fin, hora_apertura, hora_cierre, creado_por)
                     VALUES (?, ?, ?, ?, ?, ?)";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $creado_por]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $activo)
    {
        try {
            $vSql = "UPDATE menus 
                     SET nombre_menu = ?, fecha_inicio = ?, fecha_fin = ?, hora_apertura = ?, hora_cierre = ?, activo = ?
                     WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $activo, $id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM menus WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Agregar un producto o combo al menú (uno de los dos, no ambos) */
    public function agregarItem($id_menu, $id_producto, $id_combo)
    {
        try {
            $vSql = "INSERT INTO menu_items (id_menu, id_producto, id_combo) VALUES (?, ?, ?)";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_menu, $id_producto, $id_combo]);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function quitarItem($id_item)
    {
        try {
            $vSql = "DELETE FROM menu_items WHERE id = ?";
            return $this->enlace->ExecuteSQLPrepared($vSql, [$id_item]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
