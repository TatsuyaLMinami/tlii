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
      <defectStatistics v-show="mainBool.table"></defectStatistics>
      <barChart ref="chart1" v-show="mainBool.echart"></barChart>
      <barChart ref="chart2" v-show="mainBool.echart"></barChart>
      <defectMap ref="map" v-show="mainBool.map"></defectMap>
    </div>
  </div>
</template>
<script>
import chartData from "@/store/chartItems/defectData.js";
import barChart from "@/pages/public/barChart";
import defectMap from "./defect/defectMap";
import defectStatistics from "./defect/defectStatistics";
export default {
  name: "defect",
  data() {
    return {
      echartData: chartData,
      mainBool: {
        map: false,
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    defectMap,
    defectStatistics
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
      const url = "/tpiim/ptmidefectrecord/defectTotal";
      $axios({ url: url, type: "post", data: {} })
        .then(data => {
          if (data.successful) {
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.echartData.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (
                  Object.values(this.echartData[i])[0] ===
                  keys[j] + "Defect"
                ) {
                  this.echartData[i].xAxis = data.resultValue[keys[j]][1];
                  this.echartData[i].series.data = data.resultValue[keys[j]][0];
                }
              }
            }
            this.$refs.chart1.showChart(
              this.echartData.slice(0, 4),
              "300px",
              "255px"
            );
            this.$refs.chart2.showChart(
              this.echartData.slice(4),
              "400px",
              "255px"
            );
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
