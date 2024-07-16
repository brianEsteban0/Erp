import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProyecto } from '../services/ProyectoService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

function AgregarProyecto() {
  const [proyectoData, setProyectoData] = useState({
    titulo: '',
    descripcion: '',
    empresa_licitante: '',
    fecha_inicio: null,
    fecha_termino: null,
    presupuesto: '', // Nuevo campo de presupuesto
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProyectoData({ ...proyectoData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setProyectoData({ ...proyectoData, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Formatear las fechas al formato mm/dd/aa
    const formattedData = {
      ...proyectoData,
      fecha_inicio: format(proyectoData.fecha_inicio, 'MM/dd/yy'),
      fecha_termino: format(proyectoData.fecha_termino, 'MM/dd/yy'),
      presupuesto: parseFloat(proyectoData.presupuesto), // Asegurarse de que el presupuesto sea un número
    };
  
    try {
      console.log('Enviando datos del proyecto:', formattedData);
      await createProyecto(formattedData);
      alert('Proyecto agregado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al agregar el proyecto', error.response ? error.response.data : error.message);
      alert('Hubo un error al agregar el proyecto. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <h1 style={{ color: 'black' }}>Agregar Proyecto</h1>
      <form onSubmit={handleSubmit} className="add-proyecto-form">
        <div className="mb-3">
          <label htmlFor="titulo" className="text-black">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={proyectoData.titulo}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="text-black">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={proyectoData.descripcion}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empresa_licitante" className="text-black">Empresa Licitante:</label>
          <input
            type="text"
            id="empresa_licitante"
            name="empresa_licitante"
            value={proyectoData.empresa_licitante}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha_inicio" className="text-black">Fecha de Inicio:</label>
          <DatePicker
            selected={proyectoData.fecha_inicio}
            onChange={(date) => handleDateChange(date, 'fecha_inicio')}
            dateFormat="dd/MM/yy"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha_termino" className="text-black">Fecha de Término:</label>
          <DatePicker
            selected={proyectoData.fecha_termino}
            onChange={(date) => handleDateChange(date, 'fecha_termino')}
            dateFormat="dd/MM/yy"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="presupuesto" className="text-black">Presupuesto:</label>
          <input
            type="number"
            id="presupuesto"
            name="presupuesto"
            value={proyectoData.presupuesto}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="text-black">Agregar Proyecto</button>
      </form>
    </div>
  );
}

export default AgregarProyecto;
