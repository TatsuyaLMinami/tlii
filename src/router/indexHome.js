module.exports =  { 
	path: '/', 
	name: '首页', 
	component: () => import(/* webpackChunkName: "home" */ '@/pages/home/index') 
}