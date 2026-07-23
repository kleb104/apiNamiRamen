import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ProcesoPreparacionController';

class ProcesoService {
  getProcesos()      { return axios.get(BASE_URL); }
  getProcesoById(id) { return axios.get(BASE_URL + '/get/' + id); }
  createProceso(data) {
    return axios.post(BASE_URL, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  updateProceso(id, data) {
    return axios({
      method: 'put',
      url: BASE_URL + '/update/' + id,
      data: JSON.stringify(data),
    });
  }
  deleteProceso(id) {
    return axios.delete(BASE_URL + '/delete/' + id);
  }
}
export default new ProcesoService();