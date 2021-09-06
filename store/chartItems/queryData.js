var chartData = [
  {
    id: "deviceTypeQuery",
    title: "装置类型",
    series: {
      name: "数量"
    }
  },
  {
    id: "deviceManuQuery",
    title: "生产厂家",
    series: {
      name: "数量"
    }
  },
  {
    id: "deviceCoverageQuery",
    title: "装置覆盖率(%)",
    series: { name: "装置覆盖率" }
  },
  {
    id: "deviceStateQuery",
    title: "装置在运情况",
    series: {
      name: "数量"
    }
  },
  {
    id: "alarmTypeQuery",
    title: "装置告警率(%)",
    series: { name: "装置告警率" }
  },
  {
    id: "deviceIncreaseQuery",
    title: "所在城市",
    series: {
      name: "数量"
    }
  }
];
for (let key in chartData) {
  chartData[key].legend = [];
  chartData[key].xAxis = [];
  chartData[key].series.barWidth = "20%";
  chartData[key].series.type = "bar";
  chartData[key].series.data = [];
}
let tableItemData = [
  {
    prop: "deviceCode",
    label: "装置编号"
  },
  {
    prop: "defectdLineName",
    label: "线路名称"
  },
  {
    prop: "defectTowerName",
    label: "杆塔名称"
  },
  {
    prop: "maintainTeamName",
    label: "运维班组"
  },
  {
    prop: "deviceType",
    label: "装置类型"
  },
  {
    prop: "deviceState",
    label: "装置状态"
  }
];
export { tableItemData, chartData };
