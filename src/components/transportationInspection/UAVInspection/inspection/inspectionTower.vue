<template>
  <div class="line-table">
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
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="objOrder"
        label="杆塔编号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="pName"
        label="线路名称"
      >
      </el-table-column>
      <!-- <el-table-column
        align="center"
        show-overflow-tooltip
        prop="entityTower"
        label="关联物理杆塔"
      >
      </el-table-column> -->
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="volLevel"
        label="电压等级"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        label="投运日期"
        width="170"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.runDate  }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cityName"
        label="所属地市名称"
      >
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button @click="showMsgFn(scope.row)" type="text" size="small"
            >历史记录</el-button
          >
        </template>
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
    <inspectionTowerLists ref="inspectionTowerLists"></inspectionTowerLists>
  </div>
</template>

<script>
import inspectionTowerLists from "./inspectionTowerLists";
export default {
  name: "linesTable",
  data() {
    return {
      filter: {
        lineName: "",
      },
      tableLoading: false,
      tableData: [],
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.loadDataFn();
  },
  components: {
    inspectionTowerLists,
  },
  methods: {
    searchFn() {
      this.pageData.currentPage = 1;
      this.loadDataFn();
    },
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: "/tpiim/uavInspectResult/getUavInspectTowers",
        type: "post",
        data: {
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          ...this.filter,
        },
      })
        .then((res) => {
          this.tableLoading = false;
          this.pageData.total = res.resultValue.total;
          this.tableData = res.resultValue.list;
        })
        .catch((error) => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.loadDataFn();
    },
    showMsgFn(row) {
      this.$refs.inspectionTowerLists.initFn(row);
    },
  },
};
</script>
<style scoped>
.w150 {
  width: 150px;
}
.page-style {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
