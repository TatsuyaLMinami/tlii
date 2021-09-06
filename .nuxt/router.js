import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _438eb69d = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _1e41342f = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _65c367d0 = () => interopDefault(import('..\\pages\\common\\eventBus.js' /* webpackChunkName: "pages/common/eventBus" */))
const _354c77b6 = () => interopDefault(import('..\\pages\\deviceResource\\importantPassage.vue' /* webpackChunkName: "pages/deviceResource/importantPassage" */))
const _7d8945dd = () => interopDefault(import('..\\pages\\deviceResource\\importantPassage\\ip.vue' /* webpackChunkName: "pages/deviceResource/importantPassage/ip" */))
const _d879ec44 = () => interopDefault(import('..\\pages\\deviceResource\\line.vue' /* webpackChunkName: "pages/deviceResource/line" */))
const _13da1f7a = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineBasicInfo.vue' /* webpackChunkName: "pages/deviceResource/line/lineBasicInfo" */))
const _8734c168 = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineTable.vue' /* webpackChunkName: "pages/deviceResource/line/lineTable" */))
const _5c754a90 = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineTree.vue' /* webpackChunkName: "pages/deviceResource/line/lineTree" */))
const _e287cf40 = () => interopDefault(import('..\\pages\\deviceResource\\monitor.vue' /* webpackChunkName: "pages/deviceResource/monitor" */))
const _f15d8386 = () => interopDefault(import('..\\pages\\deviceResource\\monitor\\m.vue' /* webpackChunkName: "pages/deviceResource/monitor/m" */))
const _6588f010 = () => interopDefault(import('..\\pages\\deviceResource\\resource.vue' /* webpackChunkName: "pages/deviceResource/resource" */))
const _23550426 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\Equipment.vue' /* webpackChunkName: "pages/deviceResource/resource/Equipment" */))
const _71ad7ca0 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\MapLabelWindow.vue' /* webpackChunkName: "pages/deviceResource/resource/MapLabelWindow" */))
const _4a256406 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\ProjectPopupMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/ProjectPopupMsg" */))
const _6bce58b3 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\StatePopup.vue' /* webpackChunkName: "pages/deviceResource/resource/StatePopup" */))
const _f53b7404 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\WorkPopupMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/WorkPopupMsg" */))
const _338b4922 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\equipment\\BadMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/equipment/BadMsg" */))
const _386068a8 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\JianCe.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/JianCe" */))
const _38506c35 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\SanKua.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/SanKua" */))
const _e14d68d4 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\ZiYuan.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/ZiYuan" */))
const _6053dfb2 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\ZuoYe.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/ZuoYe" */))
const _429a12ac = () => interopDefault(import('..\\pages\\deviceResource\\threeCross.vue' /* webpackChunkName: "pages/deviceResource/threeCross" */))
const _93dad9ca = () => interopDefault(import('..\\pages\\deviceResource\\threeCross\\tc.vue' /* webpackChunkName: "pages/deviceResource/threeCross/tc" */))
const _90a45a60 = () => interopDefault(import('..\\pages\\deviceResource\\threeD.vue' /* webpackChunkName: "pages/deviceResource/threeD" */))
const _4a0deecc = () => interopDefault(import('..\\pages\\main\\Header.vue' /* webpackChunkName: "pages/main/Header" */))
const _7fd385f4 = () => interopDefault(import('..\\pages\\main\\Left.vue' /* webpackChunkName: "pages/main/Left" */))
const _73994e3f = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster" */))
const _377a5e90 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogDetail.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogDetail" */))
const _19bc2356 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogInfo.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogInfo" */))
const _2878041d = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogWeather.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogWeather" */))
const _f6fb2f28 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\videoSurveillance.vue' /* webpackChunkName: "pages/panoramicMonitoring/videoSurveillance" */))
const _04cb4483 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\visualChannelMonitoring.vue' /* webpackChunkName: "pages/panoramicMonitoring/visualChannelMonitoring" */))
const _39c1581a = () => interopDefault(import('..\\pages\\public\\barChart.vue' /* webpackChunkName: "pages/public/barChart" */))
const _dce4cd6a = () => interopDefault(import('..\\pages\\public\\lineChart.vue' /* webpackChunkName: "pages/public/lineChart" */))
const _36398a7e = () => interopDefault(import('..\\pages\\public\\pieChart.vue' /* webpackChunkName: "pages/public/pieChart" */))
const _53f669a9 = () => interopDefault(import('..\\pages\\public\\publicDetail.vue' /* webpackChunkName: "pages/public/publicDetail" */))
const _3f2cfb20 = () => interopDefault(import('..\\pages\\public\\publicDialog.vue' /* webpackChunkName: "pages/public/publicDialog" */))
const _99cba0ae = () => interopDefault(import('..\\pages\\public\\publicDialogMulti.vue' /* webpackChunkName: "pages/public/publicDialogMulti" */))
const _548c86c8 = () => interopDefault(import('..\\pages\\public\\publicForm.vue' /* webpackChunkName: "pages/public/publicForm" */))
const _23b806a6 = () => interopDefault(import('..\\pages\\public\\publicTransition.vue' /* webpackChunkName: "pages/public/publicTransition" */))
const _07c73029 = () => interopDefault(import('..\\pages\\system\\menuSys.vue' /* webpackChunkName: "pages/system/menuSys" */))
const _3b148a7c = () => interopDefault(import('..\\pages\\system\\message.vue' /* webpackChunkName: "pages/system/message" */))
const _926e2eca = () => interopDefault(import('..\\pages\\system\\message\\m.vue' /* webpackChunkName: "pages/system/message/m" */))
const _16338ef0 = () => interopDefault(import('..\\pages\\system\\organization.vue' /* webpackChunkName: "pages/system/organization" */))
const _702b906b = () => interopDefault(import('..\\pages\\system\\organization\\or.vue' /* webpackChunkName: "pages/system/organization/or" */))
const _6c6079dd = () => interopDefault(import('..\\pages\\system\\orgTree.vue' /* webpackChunkName: "pages/system/orgTree" */))
const _0814b76a = () => interopDefault(import('..\\pages\\system\\person.vue' /* webpackChunkName: "pages/system/person" */))
const _3959755f = () => interopDefault(import('..\\pages\\system\\person\\pe.vue' /* webpackChunkName: "pages/system/person/pe" */))
const _aec4016a = () => interopDefault(import('..\\pages\\system\\role.vue' /* webpackChunkName: "pages/system/role" */))
const _66408108 = () => interopDefault(import('..\\pages\\system\\role\\ro.vue' /* webpackChunkName: "pages/system/role/ro" */))
const _4eac9ca8 = () => interopDefault(import('..\\pages\\system\\standardizedKnowledge.vue' /* webpackChunkName: "pages/system/standardizedKnowledge" */))
const _3941e457 = () => interopDefault(import('..\\pages\\transportationInspection\\defect.vue' /* webpackChunkName: "pages/transportationInspection/defect" */))
const _0898fca4 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectMap.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectMap" */))
const _0acffcea = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics" */))
const _01e7919c = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectCheck.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectCheck" */))
const _c3358f3e = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectClear.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectClear" */))
const _c4c66d54 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectDisplay.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectDisplay" */))
const _3343e89a = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\ds.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/ds" */))
const _9dc59da8 = () => interopDefault(import('..\\pages\\transportationInspection\\fault.vue' /* webpackChunkName: "pages/transportationInspection/fault" */))
const _7d717e86 = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultMap.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultMap" */))
const _0f25fd69 = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics" */))
const _74462b34 = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics\\faultClear.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics/faultClear" */))
const _19fe76b6 = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics\\fs.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics/fs" */))
const _14e6f554 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite" */))
const _2a30db70 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fcs.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fcs" */))
const _8188ec74 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fixedConstructionSiteMap.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fixedConstructionSiteMap" */))
const _7084eab8 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fixedConstructionSiteTable.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fixedConstructionSiteTable" */))
const _731022d3 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger" */))
const _5f5e9328 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerMap.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerMap" */))
const _485936c3 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics" */))
const _1280aeed = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics\\hiddenDangerClear.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics/hiddenDangerClear" */))
const _a569b764 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics\\hs.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics/hs" */))
const _9c5095c0 = () => interopDefault(import('..\\pages\\transportationInspection\\outagePlan.vue' /* webpackChunkName: "pages/transportationInspection/outagePlan" */))
const _753ec96a = () => interopDefault(import('..\\pages\\common\\formComponents\\FormSelect.vue' /* webpackChunkName: "pages/common/formComponents/FormSelect" */))
const _c98a8bd8 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\account.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/account" */))
const _55559a94 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\account\\ac.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/account/ac" */))
const _e832c010 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm" */))
const _20925a23 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm\\al.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm/al" */))
const _3cd6f196 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm\\alarmPatrol.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm/alarmPatrol" */))
const _4ea50d14 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarmRule.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarmRule" */))
const _6798e823 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarmRule\\alR.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarmRule/alR" */))
const _71d3babe = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center" */))
const _b75e835c = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omChart.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omChart" */))
const _2b69d484 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omDialog.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omDialog" */))
const _5323fca0 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omDialog\\omTree.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omDialog/omTree" */))
const _60ecab7c = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omTable" */))
const _4b5a2aef = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query" */))
const _55cb7c87 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\dialogTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/dialogTable" */))
const _52394e56 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTable" */))
const _1c7613ea = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTable\\omTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTable/omTable" */))
const _3405bbe7 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTree.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTree" */))
const _f5d81b56 = () => interopDefault(import('..\\pages\\system\\log\\log.vue' /* webpackChunkName: "pages/system/log/log" */))
const _8162ed4c = () => interopDefault(import('..\\pages\\system\\log\\loginLog.vue' /* webpackChunkName: "pages/system/log/loginLog" */))
const _b7b6ec78 = () => interopDefault(import('..\\pages\\system\\log\\loginLogTable.vue' /* webpackChunkName: "pages/system/log/loginLogTable" */))
const _545ef4ae = () => interopDefault(import('..\\pages\\system\\log\\logTable.vue' /* webpackChunkName: "pages/system/log/logTable" */))
const _dac41268 = () => interopDefault(import('..\\pages\\system\\menu\\me.vue' /* webpackChunkName: "pages/system/menu/me" */))
const _ced48e2a = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle" */))
const _b3c05a08 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle\\taskRight.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle/taskRight" */))
const _83f09c24 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle\\taskTree.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle/taskTree" */))
const _b92e986a = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorTask.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorTask" */))
const _5949a01c = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorTask\\mt.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorTask/mt" */))
const _cff0d7e0 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionCycle.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionCycle" */))
const _ccd918ac = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionCycle\\ic.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionCycle/ic" */))
const _39b7b7cb = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionTask.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionTask" */))
const _48965d14 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionTask\\it.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionTask/it" */))
const _7b52ea57 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\mannedMission.vue' /* webpackChunkName: "pages/transportationInspection/patrol/mannedMission" */))
const _b2e6c812 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\mannedMission\\mm.vue' /* webpackChunkName: "pages/transportationInspection/patrol/mannedMission/mm" */))
const _a65b17cc = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\patrolQuery.vue' /* webpackChunkName: "pages/transportationInspection/patrol/patrolQuery" */))
const _4a1e3516 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolInventory.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolInventory" */))
const _40dffd8b = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolInventory\\ti.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolInventory/ti" */))
const _0dfc58c6 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReceive.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReceive" */))
const _cf21f14c = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReceive\\tre.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReceive/tre" */))
const _d4f4f834 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReturn.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReturn" */))
const _274b1cb1 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReturn\\tre.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReturn/tre" */))
const _5ab04afd = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolWarehouse.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolWarehouse" */))
const _2447de00 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolWarehouse\\tw.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolWarehouse/tw" */))
const _cd264cb2 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\defectIdentification.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/defectIdentification" */))
const _1a7d2fd8 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition" */))
const _a69faa4a = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition\\imageDialog.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition/imageDialog" */))
const _8b7fd926 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition\\loadImage.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition/loadImage" */))
const _35c6d519 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResult.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResult" */))
const _5aca26a1 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle" */))
const _3c493454 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\checkImage.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/checkImage" */))
const _642c115e = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhRight.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhRight" */))
const _4b2c6210 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhTable.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhTable" */))
const _77adc168 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhTree.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhTree" */))
const _601ea25a = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\queryStatistics.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/queryStatistics" */))
const _66bbc5fe = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR" */))
const _a85bec80 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavBack.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavBack" */))
const _7d9c01f7 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavList.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavList" */))
const _60c50acc = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceive.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceive" */))
const _3456ab57 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceiveAdd.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceiveAdd" */))
const _21334721 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceiveBack.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceiveBack" */))
const _6b3831dc = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeam" */))
const _d510636a = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam\\w.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeam/w" */))
const _9bbb185e = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson" */))
const _ff3cd5ac = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson\\wp.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson/wp" */))
const _140d3770 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\DefectModal.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/DefectModal" */))
const _d5a3c33e = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionDefect.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionDefect" */))
const _67473675 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTask.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTask" */))
const _062d216e = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTower.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTower" */))
const _6302ed7c = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTowerLists.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTowerLists" */))
const _5ec25f26 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\taskPath.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/taskPath" */))
const _4a8815dc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _438eb69d,
    name: "home"
  }, {
    path: "/login",
    component: _1e41342f,
    name: "login"
  }, {
    path: "/common/eventBus",
    component: _65c367d0,
    name: "common-eventBus"
  }, {
    path: "/deviceResource/importantPassage",
    component: _354c77b6,
    name: "deviceResource-importantPassage",
    children: [{
      path: "ip",
      component: _7d8945dd,
      name: "deviceResource-importantPassage-ip"
    }]
  }, {
    path: "/deviceResource/line",
    component: _d879ec44,
    name: "deviceResource-line",
    children: [{
      path: "lineBasicInfo",
      component: _13da1f7a,
      name: "deviceResource-line-lineBasicInfo"
    }, {
      path: "lineTable",
      component: _8734c168,
      name: "deviceResource-line-lineTable"
    }, {
      path: "lineTree",
      component: _5c754a90,
      name: "deviceResource-line-lineTree"
    }]
  }, {
    path: "/deviceResource/monitor",
    component: _e287cf40,
    name: "deviceResource-monitor",
    children: [{
      path: "m",
      component: _f15d8386,
      name: "deviceResource-monitor-m"
    }]
  }, {
    path: "/deviceResource/resource",
    component: _6588f010,
    name: "deviceResource-resource",
    children: [{
      path: "Equipment",
      component: _23550426,
      name: "deviceResource-resource-Equipment"
    }, {
      path: "MapLabelWindow",
      component: _71ad7ca0,
      name: "deviceResource-resource-MapLabelWindow"
    }, {
      path: "ProjectPopupMsg",
      component: _4a256406,
      name: "deviceResource-resource-ProjectPopupMsg"
    }, {
      path: "StatePopup",
      component: _6bce58b3,
      name: "deviceResource-resource-StatePopup"
    }, {
      path: "WorkPopupMsg",
      component: _f53b7404,
      name: "deviceResource-resource-WorkPopupMsg"
    }, {
      path: "equipment/BadMsg",
      component: _338b4922,
      name: "deviceResource-resource-equipment-BadMsg"
    }, {
      path: "fourPopup/JianCe",
      component: _386068a8,
      name: "deviceResource-resource-fourPopup-JianCe"
    }, {
      path: "fourPopup/SanKua",
      component: _38506c35,
      name: "deviceResource-resource-fourPopup-SanKua"
    }, {
      path: "fourPopup/ZiYuan",
      component: _e14d68d4,
      name: "deviceResource-resource-fourPopup-ZiYuan"
    }, {
      path: "fourPopup/ZuoYe",
      component: _6053dfb2,
      name: "deviceResource-resource-fourPopup-ZuoYe"
    }]
  }, {
    path: "/deviceResource/threeCross",
    component: _429a12ac,
    name: "deviceResource-threeCross",
    children: [{
      path: "tc",
      component: _93dad9ca,
      name: "deviceResource-threeCross-tc"
    }]
  }, {
    path: "/deviceResource/threeD",
    component: _90a45a60,
    name: "deviceResource-threeD"
  }, {
    path: "/main/Header",
    component: _4a0deecc,
    name: "main-Header"
  }, {
    path: "/main/Left",
    component: _7fd385f4,
    name: "main-Left"
  }, {
    path: "/panoramicMonitoring/gridDisaster",
    component: _73994e3f,
    name: "panoramicMonitoring-gridDisaster",
    children: [{
      path: "dialogDetail",
      component: _377a5e90,
      name: "panoramicMonitoring-gridDisaster-dialogDetail"
    }, {
      path: "dialogInfo",
      component: _19bc2356,
      name: "panoramicMonitoring-gridDisaster-dialogInfo"
    }, {
      path: "dialogWeather",
      component: _2878041d,
      name: "panoramicMonitoring-gridDisaster-dialogWeather"
    }]
  }, {
    path: "/panoramicMonitoring/videoSurveillance",
    component: _f6fb2f28,
    name: "panoramicMonitoring-videoSurveillance"
  }, {
    path: "/panoramicMonitoring/visualChannelMonitoring",
    component: _04cb4483,
    name: "panoramicMonitoring-visualChannelMonitoring"
  }, {
    path: "/public/barChart",
    component: _39c1581a,
    name: "public-barChart"
  }, {
    path: "/public/lineChart",
    component: _dce4cd6a,
    name: "public-lineChart"
  }, {
    path: "/public/pieChart",
    component: _36398a7e,
    name: "public-pieChart"
  }, {
    path: "/public/publicDetail",
    component: _53f669a9,
    name: "public-publicDetail"
  }, {
    path: "/public/publicDialog",
    component: _3f2cfb20,
    name: "public-publicDialog"
  }, {
    path: "/public/publicDialogMulti",
    component: _99cba0ae,
    name: "public-publicDialogMulti"
  }, {
    path: "/public/publicForm",
    component: _548c86c8,
    name: "public-publicForm"
  }, {
    path: "/public/publicTransition",
    component: _23b806a6,
    name: "public-publicTransition"
  }, {
    path: "/system/menuSys",
    component: _07c73029,
    name: "system-menuSys"
  }, {
    path: "/system/message",
    component: _3b148a7c,
    name: "system-message",
    children: [{
      path: "m",
      component: _926e2eca,
      name: "system-message-m"
    }]
  }, {
    path: "/system/organization",
    component: _16338ef0,
    name: "system-organization",
    children: [{
      path: "or",
      component: _702b906b,
      name: "system-organization-or"
    }]
  }, {
    path: "/system/orgTree",
    component: _6c6079dd,
    name: "system-orgTree"
  }, {
    path: "/system/person",
    component: _0814b76a,
    name: "system-person",
    children: [{
      path: "pe",
      component: _3959755f,
      name: "system-person-pe"
    }]
  }, {
    path: "/system/role",
    component: _aec4016a,
    name: "system-role",
    children: [{
      path: "ro",
      component: _66408108,
      name: "system-role-ro"
    }]
  }, {
    path: "/system/standardizedKnowledge",
    component: _4eac9ca8,
    name: "system-standardizedKnowledge"
  }, {
    path: "/transportationInspection/defect",
    component: _3941e457,
    name: "transportationInspection-defect",
    children: [{
      path: "defectMap",
      component: _0898fca4,
      name: "transportationInspection-defect-defectMap"
    }, {
      path: "defectStatistics",
      component: _0acffcea,
      name: "transportationInspection-defect-defectStatistics",
      children: [{
        path: "defectCheck",
        component: _01e7919c,
        name: "transportationInspection-defect-defectStatistics-defectCheck"
      }, {
        path: "defectClear",
        component: _c3358f3e,
        name: "transportationInspection-defect-defectStatistics-defectClear"
      }, {
        path: "defectDisplay",
        component: _c4c66d54,
        name: "transportationInspection-defect-defectStatistics-defectDisplay"
      }, {
        path: "ds",
        component: _3343e89a,
        name: "transportationInspection-defect-defectStatistics-ds"
      }]
    }]
  }, {
    path: "/transportationInspection/fault",
    component: _9dc59da8,
    name: "transportationInspection-fault",
    children: [{
      path: "faultMap",
      component: _7d717e86,
      name: "transportationInspection-fault-faultMap"
    }, {
      path: "faultStatistics",
      component: _0f25fd69,
      name: "transportationInspection-fault-faultStatistics",
      children: [{
        path: "faultClear",
        component: _74462b34,
        name: "transportationInspection-fault-faultStatistics-faultClear"
      }, {
        path: "fs",
        component: _19fe76b6,
        name: "transportationInspection-fault-faultStatistics-fs"
      }]
    }]
  }, {
    path: "/transportationInspection/fixedConstructionSite",
    component: _14e6f554,
    name: "transportationInspection-fixedConstructionSite",
    children: [{
      path: "fcs",
      component: _2a30db70,
      name: "transportationInspection-fixedConstructionSite-fcs"
    }, {
      path: "fixedConstructionSiteMap",
      component: _8188ec74,
      name: "transportationInspection-fixedConstructionSite-fixedConstructionSiteMap"
    }, {
      path: "fixedConstructionSiteTable",
      component: _7084eab8,
      name: "transportationInspection-fixedConstructionSite-fixedConstructionSiteTable"
    }]
  }, {
    path: "/transportationInspection/hiddenDanger",
    component: _731022d3,
    name: "transportationInspection-hiddenDanger",
    children: [{
      path: "hiddenDangerMap",
      component: _5f5e9328,
      name: "transportationInspection-hiddenDanger-hiddenDangerMap"
    }, {
      path: "hiddenDangerStatistics",
      component: _485936c3,
      name: "transportationInspection-hiddenDanger-hiddenDangerStatistics",
      children: [{
        path: "hiddenDangerClear",
        component: _1280aeed,
        name: "transportationInspection-hiddenDanger-hiddenDangerStatistics-hiddenDangerClear"
      }, {
        path: "hs",
        component: _a569b764,
        name: "transportationInspection-hiddenDanger-hiddenDangerStatistics-hs"
      }]
    }]
  }, {
    path: "/transportationInspection/outagePlan",
    component: _9c5095c0,
    name: "transportationInspection-outagePlan"
  }, {
    path: "/common/formComponents/FormSelect",
    component: _753ec96a,
    name: "common-formComponents-FormSelect"
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/account",
    component: _c98a8bd8,
    name: "panoramicMonitoring-deviceOnlineMonitoring-account",
    children: [{
      path: "ac",
      component: _55559a94,
      name: "panoramicMonitoring-deviceOnlineMonitoring-account-ac"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/alarm",
    component: _e832c010,
    name: "panoramicMonitoring-deviceOnlineMonitoring-alarm",
    children: [{
      path: "al",
      component: _20925a23,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarm-al"
    }, {
      path: "alarmPatrol",
      component: _3cd6f196,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarm-alarmPatrol"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/alarmRule",
    component: _4ea50d14,
    name: "panoramicMonitoring-deviceOnlineMonitoring-alarmRule",
    children: [{
      path: "alR",
      component: _6798e823,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarmRule-alR"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/center",
    component: _71d3babe,
    name: "panoramicMonitoring-deviceOnlineMonitoring-center",
    children: [{
      path: "omChart",
      component: _b75e835c,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omChart"
    }, {
      path: "omDialog",
      component: _2b69d484,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omDialog",
      children: [{
        path: "omTree",
        component: _5323fca0,
        name: "panoramicMonitoring-deviceOnlineMonitoring-center-omDialog-omTree"
      }]
    }, {
      path: "omTable",
      component: _60ecab7c,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omTable"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/query",
    component: _4b5a2aef,
    name: "panoramicMonitoring-deviceOnlineMonitoring-query",
    children: [{
      path: "dialogTable",
      component: _55cb7c87,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-dialogTable"
    }, {
      path: "queryTable",
      component: _52394e56,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTable",
      children: [{
        path: "omTable",
        component: _1c7613ea,
        name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTable-omTable"
      }]
    }, {
      path: "queryTree",
      component: _3405bbe7,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTree"
    }]
  }, {
    path: "/system/log/log",
    component: _f5d81b56,
    name: "system-log-log"
  }, {
    path: "/system/log/loginLog",
    component: _8162ed4c,
    name: "system-log-loginLog"
  }, {
    path: "/system/log/loginLogTable",
    component: _b7b6ec78,
    name: "system-log-loginLogTable"
  }, {
    path: "/system/log/logTable",
    component: _545ef4ae,
    name: "system-log-logTable"
  }, {
    path: "/system/menu/me",
    component: _dac41268,
    name: "system-menu-me"
  }, {
    path: "/transportationInspection/monitor/monitorResultHandle",
    component: _ced48e2a,
    name: "transportationInspection-monitor-monitorResultHandle",
    children: [{
      path: "taskRight",
      component: _b3c05a08,
      name: "transportationInspection-monitor-monitorResultHandle-taskRight"
    }, {
      path: "taskTree",
      component: _83f09c24,
      name: "transportationInspection-monitor-monitorResultHandle-taskTree"
    }]
  }, {
    path: "/transportationInspection/monitor/monitorTask",
    component: _b92e986a,
    name: "transportationInspection-monitor-monitorTask",
    children: [{
      path: "mt",
      component: _5949a01c,
      name: "transportationInspection-monitor-monitorTask-mt"
    }]
  }, {
    path: "/transportationInspection/patrol/inspectionCycle",
    component: _cff0d7e0,
    name: "transportationInspection-patrol-inspectionCycle",
    children: [{
      path: "ic",
      component: _ccd918ac,
      name: "transportationInspection-patrol-inspectionCycle-ic"
    }]
  }, {
    path: "/transportationInspection/patrol/inspectionTask",
    component: _39b7b7cb,
    name: "transportationInspection-patrol-inspectionTask",
    children: [{
      path: "it",
      component: _48965d14,
      name: "transportationInspection-patrol-inspectionTask-it"
    }]
  }, {
    path: "/transportationInspection/patrol/mannedMission",
    component: _7b52ea57,
    name: "transportationInspection-patrol-mannedMission",
    children: [{
      path: "mm",
      component: _b2e6c812,
      name: "transportationInspection-patrol-mannedMission-mm"
    }]
  }, {
    path: "/transportationInspection/patrol/patrolQuery",
    component: _a65b17cc,
    name: "transportationInspection-patrol-patrolQuery"
  }, {
    path: "/transportationInspection/tool/toolInventory",
    component: _4a1e3516,
    name: "transportationInspection-tool-toolInventory",
    children: [{
      path: "ti",
      component: _40dffd8b,
      name: "transportationInspection-tool-toolInventory-ti"
    }]
  }, {
    path: "/transportationInspection/tool/toolReceive",
    component: _0dfc58c6,
    name: "transportationInspection-tool-toolReceive",
    children: [{
      path: "tre",
      component: _cf21f14c,
      name: "transportationInspection-tool-toolReceive-tre"
    }]
  }, {
    path: "/transportationInspection/tool/toolReturn",
    component: _d4f4f834,
    name: "transportationInspection-tool-toolReturn",
    children: [{
      path: "tre",
      component: _274b1cb1,
      name: "transportationInspection-tool-toolReturn-tre"
    }]
  }, {
    path: "/transportationInspection/tool/toolWarehouse",
    component: _5ab04afd,
    name: "transportationInspection-tool-toolWarehouse",
    children: [{
      path: "tw",
      component: _2447de00,
      name: "transportationInspection-tool-toolWarehouse-tw"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/defectIdentification",
    component: _cd264cb2,
    name: "transportationInspection-UAVInspection-defectIdentification"
  }, {
    path: "/transportationInspection/UAVInspection/inspectionImageRecognition",
    component: _1a7d2fd8,
    name: "transportationInspection-UAVInspection-inspectionImageRecognition",
    children: [{
      path: "imageDialog",
      component: _a69faa4a,
      name: "transportationInspection-UAVInspection-inspectionImageRecognition-imageDialog"
    }, {
      path: "loadImage",
      component: _8b7fd926,
      name: "transportationInspection-UAVInspection-inspectionImageRecognition-loadImage"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/inspectionResult",
    component: _35c6d519,
    name: "transportationInspection-UAVInspection-inspectionResult"
  }, {
    path: "/transportationInspection/UAVInspection/inspectionResultHandle",
    component: _5aca26a1,
    name: "transportationInspection-UAVInspection-inspectionResultHandle",
    children: [{
      path: "checkImage",
      component: _3c493454,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-checkImage"
    }, {
      path: "irhRight",
      component: _642c115e,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhRight"
    }, {
      path: "irhTable",
      component: _4b2c6210,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhTable"
    }, {
      path: "irhTree",
      component: _77adc168,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhTree"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/queryStatistics",
    component: _601ea25a,
    name: "transportationInspection-UAVInspection-queryStatistics"
  }, {
    path: "/transportationInspection/UAVInspection/UAVCR",
    component: _66bbc5fe,
    name: "transportationInspection-UAVInspection-UAVCR",
    children: [{
      path: "uavBack",
      component: _a85bec80,
      name: "transportationInspection-UAVInspection-UAVCR-uavBack"
    }, {
      path: "uavList",
      component: _7d9c01f7,
      name: "transportationInspection-UAVInspection-UAVCR-uavList"
    }, {
      path: "uavReceive",
      component: _60c50acc,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceive"
    }, {
      path: "uavReceiveAdd",
      component: _3456ab57,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceiveAdd"
    }, {
      path: "uavReceiveBack",
      component: _21334721,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceiveBack"
    }]
  }, {
    path: "/transportationInspection/wireProtectionTeam/wireProtectionTeam",
    component: _6b3831dc,
    name: "transportationInspection-wireProtectionTeam-wireProtectionTeam",
    children: [{
      path: "w",
      component: _d510636a,
      name: "transportationInspection-wireProtectionTeam-wireProtectionTeam-w"
    }]
  }, {
    path: "/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson",
    component: _9bbb185e,
    name: "transportationInspection-wireProtectionTeam-wireProtectionTeamPerson",
    children: [{
      path: "wp",
      component: _ff3cd5ac,
      name: "transportationInspection-wireProtectionTeam-wireProtectionTeamPerson-wp"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/inspection/DefectModal",
    component: _140d3770,
    name: "transportationInspection-UAVInspection-inspection-DefectModal"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionDefect",
    component: _d5a3c33e,
    name: "transportationInspection-UAVInspection-inspection-inspectionDefect"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTask",
    component: _67473675,
    name: "transportationInspection-UAVInspection-inspection-inspectionTask"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTower",
    component: _062d216e,
    name: "transportationInspection-UAVInspection-inspection-inspectionTower"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTowerLists",
    component: _6302ed7c,
    name: "transportationInspection-UAVInspection-inspection-inspectionTowerLists"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/taskPath",
    component: _5ec25f26,
    name: "transportationInspection-UAVInspection-inspection-taskPath"
  }, {
    path: "/",
    component: _4a8815dc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
