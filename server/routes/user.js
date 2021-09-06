// routes/user.js
const user = require('../controllers/user.js');
const router = require('koa-router')();
router.post('/login', user.login);
router.post('/logout', user.logout);
module.exports = router; // 把router规则暴露出去