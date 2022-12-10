const httpStatus = require('http-status');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const { generateAuthTokens } = require('../utils/tokens');

const createUser = catchAsync(async (req, res) => {
    const userdata = await userService.createuser(req.body);
    res.status(httpStatus.CREATED).send(userdata);  
});


  const loginuser = catchAsync(async (req, res) => {
    const {EMAIL , PASSWORD} = req.body;
    const data = await userService.loginuser(EMAIL,PASSWORD);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, '!somthing Went Wrong');
    } 
    
    const tokens = await generateAuthTokens(data);
    res.send({
      'user': {
        id: data.USER_ID,
        phone: data.PHONENO,
        email: data.EMAIL,
      },
      tokens,
    });
  
   
    
  });


module.exports = {
  createUser,
  loginuser,
};
