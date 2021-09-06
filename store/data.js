import Vue from "vue";
import Vuex from "vuex";
import dictionaries from './dictionaries/dictionaries'
Vue.use(Vuex);
const $store = new Vuex.Store({
  namespaced: true,
  state: {
    url: "http://localhost:8889/",
    city: [],
    unit: [],
    ispTask: [],
    ispType: [],
    ispMode: [],
    volLevel: [],
    defectType: [],
    defectPart: [],
    deviceType: [],
    troubleType: [],
    maintainTeam: [],
    manufacturer: [],
    monitorDevice: [],
    defectTypeOne: [],
    faultLocation: [],
    constructionUnit: [],
    msgType: [],
    riskLevel: [],
    toolType: [],
    oLevels: [],
    taskStatus: [],
    userData: [],
    depts: [],
    ispState: [],
    ispTeam: [],
    toolsWarehouse: [],
    defectNature: [
      {
        code: "1",
        name: "危机"
      },
      {
        code: "2",
        name: "严重"
      },
      {
        code: "3",
        name: "一般"
      }
    ],
    defectState: ["待提交", "待审核", "审核通过"],
    troubleLevel: [
      {
        code: "1",
        name: "一般隐患"
      },
      {
        code: "2",
        name: "重大隐患"
      }
    ],
    troubleLocation: [
      {
        code: "1",
        name: "上"
      },
      {
        code: "2",
        name: "中"
      },
      {
        code: "3",
        name: "下"
      }
    ],
    hiddenDangerState: ["待提交", "待审核", "审核通过"],
    faultType: [
      {
        code: "0",
        name: "非雷击"
      },
      {
        code: "1",
        name: "雷击"
      }
    ],
    faultState: ["待提交", "待审核", "审核通过"],
    maintainTeam: [
      {
        code: "1",
        name: "运维一班"
      },
      {
        code: "2",
        name: "运维二班"
      }
    ],
    powerTransmission: [
      {
        code: "0",
        name: "否"
      },
      {
        code: "1",
        name: "是"
      }
    ],
    alarmState: [
      {
        code: "1",
        name: "未处理"
      },

      {
        code: "2",
        name: "已安排" //推送
      },

      {
        code: "3",
        name: "已完成" //执行人才能 发起特巡，特巡完成后，特巡任务结束
      },

      {
        code: "4",
        name: "已关闭"
      }
    ],
    deviceTypeVideo: [
      {
        code: "1",
        name: "摄像头"
      },
      {
        code: "2",
        name: "微拍装置"
      }
    ],
    deviceState: [
      {
        code: "1",
        name: "在运"
      },
      {
        code: "2",
        name: "停运"
      },
      {
        code: "3",
        name: "退役"
      }
    ],
    deviceObject: [
      {
        code: "1",
        name: "线路"
      },
      {
        code: "2",
        name: "杆塔"
      }
    ],
    dataStatus: [
      {
        code: "0",
        name: "草稿"
      },
      {
        code: "1",
        name: "发布"
      }
    ],
    sourceType: [
      {
        code: "1",
        name: "监测告警"
      },
      {
        code: "2",
        name: "巡视任务"
      }
    ],
    monitoringType: [
      {
        code: "1",
        name: "传感器监测"
      },
      {
        code: "2",
        name: "视频图像监测"
      }
    ],
    ruleStatus: [
      {
        code: "1",
        name: "开启"
      },
      {
        code: "2",
        name: "关闭"
      },
      {
        code: "3",
        name: "未发布"
      },
      {
        code: "4",
        name: "已发布"
      }
    ],
    ruleLevel: [
      {
        code: "1",
        name: "一般"
      },
      {
        code: "2",
        name: "严重"
      },
      {
        code: "3",
        name: "危急"
      }
    ],
    monitoringState: [
      {
        code: "1",
        name: "正常"
      },
      {
        code: "2",
        name: "异常"
      }
    ],
    lineDegree: [
      {
        code: "1",
        name: "一般"
      },
      {
        code: "2",
        name: "重要"
      },
      {
        code: "3",
        name: "特别重要"
      }
    ],
    identificationStatus: [
      {
        code: "0",
        name: "未识别"
      },
      {
        code: "-1",
        name: "识别失败"
      },
      {
        code: "1",
        name: "已识别"
      }
    ],
    handleStatus: [
      {
        code: "0",
        name: "待确认"
      },
      {
        code: "1",
        name: "已确认"
      }
    ],
    handleState: [
      {
        code: "0",
        name: "待处理"
      },
      {
        code: "1",
        name: "已处理"
      }
    ],
    taskType: [
      {
        name: "视频监控",
        code: 0
      },
      {
        name: "通道可视化",
        code: 1
      }
    ],
    monitorType: [
      {
        name: "监拍设备",
        code: 0
      },
      {
        name: "视频监控",
        code: 1
      }
    ]
  },
  getters: {
    volLevel: ({ volLevel }) => volLevel,
    city: ({ city }) => city,
    manufacturer: ({ manufacturer }) => manufacturer,
    defectNature: ({ defectNature }) => defectNature,
    defectType: ({ defectType }) => defectType,
    defectTypeOne: ({ defectTypeOne }) => defectTypeOne,
    defectPart: ({ defectPart }) => defectPart,
    defectState: ({ defectState }) => defectState,
    troubleLevel: ({ troubleLevel }) => troubleLevel,
    troubleType: ({ troubleType }) => troubleType,
    troubleLocation: ({ troubleLocation }) => troubleLocation,
    hiddenDangerState: ({ hiddenDangerState }) => hiddenDangerState,
    faultType: ({ faultType }) => faultType,
    faultLocation: ({ faultLocation }) => faultLocation,
    faultState: ({ faultState }) => faultState,
    powerTransmission: ({ powerTransmission }) => powerTransmission,
    alarmState: ({ alarmState }) => alarmState,
    monitoringType: ({ monitoringType }) => monitoringType,
    deviceType: ({ deviceType }) => deviceType,
    deviceTypeVideo: ({ deviceTypeVideo }) => deviceTypeVideo,
    deviceState: ({ deviceState }) => deviceState,
    deviceObject: ({ deviceObject }) => deviceObject,
    ispType: ({ ispType }) => ispType,
    ispMode: ({ ispMode }) => ispMode,
    dataStatus: ({ dataStatus }) => dataStatus,
    sourceType: ({ sourceType }) => sourceType,
    ruleStatus: ({ ruleStatus }) => ruleStatus,
    ruleLevel: ({ ruleLevel }) => ruleLevel,
    monitoringState: ({ monitoringState }) => monitoringState,
    unit: ({ unit }) => unit,
    constructionUnit: ({ constructionUnit }) => constructionUnit,
    lineDegree: ({ lineDegree }) => lineDegree,
    ispType: ({ ispType }) => ispType,
    maintainTeam: ({ maintainTeam }) => maintainTeam,
    url: ({ url }) => url,
    identificationStatus: ({ identificationStatus }) => identificationStatus,
    ispTask: ({ ispTask }) => ispTask,
    handleStatus: ({ handleStatus }) => handleStatus,
    handleState: ({ handleState }) => handleState,
    longitude: ({ longitude }) => longitude,
    latitude: ({ latitude }) => latitude,
    monitorDevice: ({ monitorDevice }) => monitorDevice,
    taskType: ({ taskType }) => taskType,
    msgType: ({ msgType }) => msgType,
    monitorType: ({ monitorType }) => monitorType,
    riskLevel: ({ riskLevel }) => riskLevel,
    toolType: ({ toolType }) => toolType,
    oLevels: ({ oLevels }) => oLevels,
    taskStatus: ({ taskStatus }) => taskStatus,
    userData: ({ userData }) => userData,
    depts: ({ depts }) => depts,
    ispState: ({ ispState }) => ispState,
    ispTeam: ({ ispTeam }) => ispTeam,
    toolsWarehouse: ({ toolsWarehouse }) => toolsWarehouse
  },
  mutations: {
    setCity(state, city) {
      sessionStorage.setItem("city", JSON.stringify(city));
      state.city = city;
    },
    setVolLevel(state, volLevel) {
      sessionStorage.setItem("volLevel", JSON.stringify(volLevel));
      state.volLevel = volLevel;
    },
    setDefectType(state, defectType) {
      sessionStorage.setItem("defectType", JSON.stringify(defectType));
      state.defectType = defectType;
    },
    setDefectTypeOne(state, defectTypeOne) {
      sessionStorage.setItem("defectTypeOne", JSON.stringify(defectTypeOne));
      state.defectTypeOne = defectTypeOne;
    },
    setDeviceType(state, deviceType) {
      sessionStorage.setItem("deviceType", JSON.stringify(deviceType));
      state.deviceType = deviceType;
    },
    setDefectPart(state, defectPart) {
      sessionStorage.setItem("defectPart", JSON.stringify(defectPart));
      state.defectPart = defectPart;
    },
    setTroubleType(state, troubleType) {
      sessionStorage.setItem("troubleType", JSON.stringify(troubleType));
      state.troubleType = troubleType;
    },
    setFaultLocation(state, faultLocation) {
      sessionStorage.setItem("faultLocation", JSON.stringify(faultLocation));
      state.faultLocation = faultLocation;
    },
    setManufacturer(state, manufacturer) {
      sessionStorage.setItem("manufacturer", JSON.stringify(manufacturer));
      state.manufacturer = manufacturer;
    },
    setUnit(state, unit) {
      sessionStorage.setItem("unit", JSON.stringify(unit));
      state.unit = unit;
    },
    setConstructionUnit(state, constructionUnit) {
      sessionStorage.setItem(
        "constructionUnit",
        JSON.stringify(constructionUnit)
      );
      state.constructionUnit = constructionUnit;
    },
    setMaintainTeam(state, maintainTeam) {
      sessionStorage.setItem("maintainTeam", JSON.stringify(maintainTeam));
      state.maintainTeam = maintainTeam;
    },
    setIspMode(state, ispMode) {
      sessionStorage.setItem("ispMode", JSON.stringify(ispMode));
      state.ispMode = ispMode;
    },
    setIspType(state, ispType) {
      sessionStorage.setItem("ispType", JSON.stringify(ispType));
      state.ispType = ispType;
    },
    setIspTask(state, ispTask) {
      sessionStorage.setItem("ispTask", JSON.stringify(ispTask));
      state.ispTask = ispTask;
    },
    setMonitorDevice(state, monitorDevice) {
      sessionStorage.setItem("monitorDevice", JSON.stringify(monitorDevice));
      state.monitorDevice = monitorDevice;
    },
    setMsgType(state, msgType) {
      sessionStorage.setItem("msgType", JSON.stringify(msgType));
      state.msgType = msgType;
    },
    setRiskLevel(state, riskLevel) {
      sessionStorage.setItem("riskLevel", JSON.stringify(riskLevel));
      state.riskLevel = riskLevel;
    },
    setToolType(state, toolType) {
      sessionStorage.setItem("toolType", JSON.stringify(toolType));
      state.toolType = toolType;
    },
    setDutyLevel(state, oLevels) {
      sessionStorage.setItem("oLevels", JSON.stringify(oLevels));
      state.oLevels = oLevels;
    },
    setDutyStatus(state, taskStatus) {
      sessionStorage.setItem("taskStatus", JSON.stringify(taskStatus));
      state.taskStatus = taskStatus;
    },
    setUserData(state, userData) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
      state.userData = userData;
    },
    setDepts(state, depts) {
      sessionStorage.setItem("depts", JSON.stringify(depts));
      state.depts = depts;
    },
    setIspState(state, ispState) {
      sessionStorage.setItem("ispState", JSON.stringify(ispState));
      state.ispState = ispState;
    },
    setIspTeam(state, ispTeam) {
      sessionStorage.setItem("ispTeam", JSON.stringify(ispTeam));
      state.ispTeam = ispTeam;
    },
    setToolsWarehouse(state, toolsWarehouse) {
      sessionStorage.setItem("toolsWarehouse", JSON.stringify(toolsWarehouse));
      state.toolsWarehouse = toolsWarehouse;
    }
  },
  actions: {

  },
  modules: {
    dictionaries
  }
});
if (process.client) {
  window.$store = $store;
}
export default $store;
