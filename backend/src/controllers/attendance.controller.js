const Attendance = require('../models/attendance.model');
const fingerprintService = require('../services/fingerprint.service');

async function checkIn(req, res) {
  try {
    const { rut } = req.body;
    const user = await fingerprintService.identifyUserByRutAndFingerprint(rut);

    if (!user) {
      return res.status(404).json({ error: "User not found or fingerprint does not match" });
    }

    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({ user: user._id, date: { $gte: todayStart, $lte: todayEnd }, checkOut: { $exists: false } });

    if (existingAttendance) {
      return res.status(400).json({ error: "User has already checked in today and has not checked out yet" });
    }

    const attendance = new Attendance({ user: user._id });
    await attendance.save();
    return res.status(200).json({ message: "Check-in successful", attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function checkOut(req, res) {
  try {
    const { rut } = req.body;
    const user = await fingerprintService.identifyUserByRutAndFingerprint(rut);

    if (!user) {
      return res.status(404).json({ error: "User not found or fingerprint does not match" });
    }

    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({ user: user._id, date: { $gte: todayStart, $lte: todayEnd }, checkOut: { $exists: false } });

    if (!attendance) {
      return res.status(400).json({ error: "No active check-in found for today" });
    }

    attendance.checkOut = new Date();
    await attendance.save();
    return res.status(200).json({ message: "Check-out successful", attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  checkIn,
  checkOut,
};
