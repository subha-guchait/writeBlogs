const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: Sequelize.TEXT,
  },
});

module.exports = Comment;
