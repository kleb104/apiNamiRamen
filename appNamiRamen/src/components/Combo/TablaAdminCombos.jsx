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
import ComboService from '../../services/ComboService';

export default function TablaAdminCombos() {
  const [data, setData]     = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    ComboService.getTodosLosCombos()
      .then((res) => {
        setData(res.data?.data ?? []);
        setLoaded(true);
      })
      .catch((err) => { setError(err); setLoaded(true); });
  }, []);

  if (!loaded) return <p>Cargando combos...</p>;
  if (error)   return <p>Error al cargar combos.</p>;

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
                fontWeight: 700, color: '#1B2A4A' }}>
          Mantenimiento de Combos
        </Typography>
        <Button
          component={Link}
          to="/admin/combos/crear"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#1B2A4A', color: '#fff',
            textTransform: 'none', borderRadius: 1,
            '&:hover': { bgcolor: '#152236' },
          }}
        >
          Nuevo combo
        </Button>
      </Box>

      <TableContainer component={Paper}
        sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1B2A4A' }}>
              {['Nombre', 'Precio especial', 'Categoría', 'Estado', 'Acciones'].map((h) => (
                <TableCell key={h} sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((combo) => (
              <TableRow key={combo.id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#1B2A4A' }}>
                  {combo.nombre_combo}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: '#C0392B', fontWeight: 600 }}>
                  ₡{Number(combo.precio_especial).toLocaleString('es-CR')}
                </TableCell>
                <TableCell sx={{ fontSize: 13 }}>
                  {combo.nombre_categoria}
                </TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Chip
                        label={combo.activo == 1 ? 'Habilitado' : 'Deshabilitado'}
                        size="small"
                        sx={{
                            bgcolor: combo.activo == 1 ? '#e8f5e9' : '#fce4ec',
                            color:   combo.activo == 1 ? '#2e7d32' : '#c62828',
                            fontWeight: 600, fontSize: 11,
                        }}
                        />
                        <Chip
                        label={combo.en_menu_ahora ? 'En menú ahora' : 'Fuera de horario'}
                        size="small"
                        sx={{
                            bgcolor: combo.en_menu_ahora ? '#e3f2fd' : '#f5f5f5',
                            color:   combo.en_menu_ahora ? '#1565c0' : '#9e9e9e',
                            fontWeight: 600, fontSize: 10,
                        }}
                        />
                    </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver detalle">
                    <IconButton
                      component={Link}
                      to={`/combos/${combo.id}`}
                      size="small"
                      sx={{ color: '#1B2A4A' }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      component={Link}
                      to={`/admin/combos/editar/${combo.id}`}
                      size="small"
                      sx={{ color: '#C0392B' }}
                    >
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