<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="监测类型:">
        <el-select
          @change="getRuleList(1)"
          clearable
          v-model="filter.monitoringType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.monitoringType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="规则状态:">
        <el-select
          @change="getRuleList(1)"
          clearable
          v-model="filter.ruleStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.ruleStatus"
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
        style="float: right; margin-left: 5px"
        @click="add"
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
        prop="ruleLevelName"
        label="规则级别"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ruleStatusName"
        label="规则状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="monitoringTypeName"
        label="监测类型"
      >
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceTypeName"
        label="装置类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ruleStatusName"
        label="规则状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="defectTypeName"
        label="缺陷类型"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.defectTypeName">
            {{ scope.row.defectTypeName }}
          </div>
          <div v-else>{{ "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属地市"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button @click="edit(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="deleteRule(scope.row)" type="text" size="small"
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
    <alR ref="alR" @updateData="updateData"></alR>
  </div>
</template>
<script>
import formItems from "@/store/formItems/panoramicMonitoring/deviceOnlineMonitoring/alR.js";
import alR from "./alarmRule/alR";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "alarmRule",
  components: {
    publicDetail,
    alR
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //向子件传递的数据
      dropDown: {
        city: [],
        monitoringType: [],
        ruleLevel: [],
        ruleStatus: [],
        defectTypeOne: [],
        defectSubclass: [],
        deviceType: []
      },
      //筛选条件数据
      filter: {
        deviceCode: "",
        monitoringType: "",
        ruleStatus: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getRuleList(this.currentPage);
    },
    getRuleList(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum,
        ...this.filter
      };
      const baseUrl = "/tpiim/selfAlarmRules/getList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
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
    getDefectSubclass(val) {
      const baseUrl = "tpiim/baseData/getDefectTwoList";
      const url = `${baseUrl}?pCode=${val}`;
      $axios({ url: url, type: "get" })
        .then(res => {
          if (res.successful) {
            this.dropDown.defectSubclass = res.resultValue;
          } else {
            this.dropDown.defectSubclass = [];
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    add() {
      this.$refs.alR.setData("新增告警规则", {}, this.dropDown);
    },
    edit(row) {
      this.$refs.alR.setData("修改告警规则", row, this.dropDown);
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
      this.$refs.detail.setData("告警规则详情", { list: arr });
    },
    deleteRule(row) {
      let that = this;
      const baseUrl = "/tpiim/selfAlarmRules/deleteById";
      const url = `${baseUrl}?id=${row.id}`;
      handleSomething("确定要删除该告警规则?", {
        url: url,
        type: "get"
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getRuleList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRuleList(val);
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
    this.dropDown.defectSubclass = this.getDefectSubclass(
      this.dropDown.defectTypeOne[0].code
    );
    this.getRuleList(1);
  }
};
</script>
