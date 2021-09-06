<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="线路重要级别:">
        <el-select
          @change="getPatrolCycleList(1)"
          clearable
          v-model="filter.lineDegree"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.lineDegree"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="电压等级:">
        <el-select
          @change="getPatrolCycleList(1)"
          clearable
          v-model="filter.volLevel"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.volLevel"
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
        prop="ispTypeName"
        label="线路类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineDegreeName"
        label="线路重要等级"
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
        prop="cityName"
        label="所属地市"
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
        prop="ispCycle"
        label="巡视周期(天)"
      >
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="preWarningDays"
        label="提前预警天数"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="deletePatrolCycle(scope.row)"
            type="text"
            size="small"
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
    <ic ref="ic" @updateData="updateData"> </ic>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/patrol/ic.js";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
import ic from "./inspectionCycle/ic.vue";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "inspectionCycle",
  components: { ic, publicDetail },
  data() {
    return {
      //下拉菜单数据
      dropDown: {
        ispMode: [],
        lineDegree: [],
        city: [],
        volLevel: []
      },
      //筛选条件数据
      filter: {
        lineDegree: "",
        volLevel: ""
      },
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getPatrolCycleList(this.currentPage);
    },
    getPatrolCycleList(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum,
        ...this.filter
      };
      const url = "/tpiim/selfInsCycle/findPage";
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
    add() {
      this.$refs.ic.setData("新增巡视周期", {}, this.dropDown);
    },
    detail(row) {
      let lineCodeName = "";
      if (row.lineName.length > 0) {
        for (let i = 0; i < row.lineName.length; i++) {
          lineCodeName += row.lineName[i] + ",";
        }
      }
      row.lineCodeName = lineCodeName.substr(0, lineCodeName.lastIndexOf(","));
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
      this.$refs.detail.setData("巡视周期详情", { list: arr });
    },
    deletePatrolCycle(row) {
      let that = this;
      const url = "/tpiim/selfInsCycle/deleteById";
      let data = {
        id: row.id,
        bId: row.bId
      };
      handleSomething("确定要删除该巡视周期?", {
        url: url,
        type: "get",
        data: data
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getPatrolCycleList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPatrolCycleList(val);
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
    this.getPatrolCycleList(1);
  }
};
</script>
