const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const NewDonation = sequelize.define(tbl.TBL_NEW_DONATION, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        RECEIPT_NO: {
            type: Sequelize.STRING(100),     
            trim: true,
            allowNull:false,
        },
        NAME: {
            type: Sequelize.STRING(150),
            trim: true,
        },
        MODE_OF_DONATION:{
            type: Sequelize.STRING(50),
            trim: true,
        },
        AMOUNT:{
            type: Sequelize.FLOAT(10,2),
            trim: true,
        },
        CHEQUE_NO:{
            type: Sequelize.STRING(150),
            
        },
        DATE_OF_CHEQUE:{
            type: Sequelize.STRING(150),
            trim: true,
        },
        NAME_OF_BANK:{
            type: Sequelize.STRING(255),
            trim: true,
        },
        PAYMENT_ID:{
            type: Sequelize.STRING(150),
            trim: true,
        },
        DATE_OF_DAAN:{
            type:Sequelize.DATE,
        },
        ADDED_BY:{
            type:Sequelize.INTEGER(50),
            trim: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue:1
        }
    })
    module.exports = NewDonation;
