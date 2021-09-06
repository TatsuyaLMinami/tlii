<template>
  <el-dialog
    ref="dialog"
    title="未来24小时天气预报信息"
    :visible.sync="visible"
    :before-close="handleClose"
    width="1000px"
    @open="open"
  >
    <lineChart ref="weatherChart"></lineChart>
  </el-dialog>
</template>
<script>
import lineChart from "@/pages/public/lineChart";
import gridDisasterData from "@/store/chartItems/gridDisasterData.js";
export default {
  name: "dialogWeather",
  components: {
    lineChart
  },
  data() {
    return {
      weatherChartData: gridDisasterData.weatherChartData,
      visible: false
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    setData(id) {
      const url =
        "yangkai/damageMeteorologicalCurrentInfo/getMeteorologicalForecastList";
      $axios({
        url: url,
        type: "post",
        data: { id: id }
      })
        .then(res => {
          if (res.successful) {
            this.$refs.dialog.open();
            this.drawChart(res.resultValue);
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    open() {},
    drawChart(data) {
      let xAxis = [],
        xAxis2 = [],
        series = [],
        lineData = this.weatherChartData[0].lineData;
      for (let i = 0; i < data.length; i++) {
        xAxis.push(
          this.$moment(data[i].dataTime)
            .utcOffset(8)
            .format("MM-DD HH:MM")
        );
        xAxis2.push(data[i].windDirection);
        data[i].airpressure = (data[i].airpressure / 10).toFixed(2);
        for (let key in lineData) {
          lineData[key].push(data[i][key]);
        }
      }
      for (let i = 0; i < this.weatherChartData[0].legend.data.length; i++) {
        series.push({
          data: Object.values(lineData)[i],
          name: this.weatherChartData[0].legend.data[i],
          type: "line"
        });
      }
      this.weatherChartData[0].xAxis = xAxis;
      this.weatherChartData[0].xAxis2 = xAxis2;
      this.weatherChartData[0].series = series;
      this.$nextTick(() => {
        this.$refs.weatherChart.showChart(
          this.weatherChartData,
          "1000px",
          "400px"
        );
        this.visible = true;
      });
    }
  }
};
</script>
