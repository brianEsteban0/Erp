import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { getProyectos } from '../services/ProyectoService'
import React, { useState, useEffect } from 'react';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const data = await getProyectos();
      if (data) {
        setProyectos(data);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Publicaciones</h1>
      <div className="mt-4">
      <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => navigate('/proyectos/ver')}
        >
          Ver Proyectos
        </button>
        <button className="btn btn-primary me-3" onClick={() => navigate('/proyectos/agregar')}>
          Agregar Proyecto
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/proyectos/modificar')}>
          Modificar Proyecto
        </button>
      </div>
    </div>
  );
}

export default Proyectos;