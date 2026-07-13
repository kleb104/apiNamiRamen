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
    return axios.post(BASE_URL, JSON.stringify(combo));
  }
  updateCombo(combo) {
    return axios({ method: 'put', url: BASE_URL + '/' + combo.id, data: JSON.stringify(combo) });
  }
}
export default new ComboService();