const fingerprintService = require('../services/fingerprint.service');
const User = require('../models/user.model');

async function enrollFingerprint(req, res) {
  try {
    const userRut = req.body.rut;
    if (!userRut) {
      return res.status(400).json({ error: "rut is required" });
    }

    const user = await User.findOne({ rut: userRut }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await fingerprintService.enrollFingerprint(user._id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function verify(req, res) {
  try {
    const userRut = req.body.rut;
    if (!userRut) {
      return res.status(400).json({ error: "rut is required" });
    }

    const user = await User.findOne({ rut: userRut }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await fingerprintService.verifyFingerprint(user._id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteFingerprint(req, res) {
  try {
    const userRut = req.body.rut;
    if (!userRut) {
      return res.status(400).json({ error: "rut is required" });
    }

    const user = await User.findOne({ rut: userRut }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await fingerprintService.deleteFingerprint(user._id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function identify(req, res) {
  try {
    const result = await fingerprintService.identifyUserByFingerprint();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  enrollFingerprint,
  verify,
  deleteFingerprint,
  identify,
};
