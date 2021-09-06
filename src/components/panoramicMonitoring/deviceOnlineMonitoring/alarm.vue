<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="所属线路:">
        <el-input
          :label-width="formLabelWidth"
          @change="getList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.lineName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="所属杆塔:">
        <el-input
          :label-width="formLabelWidth"
          @change="getList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.towerName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="日期范围:">
        <el-date-picker
          :picker-options="pickerOptions"
          @change="getList(1)"
          v-model="filter.alarmTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="监测类型:">
        <el-select
          @change="getList(1)"
          clearable
          v-model="filter.alarmType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.deviceType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="告警状态:">
        <el-select
          @change="getList(1)"
          clearable
          v-model="filter.alarmState"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.alarmState"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      max-height="450"
    >
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
        label="监测类型"
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
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="close(scope.row)"
            v-show="scope.row.alarmStateName === '未处理'"
            type="text"
            size="small"
            >关闭</el-button
          >
          <el-button
            @click="push(scope.row)"
            v-show="scope.row.alarmStateName === '未处理'"
            type="text"
            size="small"
            >推送</el-button
          >
          <el-button
            @click="patrol(scope.row)"
            v-show="scope.row.alarmStateName === '已安排'"
            type="text"
            size="small"
            >特巡</el-button
          >
        </template>
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
    <alarmPatrol ref="alP" @updateData="updateData"></alarmPatrol>
    <al ref="al" @updateData="updateData"></al>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/panoramicMonitoring/deviceOnlineMonitoring/al.js";
import al from "./alarm/al";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import alarmPatrol from "./alarm/alarmPatrol.vue";
import { handleSomething } from "@/tools/common";
export default {
  name: "alarm",
  components: {
    al,
    publicDetail,
    alarmPatrol
  },
  data() {
    return {
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      dropDown: {
        deviceType: "",
        alarmState: "",
        volLevel: "",
        city: "",
        ispType: "",
        ispMode: "",
        dataStatus: "",
        sourceType: "",
        sourceTable: ""
      },
      //向子件传递的数据
      //筛选条件数据
      filter: {
        alarmTime: [],
        lineName: "",
        towerName: "",
        alarmType: "",
        alarmState: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    setData(alarmType, startTime, endTime) {
      this.totalPages = 0;
      this.tableData = [];
      this.filter.sAlarmTime = startTime;
      this.filter.eAlarmTime = endTime;
      this.filter.alarmType = alarmType;
      this.getAlarmList(this.currentPage);
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    updateData() {
      this.getList(this.currentPage);
    },
    getList(pageNum) {
      if (this.filter.alarmTime && this.filter.alarmTime.length === 2) {
        this.filter.sAlarmTime = new Date(this.filter.alarmTime[0]).getTime();
        this.filter.eAlarmTime = new Date(this.filter.alarmTime[1]).getTime();
      } else {
        this.filter.sAlarmTime = "";
        this.filter.eAlarmTime = "";
      }
      this.getAlarmList(pageNum);
    },
    getAlarmList(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        ...this.filter
      };
      const url = "/tpiim/monitoringAlarm/getMonitoringAlarmList";
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(data => {
          if (data.successful) {
            this.loading = false;
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
          } else {
            this.loading = false;
            this.tableData = [];
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
          this.loading = false;
        });
    },
    handle(title, row, type) {
      this.$refs.al.setData(title, row, type);
    },
    close(row) {
      this.handle("告警关闭", row, "close");
    },
    push(row) {
      this.handle("告警推送", row, "push");
    },
    patrol(row) {
      this.$refs.alP.setData({ sourceId: row.alarmId }, this.dropDown);
    },
    detail(row) {
      let label = Object.keys(row),
        value = Object.values(row),
        arr = [];
      for (let key in formItems) {
        var obj = label.find(item => {
          return item === formItems[key].prop;
        });
        if (obj) {
          arr.push({
            ...formItems[key],
            value: value[label.indexOf(obj)]
          });
        }
      }
      this.$refs.detail.setData("告警详情", { list: arr });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val);
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
    }
  },
  mounted() {
    for (let key in this.dropDown) {
      this.dropDown[key] = $store.getters[key];
    }
    this.getList(1);
  }
};
</script>
