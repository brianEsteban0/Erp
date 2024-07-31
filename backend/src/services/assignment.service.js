const Assignments = require('../models/assignment.model.js');
const User = require('../models/user.model.js');
const Proyecto = require('../models/proyecto.model.js');
const { handleError } = require('../utils/errorHandler.js');
const mongoose = require('mongoose');
const Nodemailer = require('../services/nodemailer.service.js');

// Obtener los participantes disponibles
async function getAvailableParticipants() {
    try {
        // Obtener todos los usuarios que no están asignados a ningún proyecto en curso
        const availableParticipants = await User.find({
            '_id': { $nin: await Assignments.distinct('Participantes', { status: 'En curso' }) }
        });

        return [availableParticipants, null];

    } catch (error) {
        handleError(error, 'getAvailableParticipants');
        return [null, 'Error al obtener participantes disponibles.(Service)'];
    }
}

// Añadir un usuario a un proyecto
async function createAssignment(proyectId, userIds, description) {

    try {
        // Verificar que el ID del proyecto es válido
        if (!mongoose.Types.ObjectId.isValid(proyectId)) {
            return [null, 'ID de proyecto no válido.'];
        }

        // Verificar que el proyecto existe
        const proyecto = await Proyecto.findById(proyectId);
        if (!proyecto) return [null, 'Proyecto no encontrado.'];

        const currentDate = new Date();
        if (new Date(proyecto.fecha_termino) < currentDate) {
            return [null, 'No se puede asignar participantes porque este proyecto ya está terminado.'];
        }

        // Asegurar que proyecto.Participantes es un arreglo
        if (!proyecto.Participantes) {
            proyecto.Participantes = [];
        }

        // Verificar la validez de los IDs de usuario
        const invalidUserId = userIds.find(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidUserId) {
            return [null, 'Uno o más IDs de participantes no son válidos.'];
        }
 
        // Verificar que todas las actividades del proyecto estén completas
        const allActivitiesComplete = proyecto.actividades.every(actividad => actividad.estado === true);
        if (allActivitiesComplete) {
            return [null, 'No se puede asignar participantes al proyecto porque todas las actividades están completas.'];
        }

        // Verificar que usuario no esté en otro proyecto en curso
        const assignedUsers = await Assignments.findOne({ Participantes: { $in: userIds }, status: 'En curso' });
        if (assignedUsers) {
            return [null, 'Uno o más usuarios ya están asignados a un proyecto.'];
        }

        // Verificar que el proyecto no esté ya siendo usado
        const assignedProyect = await Assignments.findOne({ Proyecto: proyectId });
        if (assignedProyect) {
            return [null, 'El proyecto ya está siendo utilizado en otra asignación.'];
        }
    
        // Verificar que los usuarios existen
        const participants = await User.find({ _id: { $in: userIds } });
        if (participants.length !== userIds.length) {
            return [null, 'Uno o más participantes no son válidos.'];
        }

        // Intentar crear la asignación
        const newAssignment = new Assignments({
            Proyecto: proyectId,
            Participantes: userIds,
            description: description,
            status: 'En curso',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newAssignment.save();

        // Enviar correo electrónico a los participantes
        const participantesEmails = participants.map(participante => participante.email);
        if (participantesEmails.length > 0) {
            await Nodemailer.enviarEmail(participantesEmails, 'Asignación a proyecto', 
                `Buenos días o tardes, se le informa que fue asignado al proyecto ${proyecto.titulo}`);
        }

        return [newAssignment, null];

    } catch (error) {
        handleError(error, 'addParticipantsToProject');
        return [null, 'Error al asignar participantes al proyecto.(Service)'];
    }
}

// Actualizar el estado de una asignación
async function updateAssignmentStatus(assignmentId, status) {
    try {
        const assignment = await Assignments.findById(assignmentId);
        if (!assignment) {
            return [null, 'Asignación no encontrada.'];
        }

        assignment.status = status;
        await assignment.save();

        return [assignment, null];
    } catch (error) {
        handleError(error, 'updateAssignmentStatus');
        return [null, 'Error al actualizar el estado de la asignación.'];
    }
}

// Eliminar un usuario de un proyecto
async function removeUserFromProyect(assignmentId, userIds) {

    try {
        // Verificar que la asignacion existe
        const assignment = await Assignments.findById(assignmentId);
        if (!assignment) {
            return [null, 'Asignación no encontrada.'];
        }

        // Verificar que el usuario está asignado al proyecto
        if (!assignment.Participantes.includes(userIds)) {
            return [null, 'El usuario no está asignado a este proyecto.'];
        }
        // Remover usuario del proyecto
        assignment.Participantes = assignment.Participantes.filter(participantId => 
            !userIds.includes(participantId.toString()));

        await assignment.save();
        return [assignment, null];

    }catch (error) {
        handleError(error, 'removeUserFromProyect');
        return [null, 'Error al remover usuario del proyecto.(Servicio)'];
    }
}

// Obtener los participantes de un proyecto
async function getParticipantsByProyect(assignmentId) {
    try {
        // Buscar el proyecto por ID
        const assignment = await Assignments.findById(assignmentId).populate('Participantes');
        if (!assignment) {
            return [null, 'Asignación no encontrada.'];
        }

        // Verificar si hay participantes asignados al proyecto
        if (assignment.Participantes.length === 0) {
            return [null, 'No hay participantes asignados a este proyecto.'];
        }

        // Retornar la lista de participantes
        return [assignment.Participantes, null];

    } catch (error) {
        handleError(error, 'getParticipantsByProyect');
        return [null, 'Error al obtener los participantes del proyecto.(Servicio)'];
    }
}  

// Actualizar participantes en un proyecto(retoques)
// Revisar que se pueda actualizar la descripción (únicamente) sin necesidad de añadir participantes.
async function updateParticipantsInProyect(assignmentId, userIds, projectId, description) {
    try {
        const assignment = await Assignments.findById(assignmentId);
        if (!assignment) {
            return [null, 'Asignación no encontrada.'];
        }

        const participants = await User.find({ _id: { $in: userIds } });
        if (participants.length !== userIds.length) {
            return [null, 'Uno o más participantes no son válidos.'];
        }

        assignment.Participantes = participants.map(p => p._id);
        assignment.Proyecto = projectId;

        if (description) {
            assignment.description = description;
        }

        await assignment.save();

        const newParticipantsEmails = participants.map(p => p.email);
        if (newParticipantsEmails.length > 0) {
            await Nodemailer.enviarEmail(newParticipantsEmails, 'Asignación a proyecto', 
            `Buenos días o tardes, se le informa que fue asignado al proyecto ${assignment.Proyecto.titulo}`);
        }

        return [assignment, null];

    } catch (error) {
        handleError(error, 'updateParticipantsInProject');
        return [null, 'Error al actualizar participantes en el assignment.(Servicio)'];
    }
}

// Obtener todos las asignaciones
async function getAssignments() {
    try {
        const asignaciones = await Assignments.find()
            .populate('Proyecto', 'titulo')
            .populate('Participantes', 'username');

        return [asignaciones, null];

    } catch (error) {
        handleError(error, 'getAssignments');
        return [null, "Error al obtener las asignaciones. (Servicio)"];
    }
}

// Eliminar assignments
async function deleteAssignment(assignmentId) {
    try {
        // Verificar que la asignación existe
        const assignment = await Assignments.findByIdAndDelete(assignmentId);
        if (!assignment) {
            return [null, 'Asignación no encontrada.'];
        }

        return [assignment, null];

    } catch (error) {
        handleError(error, 'deleteAssignment');
        return [null, 'Error al eliminar la asignación. (Servicio)'];
    }
}

module.exports = {
    getAvailableParticipants,
    createAssignment,
    updateAssignmentStatus,
    removeUserFromProyect,
    getParticipantsByProyect,
    updateParticipantsInProyect,
    getAssignments,
    deleteAssignment,
}
