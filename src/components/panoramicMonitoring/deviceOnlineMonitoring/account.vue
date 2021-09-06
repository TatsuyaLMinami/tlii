<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="监测类型:">
        <el-select
          @change="getAccountList(1)"
          clearable
          v-model="filter.deviceType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.deviceType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="设备状态:">
        <el-select
          @change="getAccountList(1)"
          clearable
          v-model="filter.deviceState"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.deviceState"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        size="small"
        style="float: right; margin-left: 5px"
        @click="add"
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
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceCode"
        label="装置编码"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceTypeName"
        label="监测类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceStateName"
        label="设备状态"
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
        prop="towerName"
        label="杆塔名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :formatter="dateFormat"
        prop="runDate"
        label="安装时间"
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
          <el-button @click="deleteAccount(scope.row)" type="text" size="small"
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
    <ac ref="ac" @updateData="updateData"></ac>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/panoramicMonitoring/deviceOnlineMonitoring/ac.js";
import ac from "./account/ac";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "account",
  components: {
    ac,
    publicDetail
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      dropDown: {
        deviceType: "",
        deviceState: "",
        manufacturer: "",
        volLevel: "",
        city: ""
      },
      dialogEditFormVisible: false,
      //筛选条件数据
      filter: {
        deviceType: "",
        deviceState: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getAccountList(this.currentPage);
    },
    getAccountList(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum,
        ...this.filter
      };
      const url = "/tpiim/monitoringDevice/getMonitoringDeviceList";
      $axios({ url: url, type: "post", data: data })
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
          this.loading = false;
        });
    },
    add() {
      this.$refs.ac.setData("新增台帐", {}, this.dropDown);
    },
    edit(row) {
      this.$refs.ac.setData("编辑台帐", row, this.dropDown);
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
      this.$refs.detail.setData("台帐详情", { list: arr });
    },

    deleteAccount(row) {
      let that = this;
      const url = "/tpiim/monitoringDevice/deleteDeMonitoringDevice";
      handleSomething(
        "确定要删除装置编号为" + row.deviceCode + "的台帐" + "?",
        {
          url: url,
          type: "get",
          data: { deviceId: row.deviceId }
        }
      ).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getAccountList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAccountList(val);
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
    this.getAccountList(1);
  }
};
</script>
