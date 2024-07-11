import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProyecto } from '../services/ProyectoService';

function AgregarProyecto() {
  const [proyectoData, setProyectoData] = useState({
    titulo: '',
    descripcion: '',
    empresa_licitante: '',
    fecha_inicio: '',
    fecha_termino: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProyectoData({ ...proyectoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando datos del proyecto:', proyectoData);
      await createProyecto(proyectoData);
      alert('Proyecto agregado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al agregar el proyecto', error.response ? error.response.data : error.message);
      alert('Hubo un error al agregar el proyecto. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Agregar Proyecto</h1>
      <form onSubmit={handleSubmit} className="add-proyecto-form">
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título:</label>
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
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
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
          <label htmlFor="empresa_licitante" className="form-label">Empresa Licitante:</label>
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
          <label htmlFor="fecha_inicio" className="form-label">Fecha de Inicio:</label>
          <input
            type="text"
            id="fecha_inicio"
            name="fecha_inicio"
            value={proyectoData.fecha_inicio}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha_termino" className="form-label">Fecha de Término:</label>
          <input
            type="text"
            id="fecha_termino"
            name="fecha_termino"
            value={proyectoData.fecha_termino}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Agregar Proyecto</button>
      </form>
    </div>
  );
}

export default AgregarProyecto;
