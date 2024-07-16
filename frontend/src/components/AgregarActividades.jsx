import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { getProyectos, addActividadToProyecto } from '../services/ProyectoService';

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
      fecha_inicio: format(actividadData.fecha_inicio, 'dd/MM HH:mm'),
      fecha_termino: format(actividadData.fecha_termino, 'dd/MM HH:mm'),
    };

    try {
      console.log('Enviando actividad:', formattedActividad, 'al proyecto:', selectedProyectoId);
      await addActividadToProyecto(selectedProyectoId, formattedActividad);
      alert('Actividad agregada con éxito');
      onActividadAdded(formattedActividad);
    } catch (error) {
      console.error('Error al agregar la actividad', error.response ? error.response.data : error.message);
      alert('Hubo un error al agregar la actividad. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-actividad-form">
      <h3 style={{ color: 'black' }}>Agregar Actividad</h3>
      <div className="mb-3">
        <label htmlFor="proyecto" className="text-black">Seleccionar Proyecto:</label>
        <select
          id="proyecto"
          name="proyecto"
          value={selectedProyectoId}
          onChange={handleProyectoChange}
          className="form-control"
        >
          <option value="">Seleccione un proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto._id} value={proyecto._id}>
              {proyecto.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="nombre" className="text-black">Nombre de la Actividad:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={actividadData.nombre}
          onChange={handleActividadInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="text-black">Descripción de la Actividad:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={actividadData.descripcion}
          onChange={handleActividadInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fecha_inicio_actividad" className="text-black">Fecha de Inicio de la Actividad:</label>
        <DatePicker
          selected={actividadData.fecha_inicio}
          onChange={(date) => handleActividadDateChange(date, 'fecha_inicio')}
          dateFormat="dd/MM/yy"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fecha_termino_actividad" className="text-black">Fecha de Término de la Actividad:</label>
        <DatePicker
          selected={actividadData.fecha_termino}
          onChange={(date) => handleActividadDateChange(date, 'fecha_termino')}
          dateFormat="dd/MM/yy"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="responsable" className="text-black">Responsable:</label>
        <input
          type="text"
          id="responsable"
          name="responsable"
          value={actividadData.responsable}
          onChange={handleActividadInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="estado" className="text-black">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={actividadData.estado}
          onChange={handleActividadInputChange}
          className="form-control"
        >
          <option value={false}>Incompleto</option>
          <option value={true}>Completo</option>
        </select>
      </div>

      <button type="submit" className="text-black mb-3">Agregar Actividad</button>
    </form>
  );
}

export default AgregarActividad;
