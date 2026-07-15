import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useParams, useNavigate } from 'react-router-dom';
import ProcesoService from '../../services/ProcesoService';

export function DetalleProceso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proceso, setProceso] = useState(null);
  const [loaded, setLoaded]   = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    setLoaded(false); setProceso(null);
    ProcesoService.getProcesoById(id)
      .then((res) => { setProceso(res.data?.data); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  }, [id]);

  if (!loaded)  return <p>Cargando...</p>;
  if (error)    return <p>Error al cargar el proceso.</p>;
  if (!proceso) return <p>Proceso no encontrado.</p>;

  const colores  = ['#1565c0', '#f57f17', '#c62828'];
  const bgColors = ['#e3f2fd', '#fff8e1', '#fce4ec'];

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Chip label="Proceso de Preparación" size="small"
          sx={{ mb: 1.5, bgcolor: '#1B2A4A', color: '#fff',
                fontSize: 11, letterSpacing: '0.05em' }} />
        <Typography variant="h4"
          sx={{ fontFamily: '"Noto Serif JP", serif',
                fontWeight: 700, color: '#1B2A4A', mb: 0.5 }}>
          {proceso.nombre_producto}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          {proceso.cantidad_pasos} {proceso.cantidad_pasos == 1 ? 'estación' : 'estaciones'} en el proceso
        </Typography>
      </Box>

      <Divider sx={{ mb: 3, borderColor: 'rgba(27,42,74,0.1)' }} />

      {/* Timeline de estaciones */}
      <Box sx={{ position: 'relative' }}>
        <Box sx={{
          position: 'absolute', left: 20, top: 0, bottom: 0,
          width: 2, bgcolor: 'rgba(27,42,74,0.1)', zIndex: 0,
        }} />

        {proceso.estaciones.map((estacion, index) => (
          <Box key={estacion.id_estacion}
            sx={{ display: 'flex', alignItems: 'center',
                  gap: 3, mb: 3, position: 'relative', zIndex: 1 }}>

            {/* Círculo con número */}
            <Box sx={{
              width: 40, height: 40, borderRadius: '50%',
              bgcolor: bgColors[index] ?? '#f5f5f5',
              border: `2px solid ${colores[index] ?? '#9e9e9e'}`,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14,
                                color: colores[index] ?? '#9e9e9e' }}>
                {estacion.orden_paso}
              </Typography>
            </Box>

            {/* Info estación */}
            <Box sx={{
              flex: 1,
              bgcolor: bgColors[index] ?? '#fafafa',
              border: `1px solid ${colores[index] ?? '#e0e0e0'}33`,
              borderRadius: 2, px: 2.5, py: 1.5,
            }}>
              <Typography sx={{
                fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colores[index] ?? '#9e9e9e', mb: 0.25
              }}>
                Paso {estacion.orden_paso}
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#1B2A4A' }}>
                {estacion.nombre_estacion}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: '#1B2A4A', borderColor: 'rgba(27,42,74,0.3)',
            borderRadius: '2px', px: 3, py: 1, fontSize: 13,
            textTransform: 'none', fontFamily: '"Noto Serif JP", serif',
            '&:hover': { borderColor: '#1B2A4A', bgcolor: 'rgba(27,42,74,0.04)' },
          }}>
          Regresar
        </Button>
      </Box>
    </Container>
  );
}