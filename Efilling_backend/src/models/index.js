const sequelize = require('../db/db-connection');
module.exports.userModel = require('./user.model');

sequelize.sync().then((result)=>{
    console.log('data synced')
}).catch(()=>{
    console.log('error in sync')
});




