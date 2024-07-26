import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/proyectos';

export async function getProyectos() {
  const response = await fetch(`${BASE_URL}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const { data } = await response.json();
  return data;
}

// ProyectoService.js

export const updateActividadEstado = async (proyectoId, actividadIndex, newEstado) => {
  try {
    const response = await fetch(`${BASE_URL}/${proyectoId}/actividades/${actividadIndex}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: newEstado }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado de la actividad');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function updateProyecto(id, datos) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data; // Devuelve directamente los datos sin comprobar el estado
  } catch (error) {
    console.error('Error updating publication:', error);
    throw error;
  }
}


export const deleteProyecto = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el proyecto');
  }
};

export const obtenerProyectoById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`El proyecto con ID ${id} no fue encontrado`);
    } else {
      console.error('Error al obtener la publicación', error);
    }
    throw error;
  }
};


export const createProyecto = async (proyectoData) => {
  try {
    console.log('Datos enviados al backend:', proyectoData);
    const response = await axios.post(BASE_URL, proyectoData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating proyecto:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addActividadToProyecto = async (proyectoId, actividad) => {
  try {
    const response = await axios.post(`${BASE_URL}/proyectos/${proyectoId}/actividades`, actividad);
    return response.data;
  } catch (error) {
    console.error('Error al agregar la actividad', error);
    throw error;
  }
};
