import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ComboController';

class ComboService {
  getCombos() {
    return axios.get(BASE_URL);
  }
  getComboById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  createCombo(combo) {
    return axios.post(BASE_URL, JSON.stringify(combo), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  updateCombo(combo) {
    return axios({
      method: 'put',
      url: BASE_URL + '/update/' + combo.id,
      data: JSON.stringify(combo),
    });
  }
  getTodosLosCombos() {
    return axios.get(BASE_URL + '/todos');
  }
  deleteCombo(id) {
    return axios.delete(BASE_URL + '/delete/' + id);
  }
  desactivarCombo(id) {
    return axios({
      method: 'put',
      url: BASE_URL + '/desactivar/' + id,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  activarCombo(id) {
    return axios({
      method: 'put',
      url: BASE_URL + '/activar/' + id,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export default new ComboService();