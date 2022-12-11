const db = require('../models');
const uploadimage = require('../middlewares/imageupload');
const TblUser =  db.userModel;
const bcrypt = require('bcryptjs');



class UserCollaction {
  createuser = async (body,file) => {
   const  {username,mobileNo,name, email,address,gender,roles,password } = body;
   const { profile_image } = file;
   const imagePath = uploadimage(profile_image);

   const salt = bcrypt.genSaltSync(12);
   const hashencrypt = bcrypt.hashSync(password, salt);

   const createdAt = Date.now()
   let result = "";
    const query = await TblUser.create({username,mobileNo,name, email,address,gender,roles,profile_image:imagePath,password:hashencrypt}).then((res)=>{
      result =  {
        status:1,
        message:"Created Successfully",
        data:res.dataValues
      }
    }).catch(err=>{
      result =  {
        status:0,
        message:"something Went Wrong",
        data:err
      }
    });

    return result;
  };
}

module.exports = new UserCollaction(); 
