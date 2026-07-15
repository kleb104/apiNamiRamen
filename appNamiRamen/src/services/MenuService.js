import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'MenuController';

class MenuService {
  getMenus()      { return axios.get(BASE_URL); }
  getMenuById(id) { return axios.get(BASE_URL + '/' + id); }
  getMenuActivo() { return axios.get(BASE_URL + '/activo'); }
}
export default new MenuService();