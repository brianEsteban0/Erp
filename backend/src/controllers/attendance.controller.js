const Attendance = require('../models/attendance.model');
const fingerprintService = require('../services/fingerprint.service');
const User = require('../models/user.model');

async function checkIn(req, res) {
  try {
    const result = await fingerprintService.identifyUserByFingerprint();
    const userId = result.user_id;
    const user = await User.findById(userId).exec();

    const existingAttendance = await Attendance.findOne({ user: user.rut, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
    if (existingAttendance) {
      return res.status(400).json({ error: "User has already checked in today" });
    }

    const attendance = new Attendance({ user: user.rut });
    await attendance.save();
    return res.status(200).json({ message: "Check-in successful", attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function checkOut(req, res) {
  try {
    const result = await fingerprintService.identifyUserByFingerprint();
    const userId = result.user_id;
    const user = await User.findById(userId).exec();

    const attendance = await Attendance.findOne({ user: user.rut, date: { $gte: new Date().setHours(0, 0, 0, 0) }, checkOut: { $exists: false } });
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
