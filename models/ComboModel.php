<?php

class ComboModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT c.*, cat.nombre_categoria
                     FROM combos c
                     JOIN categorias cat ON c.id_categoria = cat.id;";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT c.*, cat.nombre_categoria
                     FROM combos c
                     JOIN categorias cat ON c.id_categoria = cat.id
                     WHERE c.id = $id";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener productos del combo con imagen del principal */
    public function getProductos($id_combo)
    {
        try {
            $vSql = "SELECT p.id, p.nombre, p.precio, p.imagen_url,
                            cp.cantidad, cp.es_principal
                     FROM combo_productos cp
                     JOIN productos p ON cp.id_producto = p.id
                     WHERE cp.id_combo = $id_combo
                     ORDER BY cp.es_principal DESC";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Imagen del producto principal del combo */
    public function getImagenPrincipal($id_combo)
    {
        try {
            $vSql = "SELECT p.imagen_url
                     FROM combo_productos cp
                     JOIN productos p ON cp.id_producto = p.id
                     WHERE cp.id_combo = $id_combo
                     ORDER BY cp.es_principal DESC
                     LIMIT 1";
            $result = $this->enlace->executeSQL($vSql, null, 'asoc');
            return $result[0]['imagen_url'] ?? null;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Combos que pertenecen al menú vigente ahora mismo */
    public function allPorMenu()
    {
        try {
            $vSql = "SELECT c.*, cat.nombre_categoria
                    FROM combos c
                    JOIN categorias cat ON c.id_categoria = cat.id
                    JOIN menu_items mi ON mi.id_combo = c.id
                    JOIN menus m ON mi.id_menu = m.id
                    WHERE m.hora_apertura <= TIME(NOW())
                    AND m.hora_cierre   >= TIME(NOW())
                    AND c.activo = TRUE
                    ORDER BY cat.nombre_categoria, c.nombre_combo";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }
    /* Buscar por nombre para validar unicidad */
    public function getByNombre($nombre)
    {
        try {
            $vSql = "SELECT id FROM combos WHERE nombre_combo = '$nombre'";
            return $this->enlace->executeSQL($vSql, null, 'asoc');
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Quitar TODOS los productos de un combo (para el update) */
    public function quitarTodosProductos($id_combo)
    {
        try {
            $vSql = "DELETE FROM combo_productos WHERE id_combo = $id_combo";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }


    public function create($nombre_combo, $precio_especial, $id_categoria)
    {
        try {
            $vSql = "INSERT INTO combos (nombre_combo, precio_especial, id_categoria)
                     VALUES ('$nombre_combo', $precio_especial, $id_categoria)";
            return $this->enlace->executeSQL_DML_last($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id, $nombre_combo, $precio_especial, $id_categoria, $activo)
    {
        try {
            $vSql = "UPDATE combos
                     SET nombre_combo = '$nombre_combo', precio_especial = $precio_especial,
                         id_categoria = $id_categoria, activo = $activo
                     WHERE id = $id";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($id)
    {
        try {
            $vSql = "DELETE FROM combos WHERE id = $id";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function agregarProducto($id_combo, $id_producto, $cantidad)
    {
        try {
            $vSql = "INSERT INTO combo_productos (id_combo, id_producto, cantidad)
                     VALUES ($id_combo, $id_producto, $cantidad)";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function quitarProducto($id_combo, $id_producto)
    {
        try {
            $vSql = "DELETE FROM combo_productos
                     WHERE id_combo = $id_combo AND id_producto = $id_producto";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function agregarProductoConPrincipal($id_combo, $id_producto, $cantidad, $es_principal)
    {
        try {
            $vSql = "INSERT INTO combo_productos (id_combo, id_producto, cantidad, es_principal)
                    VALUES ($id_combo, $id_producto, $cantidad, $es_principal)";
            return $this->enlace->executeSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getIdsEnMenuActivo()
    {
        try {
            $vSql = "SELECT DISTINCT mi.id_combo
                    FROM menu_items mi
                    JOIN menus m ON mi.id_menu = m.id
                    WHERE m.hora_apertura <= TIME(NOW())
                    AND m.hora_cierre   >= TIME(NOW())
                    AND mi.id_combo IS NOT NULL";
            $result = $this->enlace->executeSQL($vSql, null, 'asoc');
            return array_column($result, 'id_combo');
        } catch (Exception $e) {
            handleException($e);
        }
    }

}