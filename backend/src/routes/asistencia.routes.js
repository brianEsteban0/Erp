"use strict";
const { Router } = require("express");
const { checkIn, checkOut, getAttendanceRecords, enrollFingerprint, deleteFingerprint, deleteAllFingerprints } = require("../controllers/asistencia.controller");

const router = Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/records", getAttendanceRecords);
router.post("/enroll", enrollFingerprint);
router.post("/delete", deleteFingerprint);
router.post("/delete-all", deleteAllFingerprints);

module.exports = router;
