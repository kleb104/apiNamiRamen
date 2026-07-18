<?php

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
            $vSql = "SELECT * FROM menus ORDER BY activo DESC, id DESC;";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM menus WHERE id = $id";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Menú vigente según la hora actual del servidor */
    public function getActivo()
    {
        try {
            $vSql = "SELECT * FROM menus
                    WHERE hora_apertura <= TIME(NOW())
                    AND hora_cierre   >= TIME(NOW())
                    LIMIT 1";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Devuelve solo el id del menú vigente ahora mismo */
    public function getActivoId()
    {
        try {
            $vSql = "SELECT id FROM menus
                    WHERE hora_apertura <= TIME(NOW())
                    AND hora_cierre   >= TIME(NOW())
                    LIMIT 1";
            $result = $this->enlace->executeSQL($vSql, null, 'asoc');
            return $result[0]['id'] ?? null;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getItemsAgrupados($id_menu)
    {
        try {
            $vSql = "SELECT 
                        mi.id,
                        mi.id_producto,
                        mi.id_combo,
                        p.nombre AS nombre_producto,
                        p.precio AS precio_producto,
                        p.descripcion AS descripcion_producto,
                        p.imagen_url AS imagen_producto,
                        c.nombre_combo,
                        c.precio_especial AS precio_combo,
                        COALESCE(cat_p.nombre_categoria, cat_c.nombre_categoria) AS categoria
                     FROM menu_items mi
                     LEFT JOIN productos p ON mi.id_producto = p.id
                     LEFT JOIN categorias cat_p ON p.id_categoria = cat_p.id
                     LEFT JOIN combos c ON mi.id_combo = c.id
                     LEFT JOIN categorias cat_c ON c.id_categoria = cat_c.id
                     WHERE mi.id_menu = $id_menu
                     ORDER BY categoria";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $creado_por)
    {
        try {
            $fi = $fecha_inicio ? "'$fecha_inicio'" : "NULL";
            $ff = $fecha_fin    ? "'$fecha_fin'"    : "NULL";
            $vSql = "INSERT INTO menus (nombre_menu, fecha_inicio, fecha_fin, hora_apertura, hora_cierre, creado_por)
                     VALUES ('$nombre_menu', $fi, $ff, '$hora_apertura', '$hora_cierre', $creado_por)";
            return $this->enlace->executeSQL_DML_last($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_menu, $fecha_inicio, $fecha_fin, $hora_apertura, $hora_cierre, $activo)
    {
        try {
            $fi  = $fecha_inicio ? "'$fecha_inicio'" : "NULL";
            $ff  = $fecha_fin    ? "'$fecha_fin'"    : "NULL";
            $act = $activo ? 1 : 0;
            $vSql = "UPDATE menus 
                     SET nombre_menu = '$nombre_menu', fecha_inicio = $fi, fecha_fin = $ff,
                         hora_apertura = '$hora_apertura', hora_cierre = '$hora_cierre', activo = $act
                     WHERE id = $id";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM menus WHERE id = $id";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function agregarItem($id_menu, $id_producto, $id_combo)
    {
        try {
            $p = $id_producto ? $id_producto : "NULL";
            $c = $id_combo    ? $id_combo    : "NULL";
            $vSql = "INSERT INTO menu_items (id_menu, id_producto, id_combo) VALUES ($id_menu, $p, $c)";
            return $this->enlace->executeSQL_DML_last($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function quitarItem($id_item)
    {
        try {
            $vSql = "DELETE FROM menu_items WHERE id = $id_item";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function quitarTodosItems($id_menu)
    {
        try {
            $vSql = "DELETE FROM menu_items WHERE id_menu = $id_menu";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

}