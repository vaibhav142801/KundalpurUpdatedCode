const express = require('express');
const { userController,donationController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.route('/login-with-mobile').post(validate(userValidation.loginMobile),userController.loginWithMobile);
router.route('/login-with-email').post(validate(userValidation.loginEmail),userController.loginWithEmail);
router.route('/verify-opt').post(userController.verifyOTP); 
router.route('/forgot-password-first').post(validate(userValidation.forgotPass),userController.forgotPassword);
router.route('/forgot-password-second').post(validate(userValidation.forgotPassSecond),userController.forgotPasswordSecond);
router.route('/item-list').get(auth(),donationController.itemList);
router.route('/add-cash-donation').post(auth(),donationController.addCashDonation);
router.route('/donation-list').get(auth(),donationController.donationList);
module.exports = router;