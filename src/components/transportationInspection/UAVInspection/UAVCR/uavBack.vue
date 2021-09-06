<template>
  <div class="line-table">
    <div class="uav-header">
      <el-form :inline="true">
        <el-form-item label="归还单状态：">
          <el-select
            v-model="filter.uavReturnState"
            clearable
            @change="searchFn"
            size="small"
          >
            <el-option label="编辑中" value="editing"> </el-option>
            <el-option label="确认中" value="confirming"> </el-option>
            <el-option label="已确认" value="confirmed"> </el-option>
            <el-option label="已退回" value="returned"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-style" :style="tableStyle">
      <el-table :data="tableData" border>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="uavReturnNum"
          label="归还单编号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="taskName"
          label="巡视任务名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="uavName"
          label="无人机装备"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="returnUserName"
          label="归还人"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="归还时间"
          width="170"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.returnTime  }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="returnInstructions"
          label="归还说明"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="uavReturnStateName"
          label="归还单状态"
        >
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="cityName"
          label="所属地市"
        >
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button @click="receiveFn(scope.row)" type="text" size="small">{{
              toolsNameFn(scope.row.uavReturnState)
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-style">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageData.currentPage"
        :page-size="pageData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageData.total"
      ></el-pagination>
    </div>
    <uav-receive-add
      ref="uavReceiveAdd"
      @callBackFn="searchFn"
    ></uav-receive-add>
    <uav-receive-back
      ref="uavReceiveBack"
      @callBackFn="searchFn"
    ></uav-receive-back>
  </div>
</template>

<script>
import uavReceiveAdd from "./uavReceiveAdd";
import uavReceiveBack from "./uavReceiveBack";
export default {
  name: "linesTable",
  data() {
    return {
      filter: {
        uavReturnState: "",
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
  components: { uavReceiveAdd, uavReceiveBack },
  computed: {
    tableStyle() {
      return { height: document.body.clientHeight - 280 + "px" };
    },
  },
  methods: {
    searchFn() {
      this.pageData.currentPage = 1;
      this.loadDataFn();
    },
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: "/tpiim/uavReturn/getUavReturnList",
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
    showMsgFn(row) {},
    // 归还
    receiveFn(row) {
      this.$refs.uavReceiveBack.initFn(row, "edit");
    },
    toolsNameFn(type) {
      let name = "";
      if (type === "confirmed") {
        name = "查看";
      } else if (type === "returned" || type === "editing") {
        name = "编辑";
      } else if (type === "confirming") {
        name = "确认";
      }
      return name;
    },
  },
};
</script>
<style scoped>
.w150 {
  width: 150px;
}
.table-style {
  overflow: auto;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.page-style {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  z-index: 10;
  background-color: #fff;
}
.uav-header {
  display: flex;
  justify-content: space-between;
}
</style>
