import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { getProyectos, addActividadToProyecto } from '../services/ProyectoService';
import { toast } from 'react-toastify';

function AgregarActividad({ onActividadAdded }) {
  const [actividadData, setActividadData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: null,
    fecha_termino: null,
    responsable: '',
    estado: false,
  });

  const [proyectos, setProyectos] = useState([]);
  const [selectedProyectoId, setSelectedProyectoId] = useState('');

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectos = await getProyectos();
        setProyectos(proyectos);
      } catch (error) {
        console.error('Error al obtener los proyectos', error);
        toast.error('Error al cargar los proyectos.');
      }
    };

    fetchProyectos();
  }, []);

  const handleActividadInputChange = (e) => {
    const { name, value } = e.target;
    setActividadData({ ...actividadData, [name]: value });
  };

  const handleActividadDateChange = (date, field) => {
    setActividadData({ ...actividadData, [field]: date });
  };

  const handleProyectoChange = (e) => {
    setSelectedProyectoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedActividad = {
      ...actividadData,
      fecha_inicio: format(actividadData.fecha_inicio, 'dd/MM/yyyy'),
      fecha_termino: format(actividadData.fecha_termino, 'dd/MM/yyyy'),
    };

    try {
      await addActividadToProyecto(selectedProyectoId, formattedActividad);
      toast.success('Actividad agregada con éxito');
      onActividadAdded(formattedActividad);
    } catch (error) {
      console.error('Error al agregar la actividad', error.response ? error.response.data : error.message);
      toast.error('Hubo un error al agregar la actividad. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Agregar Actividad</h3>
      <div className="mb-4">
        <label htmlFor="proyecto" className="block text-gray-700 font-medium mb-2">Seleccionar Proyecto:</label>
        <select
          id="proyecto"
          name="proyecto"
          value={selectedProyectoId}
          onChange={handleProyectoChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
        >
          <option value="">Seleccione un proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto._id} value={proyecto._id}>
              {proyecto.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre de la Actividad:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={actividadData.nombre}
          onChange={handleActividadInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">Descripción de la Actividad:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={actividadData.descripcion}
          onChange={handleActividadInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_inicio_actividad" className="block text-gray-700 font-medium mb-2">Fecha de Inicio de la Actividad:</label>
        <DatePicker
          selected={actividadData.fecha_inicio}
          onChange={(date) => handleActividadDateChange(date, 'fecha_inicio')}
          dateFormat="dd/MM/yyyy"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_termino_actividad" className="block text-gray-700 font-medium mb-2">Fecha de Término de la Actividad:</label>
        <DatePicker
          selected={actividadData.fecha_termino}
          onChange={(date) => handleActividadDateChange(date, 'fecha_termino')}
          dateFormat="dd/MM/yyyy"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="responsable" className="block text-gray-700 font-medium mb-2">Responsable:</label>
        <input
          type="text"
          id="responsable"
          name="responsable"
          value={actividadData.responsable}
          onChange={handleActividadInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="estado" className="block text-gray-700 font-medium mb-2">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={actividadData.estado}
          onChange={handleActividadInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full text-black"
        >
          <option value={false}>Incompleto</option>
          <option value={true}>Completo</option>
        </select>
      </div>

      <button type="submit" className="p-2 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-white w-full">Agregar Actividad</button>
    </form>
  );
}

export default AgregarActividad;
