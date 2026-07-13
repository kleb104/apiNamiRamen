import React, { useState, useEffect } from 'react';
import ComboService from '../../services/ComboService';
import { ListCardCombos } from './ListCardCombos';

export function CatalogoCombos() {
  const [data, setData]     = useState(null);
  const [error, setError]   = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ComboService.getCombos()
      .then((response) => {
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

  if (!loaded) return <p>Cargando combos...</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return <>{data && <ListCardCombos data={data} />}</>;
}