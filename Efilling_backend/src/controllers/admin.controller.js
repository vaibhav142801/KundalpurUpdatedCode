const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { generateAuthTokens } = require("../utils/tokens");

const adminLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const data = await userService.loginAdmin(username, password);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  const tokens = await generateAuthTokens(data);
  res.send({
    user: {
      id: data.id,
      username: data.username,
      name: data.name,
      roles: data.roles,
      profile_image: data.profile_image,
    },
    tokens,
  });
});

const userRegister = async (req, res) => {
  const userdata = await userService.createuser(req.body, req.files);
  if (!userdata) {
    res.status(httpStatus.CONFLICT).send({
      status: false,
      msg: "Username already exist.",
    });
  }
  res.status(httpStatus.CREATED).send(userdata);
};

module.exports = {
  adminLogin,
  userRegister,
};
