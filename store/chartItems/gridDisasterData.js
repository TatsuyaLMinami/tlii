let gridDisasterData = {
  weatherData: [
    { label: "温度:", name: "temperature", value: "", unit: "℃" },
    { label: "湿度:", name: "humidity", value: "", unit: "%" },
    { label: "风速:", name: "windSpeed", value: "", unit: "m/s" },
    { label: "风向:", name: "windDirection", value: "", unit: "" },
    { label: "气压:", name: "airpressure", value: "", unit: "kPa" },
    { label: "降雨量:", name: "precipitation", value: "", unit: "mm" }
  ],
  disasterLayerType: [
    {
      type: "fire",
      title: "山火",
      title1: "山火",
      title2: "预警"
    },
    {
      type: "ice",
      title: "覆冰",
      title1: "覆冰",
      title2: "预警"
    },
    {
      type: "thunder",
      title: "雷电",
      title1: "雷电",
      title2: "预警"
    },
    {
      type: "typhoon",
      title: "台风",
      title1: "台风",
      title2: "预警"
    },
    {
      type: "wave",
      title: "舞动",
      title1: "舞动",
      title2: "预警"
    },
    {
      type: "disaster",
      title: "地质灾害",
      title1: "地质",
      title2: "灾害"
    }
  ],
  disasterLayerBut: [
    {
      date: 1,
      title: "今天",
      show: true
    },
    {
      date: 3,
      title: "3天",
      show: false
    },
    {
      date: 7,
      title: "7天",
      show: true
    },
    {
      date: 15,
      title: "15天",
      show: true
    },
    {
      date: 30,
      title: "30天",
      show: true
    }
  ],
  disasterType: {
    fire: "山火",
    ice: "覆冰",
    thunder: "雷电",
    typhoon: "台风",
    wave: "舞动",
    disaster: "地质灾害"
  },
  disasterChart: {
    fire: {
      name: "火山点数",
      title1: "火点预警影响统计",
      title2: "火点数统计"
    },
    ice: {
      name: "覆冰线路数",
      title1: "覆冰预警影响统计",
      title2: "覆冰线路数统计"
    },
    thunder: {
      name: "雷击数",
      title1: "雷击预警影响统计",
      title2: "雷击数统计"
    },
    typhoon: {
      name: "台风数",
      title1: "台风预警影响统计",
      title2: "台风数统计"
    },
    wave: {
      name: "舞动线路数",
      title1: "舞动预警影响统计",
      title2: "舞动线路数统计"
    },
    disaster: {
      name: "地质灾害点数",
      title1: "各风险等级杆塔数量",
      title2: "地质灾害点数统计"
    }
  },
  disasterUrl: {
    fire: [
      "yangkai/damageWildfireDisasterInfo/getDamageWildfireDisasterWarningRelStatisticsByParams",
      "yangkai/damageWildfireDisasterInfo/getDamageWildfireDisasterList",
      "yangkai/damageWildfireDisasterInfo/getDamageWildfireDisasterWarningRelListByWid",
      "yangkai/damageWildfireDisasterInfo/getDamageWildfireDisasterWarningInfoByWid"
    ],

    ice: [
      "yangkai/damageIcingDisasterInfoController/getDamageIcingDisasterWarningRelStatisticsByParams",
      "yangkai/damageIcingDisasterInfoController/getDamageIcingDisasterInfoList",
      "yangkai/damageIcingDisasterInfoController/getDamageIcingDisasterWarningRelListByIid",
      "yangkai/damageIcingDisasterInfoController/getDamageIcingDisasterWarningInfoByIid"
    ],
    thunder: [
      "yangkai/damageThunderDisasterInfoController/getDamageThunderDisasterWarningRelStatisticsByParams",
      "yangkai/damageThunderDisasterInfoController/getDamageThunderDisasterInfoList",
      "yangkai/damageThunderDisasterInfoController/getDamageThunderDisasterWarningRelListByTid",
      "yangkai/damageThunderDisasterInfoController/getDamageThunderDisasterWarningInfoByTid"
    ],
    typhoon: [
      "yangkai/damageTyphoonDisaster/getTyphoonDisasterStatistics",
      "yangkai/damageTyphoonDisaster/getTyphoonDisasterList"
    ],
    wave: [
      "yangkai/damageBrandishDisaster/getBrandishDisasterStatistics",
      "yangkai/damageBrandishDisaster/getBrandishDisasterList"
    ],
    disaster: [
      "yangkai/damageGeologyDisaster/getGeologyDisasterStatistics",
      "yangkai/damageGeologyDisaster/getGeologyDisasterList"
    ]
  },
  weatherChartData: [
    {
      id: "DisasterWeatherId",
      title: "未来24小时天气预报信息",
      legend: {
        data: ["温度", "湿度", "风速", "气压", "降水量"],
        top: "2%",
        width: "1000px"
      },
      xAxis: [],
      series: [],
      xAxis2: [],
      lineData: {
        temperature: [],
        humidity: [],
        airpressure: [],
        windSpeed: [],
        precipitation: []
      }
    }
  ],
  infoChartData: [
    {
      id: "EchartRightId",
      title: "",
      legend: {
        data: ["影响线路数", "影响杆塔数", "线路总里程"],
        data1: ["一级风险", "二级风险", "三级风险", "四级风险"],
        top: "8%",
        width: "350px"
      },
      xAxis: [],
      series: [],
      lineData: {
        wCount: [],
        typhoonCount: [],
        brandishCount: [],
        towerCount: [],
        influenceTowerCount: [],
        lineCount: [],
        influenceLineCount: [],
        lenSum: [],
        lineTotal: []
      }
    },
    {
      id: "EchartLeftId",
      title: "",
      legend: {
        data: [],
        top: "8%",
        width: "350px"
      },
      xAxis: [],
      series: [],
      lineData: {}
    }
  ]
};
export default gridDisasterData;
