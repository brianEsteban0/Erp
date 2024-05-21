"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const AttendanceService = require("../services/asistencia.service");

async function checkIn(req, res) {
  const { employeeId } = req.body;
  const [attendance, error] = await AttendanceService.checkIn(employeeId);
  if (error) {
    return respondError(req, res, 400, error);
  }
  return respondSuccess(req, res, 200, attendance);
}

async function checkOut(req, res) {
  const { employeeId } = req.body;
  const [attendance, error] = await AttendanceService.checkOut(employeeId);
  if (error) {
    return respondError(req, res, 400, error);
  }
  return respondSuccess(req, res, 200, attendance);
}

module.exports = {
  checkIn,
  checkOut,
};
