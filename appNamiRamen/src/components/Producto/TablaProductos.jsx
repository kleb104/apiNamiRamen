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
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';

export default function TablaProductos() {
  const [data, setData]     = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    ProductoService.getProductos()
      .then((res) => {
        setData(res.data?.data ?? []);
        setLoaded(true);
      })
      .catch((err) => { setError(err); setLoaded(true); });
  }, []);

  if (!loaded) return <p>Cargando productos...</p>;
  if (error)   return <p>Error al cargar productos.</p>;

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22, fontWeight: 700, color: '#1B2A4A' }}>
          Mantenimiento de Productos
        </Typography>
        <Button
          component={Link}
          to="/admin/productos/crear"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#1B2A4A', color:'#fff', '&:hover': { bgcolor: '#152236' }, textTransform: 'none', borderRadius: 1 }}
        >
          Nuevo producto
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Nombre', 'Categoría', 'Precio', 'Estado', 'Acciones'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((prod) => (
              <TableRow key={prod.id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#1B2A4A' }}>{prod.nombre}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{prod.nombre_categoria}</TableCell>
                <TableCell sx={{ fontSize: 13, color: '#C0392B', fontWeight: 600 }}>
                  ₡{Number(prod.precio).toLocaleString('es-CR')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={prod.activo == 1 ? 'Activo' : 'Inactivo'}
                    size="small"
                    sx={{
                      bgcolor: prod.activo == 1 ? '#e8f5e9' : '#fce4ec',
                      color:   prod.activo == 1 ? '#2e7d32' : '#c62828',
                      fontWeight: 600, fontSize: 11,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver detalle">
                    <IconButton component={Link} to={`/productos/${prod.id}`} size="small" sx={{ color: '#1B2A4A' }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton component={Link} to={`/admin/productos/editar/${prod.id}`} size="small" sx={{ color: '#C0392B' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}