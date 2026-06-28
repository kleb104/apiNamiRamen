import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'CategoriaController';

class CategoriaService {
  getCategorias() {
    return axios.get(BASE_URL);
  }
  getCategoriaById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  createCategoria(categoria) {
    return axios.post(BASE_URL, JSON.stringify(categoria));
  }
  updateCategoria(categoria) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + categoria.id,
      data: JSON.stringify(categoria),
    });
  }
}
export default new CategoriaService();