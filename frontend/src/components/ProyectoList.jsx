import React, { useEffect, useState } from 'react';
import { getProyectos } from '../services/ProyectoService';

function ProyectoList() {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProyectos();
        setProyectos(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(proyectos)) {
    return <div className="text-gray-500">No hay proyectos disponibles.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-black font-bold mb-4">Lista de Proyectos</h2>
      <ul className="space-y-6">
        {proyectos.map((proyecto, index) => (
          <li key={index} className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-black font-semibold mb-2">{proyecto.titulo}</h3>
            <p className="text-gray-700 mb-2"><strong>Descripción:</strong> {proyecto.descripcion}</p>
            <p className="text-gray-700 mb-2"><strong>Empresa Licitante:</strong> {proyecto.empresa_licitante}</p>
            <p className="text-gray-700 mb-2"><strong>Fecha de Inicio:</strong> {formatDate(proyecto.fecha_inicio)}</p>
            <p className="text-gray-700 mb-2"><strong>Fecha de Término:</strong> {formatDate(proyecto.fecha_termino)}</p>
            <p className="text-gray-700 mb-4"><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
            <div>
              <h4 className="text-black font-medium mb-2">Actividades:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {proyecto.actividades.map((actividad, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
                    <p className="text-gray-700"><strong>Nombre:</strong> {actividad.nombre}</p>
                    <p className="text-gray-700"><strong>Descripción:</strong> {actividad.descripcion}</p>
                    <p className="text-gray-700"><strong>Fecha de Inicio:</strong> {formatDate(actividad.fecha_inicio)}</p>
                    <p className="text-gray-700"><strong>Fecha de Término:</strong> {formatDate(actividad.fecha_termino)}</p>
                    <p className="text-gray-700"><strong>Responsable:</strong> {actividad.responsable}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProyectoList;
