import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const fetchedProjects = await getProyectos();
      setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      setSelectedProject('');
      setNewParticipants([]);
    } catch (err) {
      setError(err.message || 'Error creating assignment');
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
    <div className="bg-gray-200 p-4 mt-4 rounded-lg shadow-md">
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="projects" className="block text-gray-700">Proyectos:</label>
          <select
            id="projects"
            className="border rounded p-2 w-full mb-2"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Seleccione un proyecto</option>
            {projects.length > 0 ? (
              projects.map(project => (
                <option key={project._id} value={project._id}>{project.titulo}</option>
              ))
            ) : (
              <option value="" disabled>Cargando proyectos...</option>
            )}
          </select>
          <label htmlFor="participants" className="block text-gray-700">Participantes:</label>
          <div className="flex mb-2">
            <select
              id="participants"
              className="border rounded p-2 w-full"
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
            >
              <option value="">Seleccione un participante</option>
              {participants.length > 0 ? (
                participants.map(participant => (
                  <option key={participant._id} value={participant._id}>{participant.username}</option>
                ))
              ) : (
                <option value="" disabled>Cargando participantes...</option>
              )}
            </select>
            <button onClick={handleAddParticipant} className="bg-green-500 text-white p-2 ml-2 rounded">+</button>
          </div>
          <button onClick={handleCreateAssignment} className="bg-blue-500 text-white p-2 rounded mb-2">Guardar</button>
          <button onClick={handleViewAssignments} className="bg-green-500 text-white p-2 rounded">Ver Asignaciones</button>
        </div>
        <div className="mt-4">
          <h3 className="text-md text-black">Vista Previa</h3>
          {selectedProject && (
            <div>
              <h4 className="text-lg font-bold text-black">{projects.find(project => project._id === selectedProject)?.titulo}</h4>
              <ul className="list-disc pl-5 text-black">
                {newParticipants.map(participant => (
                  <li key={participant._id}>{participant.username}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;
