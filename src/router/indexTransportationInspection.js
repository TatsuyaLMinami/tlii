module.exports =  {
	path: "/transportationInspection", 
	name: "运检作业管理",
	children: [
		{ 
            path: '/transportationInspection/patrol', 
            name: '巡视值守管理', 
            children: [
                { 
                    path: '/transportationInspection/patrol/inspectionCycle', 
                    name: '巡视周期管理', 
                    label: '巡视周期管理', 
                    component: () => import(/* webpackChunkName: "inspectionCycle" */ 
                    '@/pages/transportationInspection/patrol/inspectionCycle.vue') 
                },
                { 
                    path: '/transportationInspection/patrol/inspectionTask', 
                    name: '巡视任务管理', 
                    label: '巡视任务管理', 
                    component: () => import(/* webpackChunkName: "inspectionTask" */ 
                    '@/pages/transportationInspection/patrol/inspectionTask.vue') 
                },
                { 
                    path: '/transportationInspection/patrol/mannedMission', 
                    name: '值守任务管理', 
                    label: '值守任务管理', 
                    component: () => import(/* webpackChunkName: "mannedMission" */ 
                    '@/pages/transportationInspection/patrol/mannedMission.vue') 
                },
                { 
                    path: '/transportationInspection/patrol/patrolQuery', 
                    name: '巡视查询统计', 
                    label: '巡视查询统计', 
                    component: () => import(/* webpackChunkName: "patrolQuery" */ 
                    '@/pages/transportationInspection/patrol/patrolQuery.vue') 
                },
            ]
        },
        { 
            path: '/transportationInspection/defect', 
            name: '缺陷管理',
            label: '缺陷管理', 
            component: () => import(/* webpackChunkName: "defect" */ 
                    '@/pages/transportationInspection/defect.vue') 
        }, 
        { 
            path: '/transportationInspection/hiddenDanger', 
            name: '隐患管理', 
            label: '隐患管理', 
            component: () => import(/* webpackChunkName: "hiddenDanger" */ 
                    '@/pages/transportationInspection/hiddenDanger.vue') 
        },
        { 
            path: '/transportationInspection/fault', 
            name: '故障管理',
            label: '故障管理', 
            component: () => import(/* webpackChunkName: "fault" */ 
                    '@/pages/transportationInspection/fault.vue')  
        },
        { 
            path: '/transportationInspection/monitor', 
            name: '监控管理',
            children: [
                { 
                    path: '/transportationInspection/monitor/monitorTask', 
                    name: '监控任务管理', 
                    label: '监控任务管理', 
                    component: () => import(/* webpackChunkName: "monitorTask" */ 
                    '@/pages/transportationInspection/monitor/monitorTask.vue') 
                },
                { 
                    path: '/transportationInspection/monitor/monitorResultHandle', 
                    name: '监控结果处理', 
                    label: '监控结果处理', 
                    component: () => import(/* webpackChunkName: "monitorResultHandle" */ 
                    '@/pages/transportationInspection/monitor/monitorResultHandle.vue') 
                },
            ] 
        },
        { 
            path: '/transportationInspection/UAVInspection', 
            name: '无人机巡检管理', 
            children: [
                { 
                    path: '/transportationInspection/UAVInspection/UAVCR', 
                    name: '无人机领用归还管理', 
                    label: '无人机领用归还管理', 
                    component: () => import(/* webpackChunkName: "UAVCR" */ 
                    '@/pages/transportationInspection/UAVInspection/UAVCR.vue') 
                },
                { 
                    path: '/transportationInspection/UAVInspection/inspectionImageRecognition', 
                    name: '巡检图像识别', 
                    label: '巡检图像识别', 
                    component: () => import(/* webpackChunkName: "inspectionImageRecognition" */ 
                    '@/pages/transportationInspection/UAVInspection/inspectionImageRecognition.vue') 
                },
                { 
                    path: '/transportationInspection/UAVInspection/inspectionResultHandle', 
                    name: '巡检结果处理', 
                    label: '巡检结果处理', 
                    component: () => import(/* webpackChunkName: "inspectionResultHandle" */ 
                    '@/pages/transportationInspection/UAVInspection/inspectionResultHandle.vue') 
                },
                // { 
                //     path: '/transportationInspection/UAVInspection/defectIdentification', 
                //     name: '缺陷识别', 
                //     component: () => import(/* webpackChunkName: "defectIdentification" */ 
                //     '@/pages/transportationInspection/UAVInspection/defectIdentification.vue') 
                // },
                { 
                    path: '/transportationInspection/UAVInspection/inspectionResult', 
                    name: '巡视结果管理', 
                    label: '巡视结果管理', 
                    component: () => import(/* webpackChunkName: "inspectionResult" */ 
                    '@/pages/transportationInspection/UAVInspection/inspectionResult.vue') 
                },
                { 
                    path: '/transportationInspection/UAVInspection/queryStatistics', 
                    name: '查询统计', 
                    label: '查询统计', 
                    component: () => import(/* webpackChunkName: "queryStatistics" */ 
                    '@/pages/transportationInspection/UAVInspection/queryStatistics.vue') 
                },
            ]
        },
        { 
            path: '/transportationInspection/fixedConstructionSite', 
            name: '固定施工点管理', 
            label: '固定施工点管理', 
            component: () => import(/* webpackChunkName: "fixedConstructionSite" */ 
                    '@/pages/transportationInspection/fixedConstructionSite.vue')
            
        },
        { 
            path: '/transportationInspection/tool', 
            name: '工器具管理', 
            children: [
                { 
                    path: '/transportationInspection/tool/toolWarehouse', 
                    name: '工器具仓库', 
                    label: '工器具仓库', 
                    component: () => import(/* webpackChunkName: "toolWarehouse" */ 
                    '@/pages/transportationInspection/tool/toolWarehouse.vue') 
                },
                { 
                    path: '/transportationInspection/tool/toolInventory', 
                    name: '工器具库存', 
                    label: '工器具库存', 
                    component: () => import(/* webpackChunkName: "toolInventory" */ 
                    '@/pages/transportationInspection/tool/toolInventory.vue') 
                },
                { 
                    path: '/transportationInspection/tool/toolReceive', 
                    name: '工器具领用', 
                    label: '工器具领用', 
                    component: () => import(/* webpackChunkName: "toolReceive" */ 
                    '@/pages/transportationInspection/tool/toolReceive.vue') 
                },
                { 
                    path: '/transportationInspection/tool/toolReturn', 
                    name: '工器具归还', 
                    label: '工器具归还', 
                    component: () => import(/* webpackChunkName: "toolReturn" */ 
                    '@/pages/transportationInspection/tool/toolReturn.vue') 
                },
            ]
        },
        { 
            path: '/transportationInspection/outagePlan', 
            name: '停电计划查询', 
            label: '停电计划查询', 
            component: () => import(/* webpackChunkName: "outagePlan" */ 
                    '@/pages/transportationInspection/outagePlan.vue')
        },
        { 
            path: '/transportationInspection/wireProtectionTeam', 
            name: '护线队管理 ', 

            children: [
                { 
                    path: '/transportationInspection/wireProtectionTeam/wireProtectionTeam', 
                    name: '护线队管理', 
                    label: '护线队管理', 
                    component: () => import(/* webpackChunkName: "wireProtectionTeamRegistration" */ 
                    '@/pages/transportationInspection/wireProtectionTeam/wireProtectionTeam.vue') 
                },
                { 
                    path: '/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson', 
                    name: '护线队人员管理', 
                    label: '护线队人员管理', 
                    component: () => import(/* webpackChunkName: "wireProtectionTeamPerson" */ 
                    '@/pages/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson.vue') 
                },
            ]
        },
	]
}