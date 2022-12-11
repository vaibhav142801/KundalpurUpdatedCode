const express = require('express');
const { userController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');

const router = express.Router();

router.route('/login').post(userController.loginuser);
router.route('/verify-opt').post(userController.verifyOTP);
router.route('/register').post(userController.createUser);
// router.route('/login').post(validate(userValidation.login), userController.login);
// router.route('/login').post(auth('PortalManageMent'),validate(PortalmanagementValidation.createrole), PortalManagementController.createRoleAccess);

module.exports = router;