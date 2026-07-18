import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'MenuController';

class MenuService {
  getMenus()          { return axios.get(BASE_URL); }
  getMenuById(id)     { return axios.get(BASE_URL + '/get/' + id); }
  getMenuActivo()     { return axios.get(BASE_URL + '/activo'); }
  createMenu(data)    { return axios.post(BASE_URL, JSON.stringify(data)); }
  updateMenu(data) {
    return axios({
      method: 'put',
      url: BASE_URL + '/update/' + data.id,
      data: JSON.stringify(data),
    });
  }
}
export default new MenuService();