const Attendance = require('../models/attendance.model');
const User = require('../models/user.model');
const fingerprintService = require('../services/fingerprint.service');

async function checkIn(req, res) {
  try {
    const { rut, isAdminOverride } = req.body;
    let user;
    
    if (isAdminOverride) {
      user = await User.findOne({ rut });
    } else {
      user = await fingerprintService.identifyUserByRutAndFingerprint(rut);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found or fingerprint does not match" });
    }

    const existingAttendance = await Attendance.findOne({ user: user._id, checkOut: null });

    if (existingAttendance) {
      return res.status(400).json({ error: "User has already checked in and has not checked out yet" });
    }

    const attendance = new Attendance({ user: user._id, checkIn: new Date() });
    await attendance.save();

    const userData = await User.findById(user._id).select('photoUrl');

    return res.status(200).json({ message: "Check-in successful", attendance: { ...attendance.toObject(), photoUrl: userData.photoUrl } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function checkOut(req, res) {
  try {
    const { rut, isAdminOverride } = req.body;
    let user;

    if (isAdminOverride) {
      user = await User.findOne({ rut });
    } else {
      user = await fingerprintService.identifyUserByRutAndFingerprint(rut);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found or fingerprint does not match" });
    }

    const attendance = await Attendance.findOne({ user: user._id, checkOut: null });

    if (!attendance) {
      return res.status(400).json({ error: "No active check-in found" });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    const userData = await User.findById(user._id).select('photoUrl');

    return res.status(200).json({ message: "Check-out successful", attendance: { ...attendance.toObject(), photoUrl: userData.photoUrl } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getLastAttendance(req, res) {
  try {
    const { rut } = req.query;
    const user = await User.findOne({ rut });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lastAttendance = await Attendance.findOne({ user: user._id }).sort({ date: -1 });
    if (!lastAttendance) {
      return res.status(404).json({ error: 'No attendance record found' });
    }

    return res.status(200).json({ attendance: lastAttendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAttendanceRecords(req, res) {
  try {
    const { rut, startDate, endDate } = req.query;
    const user = await User.findOne({ rut });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const records = await Attendance.find({
      user: user._id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ date: -1 });

    return res.status(200).json({ records });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  checkIn,
  checkOut,
  getLastAttendance,
  getAttendanceRecords,
};
