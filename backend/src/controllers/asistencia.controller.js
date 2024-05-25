"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const AttendanceService = require("../services/asistencia.service");
const FingerprintService = require('../services/fingerprint.service');
const User = require('../models/user.model');

async function checkIn(req, res) {
  try {
    const identifiedUserRut = await FingerprintService.identifyUserByFingerprint();
    if (!identifiedUserRut) {
      return respondError(req, res, 404, "User not found");
    }

    // Buscar usuario en la base de datos usando el RUT identificado
    const user = await User.findOne({ rut: identifiedUserRut }).exec();
    if (!user) {
      return respondError(req, res, 404, "User not found");
    }

    const [attendance, error] = await AttendanceService.checkIn(user._id);
    if (error) {
      return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, attendance);
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function checkOut(req, res) {
  try {
    const identifiedUserRut = await FingerprintService.identifyUserByFingerprint();
    if (!identifiedUserRut) {
      return respondError(req, res, 404, "User not found");
    }

    // Buscar usuario en la base de datos usando el RUT identificado
    const user = await User.findOne({ rut: identifiedUserRut }).exec();
    if (!user) {
      return respondError(req, res, 404, "User not found");
    }

    const [attendance, error] = await AttendanceService.checkOut(user._id);
    if (error) {
      return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, attendance);
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
  const { rut } = req.body;

  if (!rut) {
    return respondError(req, res, 400, "RUT is required");
  }

  try {
    const user = await User.findOne({ rut });
    if (!user) {
      return respondError(req, res, 404, "User not found");
    }

    const response = await FingerprintService.enrollFingerprint(user._id);
    return respondSuccess(req, res, 200, response);
  } catch (error) {
    return respondError(req, res, 500, error.message);
  }
}

async function deleteFingerprint(req, res) {
  const { rut } = req.body;

  if (!rut) {
    return respondError(req, res, 400, "RUT is required");
  }

  try {
    const user = await User.findOne({ rut });
    if (!user) {
      return respondError(req, res, 404, "User not found");
    }

    const response = await FingerprintService.deleteFingerprint(user._id);
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
};
