import axios from './root.service';

export const getAlmacen = async () => {
    try {
      const response = await axios.get('/almacen');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
};

export const getAlmacenById = async (id) => {
    try {
      const response = await axios.get(`/almacen/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
        console.error('Error al encontar el almacen', error);
        alert('Error: ' + error.response.data.message); 
    }
}

export const createAlmacen = async (publicacion) => {
  try {
      console.log(publicacion);
      const response = await axios.post('/almacen', publicacion);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const updateAlmacen = async (id, publicacion) => {
    try {
      const response = await axios.put(`/almacen/${id}`, publicacion);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar el almacen';
      console.error('Error al editar El almacen', error);
      alert('Error: ' + errorMessage);
    }
}

export const deleteAlmacen= async (id) => {
    try {
      const response = await axios.delete(`/almacen/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}