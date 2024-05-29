const { exec } = require('child_process');
const User = require('../models/user.model');

async function verifyFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-verify ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error verifying fingerprint for user ${userId}: ${stderr || error.message}`));
      }
      resolve(userId);
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

async function identifyUserByFingerprint() {
  const users = await User.find().exec();

  for (const user of users) {
    try {
      await verifyFingerprint(user._id);
      return user; // Return the user if fingerprint verification succeeds
    } catch (err) {
      // Ignore error and continue with the next user
      continue;
    }
  }
  throw new Error('No matching fingerprints found');
}

module.exports = {
  verifyFingerprint,
  enrollFingerprint,
  deleteFingerprint,
  identifyUserByFingerprint,
};
