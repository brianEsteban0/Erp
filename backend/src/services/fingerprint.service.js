const { exec } = require('child_process');
const User = require('../models/user.model');

async function verifyFingerprint(userId) {
 return new Promise((resolve, reject) => {
   exec(`fprintd-verify ${userId}`, (error, stdout, stderr) => {
     if (error || stderr) {
       return resolve(false);
     }
     resolve(true); // Si la verificación es exitosa
   });
 });
}

async function enrollFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-enroll ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error enrolling fingerprint for user ${userId}: ${stderr || error.message}`));
      }
      resolve({ message: "Fingerprint enrolled successfully" });
    });
  });
}

async function deleteFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-delete ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error deleting fingerprint for user ${userId}: ${stderr || error.message}`));
      }
      resolve({ message: "Fingerprint deleted successfully" });
    });
  });
}

async function identifyUserByRutAndFingerprint(rut) {
  try {
    const user = await User.findOne({ rut }).select("_id").exec();
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await verifyFingerprint(user._id);
    if (!isMatch) {
      throw new Error('Fingerprint does not match');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  verifyFingerprint,
  enrollFingerprint,
  deleteFingerprint,
  identifyUserByRutAndFingerprint,
};
