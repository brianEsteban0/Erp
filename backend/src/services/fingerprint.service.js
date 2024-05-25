const axios = require('axios');
const User = require('../models/user.model');

async function verifyFingerprint(userId) {
  try {
    const response = await axios.post('http://localhost:5001/verify', { user_id: userId });
    return response.data;
  } catch (error) {
    throw new Error('Error verifying fingerprint: ' + error.message);
  }
}

async function enrollFingerprint(userId) {
  try {
    const response = await axios.post('http://localhost:5001/enroll', { user_id: userId });
    return response.data;
  } catch (error) {
    throw new Error('Error enrolling fingerprint: ' + error.message);
  }
}

async function deleteFingerprint(userId) {
  try {
    const response = await axios.post('http://localhost:5001/delete', { user_id: userId });
    return response.data;
  } catch (error) {
    throw new Error('Error deleting fingerprint: ' + error.message);
  }
}

async function deleteAllFingerprints() {
  try {
    const response = await axios.post('http://localhost:5001/delete-all');
    return response.data;
  } catch (error) {
    throw new Error('Error deleting all fingerprints: ' + error.message);
  }
}

async function identifyUserByFingerprint() {
  try {
    const response = await axios.post('http://localhost:5001/identify');
    if (response.status !== 200) {
      throw new Error(`Failed to identify fingerprint: ${response.statusText}`);
    }
    const userId = response.data.user_id;
    if (!userId) {
      throw new Error('User ID not returned from fingerprint service');
    }
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error('User not found with the identified user ID');
    }
    return user;
  } catch (error) {
    throw new Error('Error identifying fingerprint: ' + error.message);
  }
}

module.exports = {
  verifyFingerprint,
  enrollFingerprint,
  deleteFingerprint,
  deleteAllFingerprints,
  identifyUserByFingerprint,
};
