import React, { useEffect, useState } from 'react';
import { getAssignments, deleteAssignment, updateParticipantsInProyect, updateAssignmentStatus } from '../services/assignment.service';
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

  const handleStatusChange = async (assignmentId, status) => {
    try {
      await updateAssignmentStatus(assignmentId, status);
      fetchAssignments();
    } catch (err) {
      setError('Error al actualizar el estado de la asignación');
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
            <li key={assignment._id} className="bg-white p-4 mb-4 rounded shadow-md flex justify-between">
              <div>
                <strong>Proyecto:</strong> {assignment.Proyecto?.titulo}
                <br />
                <strong>Fecha de Creación:</strong> {formatDate(assignment.createdAt)}
                <br />
                <strong>Status:</strong> {assignment.status}
                <br />
                <strong>Participantes:</strong>
                <ul className="list-disc pl-5 text-black">
                  {assignment.Participantes?.map(participant => (
                    <li key={participant._id} className="text-black">
                      {participant.username}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  className="bg-gray-500 text-white p-2 rounded flex items-center"
                  onClick={() => handleDelete(assignment._id)}
                >
                  <img src="http://localhost:3000/uploads/eliminar.png" alt="Eliminar" className="w-5 h-5 mr-2" />
                  Eliminar
                </button>
                <button
                  className="bg-gray-500 text-white p-2 rounded flex items-center"
                  onClick={() => handleEdit(assignment)}
                >
                  <img src="http://localhost:3000/uploads/editar.png" alt="Editar" className="w-5 h-5 mr-2" />
                  Editar
                </button>
                {assignment.status !== 'Completado' && (
                  <button
                    className="bg-gray-500 text-white p-2 rounded flex items-center"
                    onClick={() => handleStatusChange(assignment._id, 'Completado')}
                  >
                    <img src="http://localhost:3000/uploads/completado.png" alt="Completado" className="w-5 h-5 mr-2" />
                    Marcar como Completado
                  </button>
                )}
              </div>
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
