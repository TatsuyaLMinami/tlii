<template>
  <el-dialog
    class="dialogTable"
    title="告警信息"
    :before-close="handleClose"
    :visible.sync="visible"
  >
    <el-table v-loading="loading" stripe :data="table" border max-height="335">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="alarmStateName"
        label="告警状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="alarmLevelName"
        label="告警级别"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="alarmTypeName"
        label="报警类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="所属线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="towerName"
        label="所属杆塔"
      >
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="sAlarmTime"
        label="告警开始时间"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="totalPages"
    >
    </el-pagination>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogTable",
  data() {
    return {
      formLabelWidth: "120px",
      loading: false,
      visible:false,
      table: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 5,
    };
  },
  methods: {
    setData(deviceCode){
      this.getAlarmInfo(1,deviceCode)
    },
    getAlarmInfo(pageNum,deviceCode) {
      this.loading = true;
      const url = "/tpiim/monitoringAlarm/getMonitoringAlarmList";
      let data = {
        pageNum: pageNum,
        pageSize: 5,
        deviceCode: deviceCode
      };
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          this.loading = false;
          if (data.successful) {
            this.totalPages = data.resultValue.total;
            this.table = data.resultValue.data;
            this.visible = true;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose() {
      this.currentPage = 1;
      this.visible = false;
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (!date) {
        return "--";
      }
      return this.$moment(date)
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss");
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlarmInfo(val);
    }
  }
};
</script>
