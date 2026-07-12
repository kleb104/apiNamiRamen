import axios from 'axios';
// http://localhost:81/apiNamiRamen/ProductoController
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ProductoController';

class ProductoService {
  // GET /ProductoController → lista todos
  getProductos() {
    return axios.get(BASE_URL + '/index'); // antes llamaba a get() sin id
  }
  // GET /ProductoController/activos → solo activos
  getProductosActivos() {
    return axios.get(BASE_URL + '/activos');
  }
  // GET /ProductoController/{id} → uno con sus ingredientes
  getProductoById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  // POST /ProductoController → crear
  createProducto(producto) {
    return axios.post(BASE_URL, JSON.stringify(producto));
  }
  // PUT /ProductoController/{id} → actualizar
  updateProducto(producto) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + producto.id,
      data: JSON.stringify(producto),
    });
  }
  // PUT /ProductoController/{id}/desactivar → soft delete
  desactivarProducto(id) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + id + '/desactivar',
    });
  }
}
export default new ProductoService();