const db = require("../models");
const TblUser = db.userModel;
const bcrypt = require("bcryptjs");

class UserCollaction {
  getUserByEmail = async (email) => {
    let result = "";
    const query = await TblUser.findOne({
      where: {
        EMAIL: email,
      },
    }).then((res) => {
      result = res;
    });
    return result;
  };

  getUserName = async (username) => {
    let result = "";
    const query = await TblUser.findOne({
      where: {
        username: username,
        roles:'user'
      },
    }).then((res) => {
      result = res;
    });
    return result;
  };

  getAdminName = async (username) => {
    let result = "";
    const query = await TblUser.findOne({
      where: {
        username: username,
        roles:'admin'
      },
    }).then((res) => {
      result = res;
    });
    return result;
  };

  isPasswordMatch = async function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  };

  updateOTP = async (username, otp) => {
    const result = await TblUser.update(
      { otp: otp },
      {where: {
        username: username
      }
    });
    return result[0];
  };

  isOTPMatch = async (username, otp) => {
    let result = false;
    const data =  await TblUser.findOne({
      where: {
        username: username,
      }
    });
    
    if(data.otp != '' && data.otp == otp){
        const update = await TblUser.update(
          { otp: null,mobileVerifyAt:Date.now()}, 
          {where: {
            username: username
          }
        });
        if(update){
          result = true;
        }
    }
    return result;
  };

} //end of class

module.exports = new UserCollaction();
