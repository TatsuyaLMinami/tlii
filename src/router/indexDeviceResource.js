module.exports =  {
    path: "/deviceResource",
    name: "设备资源管理",
    children: [
        {
            path: '/deviceResource/resource',
            name: '资源全景展示',
            label: '资源全景展示',
            component: () => import(/* webpackChunkName: "resource" */
                '@/pages/deviceResource/resource.vue')
        },
        {
            path: '/deviceResource/line',
            name: '线路管理',
            label: '线路管理',
            component: () => import(/* webpackChunkName: "line" */
                '@/pages/deviceResource/line.vue')
        },
        {
            path: '/deviceResource/threeCross',
            name: '三跨管理',
            label: '三跨管理',
            component: () => import(/* webpackChunkName: "threeCross" */
                '@/pages/deviceResource/threeCross.vue')
        },
        {
            path: '/deviceResource/monitor',
            name: '监拍设备管理',
            label: '监拍设备管理',
            component: () => import(/* webpackChunkName: "monitor" */
                '@/pages/deviceResource/monitor.vue')
        },
        {
            path: '/deviceResource/importantPassage',
            name: '重要通道管理',
            label: '重要通道管理',
            component: () => import(/* webpackChunkName: "importantPassage" */
                '@/pages/deviceResource/importantPassage.vue')
        },
        {
            path: '/deviceResource/threeD',
            name: '三维全息展示',
            label: '三维全息展示',
            component: () => import(/* webpackChunkName: "threeD" */
                '@/pages/deviceResource/threeD.vue')
        },
    ]
}