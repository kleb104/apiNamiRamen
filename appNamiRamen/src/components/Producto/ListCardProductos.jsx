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
  const productos = data?.data ?? [];

  return (
    <Box sx={{ py: 4, px: 3, maxWidth: 1300, mx: 'auto' }}>
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Noto Serif JP", serif',
          fontSize: 22,
          fontWeight: 700,
          color: '#1B2A4A',
          mb: 3,
        }}
      >
        Nuestro Menú
      </Typography>

      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid
            item
            key={producto.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '20rem',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 'none',
                transition: 'box-shadow 0.2s ease',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                },
              }}
            >
              {/* Imagenes */}
              <Box
                sx={{
                width: '100%',
                paddingTop: '100%', 
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#f5f5f5',
                flexShrink: 0,
              }}
            >
              <CardMedia
                component="img"
                image={producto.imagen_url || '/placeholder-food.jpg'}
                alt={producto.nombre}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
          </Box>

              {/* Contenido */}
              <CardContent sx={{ flexGrow: 1, px: 1.5, pt: 1.5, pb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#1B2A4A',
                    lineHeight: 1.3,
                    mb: 0.75,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.6em',
                  }}
                >
                  {producto.nombre}
                </Typography>
              </CardContent>

              {/* Botones — precio arriba del botón Agregar */}
              <CardActions
                sx={{
                  px: 1.5,
                  pb: 1.5,
                  pt: 0.5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 1,
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  component={Link}
                  to={`/productos/${producto.id}`}
                  sx={{
                    flex: 1,
                    fontSize: 11,
                    color: '#1B2A4A',
                    borderColor: 'rgba(27,42,74,0.25)',
                    borderRadius: 1,
                    py: 0.75,
                    textTransform: 'none',
                    '&:hover': { borderColor: '#1B2A4A', bgcolor: 'transparent' },
                  }}
                >
                  Ver detalle
                </Button>

                {/* Precio + botón Agregar apilados a la derecha */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#C0392B',
                      textAlign: 'right',
                    }}
                  >
                    ₡{Number(producto.precio).toLocaleString('es-CR')}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: '#C0392B',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 1,
                      py: 0.75,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#a93226' },
                    }}
                  >
                    Agregar
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}