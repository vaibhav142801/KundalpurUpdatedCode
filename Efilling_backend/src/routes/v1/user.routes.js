const express = require('express');
const { userController,donationController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');

const router = express.Router();

router.route('/login').post(validate(userValidation.login),userController.loginuser);
router.route('/verify-opt').post(userController.verifyOTP);
router.route('/add-cash-donation').post(donationController.addCashDonation);

module.exports = router;