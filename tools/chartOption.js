const setLineOption = function(data) {
  return new Promise(function(resolve, reject) {
    let option = {};
    if (data.xAxis.length === 0) {
      option = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#65ABE7",
            fontWeight: "normal",
            fontSize: 16
          }
        }
      };
    } else {
      option = {
        title: {
          text: data.title
        },
        tooltip: {
          trigger: "axis",
          formatter: function(value) {
            console.log(value);
            return formate(value);
          }
        },
        legend: data.legend,
        yAxis: [
          {
            type: "value"
          }
        ],
        series: data.series
      };
      if (!data.xAxis2) {
        option.xAxis = {
          type: "category",
          data: data.xAxis
        };
        if (data.xAxis.length > 1 && data.xAxis.length < 6) {
          option.xAxis.axisLabel = { rotate: 20 };
        } else if (data.xAxis.length > 6) {
          option.dataZoom = [
            {
              id: "dataZoomX",
              type: "slider",
              xAxisIndex: [0],
              filterMode: "filter",
              height: "20px"
            }
          ];
        }
      } else {
        option.title = {
          text: ""
        };
        option.dataZoom = [];
        option.xAxis = [
          {
            type: "category",
            data: data.xAxis,
            axisLabel: {
              rotate: 20
            }
          },
          {
            type: "category",
            data: data.xAxis2
          }
        ];
      }
    }
    resolve(option);
  });
};
const setPieOption = function(data, title) {
  return new Promise(function(resolve, reject) {
    let option = {};
    if (data.length === 0) {
      option = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#65ABE7",
            fontWeight: "normal",
            fontSize: 16
          }
        }
      };
    } else {
      option = {
        title: {
          text: title
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: data
      };
    }
    resolve(option);
  });
};
const setBarOption = function(title, legend, xAxis, series) {
  return new Promise(function(resolve, reject) {
    let option = {};
    if (xAxis.length === 0) {
      option = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#65ABE7",
            fontWeight: "normal",
            fontSize: 16
          }
        }
      };
    } else {
      option = {
        title: {
          text: title
        },
        tooltip: {
          trigger: "axis",
          formatter: function(value) {
            return formate(value);
          }
        },
        color: "#009688",
        legend: {
          data: legend
        },
        xAxis: {
          data: xAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: series
      };
      if (xAxis.length > 1 && xAxis.length < 6) {
        option.xAxis.axisLabel = { rotate: 20 };
      } else if (xAxis.length > 6) {
        option.dataZoom = [
          {
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter"
          }
        ];
      }
    }
    resolve(option);
  });
};
function formate(value) {
  var res = value[0].name + "<br/>";
  for (let keyA in value) {
    if (value[keyA].seriesName.indexOf("气压") >= 0) {
      if (value[keyA].value < 200) {
        value[keyA].value = value[keyA].value + "kPa";
      } else {
        value[keyA].value = value[keyA].value + "hPa";
      }
    }
    for (let keyB in formateData) {
      if (formateData[keyB].name.indexOf(value[keyA].seriesName) >= 0) {
        value[keyA].value = value[keyA].value + formateData[keyB].unit;
      }
    }
    res += value[keyA].seriesName + ":" + value[keyA].value + "<br/>";
  }
  return res;
}
const formateData = [
  {
    name: ["温度", "气温"],
    unit: "℃"
  },
  {
    name: ["概率", "湿度"],
    unit: "%"
  },
  {
    name: ["光辐射强度"],
    unit: "W/m²"
  },
  {
    name: ["风速", "速度"],
    unit: "m/s"
  },
  {
    name: ["雨量", "降水量", "等值覆冰厚度", "弯曲振幅"],
    unit: "mm"
  },
  {
    name: ["倾斜度", "顺线倾斜度", "横向倾斜度"],
    unit: "mm/m"
  },
  {
    name: ["顺线倾斜角", "横向倾斜角", "顶部位移值", "顺向倾斜角"],
    unit: "°"
  },
  {
    name: ["综合载荷", "不均衡张力差", "拉力值"],
    unit: "N"
  },
  {
    name: ["降水强度"],
    unit: "mm/min"
  },
  {
    name: ["频率"],
    unit: "Hz"
  },
  {
    name: ["里程"],
    unit: "km"
  },
  {
    name: ["缺陷数量", "隐患数量", "故障数量", "数量", "火山点数", "杆塔数"],
    unit: "个"
  },
  {
    name: ["线路数"],
    unit: "条"
  },
  {
    name: ["密度"],
    unit: "mg/cm²"
  },
  {
    name: [
      "舞动综合幅值",
      "垂直舞动幅值",
      "水平舞动幅值",
      "弧垂",
      "最小电气间隙距离"
    ],
    unit: "m"
  }
];
export { setLineOption, setPieOption, setBarOption };
