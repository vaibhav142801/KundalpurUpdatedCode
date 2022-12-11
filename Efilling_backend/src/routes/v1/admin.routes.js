const express = require('express');
const { adminController } = require('../../controllers');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { userValidation,authValidation } = require('../../validations');

router.route('/login').post(validate(authValidation.adminLogin),adminController.adminLogin);
router.route('/user-register').post(validate(userValidation.register),adminController.userRegister);

module.exports = router;