// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1B2A4A',
        color: '#fff',
        pt: 5,
        pb: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* Columna 1 - Marca */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              sx={{
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: '0.15em',
                color: '#fff',
                mb: 0.5,
              }}
            >
              NAMI
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: '0.25em',
                color: '#C0392B',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Ramen &amp; Sushi
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 220,
              }}
            >
              Cocina japonesa elaborada con ingredientes frescos y técnicas
              tradicionales. Cada plato, una experiencia.
            </Typography>
          </Grid>

          {/* Columna 2 - Navegación */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                mb: 2,
              }}
            >
              Menú
            </Typography>
            {['Ramen', 'Sushi & Rolls', 'Entradas', 'Platos Principales', 'Bebidas', 'Postres'].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{
                  display: 'block',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  mb: 0.75,
                  fontWeight: 300,
                  transition: 'color 0.2s',
                  '&:hover': { color: '#fff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Columna 3 - Contacto y horario */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                mb: 2,
              }}
            >
              Contacto
            </Typography>

            {[
              { label: 'Teléfono', value: '+506 8888-0000' },
              { label: 'Correo', value: 'info@namiramen.cr' },
              { label: 'Dirección', value: 'San José, Costa Rica' },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ mb: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    fontWeight: 500,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 300,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 2.5 }}>
              <Typography
                sx={{
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                  mb: 0.75,
                }}
              >
                Horario
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Lun – Vie: 11:00 – 21:00
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Sáb – Dom: 12:00 – 22:00
              </Typography>
            </Box>
          </Grid>

        </Grid>

        {/* Línea divisoria */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mt: 4, mb: 2.5 }} />

        {/* Pie de página */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 300,
            }}
          >
            &copy; {anio} Nami Ramen &amp; Sushi. Todos los derechos reservados.
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.2)',
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            ISW-613
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}