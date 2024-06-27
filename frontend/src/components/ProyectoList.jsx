import React, { useEffect, useState } from 'react';
import { getProyectos } from '../services/ProyectoService'; // Importamos sólo lo necesario

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

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(proyectos)) {
    return <div className="text-gray-500">No hay proyectos disponibles.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Proyectos</h2>
      <ul className="space-y-4">
        {proyectos.map((proyecto, index) => (
          <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{proyecto.titulo}</h3>
            <p><strong>Descripcion:</strong>{proyecto.descripcion}</p>
            <p><strong>Empresa Licitante:</strong> {proyecto.empresa_licitante}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(proyecto.fecha_inicio).toLocaleDateString()}</p>
            <p><strong>Fecha de Término:</strong> {new Date(proyecto.fecha_termino).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProyectoList;
