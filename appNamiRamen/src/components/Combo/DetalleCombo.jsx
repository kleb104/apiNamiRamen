import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import ComboService from '../../services/ComboService';

export function DetalleCombo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [combo, setCombo]   = useState(null);
  const [error, setError]   = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setCombo(null);
    setError('');

    ComboService.getComboById(id)
      .then((response) => {
        const raw  = response.data;
        const item = raw?.data?.[0] ?? raw?.data ?? raw;
        setCombo(item);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoaded(true);
      });
  }, [id]);

  if (!loaded)  return <p>Cargando...</p>;
  if (error)    return <p>Error al cargar el combo.</p>;
  if (!combo)   return <p>Combo no encontrado.</p>;

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'flex-start' }}>

        {/* Imagen del producto principal */}
        <Box sx={{ flex: '0 0 40%', maxWidth: '40%' }}>
          <Box
            component="img"
            src={combo.imagen_principal || '/placeholder-food.jpg'}
            alt={combo.nombre_combo}
            sx={{
              width: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 3,
              display: 'block',
            }}
          />
        </Box>

        {/* Información del combo */}
        <Box sx={{ flex: '1 1 60%' }}>
          <Chip
            label={combo.nombre_categoria ?? 'Combo'}
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: '#1B2A4A',
              color: '#fff',
              fontFamily: '"Noto Serif JP", serif',
              fontSize: 11,
              letterSpacing: '0.05em',
            }}
          />

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 700,
              color: '#1B2A4A',
              mb: 1,
              lineHeight: 1.2,
            }}
          >
            {combo.nombre_combo}
          </Typography>

          <Typography sx={{ fontSize: 26, fontWeight: 700, color: '#C0392B', mb: 2 }}>
            ₡{Number(combo.precio_especial).toLocaleString('es-CR')}
          </Typography>

          <Divider sx={{ mb: 2.5, borderColor: 'rgba(27,42,74,0.1)' }} />

          {/* Lista de productos del combo */}
          {combo.productos && combo.productos.length > 0 && (
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(27,42,74,0.5)',
                  mb: 2,
                }}
              >
                Incluye
              </Typography>

              <Grid container spacing={1.5}>
                {combo.productos.map((producto) => (
                  <Grid item key={producto.id} xs={12} sm={6}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        border: '0.5px solid',
                        borderColor: producto.es_principal ? '#C0392B' : 'divider',
                        borderRadius: 2,
                        boxShadow: 'none',
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={producto.imagen_url || '/placeholder-food.jpg'}
                        alt={producto.nombre}
                        sx={{ width: 70, height: 70, objectFit: 'cover', flexShrink: 0 }}
                      />
                      <CardContent sx={{ py: 1, px: 1.5, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1B2A4A' }}>
                            {producto.nombre}
                          </Typography>
                          {producto.es_principal == 1 && (
                            <Chip
                              label="Principal"
                              size="small"
                              sx={{ fontSize: 9, height: 16, bgcolor: '#C0392B', color: '#fff' }}
                            />
                          )}
                        </Box>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          x{producto.cantidad}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#C0392B', fontWeight: 600 }}>
                          ₡{Number(producto.precio).toLocaleString('es-CR')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#C0392B',
                color: '#fff',
                px: 4,
                py: 1.25,
                fontSize: 14,
                textTransform: 'none',
                borderRadius: '2px',
                '&:hover': { bgcolor: '#a93226' },
              }}
            >
              Agregar combo
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                color: '#1B2A4A',
                borderColor: 'rgba(27,42,74,0.3)',
                borderRadius: '2px',
                px: 3,
                py: 1,
                fontSize: 13,
                textTransform: 'none',
                fontFamily: '"Noto Serif JP", serif',
                '&:hover': { borderColor: '#1B2A4A', bgcolor: 'rgba(27,42,74,0.04)' },
              }}
            >
              Regresar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}