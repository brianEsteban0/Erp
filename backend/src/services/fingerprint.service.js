const { exec } = require('child_process');
const User = require('../models/user.model');

async function verifyFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-verify ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error verifying fingerprint: ${stderr || error.message}`));
      }
      resolve({ message: "Fingerprint verified successfully" });
    });
  });
}

async function enrollFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-enroll ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error enrolling fingerprint: ${stderr || error.message}`));
      }
      resolve({ message: "Fingerprint enrolled successfully" });
    });
  });
}

async function deleteFingerprint(userId) {
  return new Promise((resolve, reject) => {
    exec(`fprintd-delete ${userId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(new Error(`Error deleting fingerprint: ${stderr || error.message}`));
      }
      resolve({ message: "Fingerprint deleted successfully" });
    });
  });
}

async function identifyUserByFingerprint() {
  try {
    const knownUsers = await User.find().exec();
    
    for (const user of knownUsers) {
      try {
        const result = await new Promise((resolve, reject) => {
          exec(`fprintd-verify ${user._id}`, (error, stdout, stderr) => {
            if (error || stderr) {
              return reject(new Error(`Error verifying fingerprint for user ${user._id}: ${stderr || error.message}`));
            }
            resolve(user);
          });
        });

        if (result) {
          return { user_id: result._id, rut: result.rut };
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    throw new Error("No matching fingerprints found");
  } catch (error) {
    throw new Error(`Error identifying fingerprint: ${error.message}`);
  }
}

module.exports = {
  verifyFingerprint,
  enrollFingerprint,
  deleteFingerprint,
  identifyUserByFingerprint,
};
