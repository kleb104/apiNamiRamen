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
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import ProductoService from '../../services/ProductoService';
import CategoriaService from '../../services/CategoriaService';
import IngredienteService from '../../services/IngredienteService';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const productoSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),
  descripcion: yup
    .string()
    .max(500, 'La descripción no puede superar 500 caracteres'),
  precio: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es requerido')
    .positive('El precio debe ser mayor a 0')
    .max(999999, 'El precio es demasiado alto'),
  id_categoria: yup
    .number()
    .typeError('Seleccione una categoría')
    .required('La categoría es requerida'),
  imagen_url: yup
    .string()
    .url('Debe ser una URL válida (ej: https://...)')
    .nullable()
    .transform((v) => (v === '' ? null : v)),
  ingredientes: yup
    .array()
    .min(1, 'Seleccione al menos un ingrediente'),
});

FormProducto.propTypes = {
  modo: PropTypes.oneOf(['crear', 'editar']).isRequired,
};

export function FormProducto({ modo }) {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [categorias,          setCategorias]          = useState([]);
  const [ingredientes,        setIngredientes]        = useState([]);
  const [ingredientesInicial, setIngredientesInicial] = useState([]);
  const [preview,             setPreview]             = useState('');
  const [loadedData,          setLoadedData]          = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre:       '',
      descripcion:  '',
      precio:       '',
      id_categoria: '',
      imagen_url:   '',
      ingredientes: [],
      activo:       true,
    },
    resolver: yupResolver(productoSchema),
  });

  const imagenUrl = watch('imagen_url');

  useEffect(() => {
    if (imagenUrl && imagenUrl.startsWith('http')) {
      setPreview(imagenUrl);
    } else {
      setPreview('');
    }
  }, [imagenUrl]);

  // Cargar categorías e ingredientes
  useEffect(() => {
    Promise.all([
      CategoriaService.getCategorias(),
      IngredienteService.getIngredientes(),
    ]).then(([resCat, resIng]) => {
      setCategorias(resCat.data?.data ?? []);
      setIngredientes(resIng.data?.data ?? []);
      setLoadedData(true);
    }).catch((err) => console.error(err));
  }, []);

  // Precargar datos si es editar
  useEffect(() => {
    if (modo === 'editar' && id && loadedData) {
      ProductoService.getProductoById(id)
        .then((res) => {
          const raw  = res.data;
          const prod = raw?.data?.[0] ?? raw?.data ?? raw;

          setValue('nombre',       prod.nombre       ?? '');
          setValue('descripcion',  prod.descripcion  ?? '');
          setValue('precio',       prod.precio       ?? '');
          setValue('id_categoria', Number(prod.id_categoria));
          setValue('imagen_url',   prod.imagen_url   ?? '');
          setValue('activo',       prod.activo == 1);

          // Precargar ingredientes como objetos completos para el Autocomplete
          if (prod.ingredientes && prod.ingredientes.length > 0) {
            const idsProducto = prod.ingredientes.map((i) => Number(i.id));
            setValue('ingredientes', idsProducto);
            // Buscar los objetos completos en el catálogo de ingredientes
            setIngredientesInicial(
              ingredientes.filter((i) => idsProducto.includes(Number(i.id)))
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [modo, id, loadedData]);

  const onError = (errors) => console.log('Errores:', errors);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      precio:       Number(data.precio),
      id_categoria: Number(data.id_categoria),
      imagen_url:   data.imagen_url || null,
    };

    if (modo === 'crear') {
      ProductoService.getProductos()
        .then((res) => {
          const todos = res.data?.data ?? [];
          const existe = todos.find(
            (p) => p.nombre.toLowerCase() === payload.nombre.toLowerCase()
          );
          if (existe) {
            toast.error('Ya existe un producto con ese nombre', {
              duration: 4000, position: 'top-center',
            });
            return null;
          }
          return ProductoService.createProducto(payload);
        })
        .then((res) => {
          if (!res) return;
          toast.success('Producto creado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/admin/productos');
        })
        .catch(() => {
          toast.error('Error al crear el producto', {
            duration: 4000, position: 'top-center',
          });
        });
    } else {
      ProductoService.updateProducto({ ...payload, id: Number(id) })
        .then(() => {
          toast.success('Producto actualizado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/admin/productos');
        })
        .catch(() => {
          toast.error('Error al actualizar el producto', {
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
        {modo === 'crear' ? 'Crear Producto' : 'Editar Producto'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>

          {/* Nombre */}
          <Grid xs={6}>
            <Controller name="nombre" control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Nombre del producto"
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre ? errors.nombre.message : ' '}
                  variant="outlined" />
              )} />
          </Grid>

          {/* Precio */}
          <Grid xs={6}>
            <Controller name="precio" control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Precio (₡)" type="number"
                  slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                  error={Boolean(errors.precio)}
                  helperText={errors.precio ? errors.precio.message : ' '}
                  variant="outlined" />
              )} />
          </Grid>

          {/* Descripción */}
          <Grid xs={12}>
            <Controller name="descripcion" control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Descripción"
                  multiline rows={3}
                  error={Boolean(errors.descripcion)}
                  helperText={errors.descripcion ? errors.descripcion.message : ' '}
                  variant="outlined" />
              )} />
          </Grid>

          {/* Categoría */}
          <Grid xs={6}>
            <FormControl fullWidth error={Boolean(errors.id_categoria)}>
              <InputLabel id="label-categoria" shrink>Categoría</InputLabel>
              <Controller name="id_categoria" control={control}
                render={({ field }) => (
                  <Select {...field} labelId="label-categoria" label="Categoría"
                    value={field.value ?? ''} displayEmpty notched>
                    <MenuItem value=""><em style={{ color: '#aaa' }}>Seleccionar categoría...</em></MenuItem>
                    {categorias.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>{cat.nombre_categoria}</MenuItem>
                    ))}
                  </Select>
                )} />
              <FormHelperText>{errors.id_categoria ? errors.id_categoria.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Imagen URL */}
          <Grid xs={6}>
            <Controller name="imagen_url" control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="URL de la imagen"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  error={Boolean(errors.imagen_url)}
                  helperText={errors.imagen_url ? errors.imagen_url.message : ' '}
                  variant="outlined" />
              )} />
          </Grid>

          {/* Previsualización imagen */}
          {preview && (
            <Grid xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Vista previa:</Typography>
                <Box component="img" src={preview} alt="Vista previa"
                  onError={() => setPreview('')}
                  sx={{ height: 100, borderRadius: 2, objectFit: 'cover' }} />
              </Box>
            </Grid>
          )}

          {/* Ingredientes */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(errors.ingredientes)}>
                <InputLabel id="label-ingredientes" shrink>
                  Ingredientes
                </InputLabel>
                <Controller
                  name="ingredientes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="label-ingredientes"
                      label="Ingredientes"
                      multiple
                      value={field.value ?? []}
                      displayEmpty
                      notched
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em style={{ color: '#aaa' }}>Seleccionar ingredientes...</em>;
                        }
                        return ingredientes
                          .filter((i) => selected.includes(Number(i.id)))
                          .map((i) => i.nombre_ingrediente)
                          .join(', ');
                      }}
                    >
                      {ingredientes.map((ing) => (
                        <MenuItem key={ing.id} value={Number(ing.id)}>
                          <Checkbox checked={(field.value ?? []).includes(Number(ing.id))} />
                          <ListItemText primary={ing.nombre_ingrediente} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.ingredientes ? errors.ingredientes.message : ' '}
                </FormHelperText>
              </FormControl>
            </Grid>

          {/* Divider */}
          <Grid xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Botones */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained"
                sx={{ bgcolor: '#C0392B', color: '#fff', textTransform: 'none',
                      borderRadius: 1, px: 4, py: 1.25, '&:hover': { bgcolor: '#a93226' } }}>
                {modo === 'crear' ? 'Crear producto' : 'Guardar cambios'}
              </Button>
              <Button variant="outlined" startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/productos')}
                sx={{ color: '#1B2A4A', borderColor: 'rgba(27,42,74,0.3)',
                      textTransform: 'none', borderRadius: 1,
                      '&:hover': { borderColor: '#1B2A4A' } }}>
                Cancelar
              </Button>
            </Box>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}