const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const Users = sequelize.define(tbl.TBL_USER, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        username: {
            type: Sequelize.STRING(100),     
            trim: true,
        },
        mobileNo: {
            type: Sequelize.STRING(15),     
            trim: true,
        },
        otp: {
            type: Sequelize.STRING(6),     
            trim: true,
        },
        mobileVerifyAt: {
            type: Sequelize.DATE,     
            trim: true,
        },
        password: {
            type: Sequelize.STRING(255),     
            trim: true,
        },
        roles:{
            type:Sequelize.STRING(50),
            trim: true,
            defaultValue:'user',
            allowNull:false,
        },
        name:{
            type:Sequelize.STRING(150),
        },
        email:{
            type:Sequelize.STRING(150),
            trim: true,
        },
        address:{
            type:Sequelize.STRING(255),
        },
        gender:{
            type:Sequelize.STRING(100),
            trim: true,
        },
        profile_image:{
            type:Sequelize.STRING(150),
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue:0
        }
    })

    module.exports = Users;
