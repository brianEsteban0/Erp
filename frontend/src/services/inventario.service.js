import axios from './root.service';

export const getInventario = async () => {
    try {
      const response = await axios.get('/cantidad');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
};

export const getInventarioById = async (id) => {
    try {
      const response = await axios.get(`/cantidad/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const createInventario = async (publicacion) => {
  try {
      const response = await axios.post('/cantidad', publicacion);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const updateInventario = async (id, publicacion) => {
    try {
      const response = await axios.put(`/cantidad/${id}`, publicacion);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const deleteInventario = async (id) => {
    try {
      const response = await axios.delete(`/cantidad/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const sumarInventario = async (id, body) => {
    try {
      const response = await axios.put(`/cantidad/sumar/${id}`, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const restarInventario = async (id, body) => {
    try {
      const response = await axios.put(`/cantidad/restar/${id}`, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}