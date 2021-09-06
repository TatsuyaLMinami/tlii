<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="归还单编号:">
        <el-input
          clearable
          @input="getToolsReturnList(1)"
          v-model="filter.toolsReturnNum"
          size="small"
          placeholder="请填写归还单编号"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="归还人:">
        <el-input
          clearable
          @input="getToolsReturnList(1)"
          v-model="filter.returnUserId"
          size="small"
          placeholder="请填写归还人"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="归还时间:">
        <el-date-picker
          v-model="filter.startDate"
          type="date"
          @input="getToolsReturnList(1)"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="~">
        <el-date-picker
          v-model="filter.endDate"
          type="date"
          @input="getToolsReturnList(1)"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="归还单状态:">
        <el-select
          clearable
          v-model="filter.toolsReturnState"
          placeholder="请选择"
          @change="getToolsReturnList(1)"
        >
          <el-option label="未发布" value="0"></el-option>
          <el-option label="已发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="small" style="float: right" @click="add"
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
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsReturnNum"
        label="归还单编号"
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
        prop="toolsReceiptId"
        label="所属领用单编号"
        width="150"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsName"
        label="归还工器具"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="returnUserId"
        label="归还人"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="returnTime"
        label="归还时间"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="returnInstructions"
        label="归还说明"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsReturnState"
        label="归还单状态"
      >
        <template slot-scope="scope"
          >{{ scope.row.toolsReturnState == 0 ? "未发布" : "已发布" }}
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
            v-if="scope.row.toolsReturnState == 0"
            >发布</el-button
          >
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.toolsReturnState == 0"
            >修改</el-button
          >
          <el-button
            @click="deleteTR(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.toolsReturnState == 0"
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
    <tre ref="tre" @updateData="updateData"></tre>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
import tre from "./toolReturn/tre";
import publicDetail from "@/pages/public/publicDetail";
import formItems from "@/store/formItems/transportationInspection/tools/toolReturn/tr.js";
export default {
  name: "toolReturn",
  components: { tre, publicDetail },
  data() {
    return {
      filter: {
        toolsReturnNum: "",
        returnUserId: "",
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
      this.getToolsReturnList(this.currentPage);
    },
    getToolsReturnList(pageNum) {
      this.loading = true;
      const url = "/tpiim/toolsReturn/getToolsReturnList";
      $axios({
        url: url,
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
      }).then(data => {
        if (data.successful) {
          this.loading = false;
          this.totalPages = data.resultValue.total;
          this.tableData = data.resultValue.data;
        } else {
          this.loading = false;
          this.tableData = [];
          this.$message.error(data.resultHint);
        }
      });
    },
    add() {
      this.$refs.tre.setData(
        "新增工器具归还单",
        {},
        this.dropDown,
        this.userData
      );
    },
    edit(row) {
      this.$refs.tre.setData(
        "修改工器具归还单",
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
      this.$refs.detail.setData("工器具归还单详情", { list: arr });
    },
    deleteTR(row) {
      let title = "确定删除工器具归还单",
        url = "/tpiim/toolsReturn/deleteById";
      this.handle(row, url, title);
    },
    publish(row) {
      let title = "确定发布工器具归还单",
        url = "/tpiim/toolsReturn/publish";
      this.handle(row, url, title);
    },
    handle(row, url, title) {
      let that = this;
      handleSomething(title + '"' + row.toolsReturnNum + '"' + "?", {
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
      this.getToolsReturnList(val);
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
    },
  },
  mounted() {
    this.dropDown.insTasks = $store.getters.ispTask;
    this.getToolsReturnList(1);
    this.userData.cityId = $store.getters.userData.orgId || "";
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
  }
};
</script>
