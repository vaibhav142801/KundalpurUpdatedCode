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

const loginuser = catchAsync(async (req, res) => {
  const { username, login_type } = req.body;
  if (login_type == "email") {
    const checkEmail = isEmailValid(username);
    if (checkEmail) {
      let data = await userService.loginuser(username);
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
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Please enter valid email.");
    }
  } else {
    let data = await userService.generateOTP(username);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
    }
    res.send({
      username: data.username,
      otp: data.otp,
    });
  }
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

module.exports = {
  createUser,
  loginuser,
  verifyOTP,
};
