<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="停电范围:">
        <el-input
          :label-width="formLabelWidth"
          @input="getOutAgePlanList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.blackOutRange"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>

      <el-form-item size="small" label="配合停电线路及站房:">
        <el-input
          :label-width="formLabelWidth"
          @input="getOutAgePlanList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.station"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
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
        prop="planNo"
        label="计划编号"
      >
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="major" label="专业">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="mainTainUnitName"
        label="运维单位"
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
        prop="regStaffName"
        label="编制人"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="station"
        width="150"
        label="配合停电线路及站房"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="blackOutRange"
        label="停电范围"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="contactName"
        label="停送电联系人"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="planState"
        label="计划状态"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
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
  </div>
</template>

<script>
import formItems from "@/store/formItems/transportationInspection/outagePlan/o.js";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "outagePlan",
  components: {
    publicDetail
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      //筛选条件数据
      filter: {
        blackOutRange: "",
        station: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    getOutAgePlanList(pageNum) {
      this.loading = true;
      const url = "/tpiim/blackOutPlan/getPgrBlackOutPlanList";
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
      this.$refs.detail.setData("停电计划详情", { list: arr });
    },
    handleCurrentChange(val) {
      this.pageSize = val;
      this.getOutAgePlanList(val);
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
    this.getOutAgePlanList(1);
  }
};
</script>
