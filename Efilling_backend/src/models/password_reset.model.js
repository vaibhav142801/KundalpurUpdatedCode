const tbl = require("./TableName");
const Sequelize = require("sequelize");
const sequelize = require("../db/db-connection");

const PasswordResets = sequelize.define(tbl.TBL_PASSWORD_RESET, {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER(11),
  },
  resetPasswordToken: {
    type: Sequelize.STRING(150),
    trim: true,
  },
  resetPasswordExpires:{
    type: Sequelize.DATE,
  }

});

module.exports = PasswordResets;
