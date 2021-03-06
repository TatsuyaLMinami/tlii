var DataTypes = require("sequelize").DataTypes;
var _basedata = require("./basedata");
var _line = require("./line");
var _tower = require("./tower");
var _user = require("./user");

function initModels(sequelize) {
  var basedata = _basedata(sequelize, DataTypes);
  var line = _line(sequelize, DataTypes);
  var tower = _tower(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    basedata,
    line,
    tower,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
