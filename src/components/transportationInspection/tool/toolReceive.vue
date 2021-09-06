<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="领用单编号:">
        <el-input
          clearable
          @input="getToolsReceviceList(1)"
          v-model="filter.toolsReceiptNum"
          size="small"
          placeholder="请填写领用单编号"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="领用人:">
        <el-input
          clearable
          @input="getToolsReceviceList(1)"
          v-model="filter.receiptUserId"
          size="small"
          placeholder="请填写领用人"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="领用时间:">
        <el-date-picker
          v-model="filter.startDate"
          type="date"
          @input="getToolsReceviceList(1)"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="~">
        <el-date-picker
          v-model="filter.endDate"
          type="date"
          @input="getToolsReceviceList(1)"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="领用单状态:">
        <el-select
          clearable
          v-model="filter.toolsReceiptState"
          placeholder="请选择"
          @change="getToolsReceviceList(1)"
        >
          <el-option label="未发布" value="0"></el-option>
          <el-option label="已发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" style="float: right;" @click="add"
        >新增</el-button
      >
    </el-form>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      max-height="500"
    >
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsReceiptNum"
        label="领用单编号"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="insTaskName"
        label="所属巡视任务"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsName"
        label="领用工器具"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="receiptUserId"
        label="领用人"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="receiptTime"
        label="领用时间"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="receiptInstructions"
        label="领用说明"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsReceiptState"
        label="领用单状态"
      >
        <template slot-scope="scope">
          {{ scope.row.toolsReceiptState == 0 ? "未发布" : "已发布" }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属地市"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            @click="publish(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.toolsReceiptState == 0"
            >发布</el-button
          >
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.toolsReceiptState == 0"
            >修改</el-button
          >
          <el-button
            @click="deleteTR(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.toolsReceiptState == 0"
            >删除</el-button
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
    <publicDetail ref="detail"> </publicDetail>
    <tre ref="tre" @updateData="updateData"></tre>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/tools/toolReceive/tr.js";
import $store from "@/store/data.js";
import publicDetail from "@/pages/public/publicDetail";
import { handleSomething } from "@/tools/common";
import tre from "./toolReceive/tre";
export default {
  name: "toolReceive",
  components: { tre, publicDetail },
  data() {
    return {
      filter: {
        toolsReceiptNum: "",
        receiptUserId: "",
        startDate: "",
        endDate: ""
      },
      userData: {
        cityId: "",
        cityName: ""
      },
      tableData: [],
      dropDown: {
        insTasks: []
      },
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getToolsReceviceList(this.currentPage);
    },
    getToolsReceviceList(pageNum) {
      this.loading = true;
      const url = "/tpiim/toolsReceipt/getToolsReceiptList";
      $axios({
        url: url,
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
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
        });
    },
    add() {
      this.$refs.tre.setData(
        "新增工器具领用单",
        {},
        this.dropDown,
        this.userData
      );
    },
    edit(row) {
      this.$refs.tre.setData(
        "修改工器具领用单",
        row,
        this.dropDown,
        this.userData
      );
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
      this.$refs.detail.setData("工器具领用单详情", { list: arr });
    },
    deleteTR(row) {
      let title = "确定删除工器具领用单",
        url = "/tpiim/toolsReceipt/deleteById";
      this.handle(row, url, title);
    },
    publish(row) {
      let title = "确定发布工器具领用单",
        url = "/tpiim/toolsReceipt/publish";
      this.handle(row, url, title);
    },
    handle(row, url, title) {
      let that = this;
      handleSomething(title + '"' + row.toolsReceiptNum + '"' + "?", {
        url: url,
        type: "post",
        data: row.toolsReceiptId
      })
        .then(function(result) {
          if (result.res) {
            that.$message.success(result.msg);
            that.updateData();
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getToolsReceviceList(val);
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (!date) {
        return "--";
      }
      return this.$moment(date)
        .utcOffset(8)
        .format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.getToolsReceviceList(1);
    this.dropDown.insTasks = $store.getters.ispTask;
    this.userData.cityId = $store.getters.userData.orgId || "";
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
  }
};
</script>
