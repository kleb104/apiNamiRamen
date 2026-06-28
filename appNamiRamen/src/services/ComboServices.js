import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ComboController';

class ComboService {
  // GET /ComboController → lista todos (con categoría)
  getCombos() {
    return axios.get(BASE_URL);
  }
  // GET /ComboController/{id} → uno con sus productos incluidos
  getComboById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  // POST /ComboController → crear (acepta productos[] en el body)
  createCombo(combo) {
    return axios.post(BASE_URL, JSON.stringify(combo));
  }
  // PUT /ComboController/{id} → actualizar
  updateCombo(combo) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + combo.id,
      data: JSON.stringify(combo),
    });
  }
}
export default new ComboService();