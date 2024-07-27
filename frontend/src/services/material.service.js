import axios from './root.service';

export const getMaterial = async () => {
    try {
      const response = await axios.get('/material');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
};

export const getMaterialById = async (id) => {
    try {
      const response = await axios.get(`/material/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
        console.error('Error al encontar el material', error);
        alert('Error: ' + error.response.data.message); 
    }
}

export const createMaterial = async (material) => {
  try {
      const response = await axios.post('/material', material);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const updateMaterial = async (id, material) => {
    try {
      const response = await axios.put(`/material/${id}`, material);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar el material';
      console.error('Error al editar el Material/Herramienta', error);
      alert('Error: ' + errorMessage);
    }
}

export const deleteMaterial= async (id) => {
    try {
      const response = await axios.delete(`/material/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}