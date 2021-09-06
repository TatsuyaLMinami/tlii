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
        prop="taskName"
        label="巡视任务"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="lineName"
        label="线路名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="towerSection"
        label="运维区段"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        label="任务执行时间"
        width="170"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.startTime  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        label="任务结束时间"
        width="170"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.endTime  }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        show-overflow-tooltip
        prop="operator"
        label="任务负责人"
      >
      </el-table-column> -->
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="planeDetails"
        label="装备信息"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="taskDetails"
        label="任务详情"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <!-- <el-button @click="showMsgFn(scope.row)" type="text" size="small"
            >巡视轨迹</el-button
          > -->
          <el-button @click="showMsgFn(scope.row)" type="text" size="small"
            >详情</el-button
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
    <task-path ref="taskPath"></task-path>
  </div>
</template>

<script>
import taskPath from "./taskPath";
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
  methods: {
    searchFn() {
      this.pageData.currentPage = 1;
      this.loadDataFn();
    },
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: "/tpiim/uavInspectResult/getUavInspectResult",
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
          this.tableData = res.resultValue.data;
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
      this.$refs.taskPath.initFn(row);
    },
  },
  components: {
    taskPath,
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
