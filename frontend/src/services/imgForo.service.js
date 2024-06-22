import axios from './root.service.js';

export const getImgForo = async (id) => {
    try {
      const response = await axios.get(`/imagen/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
        console.error('Error al encontar la imagen', error);
        alert('Error: ' + error.response.data.message); 
    }
}

export const createImgForo = async (imagen, user, titulo) => {
    try {
        const response = await axios.post(`/imagen/${user}/${titulo}`, imagen);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}
