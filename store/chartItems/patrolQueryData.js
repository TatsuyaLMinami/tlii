var chartData = [
  {
    id: "taskTypePQ",
    title: "巡视类型",
    series: {
      name: "数量",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  },
  {
    id: "patrolMissionCompletePQ",
    title: "巡视任务完成率(%)",
    series: {
      name: "(%)",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  },
  {
    id: "patrolArrivePQ",
    title: "巡视到位率(%)",
    series: {
      name: "(%)",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  },
  {
    id: "taskCityPQ",
    title: "各地市巡视任务数",
    series: {
      name: "数量",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  },
  {
    id: "completeTaskCityPQ",
    title: "各地市已完成任务数",
    series: {
      name: "数量",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  },
  {
    id: "patrolDefectHDPQ",
    title: "巡视过程中发现的缺陷、隐患数量",
    series: {
      name: "数量",
      barWidth: "20%",
      type: "bar",
      data: []
    }
  }
];
for (let key in chartData) {
  chartData[key].legend = [];
  chartData[key].xAxis = [];
}
export default chartData;
