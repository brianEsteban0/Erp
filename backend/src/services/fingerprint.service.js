const axios = require('axios');

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

module.exports = {
  verifyFingerprint,
  enrollFingerprint,
  deleteFingerprint,
  deleteAllFingerprints,
};
