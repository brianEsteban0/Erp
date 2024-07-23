const { Router } = require('express');
const { checkIn, checkOut, getLastAttendance } = require('../controllers/attendance.controller');

const router = Router();

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/last', getLastAttendance);

module.exports = router;
