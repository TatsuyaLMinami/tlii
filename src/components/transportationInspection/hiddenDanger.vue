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
      <hiddenDangerStatistics v-show="mainBool.table"></hiddenDangerStatistics>
      <barChart ref="chart" v-show="mainBool.echart"></barChart>
      <hiddenDangerMap ref="map" v-show="mainBool.map"></hiddenDangerMap>
    </div>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import hiddenDangerData from "@/store/chartItems/hiddenDangerData.js";
import hiddenDangerMap from "./hiddenDanger/hiddenDangerMap";
import hiddenDangerStatistics from "./hiddenDanger/hiddenDangerStatistics";
export default {
  name: "hiddenDanger",
  data() {
    return {
      echartData: hiddenDangerData,
      mainBool: {
        map: false,
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    hiddenDangerMap,
    hiddenDangerStatistics
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
      const url = "/tpiim/ptmihdrecord/hdTotal";
      $axios({ url: url, type: "post", data: {} })
        .then(data => {
          if (data.successful) {
            data.resultValue.manageRate = [
              [
                (
                  (data.resultValue.hiddenDangerTotal.managedTotal /
                    data.resultValue.hiddenDangerTotal.hiddenDangerTotal) *
                  100
                ).toFixed(2)
              ],
              ["隐患治理率"]
            ];
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.echartData.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (Object.values(this.echartData[i])[0] === keys[j] + "Hd") {
                  this.echartData[i].xAxis = data.resultValue[keys[j]][1];
                  this.echartData[i].series.data = data.resultValue[keys[j]][0];
                }
              }
            }
            this.$refs.chart.showChart(this.echartData, "400px", "255px");
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
.el-main {
  width: 100%;
  height: calc(100% - 45px);
}
</style>
