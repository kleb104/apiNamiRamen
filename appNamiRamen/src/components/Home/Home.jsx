import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const menuItems = [
  {
    icon: '🍜',
    nombre: 'Tonkotsu Nami',
    descripcion: 'Caldo de cerdo 18 horas, chashu, huevo marinado y nori',
    precio: '₡6,500',
  },
  {
    icon: '🍣',
    nombre: 'Omakase Roll',
    descripcion: 'Salmón, aguacate, queso crema y salsa ponzu',
    precio: '₡5,800',
  },
  {
    icon: '🥟',
    nombre: 'Gyoza Nami',
    descripcion: '6 piezas de gyoza de cerdo y jengibre con salsa ponzu',
    precio: '₡3,200',
  },
  {
    icon: '🦑',
    nombre: 'Takoyaki',
    descripcion: 'Bolitas de pulpo con salsa okonomiyaki y katsuobushi',
    precio: '₡3,600',
  },
];

const pilares = [
  {
    icon: '🌊',
    titulo: 'Autenticidad',
    texto: 'Recetas traídas directamente de Japón, sin atajos',
  },
  {
    icon: '🌿',
    titulo: 'Frescura',
    texto: 'Ingredientes locales seleccionados cada mañana',
  },
  {
    icon: '⏱️',
    titulo: 'Paciencia',
    texto: 'Caldos que se cocinan más de 18 horas sin prisa',
  },
];

export function Home() {
  return (
    <Box sx={{ overflow: 'hidden' }}>

      {/* ── HERO ── */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 420,
          bgcolor: '#1B2A4A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 6,
          overflow: 'hidden',
        }}
      >
        {/* Círculos decorativos */}
        {[400, 340].map((size, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              right: -80 + i * 30,
              top: '50%',
              transform: 'translateY(-50%)',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `${i === 0 ? 2 : 1}px solid rgba(192,57,43,${i === 0 ? 0.25 : 0.15})`,
            }}
          />
        ))}

        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 560 }}>
          <Typography
            sx={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '0.35em',
              color: '#C0392B',
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            Ramen &amp; Sushi · Cocina japonesa
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: { xs: 40, md: 52 },
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              mb: 0.5,
            }}
          >
            Nami{' '}
            <Box component="span" sx={{ color: '#C0392B' }}>
              Ramen
            </Box>
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: 14,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.2em',
              mb: 2,
            }}
          >
            波 — Donde cada plato cuenta una historia
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              fontWeight: 300,
              mb: 3,
            }}
          >
            Ingredientes frescos, caldos elaborados durante horas y sabores
            que te transportan directo a Japón.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#C0392B',
                color: '#fff',
                borderRadius: '2px',
                px: 3.5,
                py: 1.5,
                fontSize: 13,
                letterSpacing: '0.05em',
                '&:hover': { bgcolor: '#a93226' },
              }}
            >
              Ver menú completo
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
                px: 3.5,
                py: 1.5,
                fontSize: 13,
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)' },
              }}
            >
              Hacer un pedido
            </Button>
          </Box>
        </Box>

        {/* Ola inferior */}
        <Box
          component="svg"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 60 }}
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </Box>
      </Box>

      {/* ── LO MÁS PEDIDO ── */}
      <Box sx={{ py: 6, px: 3 }}>
        <Typography
          sx={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', color: '#C0392B', textTransform: 'uppercase', textAlign: 'center', mb: 0.5 }}
        >
          Nuestros favoritos
        </Typography>
        <Typography
          component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 26, fontWeight: 700, textAlign: 'center', mb: 0.5 }}
        >
          Lo más pedido
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'text.secondary', textAlign: 'center', mb: 3 }}>
          Platos que nuestros clientes piden una y otra vez
        </Typography>

        <Grid container spacing={2} sx={{ maxWidth: 640, mx: 'auto' }}>
          {menuItems.map((item) => (
            <Grid key={item.nombre} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: 'background.paper',
                  border: '0.5px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  p: 2,
                  textAlign: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Acento rojo superior */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: '#C0392B' }} />

                <Typography sx={{ fontSize: 28, mb: 1, display: 'block' }}>{item.icon}</Typography>
                <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 15, fontWeight: 700, mb: 0.5 }}>
                  {item.nombre}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5, mb: 1.5 }}>
                  {item.descripcion}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#C0392B' }}>
                  {item.precio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── FILOSOFÍA ── */}
      <Box sx={{ bgcolor: 'background.default', borderTop: '0.5px solid', borderBottom: '0.5px solid', borderColor: 'divider', py: 6, px: 3 }}>
        <Typography
          sx={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', color: '#C0392B', textTransform: 'uppercase', textAlign: 'center', mb: 0.5 }}
        >
          Por qué elegirnos
        </Typography>
        <Typography
          component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 26, fontWeight: 700, textAlign: 'center', mb: 3 }}
        >
          Nuestra filosofía
        </Typography>

        <Grid container spacing={2} sx={{ maxWidth: 600, mx: 'auto' }}>
          {pilares.map((p) => (
            <Grid key={p.titulo} size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box
                  sx={{
                    width: 44, height: 44, borderRadius: '50%',
                    bgcolor: '#1B2A4A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 1.5, fontSize: 20,
                  }}
                >
                  {p.icon}
                </Box>
                <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 14, fontWeight: 700, mb: 0.5 }}>
                  {p.titulo}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5 }}>
                  {p.texto}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── BANDA FINAL ── */}
      <Box sx={{ bgcolor: '#1B2A4A', py: 5, px: 3, textAlign: 'center' }}>
        <Typography
          component="h2"
          sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22, fontWeight: 700, color: '#fff', mb: 0.5 }}
        >
          Pedí ahora o visitanos
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 300, mb: 2.5 }}>
          También hacemos entregas a domicilio en toda la zona
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Lun – Vie · 11:00 – 21:00', 'Sáb – Dom · 12:00 – 22:00', '📞 +506 8888-0000'].map((texto) => (
            <Box
              key={texto}
              sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                px: 2, py: 0.75,
                fontSize: 12,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {texto}
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}