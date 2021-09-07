// routes/resource.js
const resource = require('../controllers/resource.js');
const router = require('koa-router')();
router.get('/indexEquipment/getLineLayer', resource.getLineLayer);
router.get('/indexEquipment/getTowerLayer', resource.getLineLayer);
router.post('/indexStatus/getCountByTowerId', resource.getLineLayer);
router.get('/indexStatus/getTodayMarkTowerLayer', resource.getLineLayer);
router.get('/indexStatus/getTodayNormalTowerLayer', resource.getLineLayer);
router.get('/indexTask/getTodayTaskLayer', resource.getLineLayer);
router.get('/indexTopic/getConstructionPointLayer', resource.getLineLayer);
router.get('/indexTopic/getSpanLayer', resource.getLineLayer);
module.exports = router; // 把router规则暴露出去