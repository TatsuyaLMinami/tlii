var logData = [
  {
    id: "sysAlarm",
    title: "系统日志级别"
  },
  {
    id: "sysLevel",
    title: "系统事件等级"
  },
  {
    id: "sysType",
    title: "系统操作类型"
  },
  {
    id: "sysYear",
    title: "系统操作年份"
  },
  {
    id: "operationAlarm",
    title: "业务日志级别"
  },
  {
    id: "operationLevel",
    title: "业务事件等级"
  },
  {
    id: "operationType",
    title: "业务操作类型"
  },
  {
    id: "operationYear",
    title: "业务操作年份"
  }
];
var loginLogData = [
  {
    id: "loginType",
    title: "登录操作类型"
  },
  {
    id: "loginYear",
    title: "登录操作年份"
  }
];
for (let key in loginLogData) {
  loginLogData[key].legend = [];
  loginLogData[key].xAxis = [];
  loginLogData[key].series = {
    name: "数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
for (let key in logData) {
  logData[key].legend = [];
  logData[key].xAxis = [];
  logData[key].series = {
    name: "数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
export { logData, loginLogData };
