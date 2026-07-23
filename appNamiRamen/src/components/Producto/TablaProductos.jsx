import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProductoService from '../../services/ProductoService';

    export default function TablaProductos() {
    const [data, setData]                   = useState([]);
    const [loaded, setLoaded]               = useState(false);
    const [error, setError]                 = useState('');
    const [confirmId, setConfirmId]         = useState(null);
    const [confirmNombre, setConfirmNombre] = useState('');

    const cargarProductos = () => {
      ProductoService.getProductos()
        .then((res) => { setData(res.data?.data ?? []); setLoaded(true); })
        .catch((err) => { setError(err); setLoaded(true); });
    };

   useEffect(() => { cargarProductos(); }, []);

    const handleInhabilitar = (id, nombre) => {
      setConfirmId(id);
      setConfirmNombre(nombre);
    };

   const confirmarInhabilitar = () => {
    ProductoService.desactivarProducto(confirmId)
      .then(() => {
        toast.success('Producto inhabilitado correctamente', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
        cargarProductos();
      })
      .catch(() => {
        toast.error('Error al inhabilitar el producto', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
      });

      
   };
    const confirmarActivar = (id, nombre) => {
        ProductoService.activarProducto(id)
          .then(() => {
            toast.success(`${nombre} reactivado correctamente`, {
              duration: 3000, position: 'top-center',
            });
            cargarProductos();
          })
          .catch(() => {
            toast.error('Error al reactivar el producto', {
              duration: 3000, position: 'top-center',
            });
          });
      };

  if (!loaded) return <p>Cargando productos...</p>;
  if (error)   return <p>Error al cargar productos.</p>;

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
                 alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
                fontWeight: 700, color: '#1B2A4A' }}>
          Mantenimiento de Productos
        </Typography>
        <Button component={Link} to="/admin/productos/crear"
          variant="contained" startIcon={<AddIcon />}
          sx={{ bgcolor: '#1B2A4A', color: '#fff', textTransform: 'none',
                borderRadius: 1, '&:hover': { bgcolor: '#152236' } }}>
          Nuevo producto
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Imagen', 'Nombre', 'Categoría', 'Precio', 'Estado', 'Acciones'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((prod) => (
              <TableRow key={prod.id} hover>
                <TableCell sx={{ width: 60, py: 1 }}>
                  <Box
                    component="img"
                    src={prod.imagen_url || '/placeholder-food.jpg'}
                    alt={prod.nombre}
                    onError={(e) => { e.target.src = '/placeholder-food.jpg'; }}
                    sx={{ width: 48, height: 48, borderRadius: 1,
                          objectFit: 'cover', display: 'block' }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1B2A4A' }}>
                  {prod.nombre}
                </TableCell>
                <TableCell sx={{ fontSize: 13 }}>{prod.nombre_categoria}</TableCell>
                <TableCell sx={{ fontSize: 13, color: '#C0392B', fontWeight: 600 }}>
                  ₡{Number(prod.precio).toLocaleString('es-CR')}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Chip
                      label={prod.activo == 1 ? 'Habilitado' : 'Inhabilitado'}
                      size="small"
                      sx={{
                        bgcolor: prod.activo == 1 ? '#e8f5e9' : '#fce4ec',
                        color:   prod.activo == 1 ? '#2e7d32' : '#c62828',
                        fontWeight: 600, fontSize: 11,
                      }}
                    />
                    <Chip
                      label={prod.en_menu_ahora ? 'En menú ahora' : 'Fuera de horario'}
                      size="small"
                      sx={{
                        bgcolor: prod.en_menu_ahora ? '#e3f2fd' : '#f5f5f5',
                        color:   prod.en_menu_ahora ? '#1565c0' : '#9e9e9e',
                        fontWeight: 600, fontSize: 10,
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver detalle">
                    <IconButton component={Link} to={`/productos/${prod.id}`}
                      size="small" sx={{ color: '#1B2A4A' }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton component={Link} to={`/admin/productos/editar/${prod.id}`}
                      size="small" sx={{ color: '#C0392B' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {prod.activo == 1 ? (
                    <Tooltip title="Inhabilitar">
                      <IconButton size="small" sx={{ color: '#c62828' }}
                        onClick={() => handleInhabilitar(prod.id, prod.nombre)}>
                        <BlockIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Reactivar">
                      <IconButton size="small" sx={{ color: '#2e7d32' }}
                        onClick={() => confirmarActivar(prod.id, prod.nombre)}>
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(confirmId)} onClose={() => setConfirmId(null)}>
        <DialogTitle sx={{ color: '#1B2A4A', fontFamily: '"Noto Serif JP", serif' }}>
          Confirmar inhabilitación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que querés inhabilitar <strong>{confirmNombre}</strong>? El registro quedará inactivo pero podrá reactivarse editándolo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}
            sx={{ color: '#1B2A4A', textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button onClick={confirmarInhabilitar} variant="contained"
            sx={{ bgcolor: '#c62828', color: '#fff', textTransform: 'none',
                  '&:hover': { bgcolor: '#b71c1c' } }}>
            Inhabilitar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}