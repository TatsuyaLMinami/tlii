<template>
  <div class="lines">
    <el-container>
      <el-aside width="250px">
        <line-tree @basicInfoFn="infoFn"></line-tree>
      </el-aside>
      <el-container class="lines-right">
        <el-header height="45px">
          <el-button type="primary" size="small" @click="tableFn()"
            >条件查询</el-button
          >
          <el-button type="primary" size="small" @click="echartFn()"
            >图表统计</el-button
          >
        </el-header>
        <el-main>
          <line-basic-info v-show="mainBool.info"></line-basic-info>
          <line-table v-show="mainBool.table"></line-table>
          <barChart ref="lineChart" v-show="mainBool.echart"></barChart>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import chartData from "@/store/chartItems/lineData.js";
import barChart from "@/pages/public/barChart";
import lineTree from "./line/lineTree";
import lineBasicInfo from "./line/lineBasicInfo";
import lineTable from "./line/lineTable";
export default {
  name: "lines",
  data() {
    return {
      echartData: chartData,
      mainBool: {
        info: false,
        table: true,
        echart: false
      }
    };
  },
  components: {
    barChart,
    lineTree,
    lineTable,
    lineBasicInfo
  },
  methods: {
    infoFn() {
      this.mainBool.info = true;
      this.mainBool.table = false;
      this.mainBool.echart = false;
    },
    tableFn() {
      this.mainBool.info = false;
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      for (let key in this.echartData) {
        $axios({ ...this.echartData[key].data })
          .then(res => {
            this.echartData[key].xAxis = Object.keys(res.resultValue);
            this.echartData[key].series.data = Object.values(res.resultValue);
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
      setTimeout(() => {
        this.$refs.lineChart.showChart(this.echartData, "400px", "255px");
        this.mainBool.info = false;
        this.mainBool.table = false;
        this.mainBool.echart = true;
      }, 500);
    }
  }
};
</script>
<style scoped>
.el-header {
  text-align: right;
  line-height: 45px;
}
.lines-right {
  position: relative;
}
</style>
