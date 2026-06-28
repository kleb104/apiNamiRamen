import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'UsuarioController';

class UsuarioService {
  getUsuarios() {
    return axios.get(BASE_URL);
  }
  getUsuarioById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  createUsuario(usuario) {
    return axios.post(BASE_URL, JSON.stringify(usuario));
  }
  loginUsuario(credenciales) {
    return axios.post(BASE_URL + '/login', JSON.stringify(credenciales));
  }
  updateUsuario(usuario) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + usuario.id,
      data: JSON.stringify(usuario),
    });
  }
  updatePassword(id, contrasena) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + id + '/password',
      data: JSON.stringify({ contrasena }),
    });
  }
}
export default new UsuarioService();