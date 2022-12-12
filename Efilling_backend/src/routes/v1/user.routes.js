const express = require('express');
const { userController,donationController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const router = express.Router();
const passport = require('passport');
const auth = require('../../middlewares/auth');

router.route('/login-with-mobile').post(validate(userValidation.loginMobile),userController.loginWithMobile);
router.route('/login-with-email').post(validate(userValidation.loginEmail),userController.loginWithEmail);
router.route('/verify-opt').post(userController.verifyOTP);
router.route('/forgot-password').post(validate(userValidation.forgotPass),userController.forgotPassword);
router.route('/add-cash-donation').post(auth(),donationController.addCashDonation);
// router.route('/add-cash-donation').post(donationController.addCashDonation);
router.route('/donation-list').get(donationController.donationList);

module.exports = router;