<template>
  <el-dialog
    class="omCenterStyle"
    title="监测数据统计"
    :before-close="handleClose"
    :visible.sync="visible"
  >
    <el-aside width="250px">
      <omTree @getOMList="getOMList"></omTree>
    </el-aside>
    <div class="main">
      <el-button
        :disabled="disabled"
        type="primary"
        size="small"
        @click="echartFn()"
        style="float: right; margin-left: 20px"
        >图表统计</el-button
      >
      <el-button
        :disabled="disabled"
        type="primary"
        size="small"
        @click="tableFn()"
        style="float: right"
        >条件查询</el-button
      >

      <el-form :inline="true" :disabled="disabled">
        <el-form-item size="small" label="监测时间:">
          <el-date-picker
            :picker-options="pickerOptions"
            @change="getOMList(1)"
            v-model="filter.monitoringTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-table
        v-show="!echartShow"
        v-loading="loading"
        stripe
        :data="tableData"
        border
      >
        <el-table-column type="index" label="序号" width="50"> </el-table-column
        ><el-table-column
          v-for="(item, i) in tableItems"
          :key="i"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="item.time">{{
              scope.row[item.prop] 
            }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="!echartShow"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next, jumper"
        :total="totalPages"
      >
      </el-pagination>
      <div class="echart" style="margin-top: 30px" v-show="echartShow">
        <lineChart ref="omChart"></lineChart>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import tableItems from "@/store/tableItems/tableItems.js";
import monitorData from "@/store/tableItems/monitorData.js";
import omTree from "./omDialog/omTree";
import lineChart from "@/pages/public/lineChart";
export default {
  name: "omDialog",
  components: {
    omTree,
    lineChart
  },
  data() {
    return {
      disabled: true,
      visible: false,
      pickerOptions: {
        disabledDate: this.disabledDisDate
      },
      echartShow: false,
      loading: true,
      tableData: [],
      tableItems: [],
      deviceCode: "",
      deviceType: "",
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 5,
      //筛选条件
      filter: {
        monitoringTime: ""
      },
      form: {},
      formLabelWidth: "120px",
    };
  },
  methods: {
    setData() {
      this.loading = false;
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    tableFn() {
      this.echartShow = false;
    },
    echartFn() {
      this.echartShow = true;
    },
    getOMList(pageNum, deviceCode, deviceType) {
      this.disabled = false;
      if (deviceCode) {
        this.deviceCode = deviceCode;
      }
      if (deviceType) {
        this.deviceType = deviceType;
      }
      let now = new Date().getTime(),
        date = now - 7 * 24 * 3600 * 1000,
        startTime = new Date(this.filter.monitoringTime[0]).getTime() || date,
        endTime = new Date(this.filter.monitoringTime[1]).getTime() || now;
      $axios({
        url: "/tpiim/realTimeMonitor/getMonitorTypeTotal",
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: 5,
          deviceCode: this.deviceCode,
          startTime: startTime,
          endTime: endTime
        }
      }).then(data => {
        this.loading = false;
        if (data.successful && data.resultValue !== {}) {
          let table = [],
            totalPage = 0,
            resultValue = data.resultValue,
            legend = { data: [], top: "8%", width: "700px" },
            xAxis = [],
            series = [],
            title = "",
            model = "";
          for (let monitor in monitorData) {
            if (monitorData[monitor].deviceType === this.deviceType) {
              title = monitorData[monitor].title;
              legend.data = monitorData[monitor].legend;
              model = resultValue[monitorData[monitor].model];
              table = model[monitorData[monitor].table]["data"];
              totalPage = model[monitorData[monitor].table]["total"];
              for (
                let i = 0;
                i < model[monitorData[monitor].listweek].length;
                i++
              ) {
                model[monitorData[monitor].listweek][i] += "点";
              }
              xAxis = model[monitorData[monitor].listweek];
              for (
                let i = 0;
                i < monitorData[monitor].monitorType.length;
                i++
              ) {
                series.push({
                  name: monitorData[monitor].legend[i],
                  type: "line",
                  data: model[monitorData[monitor].monitorType[i]]
                });
              }
            }
          }

          let omChartData = [
            {
              id: "EchartOMId",
              legend: legend,
              xAxis: xAxis,
              series: series,
              title: title
            }
          ];
          this.$refs.omChart.showChart(omChartData, "850px", "450px");
          this.tableItems =tableItems[deviceType];
          this.tableData = table;
          this.totalPages = totalPage;
        } else {
          this.$refs.omChart.showChart(
            [
              {
                id: "EchartOMId",
                xAxis: []
              }
            ],
            "850px",
            "450px"
          );
          this.totalPages = 0;
          this.tableItems = [];
          this.tableData = [];
          this.echartShow = false;
          this.$message.error(data.resultHint);
        }
      });
    },

    disabledDisDate(time) {
      if (time.getTime() > new Date().getTime()) {
        return true;
      } else if (
        time.getTime() <
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      ) {
        return true;
      } else {
        return false;
      }
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOMList(val);
    }
  }
};
</script>
<style lang="less">
.omCenterStyle {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  min-width: 1000px;
  .el-dialog {
    width: 1100px;
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
      padding: 20px 20px;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .el-form {
        margin-left: 10px;
        width: 100%;
      }
      .main {
        height: 500px;
        width: 810px;
        .el-table {
          overflow-y: auto;
          height: 420px;
          margin-left: 10px;
          width: 100%;
        }
        .el-pagination {
          bottom: 10px;
          left: 50%;
          position: absolute;
          width: 100%;
        }
        .echarts {
          margin-left: 10px;
          width: 100%;
        }
      }
    }
  }
}
</style>
