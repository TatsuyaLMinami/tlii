<template>
  <div>
    <el-container>
      <el-header height="45px">
        <el-button type="primary" size="small" @click="tableFn()"
          >条件查询</el-button
        >
        <el-button type="primary" size="small" @click="echartFn()"
          >图表统计</el-button
        >
      </el-header>
      <el-main>
        <inspectionTask
          :showBtn="showBtn"
          :tableHeight="tableHeight"
          v-show="mainBool.table"
        ></inspectionTask>
        <barChart ref="chart" v-show="mainBool.echart"></barChart>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import chartData from "@/store/chartItems/patrolQueryData.js";
import barChart from "@/pages/public/barChart";
import inspectionTask from "./inspectionTask";
export default {
  name: "patrolQuery",
  data() {
    return {
      showBtn: false,
      tableHeight: 380,

      echartData: chartData,
      table: [],
      mainBool: {
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    inspectionTask
  },
  methods: {
    tableFn() {
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      const url = "/yangkai/ptmiInsTask/getTaskStatistics";
      $axios({
        url: url,
        type: "post",
        data: {
          names: [
            "taskType",
            "taskComplete",
            "taskInPlace",
            "taskCity",
            "completeTaskCity",
            "getDefectCount",
            "getHDCount"
          ]
        }
      })
        .then(data => {
          if (data.successful) {
            data.resultValue.patrolMissionComplete = {
              任务完成率: (
                (data.resultValue.taskInPlace.inPlace /
                  data.resultValue.taskInPlace.sum) *
                100
              ).toFixed(2)
            };
            data.resultValue.patrolArrive = {
              巡视到位率: (
                (data.resultValue.taskComplete.complete /
                  data.resultValue.taskComplete.sum) *
                100
              ).toFixed(2)
            };
            data.resultValue.patrolDefectHD = {
              缺陷: data.resultValue.getDefectCount,
              隐患: data.resultValue.getHDCount
            };
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.echartData.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (Object.values(this.echartData[i])[0] === keys[j] + "PQ") {
                  this.echartData[i].xAxis = Object.keys(
                    data.resultValue[keys[j]]
                  );
                  this.echartData[i].series.data = Object.values(
                    data.resultValue[keys[j]]
                  );
                }
              }
            }
            this.$refs.chart.showChart(this.echartData, "400px", "200px");
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
}
</style>
