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
    }],

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['En curso', 'Completado'],
        default: 'En curso',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

assignmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Assignments = mongoose.model('Assignments', assignmentSchema);
module.exports = Assignments;
