<template>
  <div>
    <el-container>
      <el-aside width="250px;" style="overflow-x: hidden">
        <queryTree
          @showTable="showTable"
          @showImage="showImage"
          @showDialog="showDialog"
        ></queryTree>
      </el-aside>
      <el-container class="right">
        <el-header height="35px" style="text-align: right">
          <el-button type="primary" size="small" @click="tableFn()"
            >条件查询</el-button
          >
          <el-button type="primary" size="small" @click="echartFn()"
            >图表统计</el-button
          >
        </el-header>
        <el-main>
          <queryTable ref="qT" v-show="mainBool.table"></queryTable>
          <barChart ref="chart" v-show="mainBool.echart"></barChart>
        </el-main>
      </el-container>
    </el-container>
    <dialogTable ref="dT"></dialogTable>
    <el-dialog class="imageStyle" title="装置安装图片" :visible.sync="visible">
      <el-image fit="contain" :src="imageUrl" :preview-src-list="[imageUrl]">
      </el-image>
    </el-dialog>
  </div>
</template>
<script>
import { chartData } from "@/store/chartItems/queryData.js";
import $store from "@/store/data.js";
import dialogTable from "./query/dialogTable";
import queryTree from "./query/queryTree";
import queryTable from "./query/queryTable";
import barChart from "@/pages/public/barChart";
export default {
  name: "query",
  data() {
    return {
      url: $store.getters.url,
      imageUrl: "",
      deviceType: "",
      chartData: chartData,
      mainBool: {
        table: true,
        echart: false
      },
      //
      visible: false
    };
  },
  components: {
    queryTree,
    queryTable,
    barChart,
    dialogTable
  },
  methods: {
    showTable(deviceType) {
      this.deviceType = deviceType;
      this.$refs.qT.setData(deviceType, false);
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    showImage(imageUrl) {
      if (imageUrl === "") {
        this.$message.error("暂无图片");
      } else {
        this.imageUrl = this.url + imageUrl;
        this.visible = true;
      }
    },
    showDialog(deviceCode) {
      this.$refs.dT.setData(deviceCode);
    },
    tableFn() {
      if (!this.deviceType) {
        this.$refs.qT.setData("", true);
      } else {
        this.$refs.qT.setData(this.deviceType, true);
      }
      this.mainBool.table = true;
      this.mainBool.echart = false;
    },
    echartFn() {
      const url = "/tpiim/monitoringDevice/getDeviceStatistics";
      $axios({
        url: url,
        type: "post",
        data: {
          names: [
            "deviceType",
            "deviceCover",
            "deviceManu",
            "deviceAlarm",
            "deviceState",
            "deviceIncrease"
          ]
        }
      })
        .then(data => {
          if (data.successful) {
            data.resultValue.deviceCoverage = {
              装置覆盖率: (
                (data.resultValue.deviceCover.cover /
                  data.resultValue.deviceCover.sum) *
                100
              ).toFixed(2)
            };
            data.resultValue.alarmType = {
              装置告警率: (
                (data.resultValue.deviceAlarm.Alarm /
                  data.resultValue.deviceAlarm.sum) *
                100
              ).toFixed(2)
            };
            let keys = Object.keys(data.resultValue);
            for (let i = 0; i < this.chartData.length; i++) {
              for (let j = 0; j < keys.length; j++) {
                if (Object.values(this.chartData[i])[0] === keys[j] + "Query") {
                  this.chartData[i].xAxis = Object.keys(
                    data.resultValue[keys[j]]
                  );
                  this.chartData[i].series.data = Object.values(
                    data.resultValue[keys[j]]
                  );
                }
              }
            }
            this.mainBool.table = false;
            this.mainBool.echart = true;
            this.$refs.chart.showChart(this.chartData, "400px", "255px");
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
<style lang="less">
.imageStyle {
  height: 100%;
  width: 100%;
  min-width: 1000px;
  .el-dialog {
    margin-top: 10vh !important;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    .el-dialog__header {
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .el-dialog__headerbtn {
      top: 15px;
    }
    .el-dialog__close {
      color: black;
    }
    .el-dialog__body {
      text-align: center;
      padding: 5px;
    }
  }
}
</style>
