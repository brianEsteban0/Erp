import React, { useState, useEffect } from 'react';
import { getAvailableParticipants } from '../services/assignment.service';

const AssignmentEdit = ({ assignment, onClose, onUpdate }) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [error, setError] = useState(null);
  const [newParticipant, setNewParticipant] = useState('');

  useEffect(() => {
    setSelectedParticipants(assignment.Participantes);
    const fetchParticipants = async () => {
      try {
        const data = await getAvailableParticipants();
        setAvailableParticipants(data);
      } catch (err) {
        setError('Error al obtener los participantes disponibles');
      }
    };

    fetchParticipants();
  }, [assignment]);

  const handleAddParticipant = () => {
    if (newParticipant) {
      const selectedParticipantObject = availableParticipants.find(p => p._id === newParticipant);
      setSelectedParticipants([...selectedParticipants, selectedParticipantObject]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (participantId) => {
    setSelectedParticipants(selectedParticipants.filter(p => p._id !== participantId));
  };

  const handleUpdate = () => {
    const updatedAssignment = {
      ...assignment,
      Proyecto: assignment.Proyecto?._id?.toString() || '', // Asegurarse de que Proyecto sea un string
      Participantes: selectedParticipants.map(p => p._id),
    };
    onUpdate(updatedAssignment);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Editar Asignación</h2>
        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Participantes:</label>
          <ul className="list-disc pl-5 mb-2">
            {selectedParticipants.map(participant => (
              <li key={participant._id} className="flex justify-between items-center text-black">
                {participant.username}
                <button
                  className="bg-red-500 text-white p-1 rounded ml-2"
                  onClick={() => handleRemoveParticipant(participant._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Seleccione los nuevos participantes para añadir al proyecto:</p>
          <select
            className="border rounded p-2 w-full mb-2"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          >
            <option value="">Seleccione un participante para añadirlo</option>
            {availableParticipants.filter(p => !selectedParticipants.some(sp => sp._id === p._id)).map(participant => (
              <option key={participant._id} value={participant._id}>
                {participant.username}
              </option>
            ))}
          </select>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleAddParticipant}
          >
            Añadir Participante
          </button>
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white p-2 rounded mr-2" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleUpdate}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEdit;
