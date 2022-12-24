const tbl = require("./TableName");
const Sequelize = require("sequelize");
const sequelize = require("../db/db-connection");

const Roles = sequelize.define(tbl.TBL_ROLE, {
  id: {
    type: Sequelize.INTEGER(50),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING(100),
    trim: true,
  },
  role_desc: {
    type: Sequelize.STRING(15),
    trim: true,
  },
});

module.exports = Roles;
