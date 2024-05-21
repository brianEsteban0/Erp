const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    Proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true,
    },
    Participantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }]
});

const Assignments = mongoose.model('Assignments', assignmentSchema);
module.exports = Assignments;
