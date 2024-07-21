import React, { useEffect, useState } from 'react';
import { getProyectos } from '../services/ProyectoService';
import { toast } from 'react-toastify';

const ProyectoList = () => {
  const [proyectos, setProyectos] = useState([]);
  const [filteredProyectos, setFilteredProyectos] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProyectos();
        setProyectos(data);
        setFilteredProyectos(data);
      } catch (error) {
        setError(error.message);
        toast.error('Error al cargar los proyectos.');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    filterProyectos();
  }, [searchTerm, sortOrder, proyectos]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filterProyectos = () => {
    let filtered = proyectos.filter(proyecto =>
      proyecto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.fecha_inicio.split('/').reverse().join('-'));
      const dateB = new Date(b.fecha_inicio.split('/').reverse().join('-'));
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredProyectos(filtered);
  };

  const calculateProgress = (actividades) => {
    const total = actividades.length;
    const completed = actividades.filter(actividad => actividad.estado).length;
    return (completed / total) * 100;
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(proyectos)) {
    return <div className="text-gray-500">No hay proyectos disponibles.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Lista de Proyectos</h2>
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
        />
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700"
        >
          <option value="asc">Fecha de inicio ascendente</option>
          <option value="desc">Fecha de inicio descendente</option>
        </select>
      </div>
      <ul className="space-y-6">
        {filteredProyectos.map((proyecto, index) => (
          <li key={index} className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{proyecto.titulo}</h3>
            <p className="text-gray-700 mb-2"><strong>Descripción:</strong> {proyecto.descripcion}</p>
            <p className="text-gray-700 mb-2"><strong>Empresa Licitante:</strong> {proyecto.empresa_licitante}</p>
            <p className="text-gray-700 mb-2"><strong>Fecha de Inicio:</strong> {formatDate(proyecto.fecha_inicio)}</p>
            <p className="text-gray-700 mb-2"><strong>Fecha de Término:</strong> {formatDate(proyecto.fecha_termino)}</p>
            <p className="text-gray-700 mb-4"><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
            <div>
              <h4 className="text-lg font-medium text-blue-900 mb-2">Actividades:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {proyecto.actividades.map((actividad, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
                    <p className="text-gray-700"><strong>Nombre:</strong> {actividad.nombre}</p>
                    <p className="text-gray-700"><strong>Descripción:</strong> {actividad.descripcion}</p>
                    <p className="text-gray-700"><strong>Fecha de Inicio:</strong> {formatDate(actividad.fecha_inicio)}</p>
                    <p className="text-gray-700"><strong>Fecha de Término:</strong> {formatDate(actividad.fecha_termino)}</p>
                    <p className="text-gray-700"><strong>Responsable:</strong> {actividad.responsable}</p>
                    <p className="text-gray-700"><strong>Estado:</strong> {actividad.estado ? 'Completado' : 'No completado'}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Progreso
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {calculateProgress(proyecto.actividades).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${calculateProgress(proyecto.actividades)}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProyectoList;
