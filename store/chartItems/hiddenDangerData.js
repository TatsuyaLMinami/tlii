var hiddenDangerData = [
  {
    id: "volLevelTotalHd",
    title: "电压等级"
  },
  {
    id: "discovDeptTotalHd",
    title: "发现部门"
  },
  {
    id: "lineTotalHd",
    title: "所属线路"
  },
  {
    id: "discovDateTotalHd",
    title: "发现时间"
  },
  {
    id: "troubleLevelTotalHd",
    title: "隐患级别"
  },
  {
    id: "manageRateHd",
    title: "隐患治理率(%)"
  },
];
for (let key in hiddenDangerData) {
  hiddenDangerData[key].legend = [];
  hiddenDangerData[key].xAxis = [];
  hiddenDangerData[key].series = {
    name: "隐患数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
export default hiddenDangerData;
