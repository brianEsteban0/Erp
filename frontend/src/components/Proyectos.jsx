import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { getProyectos } from '../services/ProyectoService'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Proyectos = () => {
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
      toast.error('Error al cargar los proyectos.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Proyectos</h1>
      <div className="space-y-1.5">
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-shadow duration-300 ease-in-out mb-1.5"
          onClick={() => navigate('/proyectos/ver')}
        >
          Ver Proyectos
        </button>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-shadow duration-300 ease-in-out mb-1.5"
          onClick={() => navigate('/proyectos/agregar')}
        >
          Agregar Proyecto
        </button>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-shadow duration-300 ease-in-out mb-1.5"
          onClick={() => navigate('/proyectos/modificar')}
        >
          Modificar Proyecto
        </button>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-shadow duration-300 ease-in-out mb-1.5"
          onClick={() => navigate('/proyectos/agregaractividad')}
        >
          Agregar Actividad
        </button>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-shadow duration-300 ease-in-out mb-1.5"
          onClick={() => navigate('/proyectos/inventario')}
        >
          Asignar Inventario
        </button>
      </div>
    </div>
  );
}

export default Proyectos;
