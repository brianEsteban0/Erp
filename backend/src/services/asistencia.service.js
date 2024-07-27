"use strict";
const Attendance = require("../models/attendance.model");

async function checkIn(userId) {
  try {
    const existingAttendance = await Attendance.findOne({ user: userId, checkOut: null });
    if (existingAttendance) {
      return [null, "User already checked in"];
    }

    const attendance = new Attendance({
      user: userId,
      date: new Date(),
      checkIn: new Date(),
    });

    await attendance.save();
    return [attendance, null];
  } catch (error) {
    return [null, error.message];
  }
}

async function checkOut(userId) {
  try {
    const attendance = await Attendance.findOne({ user: userId, checkOut: null });
    if (!attendance) {
      return [null, "User not checked in"];
    }

    attendance.checkOut = new Date();
    await attendance.save();
    return [attendance, null];
  } catch (error) {
    return [null, error.message];
  }
}

async function getAttendanceRecords() {
  try {
    const records = await Attendance.find().populate('user').exec();
    return [records, null];
  } catch (error) {
    return [null, error.message];
  }
}

module.exports = {
  checkIn,
  checkOut,
  getAttendanceRecords,
};
