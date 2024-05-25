"use strict";
const { Router } = require("express");
const { checkIn, checkOut, getAttendanceRecords, enrollFingerprint, deleteFingerprint } = require("../controllers/asistencia.controller");

const router = Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/records", getAttendanceRecords);
router.post("/enroll", enrollFingerprint);
router.post("/delete", deleteFingerprint);

module.exports = router;
