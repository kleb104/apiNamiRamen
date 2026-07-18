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
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import ProcesoService from '../../services/ProcesoService';
import ProductoService from '../../services/ProductoService';
import EstacionService from '../../services/EstacionService';

const procesoSchema = yup.object({
  id_producto: yup
    .number()
    .typeError('Seleccione un producto')
    .required('El producto es requerido'),
});

FormProceso.propTypes = {
  modo: PropTypes.oneOf(['crear', 'editar']).isRequired,
};

export function FormProceso({ modo }) {
  const navigate  = useNavigate();
  const { id }    = useParams(); // id = id_producto en editar

  const [productos,  setProductos]  = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [loadedData, setLoadedData] = useState(false);

  // Filas dinámicas de estaciones: [{id_estacion, orden_paso}]
  const [filas, setFilas] = useState([{ id_estacion: '', orden_paso: 1 }]);
  const [errorFilas, setErrorFilas] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { id_producto: '' },
    resolver: yupResolver(procesoSchema),
  });

  const productoSeleccionado = watch('id_producto');

  // Cargar productos y estaciones
  useEffect(() => {
    Promise.all([
      ProductoService.getProductos(),
      EstacionService.getEstaciones(),
    ]).then(([resProd, resEst]) => {
      setProductos(resProd.data?.data  ?? []);
      setEstaciones(resEst.data?.data  ?? []);
      setLoadedData(true);
    }).catch((err) => console.error(err));
  }, []);

  // Precargar datos si es editar
  useEffect(() => {
    if (modo === 'editar' && id && loadedData) {
      setValue('id_producto', Number(id));
      ProcesoService.getProcesoById(id)
        .then((res) => {
          const proceso = res.data?.data;
          if (proceso?.estaciones?.length > 0) {
            setFilas(
              proceso.estaciones.map((e) => ({
                id_estacion: Number(e.id_estacion),
                orden_paso:  Number(e.orden_paso),
              }))
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [modo, id, loadedData]);

  // ── Handlers de filas dinámicas ──────────────────────────────────────────

  const agregarFila = () => {
    setFilas((prev) => [
      ...prev,
      { id_estacion: '', orden_paso: prev.length + 1 },
    ]);
  };

  const eliminarFila = (index) => {
    setFilas((prev) => {
      const nuevas = prev.filter((_, i) => i !== index);
      // Reordenar automáticamente
      return nuevas.map((f, i) => ({ ...f, orden_paso: i + 1 }));
    });
  };

  const cambiarEstacion = (index, id_estacion) => {
    setFilas((prev) =>
      prev.map((f, i) => (i === index ? { ...f, id_estacion } : f))
    );
  };

  const cambiarOrden = (index, orden_paso) => {
    setFilas((prev) =>
      prev.map((f, i) => (i === index ? { ...f, orden_paso: Number(orden_paso) } : f))
    );
  };

  const subirFila = (index) => {
    if (index === 0) return;
    setFilas((prev) => {
      const nuevas = [...prev];
      [nuevas[index - 1], nuevas[index]] = [nuevas[index], nuevas[index - 1]];
      return nuevas.map((f, i) => ({ ...f, orden_paso: i + 1 }));
    });
  };

  const bajarFila = (index) => {
    setFilas((prev) => {
      if (index === prev.length - 1) return prev;
      const nuevas = [...prev];
      [nuevas[index], nuevas[index + 1]] = [nuevas[index + 1], nuevas[index]];
      return nuevas.map((f, i) => ({ ...f, orden_paso: i + 1 }));
    });
  };

  // ── Validación de filas ───────────────────────────────────────────────────

  const validarFilas = () => {
    if (filas.length === 0) {
      setErrorFilas('Agregue al menos una estación');
      return false;
    }
    const sinEstacion = filas.some((f) => !f.id_estacion);
    if (sinEstacion) {
      setErrorFilas('Todas las filas deben tener una estación seleccionada');
      return false;
    }
    const ids = filas.map((f) => f.id_estacion);
    if (new Set(ids).size !== ids.length) {
      setErrorFilas('No puede repetir la misma estación');
      return false;
    }
    setErrorFilas('');
    return true;
  };

  const onError = (errors) => console.log('Errores:', errors);

  const onSubmit = (data) => {
    if (!validarFilas()) return;

    const payload = {
      id_producto: Number(data.id_producto),
      estaciones:  filas.map((f, i) => ({
        id_estacion: Number(f.id_estacion),
        orden_paso:  i + 1,
      })),
    };

    if (modo === 'crear') {
      ProcesoService.createProceso(payload)
        .then(() => {
          toast.success('Proceso creado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/procesos');
        })
        .catch(() => {
          toast.error('Error al crear el proceso', {
            duration: 4000, position: 'top-center',
          });
        });
    } else {
      ProcesoService.updateProceso(Number(id), payload)
        .then(() => {
          toast.success('Proceso actualizado correctamente', {
            duration: 4000, position: 'top-center',
          });
          navigate('/procesos');
        })
        .catch(() => {
          toast.error('Error al actualizar el proceso', {
            duration: 4000, position: 'top-center',
          });
        });
    }
  };

  return (
    <Box sx={{ py: 4, px: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography component="h2"
        sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: 22,
              fontWeight: 700, color: '#1B2A4A', mb: 3 }}>
        {modo === 'crear' ? 'Crear Proceso de Preparación' : 'Editar Proceso de Preparación'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>

          {/* Producto */}
          <Grid xs={12}>
            <FormControl fullWidth error={Boolean(errors.id_producto)}>
              <InputLabel id="label-producto" shrink>
                Producto
              </InputLabel>
              <Controller
                name="id_producto"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="label-producto"
                    label="Producto"
                    value={field.value ?? ''}
                    disabled={modo === 'editar'}
                    displayEmpty
                    notched
                  >
                    <MenuItem value="">
                      <em style={{ color: '#aaa' }}>Seleccionar producto...</em>
                    </MenuItem>
                    {productos.map((p) => (
                      <MenuItem key={p.id} value={Number(p.id)}>
                        {p.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>
                {errors.id_producto ? errors.id_producto.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Estaciones dinámicas */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',
                       alignItems: 'center', mb: 1.5 }}>
              <Typography sx={{ fontWeight: 600, color: '#1B2A4A', fontSize: 15 }}>
                Estaciones de preparación
              </Typography>
              <Button
                onClick={agregarFila}
                startIcon={<AddIcon />}
                variant="outlined"
                size="small"
                sx={{
                  color: '#1B2A4A', borderColor: 'rgba(27,42,74,0.3)',
                  textTransform: 'none', borderRadius: 1,
                }}
              >
                Agregar estación
              </Button>
            </Box>

            {errorFilas && (
              <Typography sx={{ color: '#d32f2f', fontSize: 12, mb: 1 }}>
                {errorFilas}
              </Typography>
            )}

           {filas.map((fila, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{ p: 2, mb: 1.5, borderRadius: 2,
                      borderColor: 'rgba(27,42,74,0.15)' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                  {/* Número de paso */}
                  <Box sx={{
                    width: 36, height: 36, borderRadius: '50%',
                    bgcolor: '#1B2A4A', color: '#fff',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700,
                    fontSize: 14, flexShrink: 0,
                  }}>
                    {index + 1}
                  </Box>

                  {/* Select de estación — ocupa todo el espacio disponible */}
                  <FormControl fullWidth>
                    <InputLabel>Estación</InputLabel>
                    <Select
                      value={fila.id_estacion}
                      label="Estación"
                      onChange={(e) => cambiarEstacion(index, e.target.value)}
                    >
                      {estaciones.map((est) => (
                        <MenuItem key={est.id} value={Number(est.id)}>
                          {est.nombre_estacion}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Botones */}
                  <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                    <Tooltip title="Subir">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => subirFila(index)}
                          disabled={index === 0}
                          sx={{ color: '#1B2A4A' }}
                        >
                          ▲
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Bajar">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => bajarFila(index)}
                          disabled={index === filas.length - 1}
                          sx={{ color: '#1B2A4A' }}
                        >
                          ▼
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => eliminarFila(index)}
                          disabled={filas.length === 1}
                          sx={{ color: '#C0392B' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            ))}
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
                {modo === 'crear' ? 'Crear proceso' : 'Guardar cambios'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/procesos')}
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