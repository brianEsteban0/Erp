import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPublicacion } from '../services/ProyectoService';

function AgregarPublicacion() {
  const [publicacionData, setPublicacionData] = useState({
    titulo: '',
    descripcion: '',
    empresa_licitante: '',
    fecha_inicio: '',
    fecha_termino: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublicacionData({ ...publicacionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPublicacion(publicacionData);
      alert('Publicación agregada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al agregar la publicación', error);
      alert('Hubo un error al agregar la publicación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Agregar Publicación</h1>
      <form onSubmit={handleSubmit} className="add-publicacion-form">
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={publicacionData.titulo}
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
            value={publicacionData.descripcion}
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
            value={publicacionData.empresa_licitante}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha_inicio" className="form-label">Fecha de Inicio:</label>
          <input
            type="date"
            id="fecha_inicio"
            name="fecha_inicio"
            value={publicacionData.fecha_inicio}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fecha_termino" className="form-label">Fecha de Término:</label>
          <input
            type="date"
            id="fecha_termino"
            name="fecha_termino"
            value={publicacionData.fecha_termino}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Agregar Proyecto</button>
      </form>
    </div>
  );
}

export default AgregarPublicacion;
