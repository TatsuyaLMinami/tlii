module.exports =  { 
	path: '/login', 
    name: '登录', 
    //redirect:"http://www.baidu.com",
	meta: {
		isShow: false
	},
	component: () => import(/* webpackChunkName: "login" */ '@/pages/login/index') 
}