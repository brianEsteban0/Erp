import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { createProyecto } from '../services/ProyectoService';
import { toast } from 'react-toastify';

function AgregarProyecto({ onProyectoAdded }) {
  const [proyectoData, setProyectoData] = useState({
    titulo: '',
    descripcion: '',
    empresa_licitante: '',
    fecha_inicio: null,
    fecha_termino: null,
    presupuesto: '',
    actividades: []
  });

  const [actividadData, setActividadData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: null,
    fecha_termino: null,
    responsable: '',
    estado: false,
  });

  const handleProyectoInputChange = (e) => {
    const { name, value } = e.target;
    setProyectoData({ ...proyectoData, [name]: value });
  };

  const handleActividadInputChange = (e) => {
    const { name, value } = e.target;
    setActividadData({ ...actividadData, [name]: value });
  };

  const handleProyectoDateChange = (date, field) => {
    setProyectoData({ ...proyectoData, [field]: date });
  };

  const handleActividadDateChange = (date, field) => {
    setActividadData({ ...actividadData, [field]: date });
  };

  const agregarActividad = () => {
    setProyectoData({
      ...proyectoData,
      actividades: [...proyectoData.actividades, actividadData]
    });
    setActividadData({
      nombre: '',
      descripcion: '',
      fecha_inicio: null,
      fecha_termino: null,
      responsable: '',
      estado: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProyecto = {
      ...proyectoData,
      fecha_inicio: format(proyectoData.fecha_inicio, 'yyyy-MM-dd'),
      fecha_termino: format(proyectoData.fecha_termino, 'yyyy-MM-dd'),
      actividades: proyectoData.actividades.map((actividad) => ({
        ...actividad,
        fecha_inicio: actividad.fecha_inicio ? format(actividad.fecha_inicio, 'yyyy-MM-dd') : null,
        fecha_termino: actividad.fecha_termino ? format(actividad.fecha_termino, 'yyyy-MM-dd') : null,
      }))
    };

    try {
      await createProyecto(formattedProyecto);
      toast.success('Proyecto agregado con éxito');
      onProyectoAdded(formattedProyecto);
    } catch (error) {
      console.error('Error al agregar el proyecto', error.response ? error.response.data : error.message);
      toast.error('Hubo un error al agregar el proyecto. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Agregar Proyecto</h3>

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={proyectoData.titulo}
          onChange={handleProyectoInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={proyectoData.descripcion}
          onChange={handleProyectoInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="empresa_licitante" className="block text-gray-700 font-medium mb-2">Empresa Licitante:</label>
        <input
          type="text"
          id="empresa_licitante"
          name="empresa_licitante"
          value={proyectoData.empresa_licitante}
          onChange={handleProyectoInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_inicio" className="block text-gray-700 font-medium mb-2">Fecha de Inicio:</label>
        <DatePicker
          selected={proyectoData.fecha_inicio}
          onChange={(date) => handleProyectoDateChange(date, 'fecha_inicio')}
          dateFormat="yyyy-MM-dd"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_termino" className="block text-gray-700 font-medium mb-2">Fecha de Término:</label>
        <DatePicker
          selected={proyectoData.fecha_termino}
          onChange={(date) => handleProyectoDateChange(date, 'fecha_termino')}
          dateFormat="yyyy-MM-dd"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="presupuesto" className="block text-gray-700 font-medium mb-2">Presupuesto:</label>
        <input
          type="number"
          id="presupuesto"
          name="presupuesto"
          value={proyectoData.presupuesto}
          onChange={handleProyectoInputChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          required
        />
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Agregar Actividad</h4>
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
            dateFormat="yyyy-MM-dd"
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_termino_actividad" className="block text-gray-700 font-medium mb-2">Fecha de Término de la Actividad:</label>
          <DatePicker
            selected={actividadData.fecha_termino}
            onChange={(date) => handleActividadDateChange(date, 'fecha_termino')}
            dateFormat="yyyy-MM-dd"
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
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-white text-black"
          >
            <option value={false}>Incompleto</option>
            <option value={true}>Completo</option>
          </select>
        </div>

        <button
          type="button"
          onClick={agregarActividad}
          className="p-2 bg-gray-600 text-white rounded-md shadow-sm w-full mt-4 hover:bg-gray-700"
        >
          Agregar Actividad
        </button>
      </div>

      <button type="submit" className="p-2 bg-gray-600 text-white rounded-md shadow-sm w-full mt-4 hover:bg-gray-700">Agregar Proyecto</button>
    </form>
  );
}

export default AgregarProyecto;
