import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAvailableParticipants,
  createAssignment
} from '../services/assignment.service';
import { getProyectos } from '../services/ProyectoService';

const AssignmentForm = () => {
  const [projects, setProjects] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [newParticipants, setNewParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [error, setError] = useState(null);
  const [disabledProjects, setDisabledProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedParticipants = await getAvailableParticipants();
        setParticipants(Array.isArray(fetchedParticipants) ? fetchedParticipants : []);
        
        const fetchedProjects = await getProyectos();
        setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleCreateAssignment = async () => {
    if (!selectedProject || newParticipants.length === 0) {
      setError('Debe seleccionar un proyecto y al menos un participante');
      return;
    }

    const participantIds = newParticipants.map(participant => participant._id);

    const data = {
      Proyecto: selectedProject,
      Participantes: participantIds,
      description: 'Nueva asignación'
    };
    try {
      await createAssignment(data);
      toast.success('Se ha creado la asignación');
      setDisabledProjects([...disabledProjects, selectedProject]); // Deshabilitar el proyecto seleccionado
      setTimeout(() => {
        navigate('/lista-asignaciones');
      }, 2000); // Redirigir después de 2 segundos
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Mostrar mensaje de error específico
      } else {
        setError(err.message || 'Error creating assignment');
      }
    }
  };

  const handleAddParticipant = () => {
    if (selectedParticipant && !newParticipants.some(p => p._id === selectedParticipant)) {
      const participantObject = participants.find(p => p._id === selectedParticipant);
      setNewParticipants([...newParticipants, participantObject]);
      setParticipants(participants.filter(p => p._id !== selectedParticipant));
      setSelectedParticipant('');
    }
  };

  const handleViewAssignments = () => {
    navigate('/lista-asignaciones');
  };

  return (
    <div className="text-gray-700 bg-gray-200 p-4 mt-4 rounded-lg shadow-md">
      <ToastContainer />
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold text-black">Crear Asignación</h2>
        <button onClick={handleViewAssignments} className="bg-gray-500 text-white p-2 rounded">Ver Asignaciones</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="projects" className="block text-gray-700">Proyectos:</label>
          <select
            id="projects"
            className="border rounded p-2 w-full mb-2 text-black"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="" className="text-black">Seleccione un proyecto</option>
            {projects.length > 0 ? (
              projects.map(project => (
                <option 
                  key={project._id} 
                  value={project._id} 
                  className="text-black"
                  disabled={disabledProjects.includes(project._id)} // Deshabilitar proyectos ya asignados
                >
                  {project.titulo}
                </option>
              ))
            ) : (
              <option value="" disabled className="text-black">Cargando proyectos...</option>
            )}
          </select>
          <label htmlFor="participants" className="block text-gray-700">Participantes:</label>
          <div className="flex mb-2">
            <select
              id="participants"
              className="border rounded p-2 w-full text-black"
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
            >
              <option value="" className="text-black">Seleccione un participante</option>
              {participants.length > 0 ? (
                participants.map(participant => (
                  <option key={participant._id} value={participant._id} className="text-black">{participant.username}</option>
                ))
              ) : (
                <option value="" disabled className="text-black">Cargando participantes...</option>
              )}
            </select>
            <button onClick={handleAddParticipant} className="bg-gray-500 text-white p-2 ml-2 rounded">
              <img className="w-5 h-5" src="http://localhost:3000/uploads/add.png" alt="Añadir" />
            </button>
          </div>
          <button onClick={handleCreateAssignment} className="bg-gray-500 text-white p-2 rounded mb-2">Guardar</button>
        </div>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 mt-6">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nombre</th>
              <th className="w-3/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Participantes</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {selectedProject && (
              <tr>
                <td className="py-4 px-6 border-b border-gray-200">{projects.find(project => project._id === selectedProject)?.titulo}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <ul className="list-disc pl-5 text-black">
                    {newParticipants.map(participant => (
                      <li key={participant._id} className="text-black">{participant.username}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {newParticipants.length === 0 && !selectedProject && (
              <tr>
                <td colSpan="2" className="py-4 px-6 border-b border-gray-200 text-center">No hay participantes seleccionados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentForm;
