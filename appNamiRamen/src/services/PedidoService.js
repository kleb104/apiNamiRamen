import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'PedidoController';

class PedidoService {
  getPedidos() {
    return axios.get(BASE_URL);
  }
  getPedidoById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  getPedidosByCliente(idCliente) {
    return axios.get(BASE_URL + '/cliente/' + idCliente);
  }
  getPedidosByEstado(estado) {
    return axios.get(BASE_URL + '/estado/' + estado);
  }
  createPedido(pedido) {
    return axios.post(BASE_URL, JSON.stringify(pedido));
  }
  updateEstado(id, estado_pedido) {
    return axios({
      method: 'put',
      url: BASE_URL + '/' + id + '/estado',
      data: JSON.stringify({ estado_pedido }),
    });
  }
}
export default new PedidoService();