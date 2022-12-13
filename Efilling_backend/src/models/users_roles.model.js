const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const UsersRoles = sequelize.define(tbl.TBL_USERS_ROLES, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        user_id: {
            type: Sequelize.STRING(100),     
            trim: true,
        },
        role_id: {
            type: Sequelize.STRING(15),     
            trim: true,
        }
    })

    module.exports = UsersRoles;
