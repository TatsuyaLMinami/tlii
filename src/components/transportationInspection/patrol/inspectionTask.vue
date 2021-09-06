<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="巡视线路:">
        <el-input
          clearable
          @input="getTaskList(1)"
          v-model="filter.lineName"
          size="small"
          placeholder="请填写巡视线路"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="巡视日期:">
        <el-date-picker
          v-model="filter.startDate"
          type="date"
          @input="getTaskList(1)"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="~">
        <el-date-picker
          v-model="filter.endDate"
          type="date"
          @input="getTaskList(1)"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="任务类型:">
        <el-select
          clearable
          v-model="filter.ispType"
          placeholder="请选择"
          @change="getTaskList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.taskType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="巡视班组:">
        <el-select
          clearable
          v-model="filter.ispTeam"
          placeholder="请选择"
          @change="getTaskList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.taskTeam"
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
          v-model="filter.dataStatus"
          placeholder="请选择"
          @change="getTaskList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.taskState"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        size="small"
        style="float: right;"
        @click="add"
        v-show="showBtn === false ? false : true"
        >新增</el-button
      >
    </el-form>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      :max-height="tableHeight || 450"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="巡视线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="volLevelName"
        label="电压等级"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ispModeName"
        label="巡视方式"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ispTypeName"
        label="巡视类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="planIspDate"
        label="巡视日期"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ispContent"
        label="巡视内容"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="startTowername"
        label="起始杆塔"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="endTowername"
        label="结束杆塔"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="dataStatusName"
        label="任务状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属地市"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="200px"
        v-if="showBtn === false ? false : true"
      >
        <template slot-scope="scope">
          <el-button
            @click="publish(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.dataStatus == 0"
            >发布</el-button
          >
          <el-button
            @click="exec(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.dataStatus == 1"
            >执行</el-button
          >
          <el-button
            @click="over(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.dataStatus == 2"
            >完成</el-button
          >
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.dataStatus == 0"
            >修改</el-button
          >
          <el-button
            @click="deleteIT(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.dataStatus == 0"
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
    <it ref="it" @updateData="updateData"> </it>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/patrol/it.js";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
import it from "./inspectionTask/it.vue";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "inspectionTask",
  components: { it, publicDetail },
  props: ["showBtn", "tableHeight"],
  data() {
    return {
      filter: {
        lineName: "",
        ispType: "",
        startDate: "",
        endDate: "",
        ispTeam: "",
        dataStatus: ""
      },
      //当前页面所用数据
      tableData: [],
      formLabelWidth: "120px",
      loading: false,
      //向子件传递的数据
      userData: {
        cityName: "",
        cityId: ""
      },
      dropDown: {
        taskType: [],
        taskMode: [],
        taskTeam: [],
        volLevel: [],
        taskState: []
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getTaskList(this.currentPage);
    },
    getTaskList(pageNum) {
      this.loading = true;
      const url = "/tpiim/ptmiInsTask/getInsTaskList";
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
      this.$refs.it.setData("新增巡视任务", this.userData, this.dropDown);
    },
    edit(row) {
      row.planIspDate = this.$moment(row.planIspDate)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      this.$refs.it.setData("修改巡视任务", row, this.dropDown);
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
      this.$refs.detail.setData("巡视任务详情", { list: arr });
    },
    deleteIT(row) {
      this.handle(
        "确定删除巡视任务?",
        "/tpiim/ptmiInsTask/deleteById",
        row.objId
      );
    },
    publish(row) {
      this.handle("确定发布巡视任务?", "/tpiim/ptmiInsTask/publish", row.objId);
    },
    exec(row) {
      this.handle("确定执行该巡视任务?", "/tpiim/ptmiInsTask/exec", row.objId);
    },
    over(row) {
      this.handle("确定完成该巡视任务?", "/tpiim/ptmiInsTask/over", row.objId);
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
            that.getTaskList(that.currentPage);
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
      this.getTaskList(val);
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
    this.dropDown.volLevel = $store.getters.volLevel;
    this.dropDown.taskMode = $store.getters.ispMode;
    this.dropDown.taskType = $store.getters.ispType;
    this.dropDown.taskState = $store.getters.ispState;
    this.dropDown.taskTeam = $store.getters.ispTeam;
    this.userData.cityId = $store.getters.userData.orgId;
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
    this.getTaskList(1);
  }
};
</script>
