<template>
  <div class="line-table">
    <div class="uav-header">
      <el-form :inline="true">
        <el-form-item label="领用单状态：">
          <el-select
            v-model="filter.uavReceiptState"
            clearable
            @change="searchFn"
            size="small"
          >
            <el-option label="编辑中" value="editing"> </el-option>
            <el-option label="审批中" value="approving"> </el-option>
            <el-option label="已通过" value="passed"> </el-option>
            <el-option label="已退回" value="returned"> </el-option>
            <el-option label="归还中" value="backing"> </el-option>
            <el-option label="已归还" value="completed"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" size="small" @click="receiveFn()"
          >领用申请</el-button
        >
      </div>
    </div>
    <div class="table-style" :style="tableStyle">
      <el-table :data="tableData" border>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="uavReceiptNum"
          label="领用单编号"
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
          prop="receiptUserName"
          label="领用人"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="领用时间"
          width="170"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.receiptTime  }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="receiptInstructions"
          label="领用说明"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="uavReceiptStateName"
          label="领用单状态"
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
              toolsNameFn(scope.row.uavReceiptState)
            }}</el-button>
            <el-button
              v-if="scope.row.uavReceiptState === 'passed'"
              @click="returnFn(scope.row)"
              type="text"
              size="small"
              >归还
            </el-button>
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
        uavReceiptState: "",
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
        url: "/tpiim/uavReceipt/getUavReceiptList",
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
    toolsNameFn(type) {
      let name = "";
      if (type === "backing" || type === "completed" || type === "passed") {
        name = "查看";
      } else if (type === "returned" || type === "editing") {
        name = "编辑";
      } else if (type === "approving") {
        name = "审批";
      }
      return name;
    },
    // 领用
    receiveFn(row) {
      this.$refs.uavReceiveAdd.initFn(row);
    },
    // 归还
    returnFn(row) {
      this.$refs.uavReceiveBack.initFn(row, "add");
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
