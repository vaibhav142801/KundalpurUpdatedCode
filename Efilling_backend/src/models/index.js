const sequelize = require('../db/db-connection');
module.exports.userModel = require('./user.model');
module.exports.ItrModel = require('./Itr.model');

  


sequelize.sync().then((result)=>{
    console.log('data synced')
}).catch(()=>{
    console.log('error in sync')
});




