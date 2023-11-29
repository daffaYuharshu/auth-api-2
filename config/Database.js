const { Sequelize } = require("sequelize");

const db = new Sequelize("aiang_db", "root", "aiangadmin12345", {
  host: "35.186.145.146",
  dialect: "mysql",
});

module.exports = db;
