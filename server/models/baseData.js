// models/baseData.js
const db = require("../config/db.js"),
  Sequelize = require("sequelize"),
  baseDataModel = "../schema/baseData.js"; // 引入baseData的表结构
const tlii = db.tlii; // 引入数据库
const BaseData = require(baseDataModel)(tlii, Sequelize.DataTypes); // 新版本写法
const getList = async function () {
  const list = await BaseData.findAll({
    attributes: { exclude: ['id'] }
  });
  return list; // 返回数据
};
module.exports = {
  getList
};
