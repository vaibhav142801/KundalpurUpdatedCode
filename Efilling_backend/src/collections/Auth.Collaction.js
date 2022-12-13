const db = require("../models");
const { Op, where } = require("sequelize");
const TblUser = db.userModel;
const TblUsersRoles = db.usersRolesModel;
const TblOTP = db.otpModel;
db.userModel.hasMany(db.otpModel,{foreignKey:'user_id',as:'otpDetails'})
db.userModel.hasOne(db.usersRolesModel,{foreignKey:'user_id',as:'usersRoles'})

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
        [Op.or]: [
          { username: username },
          { email: username },
          { mobileNo: username }
        ]
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
        username: username
      },
      include:[{
        model:TblUsersRoles, as: "usersRoles",
        where: { role_id: 1},
      }],
    }).then((res) => {
      console.log(res)
      result = res;
    });
    
    return result;
  };

  isPasswordMatch = async function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  };

  isOTPMatch = async (username, otp) => {
    const data = await TblUser.findOne({
      include:[{
        model:TblOTP,
        as:'otpDetails',
        attributes:['OTP']
      }],
      where: {
        username: username,
      },
    });

    if (data.otp != "" && data.otpDetails[0].dataValues.OTP == otp) {
      await TblOTP.update({ otp: null},{where: {user_id: data.id}});
      await TblUser.update({veification_status:1,verified_by:'Mobile'},{where: {id: data.id}});
      return 1;
    }
    return 0;
  };

  checkOtpLastSend = async (id) => {
    
    const result =  await TblOTP.findOne({
      // logging: (sql, queryObject) => {
      //   sendToElasticAndLogToConsole(sql, queryObject)
      // },
      where:{user_id:id,otp: {
        [Op.not]: null
      }}
    })
    return result;
  }
} //end of class


function sendToElasticAndLogToConsole (sql, queryObject) {  
  // save the `sql` query in Elasticsearch
  console.log(sql)

  // use the queryObject if needed (e.g. for debugging)
}

module.exports = new UserCollaction();
