"use strict";
const Attendance = require("../models/asistencia.model");
const { handleError } = require("../utils/errorHandler");

async function checkIn(employeeId) {
  try {
    const date = new Date();
    const attendance = new Attendance({ employeeId, date, checkIn: date });
    await attendance.save();
    return [attendance, null];
  } catch (error) {
    handleError(error, "attendance.service -> checkIn");
    return [null, error.message];
  }
}

async function checkOut(employeeId) {
  try {
    const date = new Date();
    const attendance = await Attendance.findOne({ 
      employeeId, 
      date: { 
        $gte: new Date().setHours(0, 0, 0, 0), 
        $lt: new Date().setHours(23, 59, 59, 999) 
      } 
    });
    if (!attendance) {
      throw new Error("No check-in record found for today.");
    }
    attendance.checkOut = date;
    await attendance.save();
    return [attendance, null];
  } catch (error) {
    handleError(error, "attendance.service -> checkOut");
    return [null, error.message];
  }
}

module.exports = {
  checkIn,
  checkOut,
};
