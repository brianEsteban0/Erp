const { Router } = require('express');
const { checkIn, checkOut, getLastAttendance, getAttendanceRecords, getWorkHours } = require('../controllers/attendance.controller');

const router = Router();

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/last', getLastAttendance);
router.get('/records', getAttendanceRecords);
router.get('/workhours', getWorkHours);

module.exports = router;
