const httpStatus = require('http-status');
const { UserCollection } = require('../collections');
const AuthCollaction = require('../collections/Auth.Collaction');
const ApiError = require('../utils/ApiError');

  /**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
   const createuser = async (userBody,file) => {
    const user = await AuthCollaction.getUserName(userBody.username);
    if(user){
      return null;
    }
    const result = await UserCollection.createuser(userBody,file);
    return result;
  };


  
  /**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginuser = async (username) => {
  const user = await AuthCollaction.getUserName(username);
  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return user;
};


const loginAdmin = async (username,password) => {
  const user = await AuthCollaction.getAdminName(username);  
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

const generateOTP = async (username) => {
  let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
  const otpUpdate = await AuthCollaction.updateOTP(username,otp);
  if(!otpUpdate){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const user = await AuthCollaction.getUserName(username);
  return user;
};

const verifyOTP = async(username,otp) => {
  const isOTPMatch = await AuthCollaction.isOTPMatch(username,otp);
  if(!isOTPMatch){
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'OTP mismatch.');
  }else{
    const user = await AuthCollaction.getUserName(username);
    return user;
  }
}
  module.exports = {
    createuser,
    loginuser,
    generateOTP,
    verifyOTP,
    loginAdmin
  }


