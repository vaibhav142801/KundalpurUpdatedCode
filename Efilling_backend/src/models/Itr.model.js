const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')


const ItrModel = sequelize.define(tbl.TBL_ITR, {
        ITR_ID: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        F_NAME: {
            type: Sequelize.STRING(100),     
            trim: true,
        },
        L_NAME: {
            type: Sequelize.STRING(100),     
            trim: true, 
        },
        EMAIL: {
            type: Sequelize.STRING(100),         
            trim: true,
        },
        PHONENO: {
            type: Sequelize.STRING(100),         
            trim: true,
        },
        ADDRESS: {
            type: Sequelize.STRING(100),         
            trim: true,
        },
        PANNUMBER: {
            type: Sequelize.STRING(100),         
            trim: true,
        },
        PANIMG: {
            type: Sequelize.TEXT(),         
            trim: true,
        },
        ADHARNUM: {
            type: Sequelize.STRING(100),         
            trim: true,
        },
        ADHARIMG: {
            type: Sequelize.TEXT(),         
            trim: true,
        }, 
        FRM16: {
            type: Sequelize.TEXT(),         
            trim: true,
        },        
        BANKSTATEMENT: {
            type: Sequelize.TEXT(),         
            trim: true,
        },        
        DETAILSOFINV: {
            type: Sequelize.TEXT(),         
            trim: true,
        },        
        DETAILSOFLONE: {
            type: Sequelize.TEXT(),         
            trim: true,
        },
        ISDELETED: {
            type: Sequelize.BOOLEAN(),         
            trim: true,
        },       
    })

    module.exports = ItrModel;
