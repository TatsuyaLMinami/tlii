<template>
  <div>
    <el-dialog title="监测告警统计" :visible.sync="visible" width="1200px">
      <div class="popup-style">
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
          <barChart style="width:50%" ref="barChartJianCe1"></barChart>
          <barChart style="width:50%" ref="barChartJianCe2"></barChart>
        </div>
        <alarm ref="alarm"></alarm>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import alarm from "@/pages/panoramicMonitoring/deviceOnlineMonitoring/alarm";
import chartData from "@/store/chartItems/resourceData.js";
export default {
  name: "JianCe",
  data() {
    return {
      visible: false,
      echartData: chartData,
      barChartJianCe2: null,
      startTime: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      filter: [
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
        new Date().getTime()
      ]
    };
  },
  components: {
    barChart,
    alarm
  },
  methods: {
    initFn() {
      this.visible = true;
      this.$nextTick(() => {
        this.loadDataA();
        this.loadDataB();
        this.$refs.alarm.setData("", this.startTime, this.endTime);
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
      this.loadDataB();
      this.$refs.alarm.setData("", this.startTime, this.endTime);
    },
    loadDataA() {
      $axios({
        url: "/tpiim/indexEquipment/getDeviceOnLineRateTotal",
        type: "get"
      })
        .then(res => {
          let xAxis = [],
            series1 = [],
            series2 = [],
            series3 = [];
          for (let key in res.resultValue) {
            xAxis.push(res.resultValue[key].deviceTypeName);
            series1.push(res.resultValue[key].totalNum);
            series2.push(res.resultValue[key].onLineNum);
            series3.push(res.resultValue[key].onLineRate);
            this.echartData[8].xAxis = xAxis;
            this.echartData[8].series[0].data = series1;
            this.echartData[8].series[1].data = series2;
            this.echartData[8].series[2].data = series3;
          }
          this.$refs.barChartJianCe1.showChart(
            [this.echartData[8]],
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
        url: "/tpiim/indexEquipment/getDeviceAlarmTotal",
        type: "post",
        data: {
          sAlarmTime: this.startTime,
          eAlarmTimie: this.endTime
        }
      })
        .then(res => {
          let xAxis = [],
            series = [];
          for (let key in res.resultValue) {
            xAxis.push(res.resultValue[key].alarmTypeName);
            series.push({
              value: res.resultValue[i].alarmTotalNum,
              alarmType: res.resultValue[i].alarmType
            });
            this.echartData[9].xAxis = xAxis;
            this.echartData[9].series.data = series;
          }
          this.$refs.barChartJianCe2.showChart(
            [this.echartData[9]],
            "500px",
            "500px"
          );
          this.barChartJianCe2 = this.$echarts.init("deviceAlarmTotal");
          this.barChartJianCe2.on("click", params => {
            this.$refs.alarm.setData(
              params.data.alarmType,
              this.startTime,
              this.endTime
            );
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
