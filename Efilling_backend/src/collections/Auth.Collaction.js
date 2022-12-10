const db = require('../models');
const TblUser =  db.userModel;
const bcrypt = require('bcryptjs');



class UserCollaction {
 
    getUserByEmail = async(email) =>{
        let result = "";
        const query = await TblUser.findOne({
            where:{
                EMAIL:email
            }
        }).then((res)=>{
            result = res;
          })

          return result;
                
  } 

  isPasswordMatch = async function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  };




}

module.exports = new UserCollaction(); 
