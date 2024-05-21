const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignment.controller.js");

router.get('/dispo', assignmentController.getAvailableParticipants);
router.post('/', assignmentController.addUserToProyect);
router.delete('/:assignmentId/:userId', assignmentController.removeUserFromProyect);
router.get('/:assignmentId', assignmentController.getParticipantsByProyect);
router.put('/:proyectId', assignmentController.updateParticipantsInProyect);
router.get('/', assignmentController.getAssignments);

module.exports = router;


