<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="设备名称:">
        <el-input
          :label-width="formLabelWidth"
          @input="getMonitorList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.name"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="设备类型:">
        <el-select
          @change="getMonitorList(1)"
          clearable
          v-model="filter.type"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.monitorType"
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
        prop="name"
        label="设备名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="typeName"
        label="设备类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="unitName"
        label="所属单位"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="coding"
        label="设备编码"
      >
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="ip" label="设备IP">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="usPort"
        label="设备端口号"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :formatter="dateFormat"
        prop="createTime"
        label="设备创建时间"
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
          <el-button @click="deleteMonitor(scope.row)" type="text" size="small"
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
    <m ref="m" @updateData="updateData"> </m>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/deviceResource/m.js";
import m from "./monitor/m.vue";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "monitor",
  components: {
    m,
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
        monitorType: [],
        monitorDevice: [],
        unit: []
      },
      //向子件传递的数据
      //筛选条件数据
      filter: {
        name: "",
        type: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getMonitorList(this.currentPage);
    },
    getMonitorList(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum,
        ...this.filter
      };
      const url = "/yangkai/selfVideoDeviceAccess/getSelfVideoDeviceAccessList";
      $axios({
        url: url,
        type: "post",
        data: data
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
          this.loading = false;
        });
    },
    add() {
      this.$refs.m.setData("新增监拍设备", {}, this.dropDown);
    },
    edit(row) {
      this.$refs.m.setData("编辑监拍设备", row, this.dropDown);
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
      this.$refs.detail.setData("监拍设备详情", { list: arr });
    },
    deleteMonitor(row) {
      let that = this;
      const url = "/yangkai/selfVideoDeviceAccess/deleteSelfVideoDeviceAccess";
      handleSomething("确定要删除设备名称为" + row.name + "的监拍设备" + "?", {
        url: url,
        type: "get",
        data: {
          videoDeviceId: row.id
        }
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getMonitorList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMonitorList(val);
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
    this.getMonitorList(1);
  }
};
</script>
