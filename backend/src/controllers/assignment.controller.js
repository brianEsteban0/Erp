const { respondSuccess, respondError } = require("../utils/resHandler");
const AssignmentService = require('../services/assignment.service');
const { handleError } = require("../utils/errorHandler");
const { assignmentBodySchema } = require('../schema/assignment.schema.js');
const Participant = require('../models/user.model.js');

// Mostrar los participantes disponibles
async function getAvailableParticipants(req, res) {
    try {
        // Obtener los participantes disponibles
        const [participants, error] = await AssignmentService.getAvailableParticipants();

        if (error) {
            return respondError(req, res, 400, error);
        }
        return respondSuccess(req, res, 200, participants);
    } catch (error) {
        return respondError(req, res, 500, "Error interno del servidor al tratar de obtener participantes disponibles.");
    }
}

// Añadir un usuario a un proyecto
async function addUserToProyect(req, res) {
    const { Proyecto: proyectId, Participantes: userIds, description } = req.body;

    // Validar los datos de la petición
    const { error: bodyError } = assignmentBodySchema.validate(req.body);
    if (bodyError) {
        return respondError(req, res, 400, bodyError.message);
    }

    // Verificar que se proporcionaron los datos necesarios
    if (!proyectId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
    }

    const [updatedProject, error] = await AssignmentService.createAssignment(proyectId, userIds, description);

    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, updatedProject);
}

// Eliminar un usuario de un proyecto
async function removeUserFromProyect(req, res) {
    // Obtener los datos de la petición
    const { assignmentId, userId } = req.params;
    // Verificar que se proporcionaron los datos necesarios
    if (!assignmentId || !userId) {
        return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
    }
    // Eliminar el usuario del proyecto
    const [updatedProject, error] = await AssignmentService.removeUserFromProyect(assignmentId, userId);
    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, updatedProject);
}

// Obtener los participantes de un proyecto
async function getParticipantsByProyect(req, res) {

    // Obtener el ID de la asignación
    const { assignmentId } = req.params;

    // Verificar que se proporcionó el ID del proyecto
    if (!assignmentId) {
        return respondError(req, res, 400, "Asignación no encontrada.");
    }

    // Obtener los participantes del proyecto
    const [participants, error] = await AssignmentService.getParticipantsByProyect(assignmentId);

    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, participants);
}

// Se actualizan los participantes de un proyecto (solo se añaden nuevos participantes en el JSON; los que ya están no deben ponerse en la solicitud, ya que no se puede)
async function updateParticipantsInProyect(req, res) {
    try {
        const { assignmentId } = req.params;
        const { Participantes, Proyecto, description } = req.body;

        if (!assignmentId || !Participantes || !Array.isArray(Participantes) || typeof Proyecto !== 'string') {
            return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
        }

        const [updatedAssignment, error] = await AssignmentService.updateParticipantsInProyect(assignmentId, Participantes, Proyecto, description);

        if (error) {
            return respondError(req, res, 400, error);
        }
        return respondSuccess(req, res, 200, updatedAssignment);
    } catch (error) {
        return respondError(req, res, 500, "No se pudo actualizar los participantes (Controller).");
    }
}

// Actualizar el estado de una asignación
async function updateAssignmentStatus(req, res) {
    const { assignmentId } = req.params;
    const { status } = req.body;

    if (!assignmentId || !status) {
        return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
    }

    const [updatedAssignment, error] = await AssignmentService.updateAssignmentStatus(assignmentId, status);

    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, updatedAssignment);
}

// Obtener todas las asignaciones
async function getAssignments(req, res) {
    // Obtener todas las asignaciones
    const [asignaciones, error] = await AssignmentService.getAssignments();
    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, asignaciones);
}

// Borrar asignación
async function deleteAssignment(req, res) {
    // Obtener el ID de la asignación
    const { assignmentId } = req.params;
    // Verificar que se proporcionó el ID de la asignación
    const [deletedAssignment, error] = await AssignmentService.deleteAssignment(assignmentId);
    // Verificar si hubo un error al intentar eliminar la asignación
    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, deletedAssignment);
}


module.exports = {
    getAvailableParticipants,
    addUserToProyect,
    removeUserFromProyect,
    getParticipantsByProyect,
    updateParticipantsInProyect,
    updateAssignmentStatus,
    getAssignments,
    deleteAssignment
};
