// models/baseData.js
const db = require("../db.js");
const getList = async function () {
  const list = await db.basedata.findAll({
    attributes: { exclude: ['id'] }
  });
  return list; // 返回数据
};
module.exports = {
  getList
};
