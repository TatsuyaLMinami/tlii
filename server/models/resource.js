// models/resource.js
const db = require("../config/db.js"),
  Sequelize = require("sequelize"),
  resourceModel = "../schema/baseData.js"; // 引入baseData的表结构
const tlii = db.tlii; // 引入数据库
const Rresource = require(resourceModel)(tlii, Sequelize.DataTypes); // 新版本写法
const getList = async function () {
  const list = await Rresource.findAll({
    attributes: { exclude: ['id'] }
  });
  return list; // 返回数据
};
module.exports = {
  getList
};