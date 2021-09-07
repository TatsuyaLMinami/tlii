// models/user.js
const db = require("../db.js")
const getUserByUserName = async function (userName) {
  const userInfo = await db.user.findOne({
    where: {
      user_name: userName,
    }
  });
  return userInfo; // 返回数据
};
module.exports = {
  getUserByUserName // 导出getUserById的方法，将会在controller里调用
};
