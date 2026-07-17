import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'IngredienteController';

class IngredienteService {
  getIngredientes() {
    return axios.get(BASE_URL);
  }
  getIngredienteById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
}
export default new IngredienteService();