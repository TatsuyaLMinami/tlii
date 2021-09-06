<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="影响线路:">
        <el-input
          clearable
          @input="getMissionList(1)"
          v-model="filter.lineName"
          size="small"
          placeholder="请填写影响线路"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="值守部门:">
        <el-input
          clearable
          @input="getMissionList(1)"
          v-model="filter.oDeptname"
          size="small"
          placeholder="请填写值守部门"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="值守日期:">
        <el-date-picker
          v-model="filter.startDate"
          type="date"
          @input="getMissionList(1)"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="~">
        <el-date-picker
          v-model="filter.endDate"
          type="date"
          @input="getMissionList(1)"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="值守级别:">
        <el-select
          clearable
          v-model="filter.oLevel"
          placeholder="请选择"
          @change="getMissionList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.oLevels"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="任务状态:">
        <el-select
          clearable
          v-model="filter.taskState"
          placeholder="请选择"
          @change="getMissionList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.taskStatus"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
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
      max-height="450"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="reTroubleDesc"
        label="关联隐患"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="影响线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deptName"
        label="任务部门"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="oDeptname"
        label="值守部门"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="oStarttime"
        label="值守开始日期"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="oLevel"
        label="值守级别"
        :formatter="dataFormatOLevel"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="taskState"
        label="任务状态"
        :formatter="dataFormatTaskStatus"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            @click="publish(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.taskState == 0"
            >发布</el-button
          >
          <el-button
            @click="exec(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.taskState == 1"
            >执行</el-button
          >
          <el-button
            @click="over(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.taskState == 2"
            >完成</el-button
          >
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.taskState == 0"
            >修改</el-button
          >
          <el-button
            @click="deleteMM(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.taskState == 0"
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
    <mm ref="mm" @updateData="updateData"> </mm>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import $store from "@/store/data.js";
import formItems from "@/store/formItems/transportationInspection/patrol/mm.js";
import { handleSomething } from "@/tools/common";
import mm from "./mannedMission/mm";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "mannedMission",
  components: { mm, publicDetail },
  data() {
    return {
      filter: {
        lineName: "",
        oDeptname: "",
        oLevel: "",
        taskState: "",
        startDate: "",
        endDate: ""
      },
      userData: {
        cityId: "",
        cityName: ""
      },
      dropDown: {
        oLevels: [],
        depts: [],
        taskStatus: []
      },
      //当前页面所用数据
      tableData: [],
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
      this.getMissionList(this.currentPage);
    },
    dataFormatTaskStatus: function(row, column) {
      //巡视状态
      var value = row[column.property];
      if (value == undefined) {
        return "";
      }
      if (this.dropDown.taskStatus.length > 0) {
        for (let index = 0; index < this.dropDown.taskStatus.length; index++) {
          const element = this.dropDown.taskStatus[index];
          if (element.code == value) {
            return element.name;
          }
        }
      }
    },
    dataFormatOLevel: function(row, column) {
      //巡视状态
      var value = row[column.property];
      if (value == undefined) {
        return "";
      }
      if (this.dropDown.oLevels.length > 0) {
        for (let index = 0; index < this.dropDown.oLevels.length; index++) {
          const element = this.dropDown.oLevels[index];
          if (element.code == value) {
            return element.name;
          }
        }
      }
    },
    getMissionList(pageNum) {
      this.loading = true;
      const url = "/tpiim/ptmiDutyTask/getList";
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
          this.loading = false;
          if (data.successful) {
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
          } else {
            this.tableData = [];
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    add() {
      this.$refs.mm.setData("新增值守任务", this.userData, this.dropDown, true);
    },
    edit(row) {
      row.oStarttime = this.$moment(row.oStarttime)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      this.$refs.mm.setData("修改值守任务", row, this.dropDown, true);
      this.$refs.mm.loadUser(row.deptId, "t");
      this.$refs.mm.loadUser(row.oDept, "m");
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
          arr.push({ ...formItems[key], value: value[label.indexOf(obj)] });
        }
      }
      this.$refs.detail.setData("值守任务详情", { list: arr });
    },
    deleteMM(row) {
      this.handle(
        "确定删除该值守任务?",
        "/tpiim/ptmiDutyTask/deleteById",
        row.objId
      );
    },
    publish(row) {
      this.handle(
        "确定发布该值守任务?",
        "/tpiim/ptmiDutyTask/publish",
        row.objId
      );
    },
    exec(row) {
      this.handle("确定执行该值守任务?", "/tpiim/ptmiDutyTask/exec", row.objId);
    },
    over(row) {
      this.handle("确定完成该值守任务?", "/tpiim/ptmiDutyTask/over", row.objId);
    },
    handle(tip, url, id) {
      let that = this;
      handleSomething(tip, {
        url: url,
        type: "post",
        data: id
      })
        .then(function(result) {
          if (result.res) {
            that.$message.success(result.msg);
            that.getMissionList(that.currentPage);
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
      this.getMissionList(val);
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
    this.getMissionList(1);
    for (let key in this.dropDown) {
      this.dropDown[key] = $store.getters[key];
    }
    this.userData.cityId = $store.getters.userData.orgId;
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
  }
};
</script>
