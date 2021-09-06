<template>
  <div>
    <el-dialog title="三跨统计" :visible.sync="visible" width="800px">
      <barChart ref="barChartSanKua"></barChart>
    </el-dialog>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import chartData from "@/store/chartItems/resourceData.js";
export default {
  name: "SanKua",
  components: {
    barChart
  },
  data() {
    return {
      visible: false,
      echartData: chartData
    };
  },
  methods: {
    initFn() {
      this.visible = true;
      this.$nextTick(() => {
        this.loadData();
      });
    },
    loadData() {
      $axios({
        url: "/tpiim/indexTopic/getSpanStatistics",
        type: "get"
      })
        .then(res => {
          let xAxis = [],
            series = [];
          for (let key in res.resultValue) {
            xAxis.push(res.resultValue[key].crossStyle);
            series.push(res.resultValue[key].number);
            this.echartData[7].xAxis = xAxis;
            this.echartData[7].series.data = series;
          }
          this.$refs.barChartSanKua.showChart(
            [this.echartData[7]],
            "800px",
            "500px"
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
