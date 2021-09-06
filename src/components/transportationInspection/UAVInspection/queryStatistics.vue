<template>
  <div class="query-statistics">
    <el-row>
      <el-col :span="8">
        <div class="echart" ref="echartA"></div>
      </el-col>
      <el-col :span="8">
        <div class="echart" ref="echartB"></div>
      </el-col>
      <el-col :span="8">
        <div class="echart" ref="echartC"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      echartA: null,
      echartB: null,
      echartC: null,
    };
  },
  components: {},
  created() {
    this.loadDataA();
    this.loadDataB();
    this.loadDataC();
  },
  mounted() {
    this.echartA = this.$echarts.init(this.$refs.echartA);
    this.echartB = this.$echarts.init(this.$refs.echartB);
    this.echartC = this.$echarts.init(this.$refs.echartC);
  },
  methods: {
    // 统计无人机巡检计划完成情况
    loadDataA() {
      $axios({
        url: "/tpiim/uavPlanStatistics/getUavPlanStatistics",
        type: "post",
        data: { unitCode: "1" },
      })
        .then((res) => {
          let options = {
            text: "巡检计划完成情况",
            legendData: ["已完成", "未完成"],
            seriesData: [
              {
                name: "已完成",
                value: res.resultValue[0].finshCount,
              },
              {
                name: "未完成",
                value:
                  res.resultValue[0].towerPlanCount -
                  res.resultValue[0].finshCount,
              },
            ],
            xAxisData: [],
            seriesName: "巡检杆塔（个）",
          };
          this.pieFn(this.echartA, options);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadDataB() {
      $axios({
        url: "/tpiim/uavCoverageStatistics/getUavCoverageStatistics",
        type: "post",
        data: { unitCode: "1" },
      })
        .then((res) => {
          let options = {
            text: "巡检覆盖情况",
            legendData: ["已巡检", "未巡检"],
            seriesData: [
              {
                name: "已巡检",
                value: res.resultValue[0].finshCount,
              },
              {
                name: "未巡检",
                value:
                  res.resultValue[0].towerCount - res.resultValue[0].finshCount,
              },
            ],
            xAxisData: [],
            seriesName: "巡检杆塔（个）",
          };
          this.pieFn(this.echartB, options);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadDataC() {
      $axios({
        url: "/tpiim/uavDefectStatistics/getUavDefectStatistics",
        type: "post",
        data: { unitCode: "1" },
      })
        .then((res) => {
          var newData = {};
          let lineOption = {
            text: "巡检缺陷情况",
            seriesName: "缺陷",
            seriesName: ["缺陷"],
            seriesData: [],
            xAxisData: [],
          };
          for (let i = 0; i < res.resultValue.length; i++) {
            lineOption.seriesData.push(res.resultValue[i].defectCount);
            lineOption.xAxisData.push(res.resultValue[i].defectTypeName);
          }
          this.barFn(this.echartC, lineOption);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pieFn(myChart, options) {
      myChart.setOption({
        title: {
          text: options.text,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 50,
          bottom: 20,
          data: options.legendData,
        },
        color: ["#009688", "orange", "green", "blue", "indigo", "purple"],
        series: [
          {
            name: options.seriesName,
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: options.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    barFn(myChart, options) {
      myChart.setOption({
        title: {
          text: options.text,
          left: "center",
        },
        color: ["#009688"],
        xAxis: {
          data: options.xAxisData,
        },
        // legend: {
        //   data: options.legendData,
        // },
        tooltip: {},
        yAxis: {},
        series: [
          {
            type: "bar",
            barWidth: 40,
            name: options.seriesName,
            data: options.seriesData,
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.echart {
  width: 100%;
  height: 500px;
  margin-top: 30px;
}
</style>
