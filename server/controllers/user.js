// controllers/user.js
const user = require('../models/user.js');
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const router = require("../../src/router/index");
// router.get
// 通过ctx.query获取参数
// router.post
// 通过ctx.request.body获取参数
// 动态路由 router.get('/:id', func)
// 通过ctx.params获取参数
// const jwt = require('koa-jwt'); // 引入koa-jwt
const logout = async function (ctx, next) {
    ctx.response.body = {
        resultHint: "退出成功",
        successful: true,
        resultValue: {}
    }
}
const login = async function (ctx, next) {
    const data = ctx.request.body; // post过来的数据存在request.body里
    const userInfo = await user.getUserByUserName(data.userName);
    if (userInfo !== null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(data.password, userInfo.password)) {
            ctx.response.body = {
                successful: false, // success标志位是方便前端判断返回是正确与否
                resultHint: '密码错误！'
            }
        } else { // 如果密码正确
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id,
                num: Math.random(),
            }
            const secret = 'secret'; // 指定密钥，这是之后用来判断token合法性的标志
            const token = jsonwebtoken.sign(userToken, secret); // 签发token
            ctx.response.body = {
                resultHint: "登陆成功",
                successful: true,
                resultValue: {
                    token: token, // 返回token
                    userName: userInfo.user_name,
                    menus: router.options.routes,
                }
            }
        }
    } else {
        ctx.response.body = {
            successful: false,
            resultHint: '用户不存在！' // 如果用户不存在返回用户不存在
        }
    }
}
module.exports = {
    logout,
    login
}