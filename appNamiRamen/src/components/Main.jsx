import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home }               from './components/Home/Home';
import { PageNotFound }       from './components/Home/PageNotFound';
import { CatalogoProductos }  from './components/Producto/CatalogoProductos';
import { DetalleProducto }    from './components/Producto/DetalleProducto';
import TablaProductos         from './components/Producto/TablaProductos';

const rutas = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true,                        element: <Home />              },
      { path: '/productos',                 element: <CatalogoProductos /> },
      { path: '/productos/:id',             element: <DetalleProducto />   },
      { path: '/admin/productos',           element: <TablaProductos />    },
      { path: '*',                          element: <PageNotFound />      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
);