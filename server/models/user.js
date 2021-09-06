// models/user.js
const Sequelize = require("sequelize");
const db = require("../config/db.js"),
  userModel = "../schema/user.js"; // 引入user的表结构
const tlii = db.tlii; // 引入数据库
const User = require(userModel)(tlii, Sequelize.DataTypes); // 新版本写法
const getUserByUserName = async function (userName) {
  const userInfo = await User.findOne({
    where: {
      user_name: userName,
    }
  });
  return userInfo; // 返回数据
};
module.exports = {
  getUserByUserName // 导出getUserById的方法，将会在controller里调用
};
