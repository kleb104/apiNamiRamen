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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import ComboService from '../../services/ComboService';
import CategoriaService from '../../services/CategoriaService';
import ProductoService from '../../services/ProductoService';

const icon        = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const comboSchema = yup.object({
  nombre_combo: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),
  precio_especial: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es requerido')
    .positive('El precio debe ser mayor a 0')
    .max(999999, 'El precio es demasiado alto'),
  id_categoria: yup
    .number()
    .typeError('Seleccione una categoría')
    .required('La categoría es requerida'),
  productos: yup
    .array()
    .min(1, 'Seleccione al menos un producto'),
  id_producto_principal: yup
    .number()
    .typeError('Seleccione el platillo principal')
    .required('El platillo principal es requerido'),
});

FormCombo.propTypes = {
  modo: PropTypes.oneOf(['crear', 'editar']).isRequired,
};

export function FormCombo({ modo }) {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [categorias,   setCategorias]   = useState([]);
  const [productos,    setProductos]    = useState([]);
  const [loadedData,   setLoadedData]   = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre_combo:          '',
      precio_especial:       '',
      id_categoria:          '',
      productos:             [],
      id_producto_principal: '',
      activo:                true,
    },
    resolver: yupResolver(comboSchema),
  });

  const productosWatch = watch('productos');

  // Actualizar lista de productos seleccionados para el select de principal
  useEffect(() => {
    if (productos.length > 0) {
      setProductosSeleccionados(
        productos.filter((p) => (productosWatch ?? []).includes(Number(p.id)))
      );
    }
  }, [productosWatch, productos]);

  // Cargar categorías y productos
  useEffect(() => {
    Promise.all([
      CategoriaService.getCategorias(),
      ProductoService.getProductos(),
    ]).then(([resCat, resProd]) => {
      const cats  = resCat.data?.data  ?? [];
      const prods = resProd.data?.data ?? [];
      setCategorias(cats);
      setProductos(prods);

      // Bloquear categoría "Combos" automáticamente
      const catCombos = cats.find(
        (c) => c.nombre_categoria.toLowerCase() === 'combos'
      );
      if (catCombos) {
        setValue('id_categoria', Number(catCombos.id));
      }

      setLoadedData(true);
    }).catch((err) => console.error(err));
  }, []);

  // Precargar datos si es editar
  useEffect(() => {
    if (modo === 'editar' && id && loadedData) {
      ComboService.getComboById(id)
        .then((res) => {
          const raw   = res.data;
          const combo = raw?.data?.[0] ?? raw?.data ?? raw;

          setValue('nombre_combo',    combo.nombre_combo    ?? '');
          setValue('precio_especial', combo.precio_especial ?? '');
          setValue('id_categoria',    Number(combo.id_categoria));
          setValue('activo',          combo.activo == 1);

          if (combo.productos && combo.productos.length > 0) {
            const ids = combo.productos.map((p) => Number(p.id));
            setValue('productos', ids);

            // Precargar el producto principal
            const principal = combo.productos.find((p) => p.es_principal == 1);
            if (principal) {
              setValue('id_producto_principal', Number(principal.id));
            }
          }
        })
        .catch((err) => console.error(err));
    }
  }, [modo, id, loadedData]);

  const onError = (errors) => console.log('Errores:', errors);

  const onSubmit = (data) => {
    // Armar payload con productos y cuál es principal
    const productosConPrincipal = (data.productos ?? []).map((id_prod) => ({
      id_producto:  id_prod,
      es_principal: id_prod === Number(data.id_producto_principal) ? 1 : 0,
    }));

    const payload = {
      nombre_combo:    data.nombre_combo,
      precio_especial: Number(data.precio_especial),
      id_categoria:    Number(data.id_categoria),
      activo:          data.activo,
      productos:       productosConPrincipal,
    };

    if (modo === 'crear') {
      ComboService.getTodosLosCombos()
        .then((res) => {
          const todos = res.data?.data ?? [];
          const existe = todos.find(
            (c) => c.nombre_combo.toLowerCase() === payload.nombre_combo.toLowerCase()
          );
          if (existe) {
            toast.error('Ya existe un combo con ese nombre', {
              duration: 4000, position: 'top-center',
            });
            return null;
          }
          return ComboService.createCombo(payload);
        })
        .then((res) => {
          if (!res) return;
          toast.success('Combo creado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/admin/combos');
        })
        .catch(() => {
          toast.error('Error al crear el combo', {
            duration: 4000, position: 'top-center',
          });
        });
    } else {
      ComboService.updateCombo({ ...payload, id: Number(id) })
        .then(() => {
          toast.success('Combo actualizado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/admin/combos');
        })
        .catch(() => {
          toast.error('Error al actualizar el combo', {
            duration: 4000, position: 'top-center',
          });
        });
    }
  };

  // Categoría bloqueada — solo lectura
  const catCombosNombre = categorias.find(
    (c) => c.nombre_categoria.toLowerCase() === 'combos'
  )?.nombre_categoria ?? 'Combos';

  return (
    <Box sx={{ py: 4, px: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography component="h2"
        sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
              fontWeight: 700, color: '#1B2A4A', mb: 3 }}>
        {modo === 'crear' ? 'Crear Combo' : 'Editar Combo'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>

          {/* Nombre */}
          <Grid xs={12} sm={6}>
            <Controller
              name="nombre_combo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nombre del combo"
                  error={Boolean(errors.nombre_combo)}
                  helperText={errors.nombre_combo ? errors.nombre_combo.message : ' '}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Precio especial */}
          <Grid xs={12} sm={6}>
            <Controller
              name="precio_especial"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Precio especial (₡)"
                  type="number"
                  slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                  error={Boolean(errors.precio_especial)}
                  helperText={errors.precio_especial ? errors.precio_especial.message : ' '}
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Categoría bloqueada — solo lectura */}
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Categoría"
              value={catCombosNombre}
              variant="outlined"
              slotProps={{ input: { readOnly: true } }}
              sx={{
                '& .MuiInputBase-root': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
              helperText="Los combos siempre pertenecen a la categoría Combos"
            />
            {/* Campo oculto para que react-hook-form lo incluya en el payload */}
            <Controller
              name="id_categoria"
              control={control}
              render={({ field }) => <input type="hidden" {...field} />}
            />
          </Grid>

          {/* Productos */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(errors.productos)}>
                <InputLabel id="label-productos" shrink>
                  Productos del combo
                </InputLabel>
                <Controller
                  name="productos"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="label-productos"
                      label="Productos del combo"
                      multiple
                      value={field.value ?? []}
                      displayEmpty
                      notched
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // Si el principal ya no está en la lista, limpiarlo
                        const nuevosIds = e.target.value;
                        const principalActual = watch('id_producto_principal');
                        if (principalActual && !nuevosIds.includes(principalActual)) {
                          setValue('id_producto_principal', '');
                        }
                      }}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em style={{ color: '#aaa' }}>Seleccionar productos...</em>;
                        }
                        return productos
                          .filter((p) => selected.includes(Number(p.id)))
                          .map((p) => p.nombre)
                          .join(', ');
                      }}
                    >
                      {productos.map((p) => (
                        <MenuItem key={p.id} value={Number(p.id)}>
                          <Checkbox checked={(field.value ?? []).includes(Number(p.id))} />
                          <ListItemText primary={p.nombre} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.productos ? errors.productos.message : ' '}
                </FormHelperText>
              </FormControl>
            </Grid>

          {/* Platillo principal — solo aparece si hay productos seleccionados */}
          {productosSeleccionados.length > 0 && (
            <Grid xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.id_producto_principal)}>
                <InputLabel id="label-principal">Platillo principal</InputLabel>
                <Controller
                  name="id_producto_principal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="label-principal"
                      label="Platillo principal"
                      value={field.value ?? ''}
                    >
                      {productosSeleccionados.map((p) => (
                        <MenuItem key={p.id} value={Number(p.id)}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {p.nombre}
                            <Chip
                              label="Principal"
                              size="small"
                              sx={{ fontSize: 9, height: 16,
                                    bgcolor: '#C0392B', color: '#fff' }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.id_producto_principal
                    ? errors.id_producto_principal.message
                    : 'Este producto dará la imagen representativa al combo'}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}

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
                {modo === 'crear' ? 'Crear combo' : 'Guardar cambios'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/combos')}
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