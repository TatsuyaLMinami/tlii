var chartData = [
  {
    id: "volLevelTotalDefect",
    title: "电压等级"
  },
  {
    id: "natureTotalDefect",
    title: "缺陷性质"
  },
  {
    id: "lineTotalDefect",
    title: "所属线路"
  },
  {
    id: "discovDateTotalDefect",
    title: "发现时间"
  },
  {
    id: "defectTypeTotalDefect",
    title: "缺陷类型"
  },
  {
    id: "cityTotalDefect",
    title: "所在城市"
  },
  {
    id: "manufacturerTotalDefect",
    title: "生产厂家"
  }
];
for (let key in chartData) {
  chartData[key].legend = [];
  chartData[key].xAxis = [];
  chartData[key].series = {
    name: "缺陷数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
export default chartData;
