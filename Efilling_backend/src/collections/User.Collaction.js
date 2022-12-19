const { Op, where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcryptjs");
const uploadimage = require("../middlewares/imageupload");
const removefile = require("../middlewares/removefile");
const TblUser = db.userModel;
const TblOTP = db.otpModel;
const TblUsersRoles = db.usersRolesModel;
const TblPasswordReset = db.passwordReset;

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
      }).then((res) => {
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
    const {username,mobileNo,name,email,address,gender,roles,password} = body;
    const { profile_image } = file;
    const imagePath = uploadimage(profile_image);

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);

    const query = await TblUser.create({
      username,mobileNo,name,email,address,gender,roles,profile_image: imagePath,password: hashencrypt,
    });
    if(query){
      const addRole = await TblUsersRoles.create({
        user_id: query.id,
        role_id: 2,
      });
      return query;
    }
    return null;
    
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

  resetPassword = async(body,id)=>{
    const {identity,new_password,token} = body;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(new_password, salt);
    await TblUser.update({password:hashencrypt},{where:{id: id}});
    await TblPasswordReset.update({resetPasswordToken:null,resetPasswordExpires:null},{where:{user_id: id}});
    return true;
  }

  updateProfile = async(req)=>{
    const {name,email,password,dob,anniversary_date,address} = req.body;
    
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);

    const userId = req.user.id;
    const user = await TblUser.findByPk(userId);

    //------check old pick and remove----
    removefile(user.profile_image);
    // ----********--------------------
    
    const { profile_image } = req.files;
    const imagePath = uploadimage(profile_image);

    user.name = name;
    user.email = email;
    user.password = hashencrypt;
    user.dob = dob;
    user.anniversary_date = anniversary_date;
    user.address = address;
    user.profile_image = imagePath;
    return user.save();
  }
}

module.exports = new UserCollaction();
