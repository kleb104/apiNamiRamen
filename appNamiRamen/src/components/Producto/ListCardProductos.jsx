import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

ListCardProductos.propTypes = {
  data: PropTypes.object.isRequired,
};

export function ListCardProductos({ data }) {
  // La API devuelve { error: false, data: [...] }
  const productos = data?.data ?? [];

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Noto Serif JP", serif',
          fontSize: 24,
          fontWeight: 700,
          color: '#1B2A4A',
          mb: 3,
          textAlign: 'center',
        }}
      >
        Nuestro Menú
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1100, mx: 'auto' }}>
        {productos.map((producto) => (
          <Grid key={producto.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '0.5px solid',
                borderColor: 'divider',
                borderRadius: 3,
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Acento rojo superior */}
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: '#C0392B' }} />

              <CardMedia
                component="img"
                height="180"
                image={producto.imagen_url || '/placeholder-food.jpg'}
                alt={producto.nombre}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ flexGrow: 1, pt: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"Noto Serif JP", serif',
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#1B2A4A',
                    mb: 0.5,
                  }}
                >
                  {producto.nombre}
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5, mb: 1 }}
                >
                  {producto.descripcion}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#C0392B' }}>
                  ₡{Number(producto.precio).toLocaleString('es-CR')}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  size="small"
                  component={Link}
                  to={`/productos/${producto.id}`}
                  sx={{ color: '#1B2A4A', fontSize: 12, borderColor: 'rgba(27,42,74,0.3)', '&:hover': { borderColor: '#1B2A4A' } }}
                  variant="outlined"
                >
                  Ver detalle
                </Button>
                <Button
                  size="small"
                  sx={{ ml: 'auto', bgcolor: '#C0392B', color: '#fff', fontSize: 12, '&:hover': { bgcolor: '#a93226' } }}
                  variant="contained"
                >
                  Agregar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}