const db = require('../models');
const TblUser =  db.userModel;
const bcrypt = require('bcryptjs');



class UserCollaction {
  createuser = async (body) => {
   const  {F_NAME,L_NAME,PHONENO, EMAIL, PASSWORD } = body;
   const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(PASSWORD, salt);
   const createdAt = Date.now()
   let result = "";
    const query = await TblUser.create({F_NAME,L_NAME,PHONENO,EMAIL,PASSWORD:hashencrypt,ISDELETED:false}).then((res)=>{
      result =  {
        status:1,
        message:"Created Successfully",
        data:res.dataValues
      }
    }).catch(err=>{
      result =  {
        status:0,
        message:"Somthing Went Wrong",
        data:err
      }
    });

    return result;
  };




}

module.exports = new UserCollaction(); 
