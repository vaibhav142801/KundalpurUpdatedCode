const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const DonationItem = sequelize.define(tbl.TBL_DONATION_ITEM, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        itemName: {
            type: Sequelize.STRING(100),     
            trim: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue:1
        }
    })
    module.exports = DonationItem;
