import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home }              from './components/Home/Home';
import { PageNotFound }      from './components/Home/PageNotFound';
import { CatalogoProductos } from './components/Producto/CatalogoProductos';
import { DetalleProducto }   from './components/Producto/DetalleProducto';
import TablaProductos        from './components/Producto/TablaProductos';
import { FormProducto }      from './components/Producto/FormProducto';
import { CatalogoCombos } from './components/Combo/CatalogoCombos';
import { DetalleCombo }   from './components/Combo/DetalleCombo';
import TablaAdminCombos from './components/Combo/TablaAdminCombos';
import { FormCombo }    from './components/Combo/FormCombo';
import { ListadoMenus }    from './components/Menu/ListadoMenus';
import { MenuDisponible }  from './components/Menu/MenuDisponible';
import { ListadoProceso } from './components/Proceso/ListadoProceso';
import { DetalleProceso }  from './components/Proceso/DetalleProceso';
import { FormProceso } from './components/Proceso/FormProceso';
import { FormMenu } from './components/Menu/FormMenu';

const rutas = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true,               element: <Home />                                  },
      { path: '/productos',        element: <CatalogoProductos />                     },
      { path: '/productos/:id',    element: <DetalleProducto />                       },
      { path: '/admin/productos',           element: <TablaProductos />               },
      { path: '*',                 element: <PageNotFound />                          },
      { path: '/combos',           element: <CatalogoCombos />                        },
      { path: '/combos/:id',       element: <DetalleCombo />                          },
      { path: '/menus',           element: <ListadoMenus />                           },
      { path: '/menu-disponible', element: <MenuDisponible />                         },
      { path: '/procesos',        element: <ListadoProceso />                         },
      { path: '/procesos/:id',    element: <DetalleProceso />                         },
      { path: '/admin/combos',            element: <TablaAdminCombos />               },
      { path: '/admin/productos/crear',     element: <FormProducto modo="crear" />    },
      { path: '/admin/productos/editar/:id', element: <FormProducto modo="editar" />  },
      { path: '/admin/combos/crear',      element: <FormCombo modo="crear" />         },
      { path: '/admin/combos/editar/:id', element: <FormCombo modo="editar" />        },
      { path: '/procesos/crear',      element: <FormProceso modo="crear" />           },
      { path: '/procesos/editar/:id', element: <FormProceso modo="editar" />          },
      { path: '/menus/crear',      element: <FormMenu modo="crear" />                 },
      { path: '/menus/editar/:id', element: <FormMenu modo="editar" />                },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
);