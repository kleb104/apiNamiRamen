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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MenuService from '../../services/MenuService';

function estaActivo(hora_apertura, hora_cierre) {
  const ahora     = new Date();
  const horaActual = ahora.getHours() * 60 + ahora.getMinutes();
  const [hA, mA]  = hora_apertura.split(':').map(Number);
  const [hC, mC]  = hora_cierre.split(':').map(Number);
  const apertura  = hA * 60 + mA;
  const cierre    = hC * 60 + mC;
  return horaActual >= apertura && horaActual <= cierre;
}

export function ListadoMenus() {
  const [data, setData]                   = useState([]);
  const [loaded, setLoaded]               = useState(false);
  const [error, setError]                 = useState('');
  const [confirmId, setConfirmId]         = useState(null);
  const [confirmNombre, setConfirmNombre] = useState('');

  const cargarMenus = () => {
    MenuService.getMenus()
      .then((res) => { setData(res.data?.data ?? []); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  };

  useEffect(() => { cargarMenus(); }, []);

  const handleEliminar = (id, nombre) => {
    setConfirmId(id);
    setConfirmNombre(nombre);
  };

  const confirmarEliminar = () => {
    MenuService.deleteMenu(confirmId)
      .then(() => {
        toast.success('Menú eliminado correctamente', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
        cargarMenus();
      })
      .catch(() => {
        toast.error('Error al eliminar el menú', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
      });
  };

  if (!loaded) return <p>Cargando menús...</p>;
  if (error)   return <p>Error al cargar menús.</p>;

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
                 alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
                fontWeight: 700, color: '#1B2A4A' }}>
          Listado de Menús
        </Typography>
        <Button component={Link} to="/menus/crear" variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#1B2A4A', color: '#fff', textTransform: 'none',
                borderRadius: 1, '&:hover': { bgcolor: '#152236' } }}>
          Nuevo menú
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Nombre', 'Disponibilidad', 'Horario', 'Estado', 'Acciones'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((menu) => (
              <TableRow key={menu.id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#1B2A4A' }}>
                  {menu.nombre_menu}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {menu.fecha_inicio && menu.fecha_fin
                    ? `${menu.fecha_inicio} — ${menu.fecha_fin}`
                    : 'Sin fecha límite'}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {menu.hora_apertura} — {menu.hora_cierre}
                </TableCell>
                <TableCell>
                  <Chip
                    label={estaActivo(menu.hora_apertura, menu.hora_cierre)
                      ? 'Activo ahora' : 'Fuera de horario'}
                    size="small"
                    sx={{
                      bgcolor: estaActivo(menu.hora_apertura, menu.hora_cierre)
                        ? '#e8f5e9' : '#fce4ec',
                      color: estaActivo(menu.hora_apertura, menu.hora_cierre)
                        ? '#2e7d32' : '#c62828',
                      fontWeight: 600, fontSize: 11,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <Tooltip title="Ver menú">
                      <span>
                        <Button size="small" component={Link}
                          to={estaActivo(menu.hora_apertura, menu.hora_cierre)
                            ? '/menu-disponible' : '#'}
                          variant="outlined"
                          disabled={!estaActivo(menu.hora_apertura, menu.hora_cierre)}
                          sx={{ fontSize: 11, color: '#1B2A4A',
                                borderColor: 'rgba(27,42,74,0.3)',
                                textTransform: 'none', borderRadius: 1 }}>
                          Ver menú
                        </Button>
                      </span>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton component={Link} to={`/menus/editar/${menu.id}`}
                        size="small" sx={{ color: '#C0392B' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" sx={{ color: '#c62828' }}
                        onClick={() => handleEliminar(menu.id, menu.nombre_menu)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(confirmId)} onClose={() => setConfirmId(null)}>
        <DialogTitle sx={{ color: '#1B2A4A', fontFamily: '"Noto Serif JP", serif' }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que querés eliminar <strong>{confirmNombre}</strong>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}
            sx={{ color: '#1B2A4A', textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button onClick={confirmarEliminar} variant="contained"
            sx={{ bgcolor: '#c62828', color: '#fff', textTransform: 'none',
                  '&:hover': { bgcolor: '#b71c1c' } }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}