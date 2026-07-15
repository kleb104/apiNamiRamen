import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import MenuService from '../../services/MenuService.js';

export function MenuDisponible() {
  const [menu, setMenu]     = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    MenuService.getMenuActivo()
      .then((res) => { setMenu(res.data?.data); setLoaded(true); })
      .catch((err) => { setError(err); setLoaded(true); });
  }, []);

  if (!loaded) return <p>Cargando menú...</p>;
  if (error || !menu) return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography sx={{ color: 'text.secondary', fontFamily: '"Noto Serif JP", serif' }}>
        No hay menú disponible en este momento.
      </Typography>
    </Box>
  );

  // Agrupar por categoría
  const porCategoria = (menu.items ?? []).reduce((acc, item) => {
    const cat = item.categoria ?? 'Sin categoría';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>

      {/* Encabezado estilo menú restaurante */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography sx={{
          fontFamily: '"Noto Serif JP", serif', fontSize: 11,
          letterSpacing: '0.35em', color: '#C0392B',
          textTransform: 'uppercase', mb: 1
        }}>
          Menú disponible hoy
        </Typography>
        <Typography variant="h3" sx={{
          fontFamily: '"Noto Serif JP", serif',
          fontWeight: 700, color: '#1B2A4A', mb: 2
        }}>
          {menu.nombre_menu}
        </Typography>

        {/* Rango de disponibilidad: días, fechas y horas */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {menu.fecha_inicio && menu.fecha_fin && (
            <Chip
              label={`Fechas: ${menu.fecha_inicio} — ${menu.fecha_fin}`}
              size="small"
              sx={{ bgcolor: 'rgba(27,42,74,0.08)', color: '#1B2A4A', fontSize: 12 }}
            />
          )}
          <Chip
            label={`Horario: ${menu.hora_apertura} — ${menu.hora_cierre}`}
            size="small"
            sx={{ bgcolor: '#C0392B', color: '#fff', fontSize: 12 }}
          />
          <Chip
            label="Disponible ahora"
            size="small"
            sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, fontSize: 12 }}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: 'rgba(27,42,74,0.15)' }} />

      {/* Items agrupados por categoría */}
      {Object.entries(porCategoria).map(([categoria, items]) => (
        <Box key={categoria} sx={{ mb: 5 }}>

          {/* Nombre de categoría estilo menú */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
            <Typography sx={{
              fontFamily: '"Noto Serif JP", serif', fontSize: 13,
              fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C0392B'
            }}>
              {categoria}
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(192,57,43,0.2)' }} />
          </Box>

          {/* Items — máximo 3 campos: nombre, tipo y precio */}
          <Grid container spacing={0}>
            {items.map((item) => {
              const nombre = item.nombre_producto ?? item.nombre_combo;
              const precio = item.precio_producto  ?? item.precio_combo;
              const esCombo = !!item.id_combo;

              return (
                <Grid item xs={12} key={item.id}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    py: 1.5,
                    borderBottom: '1px dotted rgba(27,42,74,0.1)',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#1B2A4A' }}>
                        {nombre}
                      </Typography>
                      {esCombo && (
                        <Chip label="Combo" size="small"
                          sx={{ fontSize: 9, height: 16, bgcolor: '#1B2A4A', color: '#fff' }} />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 80, borderBottom: '1px dotted rgba(27,42,74,0.2)' }} />
                      <Typography sx={{ fontSize: 15, fontWeight: 700,
                                        color: '#C0392B', whiteSpace: 'nowrap' }}>
                        ₡{Number(precio).toLocaleString('es-CR')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}

      <Divider sx={{ mt: 2, mb: 3, borderColor: 'rgba(27,42,74,0.15)' }} />
      <Typography sx={{ textAlign: 'center', fontSize: 12,
                        color: 'text.secondary', fontStyle: 'italic' }}>
        Precios en colones costarricenses. Sujeto a disponibilidad.
      </Typography>
    </Container>
  );
}