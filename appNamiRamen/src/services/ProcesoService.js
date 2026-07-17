import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ProcesoPreparacionController';

class ProcesoService {
  getProcesos()            { return axios.get(BASE_URL); }
  getProcesoById(id)       { return axios.get(BASE_URL + '/' + id); }
  createProceso(data)      { return axios.post(BASE_URL, JSON.stringify(data)); }
  updateProceso(id, data)  {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + id,
      data: JSON.stringify(data),
    });
  }
}
export default new ProcesoService();