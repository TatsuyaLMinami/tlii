// routes/resource.js
const resource = require('../controllers/resource.js');
const router = require('koa-router')();
router.get('/indexEquipment/getLineLayer', resource.getList);
router.get('/indexEquipment/getTowerLayer', resource.getList);
router.post('/indexStatus/getCountByTowerId', resource.getList);
router.get('/indexStatus/getTodayMarkTowerLayer', resource.getList);
router.get('/indexStatus/getTodayNormalTowerLayer', resource.getList);
router.get('/indexTask/getTodayTaskLayer', resource.getList);
router.get('/indexTopic/getConstructionPointLayer', resource.getList);
router.get('/indexTopic/getSpanLayer', resource.getList);
module.exports = router; // 把router规则暴露出去