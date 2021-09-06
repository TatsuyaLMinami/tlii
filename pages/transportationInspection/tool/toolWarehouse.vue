<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="仓库名称:">
        <el-input
          clearable
          @input="getToolsWarehouseList(1)"
          v-model="filter.toolsWarehouseName"
          size="small"
          placeholder="请填写仓库名称"
        ></el-input>
      </el-form-item>
      <el-button type="primary" size="small" style="float: right;" @click="add"
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
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsWarehouseName"
        label="仓库名称"
      >
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="userId"
        label="库管员"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsWarehouseArea"
        label="仓库面积"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="departmentName"
        label="所属部门"
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
        prop="toolsWarehouseLocation"
        label="仓库位置"
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
          <el-button @click="deleteTW(scope.row)" type="text" size="small"
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
    <tw ref="tre" @updateData="updateData"></tw>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import $store from "@/store/data.js";
import publicDetail from "@/pages/public/publicDetail";
import { common, handleSomething } from "@/tools/common";
import tw from "./toolWarehouse/tw";
import formItems from "@/store/formItems/transportationInspection/tools/toolWarehouse/tw.js";
export default {
  name: "toolWarehouse",
  components: { tw, publicDetail },
  data() {
    return {
      filter: {
        toolsWarehouseName: ""
      },
      userData: {
        cityId: "",
        cityName: "",
        departmentName: "",
        departmentId: ""
      },
      tableData: [],
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getToolsWarehouseList(this.currentPage);
      common.getToolsWarehouseListDict();
    },
    getToolsWarehouseList(pageNum) {
      this.loading = true;
      const baseUrl = "/tpiim/toolsWarehouse/getToolsWarehouseList";
      $axios({
        url: baseUrl,
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
      })
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
        });
    },
    add() {
      this.$refs.tre.setData("新增工器具仓库", {}, this.userData);
    },
    edit(row) {
      this.$refs.tre.setData("修改工器具仓库", row, this.userData);
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
      this.$refs.detail.setData("工器具仓库详情", { list: arr });
    },
    deleteTW(row) {
      let that = this;
      handleSomething(
        "确定删除固定施工点" + '"' + row.toolsWarehouseName + '"' + "?",
        {
          url: "/tpiim/toolsWarehouse/deleteById",
          type: "post",
          data: row.toolsWarehouseId
        }
      ).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getToolsWarehouseList(val);
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
    this.getToolsWarehouseList(1);
    this.userData.departmentName = $store.getters.userData.deptName || "";
    this.userData.departmentId = $store.getters.userData.deptId || "";
    this.userData.cityId = $store.getters.userData.orgId || "";
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
  }
};
</script>
