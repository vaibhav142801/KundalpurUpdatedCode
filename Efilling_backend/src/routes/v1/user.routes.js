const express = require('express');
const { userController,donationController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const auth = require('../../middlewares/auth')

const router = express.Router();

router.route('/login-with-mobile').post(validate(userValidation.loginMobile),userController.loginWithMobile);
router.route('/login-with-email').post(validate(userValidation.loginEmail),userController.loginWithEmail);
router.route('/verify-opt').post(userController.verifyOTP);
router.route('/add-cash-donation').post(auth,donationController.addCashDonation);

module.exports = router;