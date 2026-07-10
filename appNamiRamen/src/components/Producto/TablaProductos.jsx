// src/components/Producto/TablaProductos.jsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import Chip from '@mui/material/Chip';
import { visuallyHidden } from '@mui/utils';
import { useNavigate, Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';

// ── Helpers de ordenamiento (igual que el profe) ───────────────────────────────
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ── Columnas de la tabla ───────────────────────────────────────────────────────
const headCells = [
  { id: 'nombre',           numeric: false, disablePadding: true,  label: 'Nombre'    },
  { id: 'nombre_categoria', numeric: false, disablePadding: false, label: 'Categoría' },
  { id: 'precio',           numeric: true,  disablePadding: false, label: 'Precio'    },
  { id: 'activo',           numeric: false, disablePadding: false, label: 'Estado'    },
  { id: 'detalle',          numeric: false, disablePadding: false, label: 'Acciones'  },
];

// ── Encabezado de la tabla ─────────────────────────────────────────────────────
function TablaProductosHead({ order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Tooltip title="Crear producto">
            <IconButton component={Link} to="/admin/producto/crear">
              <AddIcon sx={{ color: '#1B2A4A' }} />
            </IconButton>
          </Tooltip>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'descendente' : 'ascendente'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
TablaProductosHead.propTypes = {
  numSelected:    PropTypes.number.isRequired,
  onRequestSort:  PropTypes.func.isRequired,
  order:          PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy:        PropTypes.string.isRequired,
  rowCount:       PropTypes.number.isRequired,
};

// ── Barra de herramientas ──────────────────────────────────────────────────────
function TablaProductosToolbar({ numSelected, idSelected }) {
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 }, pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
          {numSelected} seleccionado(s)
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%', fontFamily: '"Noto Serif JP", serif', color: '#1B2A4A' }} variant="h6">
          Mantenimiento de Productos
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Ver detalle">
            <IconButton onClick={() => navigate(`/productos/${idSelected}`)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton onClick={() => navigate(`/admin/producto/editar/${idSelected}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Desactivar">
            <IconButton onClick={() => ProductoService.desactivarProducto(idSelected)}>
              <BlockIcon sx={{ color: '#C0392B' }} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filtrar">
          <IconButton><FilterListIcon /></IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
TablaProductosToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected:  PropTypes.number.isRequired,
};

// ── Componente principal ───────────────────────────────────────────────────────
export default function TablaProductos() {
  const [data, setData]     = useState([]);
  const [error, setError]   = useState('');
  const [loaded, setLoaded] = useState(false);

  const [order, setOrder]           = useState('asc');
  const [orderBy, setOrderBy]       = useState('nombre');
  const [selected, setSelected]     = useState([]);
  const [page, setPage]             = useState(0);
  const [dense, setDense]           = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    ProductoService.getProductos()
      .then((response) => {
        // La API devuelve { error: false, data: [...] }
        setData(response.data?.data ?? []);
        setError(response.data?.error ?? '');
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          setError(error);
          setLoaded(false);
        }
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    setSelected(selected[0] === id ? [] : [id]);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows  = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  if (!loaded) return <p>Cargando...</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <>
      {data && data.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TablaProductosToolbar
              numSelected={selected.length}
              idSelected={Number(selected[0]) || 0}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
                <TablaProductosHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = isSelected(row.id);
                      return (
                        <TableRow
                          hover
                          onClick={(e) => handleClick(e, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox color="primary" checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {row.nombre}
                          </TableCell>
                          <TableCell align="left">{row.nombre_categoria}</TableCell>
                          <TableCell align="right">
                            ₡{Number(row.precio).toLocaleString('es-CR')}
                          </TableCell>
                          <TableCell align="left">
                            <Chip
                              label={row.activo ? 'Activo' : 'Inactivo'}
                              size="small"
                              sx={{
                                bgcolor: row.activo ? '#e8f5e9' : '#fce4ec',
                                color:   row.activo ? '#2e7d32' : '#c62828',
                                fontWeight: 600,
                                fontSize: 11,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver detalle">
                              <IconButton
                                component={Link}
                                to={`/productos/${row.id}`}
                                onClick={(e) => e.stopPropagation()}
                                sx={{ color: '#1B2A4A' }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />}
            label="Vista compacta"
          />
        </Box>
      )}
    </>
  );
}