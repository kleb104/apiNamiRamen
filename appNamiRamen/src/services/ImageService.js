import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ImagenController';

class ImagenService {
  getImagenProducto(idProducto) {
    return axios.get(BASE_URL + '/' + idProducto);
  }
  // Para subir imagen como archivo (multipart)
  uploadImagen(formData) {
    return axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
    });
  }
}
export default new ImagenService();