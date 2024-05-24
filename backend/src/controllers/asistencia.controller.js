"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const AttendanceService = require("../services/asistencia.service");
const FingerprintService = require('../services/fingerprint.service');
const mongoose = require('mongoose');

async function checkIn(req, res) {
  const { employeeId } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return respondError(req, res, 400, "Invalid employeeId");
  }

  try {
    const response = await FingerprintService.verifyFingerprint(employeeId);
    if (response.message === "Fingerprint verified successfully") {
      const [attendance, error] = await AttendanceService.checkIn(employeeId);
      if (error) {
        return respondError(req, res, 400, error);
      }
      return respondSuccess(req, res, 200, attendance);
    } else {
      return respondError(req, res, 400, "Fingerprint verification failed");
    }
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function checkOut(req, res) {
  const { employeeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return respondError(req, res, 400, "Invalid employeeId");
  }

  try {
    const response = await FingerprintService.verifyFingerprint(employeeId);
    if (response.message === "Fingerprint verified successfully") {
      const [attendance, error] = await AttendanceService.checkOut(employeeId);
      if (error) {
        return respondError(req, res, 400, error);
      }
      return respondSuccess(req, res, 200, attendance);
    } else {
      return respondError(req, res, 400, "Fingerprint verification failed");
    }
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function getAttendanceRecords(req, res) {
  const [records, error] = await AttendanceService.getAttendanceRecords();
  if (error) {
    return respondError(req, res, 400, error);
  }
  return respondSuccess(req, res, 200, records);
}

async function enrollFingerprint(req, res) {
  const { employeeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return respondError(req, res, 400, "Invalid employeeId");
  }

  try {
    const response = await FingerprintService.enrollFingerprint(employeeId);
    return respondSuccess(req, res, 200, response);
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function deleteFingerprint(req, res) {
  const { employeeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return respondError(req, res, 400, "Invalid employeeId");
  }

  try {
    const response = await FingerprintService.deleteFingerprint(employeeId);
    return respondSuccess(req, res, 200, response);
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function deleteAllFingerprints(req, res) {
  try {
    const response = await FingerprintService.deleteAllFingerprints();
    return respondSuccess(req, res, 200, response);
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

module.exports = {
  checkIn,
  checkOut,
  getAttendanceRecords,
  enrollFingerprint,
  deleteFingerprint,
  deleteAllFingerprints,
};
