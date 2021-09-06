// routes/baseData.js
const baseData = require('../controllers/baseData.js');
const router = require('koa-router')();
router.get('/getList', baseData.getList);
router.post('/getToolsWarehouseListDict', baseData.getToolsWarehouseListDict);
module.exports = router; // 把router规则暴露出去