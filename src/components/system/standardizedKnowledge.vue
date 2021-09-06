<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="设备类型:">
        <el-input
          :label-width="formLabelWidth"
          @input="getKnowledgeList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.deviceType"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="知识类型:">
        <el-select
          @change="getKnowledgeList(1)"
          clearable
          v-model="filter.klType"
          placeholder="请选择"
        >
          <el-option value="巡视标准库">巡视标准库</el-option>
          <el-option value="缺陷标准库">缺陷标准库</el-option>
          <el-option value="隐患标准库">隐患标准库</el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="登记人:">
        <el-input
          :label-width="formLabelWidth"
          @change="getKnowledgeList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.regStaffName"
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
        prop="deviceType"
        label="设备类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="klType"
        label="知识类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="provinceName"
        label="所属网省"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属地市"
      >
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="type" label="分类">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="klstate"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="regStaffName"
        label="登记人"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :formatter="dateFormat"
        prop="regDate"
        label="登记时间"
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
import formItems from "@/store/formItems/system/sk.js";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "standardizedKnowledge",
  components: {
    publicDetail
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //筛选条件数据
      filter: {
        klType: "",
        deviceType: "",
        regStaffName: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    getKnowledgeList(pageNum) {
      this.loading = true;
      const baseUrl = "/tpiim/knowledge/getPtmiKnowledgeList";
      $axios({
        url: baseUrl,
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
      this.$refs.detail.setData("标准化知识详情", { list: arr });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getKnowledgeList(val);
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
    this.getKnowledgeList(1);
  }
};
</script>
