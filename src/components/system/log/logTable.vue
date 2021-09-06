<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="事件类型:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.eventType"
          size="small"
          placeholder="请选择"
        >
          <el-option label="系统事件" value="0"></el-option>
          <el-option label="业务事件" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.operationType"
          size="small"
          placeholder="请选择"
        >
          <el-option label="查询" value="0"></el-option>
          <el-option label="添加" value="1"></el-option>
          <el-option label="修改" value="2"></el-option>
          <el-option label="删除" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件等级:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.eventLevel"
          size="small"
          placeholder="请选择"
        >
          <el-option label="低" value="0"></el-option>
          <el-option label="中" value="1"></el-option>
          <el-option label="高" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日志级别:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.alarm"
          size="small"
          placeholder="请选择"
        >
          <el-option label="信息" value="0"></el-option>
          <el-option label="告警" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作结果:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.logStatus"
          size="small"
          placeholder="请选择"
        >
          <el-option label="成功" value="0"></el-option>
          <el-option label="失败" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        style="float: right"
        size="small"
        @click="exportFn"
        >导出日志</el-button
      >
    </el-form>

    <el-table
      stripe
      max-height="370"
      :data="tableData"
      border
      v-loading="tableLoading"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="eventTypeName" label="事件类型"></el-table-column>
      <el-table-column
        prop="operationTypeName"
        label="操作类型"
      ></el-table-column>
      <el-table-column
        prop="alarmName"
        sortable
        label="日志级别"
      ></el-table-column>
      <el-table-column
        prop="eventLevelName"
        sortable
        label="事件等级"
      ></el-table-column>
      <el-table-column
        prop="ip"
        label="ip地址"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="operatorName"
        label="操作人"
      ></el-table-column>
      <el-table-column prop="logStatusName" label="操作结果"></el-table-column>
      <el-table-column
        prop="content"
        show-overflow-tooltip
        label="日志内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        sortable
        label="操作时间"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime  }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.currentPage"
      :page-size="pageData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageData.total"
    ></el-pagination>
  </div>
</template>

<script>
import { exportMethod } from "@/tools/common";
export default {
  name: "logTable",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      filter: {
        eventType: "",
        eventLevel: "",
        operationType: "",
        logStatus: "",
        alarm: ""
      },
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    // 加载数据
    getLogList(pageNum) {
      this.tableData = [];
      this.tableLoading = true;
      $axios({
        url: "/tpiim/sysLog/getSysLogList",
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageData.pageSize,
          ...this.filter
        }
      })
        .then(data => {
          this.tableLoading = false;
          if (data.successful) {
            this.tableData = data.resultValue.data;
            this.pageData.total = data.resultValue.total;
          }
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.getLogList(val);
    },
    // 导出日志
    exportFn() {
      let myObj = {
        method: "post",
        url: "/yangkai/sysLog/export",
        fileName:
          "系统/业务日志列表" +
          this.$moment(new Date())
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss"),
        data: {
          ...this.filter
        }
      };
      exportMethod(myObj);
    }
  },
  mounted() {
    this.getLogList(1);
  }
};
</script>
