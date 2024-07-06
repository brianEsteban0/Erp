import axios from './root.service';

export const getForo = async () => {
    try {
      const response = await axios.get('/foro');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
};

export const getForoById = async (id) => {
    try {
      const response = await axios.get(`/foro/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
        console.error('Error al encontar la publicacion', error);
        alert('Error: ' + error.response.data.message); 
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
      console.error(error);
      throw error;
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
      alert('Error: ' + errorMessage);
    }
}

export const deleteForo= async (id) => {
    try {
      const response = await axios.delete(`/foro/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}