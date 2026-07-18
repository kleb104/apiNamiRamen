import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ProductoController';

class ProductoService {

  getProductos() {
    return axios.get(BASE_URL + '/index');
  }

  getProductosActivos() {
    return axios.get(BASE_URL + '/activos');
  }

  getProductoById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  createProducto(producto) {
    return axios.post(BASE_URL, JSON.stringify(producto));
  }

  updateProducto(producto) {
    return axios({
      method: 'put',
      url: BASE_URL + '/update/' + producto.id,
      data: JSON.stringify(producto),
    });
  }
  
  desactivarProducto(id) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + id + '/desactivar',
    });
  }
}
export default new ProductoService();