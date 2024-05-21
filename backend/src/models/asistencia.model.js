"use strict";
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Asistencia = mongoose.model("Asistencia", attendanceSchema);
module.exports = Asistencia;
