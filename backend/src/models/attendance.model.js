"use strict";
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkIn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkOut: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
