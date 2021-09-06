<template>
  <div>
    <el-dialog title="作业状态统计  " :visible.sync="visible" width="1200px">
      <el-form>
        <el-form-item label="查询日期：">
          <el-date-picker
            v-model="filter"
            type="daterange"
            size="small"
            clearable
            @change="changeDateFn"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="display:flex;width:100%">
        <pieChart style="width:50%" ref="pieChartZuoYe"></pieChart>
        <barChart style="width:50%" ref="barChartZuoYe"></barChart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pieChart from "@/pages/public/pieChart";
import barChart from "@/pages/public/barChart";
import chartData from "@/store/chartItems/resourceData.js";
export default {
  name: "ZuoYe",
  components: {
    barChart,
    pieChart
  },
  data() {
    return {
      visible: false,
      echartData: chartData,
      startTime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      endTime: new Date(),
      filter: [
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        new Date()
      ]
    };
  },
  methods: {
    initFn() {
      this.visible = true;
      this.$nextTick(() => {
        this.loadDataA();
        this.loadDataB();
      });
    },
    changeDateFn(date) {
      if (date) {
        this.startTime = date[0].getTime();
        this.endTime = date[1].getTime();
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      this.loadDataA();
      this.loadDataB();
    },
    loadDataA() {
      $axios({
        url: "/tpiim/indexTask/getTaskCompletion",
        type: "post",
        data: {
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
        .then(res => {
          let data = [];
          for (let key in res.resultValue) {
            data.push({ name: key, value: res.resultValue[key] });
            this.echartData[5].series[0].data = data;
          }
          this.$refs.pieChartZuoYe.showChart(
            [this.echartData[5]],

            "500px",
            "500px"
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadDataB() {
      $axios({
        url: "/tpiim/indexTask/getTaskTrend",
        type: "post",
        data: {
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
        .then(res => {
          let xAxis = [],
            series = [];
          for (let key in res.resultValue) {
            xAxis.push(key);
            series.push(res.resultValue[key]);
            this.echartData[6].xAxis = xAxis;
            this.echartData[6].series.data = series;
          }
          this.$refs.barChartZuoYe.showChart(
            [this.echartData[6]],
            "500px",
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
