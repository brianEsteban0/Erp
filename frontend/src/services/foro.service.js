import axios from './root.service';

export const getForo = async () => {
    try {
      const response = await axios.get('/foro');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
};

export const getForoById = async (id) => {
    try {
      const response = await axios.get(`/foro/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const createForo = async (publicacion) => {
  try {
      console.log(publicacion);
      const response = await axios.post('/foro', publicacion);
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

export const updateForo = async (id, publicacion) => {
    try {
      const response = await axios.put(`/foro/${id}`, publicacion);
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

export const deleteForo= async (id) => {
    try {
      const response = await axios.delete(`/foro/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const comentar = async (id, comentario) => {
    try {
      const response = await axios.put(`/foro/comentar/${id}`, comentario);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const getMisPublicaciones = async (author) => {
  try {
      console.log(author);
      const response = await axios.get(`/foro/mispublicaciones/${author}`);
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