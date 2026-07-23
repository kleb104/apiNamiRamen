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
import ProcesoService from '../../services/ProcesoService.js';

export function ListadoProcesos() {
  const [data, setData]                   = useState([]);
  const [loaded, setLoaded]               = useState(false);
  const [error, setError]                 = useState('');
  const [confirmId, setConfirmId]         = useState(null);
  const [confirmNombre, setConfirmNombre] = useState('');

  const cargarProcesos = () => {
    ProcesoService.getProcesos()
      .then((res) => { setData(res.data?.data ?? []); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  };

  useEffect(() => { cargarProcesos(); }, []);

  const handleEliminar = (id, nombre) => {
    setConfirmId(id);
    setConfirmNombre(nombre);
  };

  const confirmarEliminar = () => {
    ProcesoService.deleteProceso(confirmId)
      .then(() => {
        toast.success('Proceso eliminado correctamente', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
        cargarProcesos();
      })
      .catch(() => {
        toast.error('Error al eliminar el proceso', {
          duration: 3000, position: 'top-center',
        });
        setConfirmId(null);
      });
  };

  if (!loaded) return <p>Cargando procesos...</p>;
  if (error)   return <p>Error al cargar procesos.</p>;

  const colorPorPasos = (n) => {
    if (n == 1) return { bg: '#e3f2fd', color: '#1565c0' };
    if (n == 2) return { bg: '#fff8e1', color: '#f57f17' };
    return             { bg: '#fce4ec', color: '#c62828' };
  };

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
                 alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
                fontWeight: 700, color: '#1B2A4A' }}>
          Procesos de Preparación
        </Typography>
        <Button component={Link} to="/procesos/crear" variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#1B2A4A', color: '#fff', textTransform: 'none',
                borderRadius: 1, '&:hover': { bgcolor: '#152236' } }}>
          Nuevo proceso
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Producto', 'Cantidad de pasos', 'Detalle', 'Acciones'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((proc) => {
              const { bg, color } = colorPorPasos(proc.cantidad_pasos);
              return (
                <TableRow key={proc.id} hover>
                  <TableCell sx={{ fontWeight: 600, color: '#1B2A4A' }}>
                    {proc.nombre_producto}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${proc.cantidad_pasos} ${proc.cantidad_pasos == 1 ? 'estación' : 'estaciones'}`}
                      size="small"
                      sx={{ bgcolor: bg, color, fontWeight: 600, fontSize: 11 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" component={Link} to={`/procesos/${proc.id}`}
                      variant="outlined"
                      sx={{ fontSize: 11, color: '#1B2A4A',
                            borderColor: 'rgba(27,42,74,0.3)',
                            textTransform: 'none', borderRadius: 1 }}>
                      Ver proceso
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Editar proceso">
                        <IconButton component={Link} to={`/procesos/editar/${proc.id}`}
                          size="small" sx={{ color: '#C0392B' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar proceso">
                        <IconButton size="small" sx={{ color: '#c62828' }}
                          onClick={() => handleEliminar(proc.id, proc.nombre_producto)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(confirmId)} onClose={() => setConfirmId(null)}>
        <DialogTitle sx={{ color: '#1B2A4A', fontFamily: '"Noto Serif JP", serif' }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que querés eliminar el proceso de <strong>{confirmNombre}</strong>? Esta acción no se puede deshacer.
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