import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import MenuService from '../../services/MenuService';
import ProductoService from '../../services/ProductoService';
import ComboService from '../../services/ComboService';

const icon        = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const menuSchema = yup.object({
  nombre_menu: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  fecha_inicio: yup
    .string()
    .required('La fecha de inicio es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
  fecha_fin: yup
    .string()
    .required('La fecha de fin es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido')
    .test(
      'fecha-fin-mayor',
      'La fecha de fin no puede ser menor que la de inicio',
      function (value) {
        const { fecha_inicio } = this.parent;
        if (!fecha_inicio || !value) return true;
        return value >= fecha_inicio;
      }
    ),
  hora_apertura: yup
    .string()
    .required('La hora de apertura es requerida')
    .matches(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
  hora_cierre: yup
    .string()
    .required('La hora de cierre es requerida')
    .matches(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)')
    .test(
      'hora-cierre-mayor',
      'La hora de cierre no puede ser menor que la de apertura',
      function (value) {
        const { hora_apertura } = this.parent;
        if (!hora_apertura || !value) return true;
        return value > hora_apertura;
      }
    ),
});

FormMenu.propTypes = {
  modo: PropTypes.oneOf(['crear', 'editar']).isRequired,
};

export function FormMenu({ modo }) {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [productos,  setProductos]  = useState([]);
  const [combos,     setCombos]     = useState([]);
  const [loadedData, setLoadedData] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre_menu:  '',
      fecha_inicio: '',
      fecha_fin:    '',
      hora_apertura: '',
      hora_cierre:   '',
      productos:    [],
      combos:       [],
      activo:       false,
    },
    resolver: yupResolver(menuSchema),
  });

  // Cargar productos y combos
  useEffect(() => {
    Promise.all([
      ProductoService.getProductos(),
      ComboService.getTodosLosCombos(),
    ]).then(([resProd, resComb]) => {
      setProductos(resProd.data?.data  ?? []);
      setCombos(resComb.data?.data     ?? []);
      setLoadedData(true);
    }).catch((err) => console.error(err));
  }, []);

  // Precargar datos si es editar
  useEffect(() => {
    if (modo === 'editar' && id && loadedData) {
      MenuService.getMenuById(id)
        .then((res) => {
          const raw  = res.data;
          const menu = raw?.data?.[0] ?? raw?.data ?? raw;

          setValue('nombre_menu',   menu.nombre_menu   ?? '');
          setValue('hora_apertura', menu.hora_apertura?.slice(0, 5) ?? '');
          setValue('hora_cierre',   menu.hora_cierre?.slice(0, 5)   ?? '');
          setValue('fecha_inicio',  menu.fecha_inicio  ?? '');
          setValue('fecha_fin',     menu.fecha_fin     ?? '');
          setValue('activo',        menu.activo == 1);

          // Precargar productos y combos del menú
          if (menu.items && menu.items.length > 0) {
            const idsProductos = menu.items
              .filter((i) => i.id_producto)
              .map((i) => Number(i.id_producto));
            const idsCombos = menu.items
              .filter((i) => i.id_combo)
              .map((i) => Number(i.id_combo));
            setValue('productos', idsProductos);
            setValue('combos',    idsCombos);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [modo, id, loadedData]);

  const onError = (errors) => console.log('Errores:', errors);

  const onSubmit = (data) => {
    // Construir items del menú
    const items = [
      ...(data.productos ?? []).map((id_prod) => ({ id_producto: id_prod, id_combo: null })),
      ...(data.combos    ?? []).map((id_comb) => ({ id_producto: null, id_combo: id_comb })),
    ];

    const payload = {
      nombre_menu:   data.nombre_menu,
      fecha_inicio:  data.fecha_inicio,
      fecha_fin:     data.fecha_fin,
      hora_apertura: data.hora_apertura + ':00',
      hora_cierre:   data.hora_cierre   + ':00',
      activo:        data.activo,
      creado_por:    1, // id del admin — ajustá según tu sistema de sesión
      items,
    };

    if (modo === 'crear') {
      MenuService.createMenu(payload)
        .then(() => {
          toast.success('Menú creado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/menus');
        })
        .catch(() => {
          toast.error('Error al crear el menú', {
            duration: 4000, position: 'top-center',
          });
        });
    } else {
      MenuService.updateMenu({ ...payload, id: Number(id) })
        .then(() => {
          toast.success('Menú actualizado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/menus');
        })
        .catch(() => {
          toast.error('Error al actualizar el menú', {
            duration: 4000, position: 'top-center',
          });
        });
    }
  };

  return (
    <Box sx={{ py: 4, px: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography component="h2"
        sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
              fontWeight: 700, color: '#1B2A4A', mb: 3 }}>
        {modo === 'crear' ? 'Crear Menú' : 'Editar Menú'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>

          {/* Nombre */}
          <Grid xs={12}>
            <Controller
              name="nombre_menu"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nombre del menú"
                  error={Boolean(errors.nombre_menu)}
                  helperText={errors.nombre_menu ? errors.nombre_menu.message : ' '}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Rango de fechas */}
          <Grid xs={12}>
            <Typography sx={{ fontSize: 13, fontWeight: 600,
                              color: 'rgba(27,42,74,0.6)', mb: 1,
                              letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Rango de fechas
            </Typography>
          </Grid>

          <Grid xs={12} sm={6}>
            <Controller
            name="fecha_inicio"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                fullWidth
                label="Fecha de inicio"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.fecha_inicio)}
                helperText={errors.fecha_inicio ? errors.fecha_inicio.message : ' '}
                variant="outlined"
                />
            )}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <Controller
            name="fecha_fin"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                fullWidth
                label="Fecha de fin"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.fecha_fin)}
                helperText={errors.fecha_fin ? errors.fecha_fin.message : ' '}
                variant="outlined"
                />
            )}
            />
          </Grid>

          {/* Rango de horas */}
          <Grid xs={12}>
            <Typography sx={{ fontSize: 13, fontWeight: 600,
                              color: 'rgba(27,42,74,0.6)', mb: 1,
                              letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Rango de horas
            </Typography>
          </Grid>

          <Grid xs={12} sm={6}>
            <Controller
            name="hora_apertura"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                fullWidth
                label="Hora de apertura"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.hora_apertura)}
                helperText={errors.hora_apertura ? errors.hora_apertura.message : ' '}
                variant="outlined"
                />
            )}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <Controller
            name="hora_cierre"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                fullWidth
                label="Hora de cierre"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                error={Boolean(errors.hora_cierre)}
                helperText={errors.hora_cierre ? errors.hora_cierre.message : ' '}
                variant="outlined"
                />
            )}
            />
          </Grid>

          {/* Productos */}
          <Grid xs={12}>
            <Controller
              name="productos"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={productos}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.nombre ?? ''}
                  isOptionEqualToValue={(option, value) =>
                    Number(option.id) === Number(value.id)
                  }
                  value={
                    productos.filter((p) =>
                      (field.value ?? []).includes(Number(p.id))
                    )
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue.map((p) => Number(p.id)));
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.nombre}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Productos del menú"
                      placeholder="Seleccionar productos..."
                      variant="outlined"
                      helperText=" "
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Combos */}
          <Grid xs={12}>
            <Controller
              name="combos"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={combos}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.nombre_combo ?? ''}
                  isOptionEqualToValue={(option, value) =>
                    Number(option.id) === Number(value.id)
                  }
                  value={
                    combos.filter((c) =>
                      (field.value ?? []).includes(Number(c.id))
                    )
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue.map((c) => Number(c.id)));
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.nombre_combo}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Combos del menú"
                      placeholder="Seleccionar combos..."
                      variant="outlined"
                      helperText=" "
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Divider */}
          <Grid xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Botones */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#C0392B', color: '#fff',
                  textTransform: 'none', borderRadius: 1,
                  px: 4, py: 1.25,
                  '&:hover': { bgcolor: '#a93226' },
                }}
              >
                {modo === 'crear' ? 'Crear menú' : 'Guardar cambios'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/menus')}
                sx={{
                  color: '#1B2A4A', borderColor: 'rgba(27,42,74,0.3)',
                  textTransform: 'none', borderRadius: 1,
                  '&:hover': { borderColor: '#1B2A4A' },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}