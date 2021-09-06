var chartData1 = [
  {
    id: "faultCauseTotalFault",
    title: "故障原因",
    series: {
      name: "数量"
    }
  },
  {
    id: "faultLocationTotalFault",
    title: "故障部位",
    series: {
      name: "数量"
    }
  },
  {
    id: "fixedRateFault",
    title: "故障抢修率(%)",
    series: {
    }
  }
];
var chartData2 = [
  {
    id: "cityTotalFault",
    title: "近五年各地市故障数量趋势"
  },
  {
    id: "faultLocationDateTotalFault",
    title: "近五年各故障部位故障数量趋势"
  },
  {
    id: "volLevelDateTotalFault",
    title: "近五年各电压等级故障数量趋势"
  }
];
for (let key in chartData1) {
  chartData1[key].legend = [];
  chartData1[key].xAxis = [];
  chartData1[key].series.barWidth = "20%";
  chartData1[key].series.type = "bar";
  chartData1[key].series.data = [];
}
for (let key in chartData2) {
  chartData2[key].legend = [];
  chartData2[key].xAxis = [];
  chartData2[key].series = [];
}
export {chartData1, chartData2};
