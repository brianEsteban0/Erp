"use strict";
const { Router } = require("express");
const { checkIn, checkOut } = require("../controllers/asistencia.controller");

const router = Router();

router.post("/asistencia/checkin", checkIn);
router.post("/asistencia/checkout", checkOut);

module.exports = router;
