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
      <loginLogTable v-show="mainBool.table"></loginLogTable>
      <barChart ref="chart" v-show="mainBool.echart"></barChart>
    </div>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import { loginLogData } from "@/store/chartItems/logData.js";
import loginLogTable from "./loginLogTable";
export default {
  name: "loginLog",
  data() {
    return {
      echartData: loginLogData,
      mainBool: {
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    loginLogTable
  },
  methods: {
    tableFn() {
      this.showChart = false;
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      const url = "/yangkai/sysLoginLog/getTaskStatistics";
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
            this.$refs.chart.showChart(this.echartData, "600px", "520px");
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
