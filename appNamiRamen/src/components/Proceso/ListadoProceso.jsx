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
import { Link } from 'react-router-dom';
import ProcesoService from '../../services/ProcesoService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


export function ListadoProceso() {
  const [data, setData]     = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    ProcesoService.getProcesos()
      .then((res) => { setData(res.data?.data ?? []); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  }, []);

  if (!loaded) return <p>Cargando procesos...</p>;
  if (error)   return <p>Error al cargar procesos.</p>;

  const colorPorPasos = (n) => {
    if (n == 1) return { bg: '#e3f2fd', color: '#1565c0' };
    if (n == 2) return { bg: '#fff8e1', color: '#f57f17' };
    return              { bg: '#fce4ec', color: '#c62828' };
  };

  return (
    
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
                fontWeight: 700, color: '#1B2A4A' }}>
          Procesos de Preparación
        </Typography>
        <Button
          component={Link}
          to="/procesos/crear"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#1B2A4A', color: '#fff',
            textTransform: 'none', borderRadius: 1,
            '&:hover': { bgcolor: '#152236' },
          }}
        >
          Nuevo proceso
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Producto', 'Cantidad de pasos', 'Detalle', 'Editar'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{h}</TableCell>
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
                    <Tooltip title="Editar proceso">
                      <IconButton
                        component={Link}
                        to={`/procesos/editar/${proc.id}`}
                        size="small"
                        sx={{ color: '#C0392B' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}