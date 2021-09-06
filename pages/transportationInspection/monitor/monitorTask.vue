<template>
  <div class="baseStyle">
    <el-header height="45px;">
      <el-button type="primary" size="small" @click="add">新增任务</el-button>
    </el-header>
    <el-form :inline="true"> </el-form>
    <el-table v-loading="loading" :data="tableData" border max-height="480">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="任务名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="typeName"
        label="任务类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceName"
        label="监控装置"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="peroid"
        label="拍照频率(次/min)"
      >
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="createTime"
        label="任务创建时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stateName"
        label="任务状态"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="260px">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            v-show="scope.row.state !== 2"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            @click="pause(scope.row)"
            v-show="scope.row.state === 0"
            type="text"
            size="small"
            >暂停</el-button
          >
          <el-button
            @click="recover(scope.row)"
            v-show="scope.row.state === 1"
            type="text"
            size="small"
            >恢复</el-button
          >
          <el-button
            @click="close(scope.row)"
            v-show="scope.row.state === 0 || scope.row.state === 1"
            type="text"
            size="small"
            >关闭</el-button
          >
          <el-button
            @click="selfie(scope.row)"
            v-show="scope.row.state === 0"
            type="text"
            size="small"
            >自拍</el-button
          >
          <el-button @click="deleteTask(scope.row)" type="text" size="small"
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
    <mt ref="mt" @updateData="updateData"></mt>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/monitor/mt.js";
import publicDetail from "@/pages/public/publicDetail";
import mt from "./monitorTask/mt.vue";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "monitorTask",
  components: { mt, publicDetail },
  data() {
    return {
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      dropDown: {
        taskType: [],
        monitorDevice: []
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getMonitorTask(this.currentPage);
    },
    add() {
      this.$refs.mt.setData("新增监控任务", {}, this.dropDown);
    },
    edit(row) {
      this.$refs.mt.setData("修改监控任务", row, this.dropDown);
    },
    detail(row) {
      let label = Object.keys(row),
        value = Object.values(row),
        arr = [],
        imageUrl = [];
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
      this.$refs.detail.setData("监控任务详情", { list: arr });
    },
    handle(url, title, data) {
      let that = this;
      handleSomething(title, {
        url: url,
        type: "post",
        data: data
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    deleteTask(row) {
      let url = "/yangkai/selfVideoTask/deleteTask",
        title = "确定要删除任务:" + row.name + "?",
        data = {
          objId: row.objId,
          name: row.name,
          jobGroupName: row.jobGroupName
        };
      this.handle(url, title, data);
    },
    //自拍
    selfie(row) {
      let url = "/yangkai/selfVideoTask/nowRunTask",
        title = "确定要执行自拍:" + row.name + "?",
        data = {
          name: row.name,
          jobGroupName: row.jobGroupName
        };
      this.handle(url, title, data);
    },
    pause(row) {
      let url = "/yangkai/selfVideoTask/pauseTask",
        title = "确定要暂停任务:" + row.name + "?",
        data = {
          objId: row.objId,
          name: row.name,
          jobGroupName: row.jobGroupName
        };
      this.handle(url, title, data);
    },
    recover(row) {
      let url = "/yangkai/selfVideoTask/regainTask",
        title = "确定要恢复任务:" + row.name + "?",
        data = {
          objId: row.objId,
          name: row.name,
          jobGroupName: row.jobGroupName
        };
      this.handle(url, title, data);
    },
    close(row) {
      let url = "/yangkai/selfVideoTask/shutdownTask",
        title = "确定要关闭任务:" + row.name + "?",
        data = {
          objId: row.objId,
          name: row.name,
          jobGroupName: row.jobGroupName
        };
      this.handle(url, title, data);
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    getMonitorTask(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum
      };
      const baseUrl = "/yangkai/selfVideoTask/getVideoTaskList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            this.loading = false;
            this.totalPages = res.resultValue.total;
            this.tableData = res.resultValue.data;
          } else {
            this.loading = false;
            this.tableData = [];
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
          this.loading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMonitorTask(val);
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
    this.getMonitorTask(1);
  }
};
</script>
<style scoped>
.el-header {
  text-align: right;
  line-height: 45px;
  margin-bottom: 10px;
}
.el-main {
  width: 100%;
  height: calc(100% - 45px);
}
</style>
