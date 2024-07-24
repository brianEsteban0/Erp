import React, { useEffect, useState } from 'react';
import { getAssignments, deleteAssignment, updateParticipantsInProyect } from '../services/assignment.service';
import AssignmentEdit from './AssignmentEdit';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  const fetchAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al obtener las asignaciones');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      setAssignments(assignments.filter(assignment => assignment._id !== id));
    } catch (err) {
      setError('Error al eliminar la asignación');
    }
  };

  const handleEdit = (assignment) => {
    setCurrentAssignment(assignment);
    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedAssignment) => {
    try {
      await updateParticipantsInProyect(updatedAssignment._id, updatedAssignment);
      fetchAssignments();
      setEditModalOpen(false);
    } catch (err) {
      setError('Error al actualizar la asignación');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-200 p-4 mt-4 rounded-lg shadow-md">
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      <h2 className="text-lg mb-4 text-black">Lista de Asignaciones</h2>
      {assignments.length === 0 ? (
        <div className="text-black">No hay asignaciones disponibles.</div>
      ) : (
        <ul className="pl-5 text-black">
          {assignments.map(assignment => (
            <li key={assignment._id} className="bg-white p-4 mb-4 rounded shadow-md">
              <strong>Proyecto:</strong> {assignment.Proyecto?.titulo}
              <br />
              <strong>Estado:</strong> {assignment.Proyecto?.estado ? 'Activo' : 'Inactivo'}
              <br />
              <strong>Fecha de Creación:</strong> {formatDate(assignment.createdAt)}
              <br />
              <strong>Participantes:</strong>
              <ul className="list-disc pl-5 text-black">
                {assignment.Participantes?.map(participant => (
                  <li key={participant._id} className="text-black">
                    {participant.username}
                  </li>
                ))}
              </ul>
              <button
                className="bg-red-500 text-white p-2 rounded mt-2"
                onClick={() => handleDelete(assignment._id)}
              >
                Eliminar
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2 ml-2"
                onClick={() => handleEdit(assignment)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
      {editModalOpen && (
        <AssignmentEdit
          assignment={currentAssignment}
          onClose={() => setEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AssignmentList;
