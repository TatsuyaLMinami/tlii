<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="登录账号:">
        <el-input
          size="small"
          @input="getLogList(1)"
          minlength="0"
          maxlength="20"
          clearable
          v-model="filter.loginId"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工姓名:">
        <el-input
          size="small"
          @input="getLogList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.userName"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作类型:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.loginType"
          size="small"
          placeholder="请选择"
        >
          <el-option label="登录" value="1"></el-option>
          <el-option label="退出" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登陆状态:">
        <el-select
          clearable
          @change="getLogList(1)"
          v-model="filter.loginState"
          size="small"
          placeholder="请选择"
        >
          <el-option label="成功" value="0"></el-option>
          <el-option label="失败" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围:">
        <el-date-picker
          size="small"
          v-model="filter.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          @change="getLogList(1)"
        >
        </el-date-picker>
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
      <el-table-column
        prop="loginId"
        label="登录账号"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="userName"
        label="员工姓名"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="loginType" label="操作类型"></el-table-column>
      <el-table-column prop="loginState" label="登陆状态"></el-table-column>
      <el-table-column
        prop="addMac"
        label="MAC地址"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="addIp"
        label="IP地址"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="loginTime"
        label="操作时间"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.loginTime  }}</span>
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
  name: "loginLog",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      filter: {
        loginId: "",
        userName: "",
        loginType: "",
        loginState: "",
        date: ""
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
        url: "/yangkai/sysLoginLog/getSysLogList",
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageData.pageSize,
          ...this.filter,
          startTime: this.filter.date ? this.filter.date[0] : "",
          endTime: this.filter.date ? this.filter.date[1] : ""
        }
      })
        .then(data => {
          this.tableLoading = false;
          if (data.successful) {
            this.tableData = data.resultValue.data;
            this.pageData.total = data.resultValue.total;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.tableLoading = false;
          this.$message.error(error);
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
        url: "/yangkai/sysLoginLog/export",
        fileName:
          "登录日志列表" +
          this.$moment(new Date())
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss"),
        data: {
          ...this.filter,
          startTime: this.filter.date ? this.filter.date[0] : "",
          endTime: this.filter.date ? this.filter.date[1] : ""
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
