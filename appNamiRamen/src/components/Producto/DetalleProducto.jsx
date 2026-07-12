import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';

export function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [error, setError]       = useState('');
  const [loaded, setLoaded]     = useState(false);

  useEffect(() => {
    // Limpiar estado al cambiar de producto
    setLoaded(false);
    setProducto(null);
    setError('');

    ProductoService.getProductoById(id)
      .then((response) => {
        console.log('Respuesta API:', response.data);
        const raw = response.data;
        // Cubre todas las estructuras posibles que puede devolver tu API
        const item = raw?.data?.[0] ?? raw?.data ?? raw;
        setProducto(item);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoaded(true);
      });
  }, [id]); // se re-ejecuta cada vez que cambia el id en la URL

  if (!loaded)  return <p>Cargando...</p>;
  if (error)    return <p>Error al cargar el producto.</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <Container component="main" sx={{ mt: 5, mb: 6 }}>
      <Grid container spacing={5} alignItems="flex-start">

        {/* Columna izquierda — imagen */}
        <Grid item xs={5}>
          <Box
            component="img"
            src={producto.imagen_url || '/placeholder-food.jpg'}
            alt={producto.nombre}
            sx={{
              width: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 3,
              display: 'block',
            }}
          />
        </Grid>

        {/* Columna derecha — información */}
        <Grid item xs={7}>

          <Chip
            label={producto.nombre_categoria ?? 'Sin categoría'}
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: '#C0392B',
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
            {producto.nombre}
          </Typography>

          <Typography
            sx={{ fontSize: 26, fontWeight: 700, color: '#C0392B', mb: 2 }}
          >
            ₡{Number(producto.precio).toLocaleString('es-CR')}
          </Typography>

          <Divider sx={{ mb: 2, borderColor: 'rgba(27,42,74,0.1)' }} />

          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: 14 }}
          >
            {producto.descripcion}
          </Typography>

          {producto.ingredientes && producto.ingredientes.length > 0 && (
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(27,42,74,0.5)',
                  mb: 1,
                }}
              >
                Ingredientes
              </Typography>
              <List dense sx={{ pt: 0 }}>
                {producto.ingredientes.map((item) => (
                  <ListItemButton key={item.id} dense disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <ArrowRightIcon sx={{ color: '#C0392B', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.nombre_ingrediente}
                      primaryTypographyProps={{ fontSize: 13, color: '#1B2A4A' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
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
                '&:hover': {
                  borderColor: '#1B2A4A',
                  bgcolor: 'rgba(27,42,74,0.04)',
                },
              }}
            >
              Regresar al menú
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}