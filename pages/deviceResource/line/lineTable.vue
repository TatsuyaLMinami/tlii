<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="线路名称：">
        <el-input
          class="w150"
          clearable
          @input="searchFn"
          v-model="filter.lineName"
          size="small"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>

      <el-form-item label="线路性质：">
        <el-select
          class="w150"
          clearable
          @change="searchFn"
          v-model="filter.lineNature"
          size="small"
        >
          <el-option value="主线">主线</el-option>
          <el-option value="支线">支线</el-option>
          <el-option value="分支线">分支线</el-option>
          <el-option value="分段线路">分段线路</el-option>
          <el-option value="馈线">馈线</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电压等级：">
        <div class="w150">
          <form-select
            url="/tpiim/baseData/getVotageLevelList"
            type="get"
            :value="filter.volLevel"
            @callBackFn="selectBackFn"
          ></form-select>
        </div>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border v-loading="tableLoading">
      <el-table-column
        align="center"
        prop="lineName"
        label="线路名称"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" prop="lineNature" label="线路性质">
      </el-table-column>
      <el-table-column align="center" prop="volLevelName" label="电压等级">
      </el-table-column>
      <el-table-column align="center" prop="totalLen" label="线路总长度(km)">
      </el-table-column>
      <el-table-column align="center" prop="maintainUnitname" label="运维单位">
      </el-table-column>
      <el-table-column align="center" prop="deviceState" label="设备状态">
      </el-table-column>
    </el-table>
    <div class="page-style">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageData.currentPage"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageData.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import FormSelect from "@/pages/common/formComponents/FormSelect";
export default {
  name: "linesTable",
  data() {
    return {
      filter: {
        lineName: "",
        volLevel: "",
        maintainTeam: "",
        maintainUnit: "",
        runDate: "",
        lineNature: ""
      },
      tableLoading: false,
      tableData: [],
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.loadDataFn();
  },
  components: {
    FormSelect
  },
  methods: {
    searchFn() {
      this.pageData.currentPage = 1;
      this.loadDataFn();
    },
    selectBackFn(data) {
      this.filter.volLevel = data.code;
      this.searchFn();
    },
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: "/tpiim/line/getLineList",
        type: "post",
        data: {
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          ...this.filter
        }
      })
        .then(data => {
          this.tableLoading = false;
          this.pageData.total = data.resultValue.total;
          this.tableData = data.resultValue.data;
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.loadDataFn();
    }
  }
};
</script>
<style scoped>
.page-style {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
