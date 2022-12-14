const httpStatus = require("http-status");
const { UserCollection } = require("../collections");
const AuthCollaction = require("../collections/Auth.Collaction");
const crypto = require('crypto');
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createuser = async (userBody, file) => {
  const user = await AuthCollaction.getUserName(userBody.username);
  if (user) {
    return null;
  }
  const result = await UserCollection.createuser(userBody, file);
  return result;
};

const mobileLogin = async (body) => {
  const checkUser = await AuthCollaction.getUserName(body.mobile_no);
  if(checkUser){
    // ---------check OTP TIME--------
    const checkOtpLastSend = await AuthCollaction.checkOtpLastSend(checkUser.id);
    if(!checkOtpLastSend){
      let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
      const update_otp = await UserCollection.updateOTP(checkUser.id, otp);
      return update_otp;
    }else{
      let date_ob = new Date();
      var seconds = 60;
      var parsedDate = new Date(Date.parse(checkOtpLastSend.updatedAt));
      var newDate = new Date(parsedDate.getTime() + (1000 * seconds));
      const remaining = date_ob - newDate;
      const checkRemaining  = Math.floor( (remaining/1000) % 60 );
      if(checkRemaining > 0){ //----check remaining time-----
        let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
        const update_otp = await UserCollection.updateOTP(checkUser.id, otp);
        return update_otp; 
      }else{
        throw new ApiError(httpStatus.NOT_FOUND, `Please wait ${Math.abs(checkRemaining)} seconds.`); 
      }
    }
  }else{
    const result = await UserCollection.selfRegister(body);
    if(!result){
      throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong. Please try again."); 
    }
    let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
    const update_otp = await UserCollection.updateOTP(result, otp);
    return update_otp;
  }
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginuser = async (email, password) => {
  const user = await AuthCollaction.getUserName(email);
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const loginAdmin = async (username, password) => {
  const user = await AuthCollaction.getAdminName(username);
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect username or password");
  }
  return user;
};

const verifyOTP = async (username, otp) => {
  const isOTPMatch = await AuthCollaction.isOTPMatch(username, otp);
  if (!isOTPMatch) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "OTP mismatch.");
  } else {
    const user = await AuthCollaction.getUserName(username);
    return user;
  }
};

const forgotPass = async (body) => {
  const user = await AuthCollaction.getUserName(body.identity);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username");
  }
  let resetPasswordToken = crypto.randomBytes(20).toString('hex');
  let resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  const updateForgotPassToken = await AuthCollaction.updateForgotPassToken(user.id,resetPasswordToken,resetPasswordExpires);
  return updateForgotPassToken;
};

const forgotPassSecond = async(body) => {
  const data = await AuthCollaction.isTokenMatch(body);
  if(!data){
    return null;
  }
  let currentDate = Date.now();
  let tokenTime = new Date(data.resetPasswordExpires);
  let t = tokenTime.getTime();
  
  if(data.resetPasswordExpires < currentDate){
    throw new ApiError(httpStatus.UNAUTHORIZED, "Token expire.");
  }
  const update = await UserCollection.resetPassword(body,data.user_id);
  return update;
  
}

module.exports = {
  createuser,
  loginuser,
  verifyOTP,
  loginAdmin,
  forgotPass,
  mobileLogin,
  forgotPassSecond
};
