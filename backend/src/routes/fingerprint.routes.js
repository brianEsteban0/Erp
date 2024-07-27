const { Router } = require('express');
const {
  enrollFingerprint,
  verify,
  deleteFingerprint,
  identify,
} = require('../controllers/fingerprint.controller');

const router = Router();

router.post('/enroll', enrollFingerprint);
router.post('/verify', verify);
router.post('/delete', deleteFingerprint);
router.post('/identify', identify);

module.exports = router;
