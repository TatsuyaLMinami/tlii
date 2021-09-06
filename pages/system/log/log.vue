<template>
  <div class="baseStyle">
    <el-header height="45px;">
      <el-button type="primary" size="small" @click="tableFn()"
        >条件查询</el-button
      >
      <el-button type="primary" size="small" @click="echartFn()"
        >图表统计</el-button
      >
    </el-header>
    <div style="width: 100; height: calc(100%-45px)">
      <logTable v-show="mainBool.table"></logTable>
      <barChart ref="chart" v-show="mainBool.echart"></barChart>
    </div>
  </div>
</template>
<script>
import barChart from "@/pages/public/barChart";
import { logData } from "@/store/chartItems/logData.js";
import logTable from "./logTable";
export default {
  name: "log",
  data() {
    return {
      echartData: logData,
      mainBool: {
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    logTable
  },
  methods: {
    tableFn() {
      this.showChart = false;
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      const url = "/yangkai/sysLog/getTaskStatistics";
      $axios({ url: url, type: "post", data: {} })
        .then(data => {
          if (data.successful) {
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.echartData.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (Object.values(this.echartData[i])[0] === keys[j]) {
                  this.echartData[i].xAxis = Object.keys(
                    data.resultValue[keys[j]]
                  );
                  this.echartData[i].series.data = Object.values(
                    data.resultValue[keys[j]]
                  );
                }
              }
            }
            this.$refs.chart.showChart(this.echartData, "300px", "260px");
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
