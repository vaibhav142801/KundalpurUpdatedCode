const { Op } = require("sequelize");
const db = require("../models");
const uploadimage = require("../middlewares/imageupload");
const TblUser = db.userModel;
const TblRoles = db.roleModel;
const TblOTP = db.otpModel;
const TblUsersRoles = db.usersRolesModel;

const bcrypt = require("bcryptjs");
class UserCollaction {
  updatePassword = async (body) => {
    const { identity, new_password } = body;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(new_password, salt);

    const update = await TblUser.update(
      { password: hashencrypt },
      {
        where: {
          roles: "user",
          [Op.or]: [
            { username: identity },
            { email: identity },
            { mobileNo: identity },
          ],
        },
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return update[0];
  };

  selfRegister = async (body) => {
    let password = 'abcd@1029';
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);
    const addNew = await TblUser.create({
      username: body.mobile_no,
      mobileNo: body.mobile_no,
      password: hashencrypt,
    })
      .then((res) => {
        TblUsersRoles.create({
          user_id: res.id,
          role_id: 2,
        }).then((resp) => {
          res.dataValues["item_details"] = resp;
        });
        return res.id;
      })
      .catch((err) => {
        return 0;
      });
    return addNew;
  };

  createuser = async (body, file) => {
    const {
      username,
      mobileNo,
      name,
      email,
      address,
      gender,
      roles,
      password,
    } = body;
    const { profile_image } = file;
    const imagePath = uploadimage(profile_image);

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);

    let result = "";
    const query = await TblUser.create({
      username,
      mobileNo,
      name,
      email,
      address,
      gender,
      roles,
      profile_image: imagePath,
      password: hashencrypt,
    })
      .then((res) => {
        result = {
          status: 1,
          message: "Created Successfully",
          data: res.dataValues,
        };
      })
      .catch((err) => {
        result = {
          status: 0,
          message: "something Went Wrong",
          data: err,
        };
      });
    return result;
  };

  updateOTP = async (id, otp) => {
    const check = await TblOTP.findOne({where: { user_id: id}});
    if(check){
      //---------update OTP-------
      const result = await TblOTP.update({otp:otp},{where:{user_id: id}});
      return result;
    }else{
      //--------insert new data--------
      const result =  await TblOTP.create({user_id:id,otp:otp});
      return result;
    }
  };
}

module.exports = new UserCollaction();
