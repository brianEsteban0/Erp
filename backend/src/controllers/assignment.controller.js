const { respondSuccess, respondError } = require("../utils/resHandler");

const AssignmentService = require('../services/assignment.service');
const { handleError } = require("../utils/errorHandler");

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
    // Obtener los datos de la petición con los nombres de claves actualizados
    const { Proyecto: proyectId, Participantes: userIds } = req.body;
    
    // Verificar que se proporcionaron los datos necesarios
    if (!proyectId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
    }
    // Añadir el usuario al proyecto
    const [updatedProject, error] = await AssignmentService.addUserToProyect(proyectId, userIds);

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
        return respondError(req, res, 400, "Asignación no encontrado.");
    }
    /* if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        return res.status(400).json({ error: "ID no válido" });
    }*/

    // Obtener los participantes del proyecto
    const [participants, error] = await AssignmentService.getParticipantsByProyect(assignmentId);

    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, participants);
}

async function updateParticipantsInProyect(req, res) {
    // Obtener los datos de la petición
    const { proyectId, userIds } = req.body;
    // Verificar que se proporcionaron los datos necesarios
    if (!proyectId || !userIds || !Array.isArray(userIds)) {
        return respondError(req, res, 400, "Datos insuficientes o incorrectos.");
    }
    // Actualizar los participantes del proyecto
    const [updatedProyect, error] = await AssignmentService.updateParticipantsInProject(proyectId, userIds);

    if (error) {
        return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, updatedProyect);
}

//Obtener todas las asignaciones
async function getAssignments(req,res){

    const [asignaciones, error] = await AssignmentService.getAssignments();
    if (error) {
        return respondError(req, res, 400, error);
    }

    if (asignaciones.length === 0) {
        return respondError(req, res, 404, "No se encontraron asignaciones.");
    }

    return respondSuccess(req, res, 200, asignaciones);
}


module.exports = {
    getAvailableParticipants,
    addUserToProyect,
    removeUserFromProyect,
    getParticipantsByProyect,
    updateParticipantsInProyect,
    getAssignments,
};
