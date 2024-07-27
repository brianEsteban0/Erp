const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../middlewares/authorization.middleware.js")
const assignmentController = require("../controllers/assignment.controller.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

router.use(authenticationMiddleware);

router.get('/disponible', authorizationMiddleware.isAdmin, assignmentController.getAvailableParticipants);
router.post('/', authorizationMiddleware.isAdmin, assignmentController.addUserToProyect);
router.delete('/:assignmentId/:userId', authorizationMiddleware.isAdmin, assignmentController.removeUserFromProyect);
router.get('/:assignmentId', authorizationMiddleware.isAdmin, assignmentController.getParticipantsByProyect);
router.put('/:assignmentId', authorizationMiddleware.isAdmin, assignmentController.updateParticipantsInProyect);
router.delete('/:assignmentId', authorizationMiddleware.isAdmin, assignmentController.deleteAssignment)
router.get('/', authorizationMiddleware.isAdmin, assignmentController.getAssignments)
router.patch('/:assignmentId/status', assignmentController.updateAssignmentStatus);

module.exports = router;


