var chartData = [
  {
    id: "voltageLenLine",
    title: "不同电压等级线路里程统计",
    data: {
      data: {
        xCoordinate: "voltage"
      }
    }
  },
  {
    id: "yearLenLine",
    title: "不同年限线路里程统计",
    data: {
      data: {
        xCoordinate: "year"
      }
    }
  },
  {
    id: "voltageNumLine",
    title: "不同电压等级线路数量统计",
    data: {
      data: {
        xCoordinate: "voltage"
      }
    }
  },
  {
    id: "yearNumLine",
    title: "不同年限线路数量统计",
    data: {
      data: {
        xCoordinate: "year"
      }
    }
  },
  {
    id: "voltageNumTower",
    title: "不同电压等级杆塔数量统计",
    data: {
      data: {
        xCoordinate: "voltage"
      }
    }
  },
  {
    id: "yearNumTower",
    title: "不同年限杆塔数量统计",
    data: {
      data: {
        xCoordinate: "year"
      }
    }
  },
  {
    id: "manuNumTower",
    title: "不同厂家杆塔数量统计",
    data: {
      data: {
        xCoordinate: "manu"
      }
    }
  },
  {
    id: "materialNumTower",
    title: "不同材质杆塔数量统计",
    data: {
      data: {
        xCoordinate: "material"
      }
    }
  },
  {
    id: "regionNumTower",
    title: "不同地区杆塔数量统计",
    data: {
      data: {
        xCoordinate: "region"
      }
    }
  },
  {
    id: "terrainNumTower",
    title: "不同地形纬度杆塔数量统计",
    data: {
      data: {
        xCoordinate: "terrain"
      }
    }
  }
];
for (let key in chartData.slice(0, 2)) {
  chartData.slice(0, 2)[key].data.data.yCoordinate = "length";
  chartData.slice(0, 2)[key].legend = [];
  chartData.slice(0, 2)[key].xAxis = [];
  chartData.slice(0, 2)[key].series = {
    name: "里程",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
for (let key in chartData) {
  chartData[key].data.type = "post";
  chartData[key].result = "";
}
for (let key in chartData.slice(0, 4)) {
  chartData.slice(0, 4)[key].data.url = "/tpiim/statistics/getLineStatistics";
}
for (let key in chartData.slice(4)) {
  chartData.slice(4)[key].data.url = "/tpiim/statistics/getTowerStatistics";
}
for (let key in chartData.slice(2)) {
  chartData.slice(2)[key].data.data.yCoordinate = "num";
  chartData.slice(2)[key].legend = [];
  chartData.slice(2)[key].xAxis = [];
  chartData.slice(2)[key].series = {
    name: "数量",
    barWidth: "20%",
    type: "bar",
    data: []
  };
}
export default chartData;
