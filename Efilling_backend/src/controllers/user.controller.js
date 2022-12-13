const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { generateAuthTokens } = require("../utils/tokens");
const { isEmailValid } = require("../utils/checkEmail");
const ApiError = require("../utils/ApiError");

const createUser = catchAsync(async (req, res) => {
  const userdata = await userService.createuser(req.body);
  res.status(httpStatus.CREATED).send(userdata);
});

const loginWithMobile = catchAsync(async (req, res) => {
  const login = await userService.mobileLogin(req.body);
  if (!login) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.send({
    status:1,
    msg:'OTP generated successfully.'
  })

});

const loginWithEmail = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let data = await userService.loginuser(email, password);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  const tokens = await generateAuthTokens(data);
  res.send({
    user: {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      gender: data.gender,
    },
    tokens,
  });
});

const verifyOTP = catchAsync(async (req, res) => {
  const { username, otp } = req.body;
  const data = await userService.verifyOTP(username, otp);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  const tokens = await generateAuthTokens(data);
  res.send({
    user: {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      gender: data.gender,
    },
    tokens,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const result = await userService.forgotPass(req.body);
  res.status(httpStatus.CREATED).send({
    status: 1,
    msg: "Password updated successfully",
  });
});

module.exports = {
  createUser,
  loginWithMobile,
  loginWithEmail,
  verifyOTP,
  forgotPassword,
};
