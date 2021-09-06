<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="工器具名称:">
        <el-input
          clearable
          @input="getToolsList(1)"
          v-model="filter.toolsName"
          size="small"
          placeholder="请填写工器具名称"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="生产厂家:">
        <el-input
          clearable
          @input="getToolsList(1)"
          v-model="filter.toolsManufacturer"
          size="small"
          placeholder="请填写生产厂家"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="工器具分类:">
        <el-select
          clearable
          v-model="filter.toolsClass"
          placeholder="请选择"
          @change="getToolsList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.toolType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="工器具编号:">
        <el-input
          clearable
          @input="getToolsList(1)"
          v-model="filter.toolsNum"
          size="small"
          placeholder="请填写工器具编号"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="工器具状态:">
        <el-select
          clearable
          v-model="filter.toolsState"
          placeholder="请选择"
          @change="getToolsList(1)"
        >
          <el-option label="未领用" value="0"></el-option>
          <el-option label="已领用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="所属仓库:">
        <el-select
          clearable
          v-model="filter.toolsWarehouseId"
          placeholder="请选择"
          @change="getToolsList(1)"
        >
          <el-option
            v-for="(item, index) in dropDown.toolsWarehouse"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
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
        prop="toolsName"
        label="工器具名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsClass"
        label="工器具分类"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsNum"
        label="工器具编号"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsState"
        label="工器具状态"
      >
        <template slot-scope="scope">
          {{ scope.row.toolsState == 0 ? "未领用" : "已领用" }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsWarehouseId"
        label="所属仓库"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsManufacturer"
        label="生产厂家"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toolsDate"
        label="出厂日期"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button @click="edit(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="deleteTI(scope.row)" type="text" size="small"
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
    <ti ref="ti" @updateData="updateData"></ti>
    <publicDetail ref="detail"></publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/tools/toolInventory/ti.js";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
import ti from "./toolInventory/ti";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "toolInventory",
  components: { publicDetail, ti },
  data() {
    return {
      filter: {
        toolsName: "",
        toolsClass: "",
        toolsNum: "",
        toolsManufacturer: "",
        toolsWarehouseId: "",
        toolsState: ""
      },
      userData: {
        cityId: "",
        cityName: ""
      },
      tableData: [],
      dropDown: {
        toolType: [],
        toolsWarehouse: []
      },
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
      this.getToolsList(this.currentPage);
    },
    getToolsList(pageNum) {
      this.loading = true;
      const url = "/tpiim/tools/getToolList";
      $axios({
        url: url,
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
      })
        .then(data => {
          this.loading = false;
          if (data.successful) {
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
          } else {
            this.tableData = [];
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    add() {
      this.$refs.ti.setData("新增工器具", {}, this.dropDown, this.userData);
    },
    edit(row) {
      this.$refs.ti.setData("修改工器具", row, this.dropDown, this.userData);
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
      this.$refs.detail.setData("工器具详情", { list: arr });
    },
    deleteTI(row) {
      let that = this;
      handleSomething("确定删除工器具" + '"' + row.toolsName + '"' + "?", {
        url: "/tpiim/tools/deleteById",
        type: "post",
        data: row.toolsId
      })
        .then(function(result) {
          if (result.res) {
            that.$message.success(result.msg);
            that.getToolsList(that.currentPage);
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getToolsList(val);
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
    this.getToolsList(1);
    this.userData.cityId = $store.getters.userData.orgId || "";
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
  }
};
</script>
