// controllers/resource.js
const resource = require('../models/resource.js');
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
// router.get
// 通过ctx.query获取参数
// router.post
// 通过ctx.request.body获取参数
// 动态路由 router.get('/:id', func)
// 通过ctx.params获取参数
// const jwt = require('koa-jwt'); // 引入koa-jwt
const getList = async function (ctx, next) {
    const data = ctx.query; // post过来的数据存在request.body里
    const list = await resource.getList();
    if (list !== null) { // 如果查无此会返回null
        ctx.response.body = {
            resultHint: "",
            successful: true,
            resultValue: list
        }
    } else {
        ctx.response.body = {
            successful: true,
            resultHint: '暂无数据'
        }
    }
};
module.exports = {
    getList
}