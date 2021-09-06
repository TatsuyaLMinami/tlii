<template>
  <div>
    <el-dialog
      center
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <div class="search-style">
        <el-form :inline="true">
          <span v-for="(item, i) in searchParams" :key="i">
            <el-form-item :label="item.label" v-if="item.type === 'input'">
              <el-input
                size="small"
                v-model="filter[item.modal]"
                clearable
                @input="searchFn"
              ></el-input>
            </el-form-item>
            <el-form-item :label="item.label" v-if="item.type === 'select'">
              <el-select
                v-model="filter[item.modal]"
                clearable
                @change="searchFn"
                size="small"
              >
                <el-option
                  v-for="(optionItem, j) in item.option"
                  :key="j"
                  :label="optionItem.name"
                  :value="optionItem.val"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </span>
        </el-form>
      </div>
      <el-table
        ref="filtertable"
        :data="tableData"
        max-height="400"
        border
        v-loading="tableLoading"
        @select="tableSelectFn"
        @selection-change="handleSelectionChange"
        @current-change="chooseMcaterialChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>

        <el-table-column
          v-for="(item, i) in tableItems"
          :key="i"
          align="center"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="item.time">{{
              scope.row[item.prop] 
            }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "exportPathsView",
  data() {
    return {
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      tableLoading: false,
      tableData: [],
      selection: [],
    };
  },
  props: [
    "searchParams",
    "filter",
    "urlParams",
    "tableItems",
    "dialogTitle",
  ],
  methods: {
    initFn() {
      this.dialogVisible = true;
      this.loadDataFn();
    },
    searchFn() {
      this.pageData.currentPage = 1;
      this.loadDataFn();
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.loadDataFn();
    },
    // 加载数据
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: this.urlParams.url,
        type: this.urlParams.type,
        data: {
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          ...this.filter,
        },
      })
        .then((res) => {
          this.tableLoading = false;
          if (res) {
            this.pageData.total = res.resultValue.total;
            this.tableData = res.resultValue.data;
          }
        })
        .catch((error) => {
          console.log(error);
          this.tableLoading = false;
        });
    },
    tableSelectFn(selection) {
      this.selection = selection;
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.filtertable.clearSelection();
        this.$refs.filtertable.toggleRowSelection(val.pop());
      }
      this.selection = val;
    },
    chooseMcaterialChange(val) {
      this.$refs.filtertable.toggleRowSelection(val);
    },
    submitFn() {
      if (this.selection.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据！",
        });
        return;
      }
      this.dialogVisible = false;
      this.$emit("callBackFn", this.selection[0]);
    },
  },
};
</script>
<style lang='less' scoped>
.search-style {
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
.search-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.w150 {
  width: 150px;
}
.w350 {
  width: 350px;
}
.page-style {
  text-align: center;
}
</style>
