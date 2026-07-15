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
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import MenuService from '../../services/MenuService';

function estaActivo(hora_apertura, hora_cierre) {
  const ahora = new Date();
  const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

  const [hA, mA] = hora_apertura.split(':').map(Number);
  const [hC, mC] = hora_cierre.split(':').map(Number);

  const apertura = hA * 60 + mA;
  const cierre   = hC * 60 + mC;

  return horaActual >= apertura && horaActual <= cierre;
}

export function ListadoMenus() {
  const [data, setData]     = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    MenuService.getMenus()
      .then((res) => { setData(res.data?.data ?? []); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  }, []);

  if (!loaded) return <p>Cargando menús...</p>;
  if (error)   return <p>Error al cargar menús.</p>;

  return (
    <Box sx={{ py: 4, px: 3 }}>
      <Typography
        component="h2"
        sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
              fontWeight: 700, color: '#1B2A4A', mb: 3 }}
      >
        Listado de Menús
      </Typography>

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
                        label={estaActivo(menu.hora_apertura, menu.hora_cierre) ? 'Activo ahora' : 'Fuera de horario'}
                        size="small"
                        sx={{
                        bgcolor: estaActivo(menu.hora_apertura, menu.hora_cierre) ? '#e8f5e9' : '#fce4ec',
                        color:   estaActivo(menu.hora_apertura, menu.hora_cierre) ? '#2e7d32' : '#c62828',
                        fontWeight: 600, fontSize: 11,
                        }}
                    />
                    </TableCell>
                    <TableCell>
                    <Button
                        size="small"
                        component={Link}
                        to={estaActivo(menu.hora_apertura, menu.hora_cierre) ? '/menu-disponible' : '#'}
                        variant="outlined"
                        disabled={!estaActivo(menu.hora_apertura, menu.hora_cierre)}
                        sx={{
                        fontSize: 11, color: '#1B2A4A',
                        borderColor: 'rgba(27,42,74,0.3)',
                        textTransform: 'none', borderRadius: 1,
                        }}
                    >
                        Ver menú
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}