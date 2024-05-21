"use strict";
const { Router } = require("express");
const { checkIn, checkOut } = require("../controllers/asistencia.controller");

const router = Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);

module.exports = router;
