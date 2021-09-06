<template>
  <div class="omChart" v-show="visible">
    <div class="echartHeader">
      在线监测装置:
      <div style="display: inline-block; padding-left: 20px">
        在线:{{ deviceOnLineNum }} 离线: {{ deviceOffLineNum }}
      </div>
      <el-button icon="el-icon-close" @click="handleCloseChart"></el-button>
    </div>
    <div class="echartContent" v-for="(item, index) in echartData" :key="index">
      <div class="echartTitle">
        {{ item.title }}
        <div class="totalNum">总数 : {{ item.count }}</div>
      </div>
      <pieChart :ref="item.ref"></pieChart>
    </div>
  </div>
</template>
<script>
import pieChart from "@/pages/public/pieChart";
export default {
  name: "omChart",
  components: { pieChart },
  data() {
    return {
      //当前页面所用数据
      visible: true,
      deviceOnLineNum: 0,
      deviceOffLineNum: 0,
      echartData: [
        { title: "在线监测装置数量", ref: "device", count: 0 },
        { title: "在线监测告警统计", ref: "alarm", count: 0 }
      ]
    };
  },
  methods: {
    handleCloseChart() {
      this.$emit("closeChart");
      this.visible = false;
    },
    setData() {
      this.getOMDevice();
      this.getOMAlarm();
      this.visible = true;
    },
    getOMDevice() {
      const url = "/tpiim/monitoringDevice/getDeviceStatistics";
      $axios({
        url: url,
        type: "post",
        data: { names: ["deviceType", "deviceState"] }
      })
        .then(res => {
          if (res.successful) {
            let data = [],
              series = [],
              keys = Object.keys(res.resultValue.deviceType),
              values = Object.values(res.resultValue.deviceType);
            for (let i = 0; i < keys.length; i++) {
              data.push({
                value: values[i] * 1,
                name: keys[i]
              });
            }
            series = [
              {
                name: "在线监测装置数量",
                type: "pie",
                radius: ["40%", "60%"],
                avoidLabelOverlap: false,
                data: data
              }
            ];
            this.deviceOnLineNum =
              Object.values(res.resultValue.deviceState)[0] * 1 || 0;
            this.deviceOffLineNum =
              Object.values(res.resultValue.deviceState)[1] * 1 || 0;
            this.echartData[0].count =
              this.deviceOnLineNum + this.deviceOffLineNum;
            this.$refs.device[0].showChart(
              [
                {
                  id: "deviceId",
                  title: "",
                  series
                }
              ],
              "380px",
              "200px"
            );
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getOMAlarm() {
      const url = "/yangkai/monitoringAlarm/getStatistics";
      $axios({ url: url, type: "post", data: { names: ["alarmType"] } })
        .then(res => {
          if (res.successful) {
            let data = [],
              series = [],
              alarmTotalNum = 0,
              keys = Object.keys(res.resultValue.alarmType),
              values = Object.values(res.resultValue.alarmType);
            for (let i = 0; i < values.length; i++) {
              alarmTotalNum = alarmTotalNum + values[i] * 1;
            }
            for (let i = 0; i < keys.length; i++) {
              data.push({
                value: values[i] * 1,
                name: keys[i]
              });
            }
            series = [
              {
                name: "在线监测告警统计",
                type: "pie",
                radius: "60%",
                center: ["50%", "50%"],
                avoidLabelOverlap: false,
                data: data
              }
            ];
            this.echartData[1].count = alarmTotalNum;
            this.$refs.alarm[0].showChart(
              [
                {
                  id: "alarmId",
                  title: "",
                  series
                }
              ],
              "380px",
              "200px"
            );
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },
  mounted() {
    this.getOMDevice();
    this.getOMAlarm();
  }
};
</script>
<style lang="less">
.omChart {
  width: 400px;
  background: white;
  top: 0;
  position: absolute;
  right: 0;
  .echartHeader {
    font-size: 12px;
    font-weight: bold;
    padding: 10px;
    background: #f7f7f7;
    color: black;
    .el-button {
      line-height: 22px;
      padding: 0;
      background: transparent;
      float: right;
      border: none;
    }
  }
  .echartContent {
    padding: 10px;
    .echartTitle {
      font-size: 12px;
      padding-left: 10px;
      font-weight: bold;
      border-left: 2px #087f7f solid;
      border-left-width: 5px;
      .totalNum {
        float: right;
        font-size: 12px;
        font-weight: normal;
      }
    }
    .echart {
      margin-top: 10px;
      border-top: 1px solid #efefef;
    }
  }
}
</style>
