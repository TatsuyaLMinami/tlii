import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4387cc08 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _1d6acc24 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _5668b403 = () => interopDefault(import('..\\pages\\common\\eventBus.js' /* webpackChunkName: "pages/common/eventBus" */))
const _4d27832b = () => interopDefault(import('..\\pages\\deviceResource\\importantPassage.vue' /* webpackChunkName: "pages/deviceResource/importantPassage" */))
const _5d50e25c = () => interopDefault(import('..\\pages\\deviceResource\\importantPassage\\ip.vue' /* webpackChunkName: "pages/deviceResource/importantPassage/ip" */))
const _c638465a = () => interopDefault(import('..\\pages\\deviceResource\\line.vue' /* webpackChunkName: "pages/deviceResource/line" */))
const _2f5463e5 = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineBasicInfo.vue' /* webpackChunkName: "pages/deviceResource/line/lineBasicInfo" */))
const _541e5d92 = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineTable.vue' /* webpackChunkName: "pages/deviceResource/line/lineTable" */))
const _d1d2a176 = () => interopDefault(import('..\\pages\\deviceResource\\line\\lineTree.vue' /* webpackChunkName: "pages/deviceResource/line/lineTree" */))
const _5cfd356a = () => interopDefault(import('..\\pages\\deviceResource\\monitor.vue' /* webpackChunkName: "pages/deviceResource/monitor" */))
const _9539751c = () => interopDefault(import('..\\pages\\deviceResource\\monitor\\m.vue' /* webpackChunkName: "pages/deviceResource/monitor/m" */))
const _39c04f26 = () => interopDefault(import('..\\pages\\deviceResource\\resource.vue' /* webpackChunkName: "pages/deviceResource/resource" */))
const _3ecf4891 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\Equipment.vue' /* webpackChunkName: "pages/deviceResource/resource/Equipment" */))
const _32944315 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\MapLabelWindow.vue' /* webpackChunkName: "pages/deviceResource/resource/MapLabelWindow" */))
const _b3d1279e = () => interopDefault(import('..\\pages\\deviceResource\\resource\\ProjectPopupMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/ProjectPopupMsg" */))
const _80c6bcb0 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\StatePopup.vue' /* webpackChunkName: "pages/deviceResource/resource/StatePopup" */))
const _1ec225b3 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\WorkPopupMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/WorkPopupMsg" */))
const _5b1bf28d = () => interopDefault(import('..\\pages\\deviceResource\\resource\\equipment\\BadMsg.vue' /* webpackChunkName: "pages/deviceResource/resource/equipment/BadMsg" */))
const _0b607517 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\JianCe.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/JianCe" */))
const _5fe115a0 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\SanKua.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/SanKua" */))
const _922c15fe = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\ZiYuan.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/ZiYuan" */))
const _faba4632 = () => interopDefault(import('..\\pages\\deviceResource\\resource\\fourPopup\\ZuoYe.vue' /* webpackChunkName: "pages/deviceResource/resource/fourPopup/ZuoYe" */))
const _70ac19e1 = () => interopDefault(import('..\\pages\\deviceResource\\threeCross.vue' /* webpackChunkName: "pages/deviceResource/threeCross" */))
const _1e981060 = () => interopDefault(import('..\\pages\\deviceResource\\threeCross\\tc.vue' /* webpackChunkName: "pages/deviceResource/threeCross/tc" */))
const _083486f6 = () => interopDefault(import('..\\pages\\deviceResource\\threeD.vue' /* webpackChunkName: "pages/deviceResource/threeD" */))
const _493786c1 = () => interopDefault(import('..\\pages\\main\\Header.vue' /* webpackChunkName: "pages/main/Header" */))
const _653f4e3b = () => interopDefault(import('..\\pages\\main\\Left.vue' /* webpackChunkName: "pages/main/Left" */))
const _571fb16a = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster" */))
const _173acca3 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogDetail.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogDetail" */))
const _792de900 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogInfo.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogInfo" */))
const _547f8592 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\gridDisaster\\dialogWeather.vue' /* webpackChunkName: "pages/panoramicMonitoring/gridDisaster/dialogWeather" */))
const _1de24821 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\videoSurveillance.vue' /* webpackChunkName: "pages/panoramicMonitoring/videoSurveillance" */))
const _61606f10 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\visualChannelMonitoring.vue' /* webpackChunkName: "pages/panoramicMonitoring/visualChannelMonitoring" */))
const _4c7824e2 = () => interopDefault(import('..\\pages\\public\\barChart.vue' /* webpackChunkName: "pages/public/barChart" */))
const _1c449b14 = () => interopDefault(import('..\\pages\\public\\lineChart.vue' /* webpackChunkName: "pages/public/lineChart" */))
const _f6345f94 = () => interopDefault(import('..\\pages\\public\\pieChart.vue' /* webpackChunkName: "pages/public/pieChart" */))
const _5d173c9e = () => interopDefault(import('..\\pages\\public\\publicDetail.vue' /* webpackChunkName: "pages/public/publicDetail" */))
const _484dce15 = () => interopDefault(import('..\\pages\\public\\publicDialog.vue' /* webpackChunkName: "pages/public/publicDialog" */))
const _59bfedd4 = () => interopDefault(import('..\\pages\\public\\publicDialogMulti.vue' /* webpackChunkName: "pages/public/publicDialogMulti" */))
const _7f6cc8d1 = () => interopDefault(import('..\\pages\\public\\publicForm.vue' /* webpackChunkName: "pages/public/publicForm" */))
const _04084d22 = () => interopDefault(import('..\\pages\\public\\publicTransition.vue' /* webpackChunkName: "pages/public/publicTransition" */))
const _dddccfd8 = () => interopDefault(import('..\\pages\\system\\menuSys.vue' /* webpackChunkName: "pages/system/menuSys" */))
const _6bc022ad = () => interopDefault(import('..\\pages\\system\\message.vue' /* webpackChunkName: "pages/system/message" */))
const _607bf4d0 = () => interopDefault(import('..\\pages\\system\\message\\m.vue' /* webpackChunkName: "pages/system/message/m" */))
const _03f1e906 = () => interopDefault(import('..\\pages\\system\\organization.vue' /* webpackChunkName: "pages/system/organization" */))
const _f3e03e40 = () => interopDefault(import('..\\pages\\system\\organization\\or.vue' /* webpackChunkName: "pages/system/organization/or" */))
const _14aa3c70 = () => interopDefault(import('..\\pages\\system\\orgTree.vue' /* webpackChunkName: "pages/system/orgTree" */))
const _398fb3c2 = () => interopDefault(import('..\\pages\\system\\person.vue' /* webpackChunkName: "pages/system/person" */))
const _39e6fcd8 = () => interopDefault(import('..\\pages\\system\\person\\pe.vue' /* webpackChunkName: "pages/system/person/pe" */))
const _b070d180 = () => interopDefault(import('..\\pages\\system\\role.vue' /* webpackChunkName: "pages/system/role" */))
const _0643167d = () => interopDefault(import('..\\pages\\system\\role\\ro.vue' /* webpackChunkName: "pages/system/role/ro" */))
const _1c9e6257 = () => interopDefault(import('..\\pages\\system\\standardizedKnowledge.vue' /* webpackChunkName: "pages/system/standardizedKnowledge" */))
const _511cefcc = () => interopDefault(import('..\\pages\\transportationInspection\\defect.vue' /* webpackChunkName: "pages/transportationInspection/defect" */))
const _3029a60f = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectMap.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectMap" */))
const _42c4f9c0 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics" */))
const _010f50f2 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectCheck.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectCheck" */))
const _c8140368 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectClear.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectClear" */))
const _7a13c081 = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\defectDisplay.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/defectDisplay" */))
const _2f1fbe4f = () => interopDefault(import('..\\pages\\transportationInspection\\defect\\defectStatistics\\ds.vue' /* webpackChunkName: "pages/transportationInspection/defect/defectStatistics/ds" */))
const _6aaf39d2 = () => interopDefault(import('..\\pages\\transportationInspection\\fault.vue' /* webpackChunkName: "pages/transportationInspection/fault" */))
const _4d38f29e = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultMap.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultMap" */))
const _3b2d7ede = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics" */))
const _5413b5ae = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics\\faultClear.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics/faultClear" */))
const _0ace35ab = () => interopDefault(import('..\\pages\\transportationInspection\\fault\\faultStatistics\\fs.vue' /* webpackChunkName: "pages/transportationInspection/fault/faultStatistics/fs" */))
const _28848141 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite" */))
const _1b009a65 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fcs.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fcs" */))
const _976bb41e = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fixedConstructionSiteMap.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fixedConstructionSiteMap" */))
const _5c5d2823 = () => interopDefault(import('..\\pages\\transportationInspection\\fixedConstructionSite\\fixedConstructionSiteTable.vue' /* webpackChunkName: "pages/transportationInspection/fixedConstructionSite/fixedConstructionSiteTable" */))
const _0c700288 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger" */))
const _4fef9757 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerMap.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerMap" */))
const _041af110 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics" */))
const _969c1fd0 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics\\hiddenDangerClear.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics/hiddenDangerClear" */))
const _5fb31283 = () => interopDefault(import('..\\pages\\transportationInspection\\hiddenDanger\\hiddenDangerStatistics\\hs.vue' /* webpackChunkName: "pages/transportationInspection/hiddenDanger/hiddenDangerStatistics/hs" */))
const _05a5fe15 = () => interopDefault(import('..\\pages\\transportationInspection\\outagePlan.vue' /* webpackChunkName: "pages/transportationInspection/outagePlan" */))
const _52a69d80 = () => interopDefault(import('..\\pages\\common\\formComponents\\FormSelect.vue' /* webpackChunkName: "pages/common/formComponents/FormSelect" */))
const _e7eb0dee = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\account.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/account" */))
const _49926f2b = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\account\\ac.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/account/ac" */))
const _57d8cfa6 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm" */))
const _1c6e2fd8 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm\\al.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm/al" */))
const _41b565c0 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarm\\alarmPatrol.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarm/alarmPatrol" */))
const _4a80e2c9 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarmRule.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarmRule" */))
const _49b75b8e = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\alarmRule\\alR.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/alarmRule/alR" */))
const _2f45c929 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center" */))
const _0600b847 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omChart.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omChart" */))
const _008dcda2 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omDialog.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omDialog" */))
const _c0b5336a = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omDialog\\omTree.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omDialog/omTree" */))
const _3139a437 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\center\\omTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/center/omTable" */))
const _d8f1b9b8 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query" */))
const _535c4272 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\dialogTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/dialogTable" */))
const _e706acec = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTable" */))
const _2392a0f6 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTable\\omTable.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTable/omTable" */))
const _08550092 = () => interopDefault(import('..\\pages\\panoramicMonitoring\\deviceOnlineMonitoring\\query\\queryTree.vue' /* webpackChunkName: "pages/panoramicMonitoring/deviceOnlineMonitoring/query/queryTree" */))
const _251687ca = () => interopDefault(import('..\\pages\\system\\log\\log.vue' /* webpackChunkName: "pages/system/log/log" */))
const _4b6fd5f6 = () => interopDefault(import('..\\pages\\system\\log\\loginLog.vue' /* webpackChunkName: "pages/system/log/loginLog" */))
const _5b92de0e = () => interopDefault(import('..\\pages\\system\\log\\loginLogTable.vue' /* webpackChunkName: "pages/system/log/loginLogTable" */))
const _1e6bdd58 = () => interopDefault(import('..\\pages\\system\\log\\logTable.vue' /* webpackChunkName: "pages/system/log/logTable" */))
const _32a08c41 = () => interopDefault(import('..\\pages\\system\\menu\\me.vue' /* webpackChunkName: "pages/system/menu/me" */))
const _d71ce2c0 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle" */))
const _fad26bb2 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle\\taskRight.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle/taskRight" */))
const _728fa963 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorResultHandle\\taskTree.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorResultHandle/taskTree" */))
const _4247e300 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorTask.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorTask" */))
const _1b882827 = () => interopDefault(import('..\\pages\\transportationInspection\\monitor\\monitorTask\\mt.vue' /* webpackChunkName: "pages/transportationInspection/monitor/monitorTask/mt" */))
const _261f7d8a = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionCycle.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionCycle" */))
const _7a88d956 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionCycle\\ic.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionCycle/ic" */))
const _65bf3940 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionTask.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionTask" */))
const _66f6df2a = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\inspectionTask\\it.vue' /* webpackChunkName: "pages/transportationInspection/patrol/inspectionTask/it" */))
const _a36a337c = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\mannedMission.vue' /* webpackChunkName: "pages/transportationInspection/patrol/mannedMission" */))
const _63feaa62 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\mannedMission\\mm.vue' /* webpackChunkName: "pages/transportationInspection/patrol/mannedMission/mm" */))
const _32de6ec5 = () => interopDefault(import('..\\pages\\transportationInspection\\patrol\\patrolQuery.vue' /* webpackChunkName: "pages/transportationInspection/patrol/patrolQuery" */))
const _5faba07e = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolInventory.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolInventory" */))
const _d46eaa94 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolInventory\\ti.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolInventory/ti" */))
const _20927d08 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReceive.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReceive" */))
const _7712ee62 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReceive\\tre.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReceive/tre" */))
const _9056fdca = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReturn.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReturn" */))
const _5a43189c = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolReturn\\tre.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolReturn/tre" */))
const _3e8774b0 = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolWarehouse.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolWarehouse" */))
const _42c4be2b = () => interopDefault(import('..\\pages\\transportationInspection\\tool\\toolWarehouse\\tw.vue' /* webpackChunkName: "pages/transportationInspection/tool/toolWarehouse/tw" */))
const _6dbc1e52 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\defectIdentification.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/defectIdentification" */))
const _95d9ef7a = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition" */))
const _360c9850 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition\\imageDialog.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition/imageDialog" */))
const _3b535a22 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionImageRecognition\\loadImage.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionImageRecognition/loadImage" */))
const _49312744 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResult.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResult" */))
const _585aec8c = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle" */))
const _282171bf = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\checkImage.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/checkImage" */))
const _593aad89 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhRight.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhRight" */))
const _403afe3b = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhTable.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhTable" */))
const _67de5c7e = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspectionResultHandle\\irhTree.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspectionResultHandle/irhTree" */))
const _442deb48 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\queryStatistics.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/queryStatistics" */))
const _081577b6 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR" */))
const _2b70eaab = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavBack.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavBack" */))
const _058a3a3c = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavList.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavList" */))
const _297d6dcf = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceive.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceive" */))
const _08a5f002 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceiveAdd.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceiveAdd" */))
const _5266d054 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\UAVCR\\uavReceiveBack.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/UAVCR/uavReceiveBack" */))
const _1fc02951 = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeam" */))
const _300da6b6 = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam\\w.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeam/w" */))
const _146380f4 = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson" */))
const _2d267e5f = () => interopDefault(import('..\\pages\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson\\wp.vue' /* webpackChunkName: "pages/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson/wp" */))
const _6ed5a236 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\DefectModal.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/DefectModal" */))
const _3ca0efe8 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionDefect.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionDefect" */))
const _01dd0ee0 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTask.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTask" */))
const _95e2b784 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTower.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTower" */))
const _581189a7 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\inspectionTowerLists.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/inspectionTowerLists" */))
const _3311a3d1 = () => interopDefault(import('..\\pages\\transportationInspection\\UAVInspection\\inspection\\taskPath.vue' /* webpackChunkName: "pages/transportationInspection/UAVInspection/inspection/taskPath" */))
const _2aac5787 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4387cc08,
    name: "home"
  }, {
    path: "/login",
    component: _1d6acc24,
    name: "login"
  }, {
    path: "/common/eventBus",
    component: _5668b403,
    name: "common-eventBus"
  }, {
    path: "/deviceResource/importantPassage",
    component: _4d27832b,
    name: "deviceResource-importantPassage",
    children: [{
      path: "ip",
      component: _5d50e25c,
      name: "deviceResource-importantPassage-ip"
    }]
  }, {
    path: "/deviceResource/line",
    component: _c638465a,
    name: "deviceResource-line",
    children: [{
      path: "lineBasicInfo",
      component: _2f5463e5,
      name: "deviceResource-line-lineBasicInfo"
    }, {
      path: "lineTable",
      component: _541e5d92,
      name: "deviceResource-line-lineTable"
    }, {
      path: "lineTree",
      component: _d1d2a176,
      name: "deviceResource-line-lineTree"
    }]
  }, {
    path: "/deviceResource/monitor",
    component: _5cfd356a,
    name: "deviceResource-monitor",
    children: [{
      path: "m",
      component: _9539751c,
      name: "deviceResource-monitor-m"
    }]
  }, {
    path: "/deviceResource/resource",
    component: _39c04f26,
    name: "deviceResource-resource",
    children: [{
      path: "Equipment",
      component: _3ecf4891,
      name: "deviceResource-resource-Equipment"
    }, {
      path: "MapLabelWindow",
      component: _32944315,
      name: "deviceResource-resource-MapLabelWindow"
    }, {
      path: "ProjectPopupMsg",
      component: _b3d1279e,
      name: "deviceResource-resource-ProjectPopupMsg"
    }, {
      path: "StatePopup",
      component: _80c6bcb0,
      name: "deviceResource-resource-StatePopup"
    }, {
      path: "WorkPopupMsg",
      component: _1ec225b3,
      name: "deviceResource-resource-WorkPopupMsg"
    }, {
      path: "equipment/BadMsg",
      component: _5b1bf28d,
      name: "deviceResource-resource-equipment-BadMsg"
    }, {
      path: "fourPopup/JianCe",
      component: _0b607517,
      name: "deviceResource-resource-fourPopup-JianCe"
    }, {
      path: "fourPopup/SanKua",
      component: _5fe115a0,
      name: "deviceResource-resource-fourPopup-SanKua"
    }, {
      path: "fourPopup/ZiYuan",
      component: _922c15fe,
      name: "deviceResource-resource-fourPopup-ZiYuan"
    }, {
      path: "fourPopup/ZuoYe",
      component: _faba4632,
      name: "deviceResource-resource-fourPopup-ZuoYe"
    }]
  }, {
    path: "/deviceResource/threeCross",
    component: _70ac19e1,
    name: "deviceResource-threeCross",
    children: [{
      path: "tc",
      component: _1e981060,
      name: "deviceResource-threeCross-tc"
    }]
  }, {
    path: "/deviceResource/threeD",
    component: _083486f6,
    name: "deviceResource-threeD"
  }, {
    path: "/main/Header",
    component: _493786c1,
    name: "main-Header"
  }, {
    path: "/main/Left",
    component: _653f4e3b,
    name: "main-Left"
  }, {
    path: "/panoramicMonitoring/gridDisaster",
    component: _571fb16a,
    name: "panoramicMonitoring-gridDisaster",
    children: [{
      path: "dialogDetail",
      component: _173acca3,
      name: "panoramicMonitoring-gridDisaster-dialogDetail"
    }, {
      path: "dialogInfo",
      component: _792de900,
      name: "panoramicMonitoring-gridDisaster-dialogInfo"
    }, {
      path: "dialogWeather",
      component: _547f8592,
      name: "panoramicMonitoring-gridDisaster-dialogWeather"
    }]
  }, {
    path: "/panoramicMonitoring/videoSurveillance",
    component: _1de24821,
    name: "panoramicMonitoring-videoSurveillance"
  }, {
    path: "/panoramicMonitoring/visualChannelMonitoring",
    component: _61606f10,
    name: "panoramicMonitoring-visualChannelMonitoring"
  }, {
    path: "/public/barChart",
    component: _4c7824e2,
    name: "public-barChart"
  }, {
    path: "/public/lineChart",
    component: _1c449b14,
    name: "public-lineChart"
  }, {
    path: "/public/pieChart",
    component: _f6345f94,
    name: "public-pieChart"
  }, {
    path: "/public/publicDetail",
    component: _5d173c9e,
    name: "public-publicDetail"
  }, {
    path: "/public/publicDialog",
    component: _484dce15,
    name: "public-publicDialog"
  }, {
    path: "/public/publicDialogMulti",
    component: _59bfedd4,
    name: "public-publicDialogMulti"
  }, {
    path: "/public/publicForm",
    component: _7f6cc8d1,
    name: "public-publicForm"
  }, {
    path: "/public/publicTransition",
    component: _04084d22,
    name: "public-publicTransition"
  }, {
    path: "/system/menuSys",
    component: _dddccfd8,
    name: "system-menuSys"
  }, {
    path: "/system/message",
    component: _6bc022ad,
    name: "system-message",
    children: [{
      path: "m",
      component: _607bf4d0,
      name: "system-message-m"
    }]
  }, {
    path: "/system/organization",
    component: _03f1e906,
    name: "system-organization",
    children: [{
      path: "or",
      component: _f3e03e40,
      name: "system-organization-or"
    }]
  }, {
    path: "/system/orgTree",
    component: _14aa3c70,
    name: "system-orgTree"
  }, {
    path: "/system/person",
    component: _398fb3c2,
    name: "system-person",
    children: [{
      path: "pe",
      component: _39e6fcd8,
      name: "system-person-pe"
    }]
  }, {
    path: "/system/role",
    component: _b070d180,
    name: "system-role",
    children: [{
      path: "ro",
      component: _0643167d,
      name: "system-role-ro"
    }]
  }, {
    path: "/system/standardizedKnowledge",
    component: _1c9e6257,
    name: "system-standardizedKnowledge"
  }, {
    path: "/transportationInspection/defect",
    component: _511cefcc,
    name: "transportationInspection-defect",
    children: [{
      path: "defectMap",
      component: _3029a60f,
      name: "transportationInspection-defect-defectMap"
    }, {
      path: "defectStatistics",
      component: _42c4f9c0,
      name: "transportationInspection-defect-defectStatistics",
      children: [{
        path: "defectCheck",
        component: _010f50f2,
        name: "transportationInspection-defect-defectStatistics-defectCheck"
      }, {
        path: "defectClear",
        component: _c8140368,
        name: "transportationInspection-defect-defectStatistics-defectClear"
      }, {
        path: "defectDisplay",
        component: _7a13c081,
        name: "transportationInspection-defect-defectStatistics-defectDisplay"
      }, {
        path: "ds",
        component: _2f1fbe4f,
        name: "transportationInspection-defect-defectStatistics-ds"
      }]
    }]
  }, {
    path: "/transportationInspection/fault",
    component: _6aaf39d2,
    name: "transportationInspection-fault",
    children: [{
      path: "faultMap",
      component: _4d38f29e,
      name: "transportationInspection-fault-faultMap"
    }, {
      path: "faultStatistics",
      component: _3b2d7ede,
      name: "transportationInspection-fault-faultStatistics",
      children: [{
        path: "faultClear",
        component: _5413b5ae,
        name: "transportationInspection-fault-faultStatistics-faultClear"
      }, {
        path: "fs",
        component: _0ace35ab,
        name: "transportationInspection-fault-faultStatistics-fs"
      }]
    }]
  }, {
    path: "/transportationInspection/fixedConstructionSite",
    component: _28848141,
    name: "transportationInspection-fixedConstructionSite",
    children: [{
      path: "fcs",
      component: _1b009a65,
      name: "transportationInspection-fixedConstructionSite-fcs"
    }, {
      path: "fixedConstructionSiteMap",
      component: _976bb41e,
      name: "transportationInspection-fixedConstructionSite-fixedConstructionSiteMap"
    }, {
      path: "fixedConstructionSiteTable",
      component: _5c5d2823,
      name: "transportationInspection-fixedConstructionSite-fixedConstructionSiteTable"
    }]
  }, {
    path: "/transportationInspection/hiddenDanger",
    component: _0c700288,
    name: "transportationInspection-hiddenDanger",
    children: [{
      path: "hiddenDangerMap",
      component: _4fef9757,
      name: "transportationInspection-hiddenDanger-hiddenDangerMap"
    }, {
      path: "hiddenDangerStatistics",
      component: _041af110,
      name: "transportationInspection-hiddenDanger-hiddenDangerStatistics",
      children: [{
        path: "hiddenDangerClear",
        component: _969c1fd0,
        name: "transportationInspection-hiddenDanger-hiddenDangerStatistics-hiddenDangerClear"
      }, {
        path: "hs",
        component: _5fb31283,
        name: "transportationInspection-hiddenDanger-hiddenDangerStatistics-hs"
      }]
    }]
  }, {
    path: "/transportationInspection/outagePlan",
    component: _05a5fe15,
    name: "transportationInspection-outagePlan"
  }, {
    path: "/common/formComponents/FormSelect",
    component: _52a69d80,
    name: "common-formComponents-FormSelect"
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/account",
    component: _e7eb0dee,
    name: "panoramicMonitoring-deviceOnlineMonitoring-account",
    children: [{
      path: "ac",
      component: _49926f2b,
      name: "panoramicMonitoring-deviceOnlineMonitoring-account-ac"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/alarm",
    component: _57d8cfa6,
    name: "panoramicMonitoring-deviceOnlineMonitoring-alarm",
    children: [{
      path: "al",
      component: _1c6e2fd8,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarm-al"
    }, {
      path: "alarmPatrol",
      component: _41b565c0,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarm-alarmPatrol"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/alarmRule",
    component: _4a80e2c9,
    name: "panoramicMonitoring-deviceOnlineMonitoring-alarmRule",
    children: [{
      path: "alR",
      component: _49b75b8e,
      name: "panoramicMonitoring-deviceOnlineMonitoring-alarmRule-alR"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/center",
    component: _2f45c929,
    name: "panoramicMonitoring-deviceOnlineMonitoring-center",
    children: [{
      path: "omChart",
      component: _0600b847,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omChart"
    }, {
      path: "omDialog",
      component: _008dcda2,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omDialog",
      children: [{
        path: "omTree",
        component: _c0b5336a,
        name: "panoramicMonitoring-deviceOnlineMonitoring-center-omDialog-omTree"
      }]
    }, {
      path: "omTable",
      component: _3139a437,
      name: "panoramicMonitoring-deviceOnlineMonitoring-center-omTable"
    }]
  }, {
    path: "/panoramicMonitoring/deviceOnlineMonitoring/query",
    component: _d8f1b9b8,
    name: "panoramicMonitoring-deviceOnlineMonitoring-query",
    children: [{
      path: "dialogTable",
      component: _535c4272,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-dialogTable"
    }, {
      path: "queryTable",
      component: _e706acec,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTable",
      children: [{
        path: "omTable",
        component: _2392a0f6,
        name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTable-omTable"
      }]
    }, {
      path: "queryTree",
      component: _08550092,
      name: "panoramicMonitoring-deviceOnlineMonitoring-query-queryTree"
    }]
  }, {
    path: "/system/log/log",
    component: _251687ca,
    name: "system-log-log"
  }, {
    path: "/system/log/loginLog",
    component: _4b6fd5f6,
    name: "system-log-loginLog"
  }, {
    path: "/system/log/loginLogTable",
    component: _5b92de0e,
    name: "system-log-loginLogTable"
  }, {
    path: "/system/log/logTable",
    component: _1e6bdd58,
    name: "system-log-logTable"
  }, {
    path: "/system/menu/me",
    component: _32a08c41,
    name: "system-menu-me"
  }, {
    path: "/transportationInspection/monitor/monitorResultHandle",
    component: _d71ce2c0,
    name: "transportationInspection-monitor-monitorResultHandle",
    children: [{
      path: "taskRight",
      component: _fad26bb2,
      name: "transportationInspection-monitor-monitorResultHandle-taskRight"
    }, {
      path: "taskTree",
      component: _728fa963,
      name: "transportationInspection-monitor-monitorResultHandle-taskTree"
    }]
  }, {
    path: "/transportationInspection/monitor/monitorTask",
    component: _4247e300,
    name: "transportationInspection-monitor-monitorTask",
    children: [{
      path: "mt",
      component: _1b882827,
      name: "transportationInspection-monitor-monitorTask-mt"
    }]
  }, {
    path: "/transportationInspection/patrol/inspectionCycle",
    component: _261f7d8a,
    name: "transportationInspection-patrol-inspectionCycle",
    children: [{
      path: "ic",
      component: _7a88d956,
      name: "transportationInspection-patrol-inspectionCycle-ic"
    }]
  }, {
    path: "/transportationInspection/patrol/inspectionTask",
    component: _65bf3940,
    name: "transportationInspection-patrol-inspectionTask",
    children: [{
      path: "it",
      component: _66f6df2a,
      name: "transportationInspection-patrol-inspectionTask-it"
    }]
  }, {
    path: "/transportationInspection/patrol/mannedMission",
    component: _a36a337c,
    name: "transportationInspection-patrol-mannedMission",
    children: [{
      path: "mm",
      component: _63feaa62,
      name: "transportationInspection-patrol-mannedMission-mm"
    }]
  }, {
    path: "/transportationInspection/patrol/patrolQuery",
    component: _32de6ec5,
    name: "transportationInspection-patrol-patrolQuery"
  }, {
    path: "/transportationInspection/tool/toolInventory",
    component: _5faba07e,
    name: "transportationInspection-tool-toolInventory",
    children: [{
      path: "ti",
      component: _d46eaa94,
      name: "transportationInspection-tool-toolInventory-ti"
    }]
  }, {
    path: "/transportationInspection/tool/toolReceive",
    component: _20927d08,
    name: "transportationInspection-tool-toolReceive",
    children: [{
      path: "tre",
      component: _7712ee62,
      name: "transportationInspection-tool-toolReceive-tre"
    }]
  }, {
    path: "/transportationInspection/tool/toolReturn",
    component: _9056fdca,
    name: "transportationInspection-tool-toolReturn",
    children: [{
      path: "tre",
      component: _5a43189c,
      name: "transportationInspection-tool-toolReturn-tre"
    }]
  }, {
    path: "/transportationInspection/tool/toolWarehouse",
    component: _3e8774b0,
    name: "transportationInspection-tool-toolWarehouse",
    children: [{
      path: "tw",
      component: _42c4be2b,
      name: "transportationInspection-tool-toolWarehouse-tw"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/defectIdentification",
    component: _6dbc1e52,
    name: "transportationInspection-UAVInspection-defectIdentification"
  }, {
    path: "/transportationInspection/UAVInspection/inspectionImageRecognition",
    component: _95d9ef7a,
    name: "transportationInspection-UAVInspection-inspectionImageRecognition",
    children: [{
      path: "imageDialog",
      component: _360c9850,
      name: "transportationInspection-UAVInspection-inspectionImageRecognition-imageDialog"
    }, {
      path: "loadImage",
      component: _3b535a22,
      name: "transportationInspection-UAVInspection-inspectionImageRecognition-loadImage"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/inspectionResult",
    component: _49312744,
    name: "transportationInspection-UAVInspection-inspectionResult"
  }, {
    path: "/transportationInspection/UAVInspection/inspectionResultHandle",
    component: _585aec8c,
    name: "transportationInspection-UAVInspection-inspectionResultHandle",
    children: [{
      path: "checkImage",
      component: _282171bf,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-checkImage"
    }, {
      path: "irhRight",
      component: _593aad89,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhRight"
    }, {
      path: "irhTable",
      component: _403afe3b,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhTable"
    }, {
      path: "irhTree",
      component: _67de5c7e,
      name: "transportationInspection-UAVInspection-inspectionResultHandle-irhTree"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/queryStatistics",
    component: _442deb48,
    name: "transportationInspection-UAVInspection-queryStatistics"
  }, {
    path: "/transportationInspection/UAVInspection/UAVCR",
    component: _081577b6,
    name: "transportationInspection-UAVInspection-UAVCR",
    children: [{
      path: "uavBack",
      component: _2b70eaab,
      name: "transportationInspection-UAVInspection-UAVCR-uavBack"
    }, {
      path: "uavList",
      component: _058a3a3c,
      name: "transportationInspection-UAVInspection-UAVCR-uavList"
    }, {
      path: "uavReceive",
      component: _297d6dcf,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceive"
    }, {
      path: "uavReceiveAdd",
      component: _08a5f002,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceiveAdd"
    }, {
      path: "uavReceiveBack",
      component: _5266d054,
      name: "transportationInspection-UAVInspection-UAVCR-uavReceiveBack"
    }]
  }, {
    path: "/transportationInspection/wireProtectionTeam/wireProtectionTeam",
    component: _1fc02951,
    name: "transportationInspection-wireProtectionTeam-wireProtectionTeam",
    children: [{
      path: "w",
      component: _300da6b6,
      name: "transportationInspection-wireProtectionTeam-wireProtectionTeam-w"
    }]
  }, {
    path: "/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson",
    component: _146380f4,
    name: "transportationInspection-wireProtectionTeam-wireProtectionTeamPerson",
    children: [{
      path: "wp",
      component: _2d267e5f,
      name: "transportationInspection-wireProtectionTeam-wireProtectionTeamPerson-wp"
    }]
  }, {
    path: "/transportationInspection/UAVInspection/inspection/DefectModal",
    component: _6ed5a236,
    name: "transportationInspection-UAVInspection-inspection-DefectModal"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionDefect",
    component: _3ca0efe8,
    name: "transportationInspection-UAVInspection-inspection-inspectionDefect"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTask",
    component: _01dd0ee0,
    name: "transportationInspection-UAVInspection-inspection-inspectionTask"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTower",
    component: _95e2b784,
    name: "transportationInspection-UAVInspection-inspection-inspectionTower"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/inspectionTowerLists",
    component: _581189a7,
    name: "transportationInspection-UAVInspection-inspection-inspectionTowerLists"
  }, {
    path: "/transportationInspection/UAVInspection/inspection/taskPath",
    component: _3311a3d1,
    name: "transportationInspection-UAVInspection-inspection-taskPath"
  }, {
    path: "/",
    component: _2aac5787,
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
