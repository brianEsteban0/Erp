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

export const updateProyecto = async (id, proyecto) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(proyecto)
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el proyecto');
  }
  return response.json();
};

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

export const createPublicacion = async (publicacion) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, publicacion);
    return response.data;
  } catch (error) {
    console.error('Error al crear la publicación', error);
    throw error;
  }
};
