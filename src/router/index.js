const Vue = require('vue');
const Router = require('vue-router');
const loginRoutes = require('./indexLogin');
const indexSystem = require('./indexSystem');
const deviceResource = require('./indexDeviceResource');
const panoramicMonitoring = require('./indexPanoramicMonitoring');
const indexTransportationInspection = require('./indexTransportationInspection');
Vue.use(Router)
var router = new Router({
	mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。不过还需要后端配合，
	routes: [
		loginRoutes,
		deviceResource,
		panoramicMonitoring,
		indexTransportationInspection,
		indexSystem
	]
})
module.exports = router;