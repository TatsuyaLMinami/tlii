<template>
  <div class="baseStyle">
    <el-header height="45px;">
      <el-button type="primary" size="small" @click="tableFn()"
        >条件查询</el-button
      >
      <el-button type="primary" size="small" @click="echartFn()"
        >图表统计</el-button
      >
      <el-button type="primary" size="small" @click="mapFn()"
        >二维地图</el-button
      >
    </el-header>
    <div style="width: 100; height: calc(100%-45px)">
      <faultStatistics v-show="mainBool.table"></faultStatistics>
      <barChart ref="barChart" v-show="mainBool.echart"></barChart>
      <lineChart ref="lineChart" v-show="mainBool.echart"></lineChart>
      <faultMap ref="map" v-show="mainBool.map"></faultMap>
    </div>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import { chartData1, chartData2 } from "@/store/chartItems/faultData.js";
import lineChart from "@/pages/public/lineChart";
import faultMap from "./fault/faultMap";
import faultStatistics from "./fault/faultStatistics";
export default {
  name: "fault",
  data() {
    return {
      mainBool: {
        map: false,
        table: true,
        echart: false
      },
      chartData1: chartData1,
      chartData2: chartData2
    };
  },
  components: {
    barChart,
    lineChart,
    faultMap,
    faultStatistics
  },
  methods: {
    mapFn() {
      this.$refs.map.setData();
      this.mainBool.map = true;
      this.mainBool.table = false;
      this.mainBool.echart = false;
    },
    tableFn() {
      this.mainBool.map = false;
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      const url = "/tpiim/selffault/faultTotal";
      $axios({ url: url, type: "post", data: {} })
        .then(data => {
          if (data.successful) {
            data.resultValue.fixedRate = [
              [
                (
                  ((data.resultValue.managedTotal.totalNumber -
                    data.resultValue.managedTotal.notManagedTotal) /
                    data.resultValue.managedTotal.totalNumber) *
                  100
                ).toFixed(2)
              ],
              ["故障抢修率%"]
            ];
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.chartData1.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (
                  Object.values(this.chartData1[i])[0] ===
                  keys[j] + "Fault"
                ) {
                  this.chartData1[i].xAxis = data.resultValue[keys[j]][1];
                  this.chartData1[i].series.data = data.resultValue[keys[j]][0];
                }
              }
            }
            for (let i = 0; i < this.chartData2.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (
                  Object.values(this.chartData2[i])[0] ===
                  keys[j] + "Fault"
                ) {
                  this.chartData2[i].xAxis =
                    data.resultValue[keys[j]]["arrDate"];
                  this.chartData2[i].legend = {
                    data: data.resultValue[keys[j]]["arrFaultLocation"],
                    top: "10%",
                    width: "350px"
                  };
                  let key = Object.keys(data.resultValue[keys[j]]["Number"]),
                    value = Object.values(data.resultValue[keys[j]]["Number"]),
                    arr = [];
                  for (let k = 0; k < key.length; k++) {
                    arr.push({
                      name: key[k],
                      type: "line",
                      data: value[k]
                    });
                    this.chartData2[i].series = arr;
                  }
                }
              }
            }
            this.$refs.barChart.showChart(this.chartData1, "400px", "255px");
            this.$refs.lineChart.showChart(this.chartData2, "400px", "255px");
            this.mainBool.map = false;
            this.mainBool.table = false;
            this.mainBool.echart = true;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style scoped>
.el-header {
  text-align: right;
  line-height: 45px;
  margin-bottom: 10px;
}
</style>
