var DataTypes = require("sequelize").DataTypes;
var _tower = require("./tower");

function initModels(sequelize) {
  var tower = _tower(sequelize, DataTypes);


  return {
    tower,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
