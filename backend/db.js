const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config.json").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const UploadImageMetaToSQL = sequelize.define("Image", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = { sequelize, UploadImageMetaToSQL };
