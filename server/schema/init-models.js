var DataTypes = require("sequelize").DataTypes;
var _basedata = require("./basedata");
var _user = require("./user");

function initModels(sequelize) {
  var basedata = _basedata(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    basedata,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
