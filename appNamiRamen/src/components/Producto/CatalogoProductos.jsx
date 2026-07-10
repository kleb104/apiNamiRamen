import React, { useState, useEffect } from 'react';
import ProductoService from '../../services/ProductoService';
import { ListCardProductos } from './ListCardProductos';

export function CatalogoProductos() {
  const [data, setData]     = useState(null);
  const [error, setError]   = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProductoService.getProductosActivos()
      .then((response) => {
        console.log(response);
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof SyntaxError) {
          setError(error);
          setLoaded(false);
        }
      });
  }, []);

  if (!loaded) return <p>Cargando productos...</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <>
      {data && <ListCardProductos data={data} />}
    </>
  );
}