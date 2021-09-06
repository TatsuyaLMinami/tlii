var chartData = [
  {
    id: "deviceType"
  },
  {
    id: "lineVoltage"
  },
  {
    id: "deviceYear"
  },
  {
    id: "towerManufactor"
  },
  {
    id: "deviceState",
    series: [
      {
        name: "在线监测告警统计",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        data: {}
      }
    ]
  },
  {
    id: "taskCompletion",
    title: "巡检任务完成统计",
    series: [
      {
        name: "巡检杆塔(个)",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        data: {}
      }
    ]
  },
  {
    id: "taskTrend",
    title: "巡检任务动态信息"
  },
  {
    id: "spanStatistics",
    title: ""
  },
  {
    id: "deviceOnLineRateTotal",
    title: ""
  },
  {
    id: "deviceAlarmTotal",
    title: ""
  }
];
for (let key in chartData.slice(6)) {
  chartData.slice(6)[key].legend = [];
  chartData.slice(6)[key].xAxis = [];
  chartData.slice(6)[key].series = {
    name: "数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
chartData[8].legend = ["装置总数", "装置在线总数", "装置在线率"];
chartData[8].series = [
  {
    name: "装置总数",
    barWidth: "20%",
    type: "bar",
    data: []
  },
  {
    name: "装置在线总数",
    barWidth: "20%",
    type: "bar",
    data: []
  },
  {
    name: "装置在线率",
    barWidth: "20%",
    type: "bar",
    data: []
  }
];
for (let key in chartData.slice(0, 4)) {
  chartData.slice(0, 4)[key].legend = [];
  chartData.slice(0, 4)[key].xAxis = [];
  chartData.slice(0, 4)[key].series = {
    name: "数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
export default chartData;
