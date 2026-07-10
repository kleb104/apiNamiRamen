import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';

export function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]     = useState(null);
  const [error, setError]   = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProductoService.getProductoById(id)
      .then((response) => {
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error)   return <p>Error: {error.message}</p>;

  // La API devuelve { error: false, data: { ...producto, ingredientes: [...] } }
  const producto = data?.data ?? data;

  return (
    <Container component="main" sx={{ mt: 6, mb: 4 }}>
      {producto && (
        <Grid container spacing={4}>

          {/* Imagen */}
          <Grid size={5}>
            <Box
              component="img"
              src={producto.imagen_url || '/placeholder-food.jpg'}
              alt={producto.nombre}
              sx={{ borderRadius: '4%', maxWidth: '100%', height: 'auto' }}
            />
          </Grid>

          {/* Información */}
          <Grid size={7}>
            {/* Categoría */}
            <Chip
              label={producto.nombre_categoria}
              size="small"
              sx={{ mb: 1.5, bgcolor: '#C0392B', color: '#fff', fontFamily: '"Noto Serif JP", serif' }}
            />

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 700, color: '#1B2A4A' }}
            >
              {producto.nombre}
            </Typography>

            <Typography variant="h5" sx={{ color: '#C0392B', fontWeight: 600, mb: 2 }}>
              ₡{Number(producto.precio).toLocaleString('es-CR')}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {producto.descripcion}
            </Typography>

            {/* Ingredientes */}
            {producto.ingredientes && producto.ingredientes.length > 0 && (
              <Typography component="span" variant="subtitle1">
                <Box fontWeight="bold" sx={{ mb: 1, color: '#1B2A4A' }}>
                  Ingredientes:
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt: 0 }}>
                  {producto.ingredientes.map((item) => (
                    <ListItemButton key={item.id} dense>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <ArrowRightIcon sx={{ color: '#C0392B' }} />
                      </ListItemIcon>
                      <ListItemText primary={item.nombre_ingrediente} />
                    </ListItemButton>
                  ))}
                </List>
              </Typography>
            )}
          </Grid>
        </Grid>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ bgcolor: '#1B2A4A', '&:hover': { bgcolor: '#152236' } }}
        >
          Regresar
        </Button>
      </Box>
    </Container>
  );
}