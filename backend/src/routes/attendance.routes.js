const { Router } = require('express');
const { checkIn, checkOut, getLastAttendance, getAttendanceRecords } = require('../controllers/attendance.controller');

const router = Router();

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/last', getLastAttendance);
router.get('/records', getAttendanceRecords);

module.exports = router;
