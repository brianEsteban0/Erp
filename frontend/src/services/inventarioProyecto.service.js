import axios from './root.service';

export const getInventarioProyecto = async () => {
    try {
      const response = await axios.get('/inventarioProyecto');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al encontrar los Inventarios Registrados';
      console.error('Error al encontrar la publicacion', error);
      throw errorMessage;
    }
};

export const getInventarioProyectoById = async (id) => {
    try {
      const response = await axios.get(`/inventarioProyecto/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al encontrar el Inventario Registrado';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const createInventarioProyecto = async (body) => {
  try {
      const response = await axios.post('/inventarioProyecto', body);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al Registrar el Inventario';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const updateInventarioProyecto = async (id, body) => {
    try {
      const response = await axios.put(`/inventarioProyecto/${id}`, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar el Registro del Inventario';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const deleteInventarioProyecto = async (id) => {
    try {
      const response = await axios.delete(`/inventarioProyecto/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al Eliminar el Registro del Inventario';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const getInventarioProyectoByProyecto = async (id) => {
    try {
      const response = await axios.get(`/inventarioProyecto/proyecto/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al encontrar el Inventario Registrado';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}

export const addCantidadToInventarioProyecto = async (id, body) => {
    try {
      const response = await axios.put(`/inventarioProyecto/add/${id}`, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || 'Error desconocido al editar la publicacion';
      console.error('Error al editar la publicacion', error);
      throw errorMessage;
    }
}