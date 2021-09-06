<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="重要通道：">
        <el-input
          :label-width="formLabelWidth"
          @input="getPassageList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.passagewayName"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>

      <el-form-item size="small" label="所属线路：">
        <el-input
          :label-width="formLabelWidth"
          @input="getPassageList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.pLine"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-button type="primary" size="small" style="float: right" @click="add"
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
        prop="passagewayName"
        label="重要通道"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="passagewayLevel"
        label="等级条件"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="pLine"
        label="所属线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="maintainUnitname"
        label="运维单位"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属地市"
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
          <el-button @click="deletePassage(scope.row)" type="text" size="small"
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
    <ip ref="ip" @updateData="updateData"> </ip>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/deviceResource/ip.js";
import ip from "./importantPassage/ip.vue";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "importantPassage",
  components: {
    ip,
    publicDetail,
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      //筛选条件数据
      filter: {
        passagewayName: "",
        pLine: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getPassageList(this.currentPage);
    },
    getPassageList(pageNum) {
      this.loading = true;
      const baseUrl = "/tpiim/passageway/getPassagewayList";
      $axios({
        url: baseUrl,
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
      }).then(data => {
        if (data.successful) {
          this.loading = false;
          this.totalPages = data.resultValue.total;
          this.tableData = data.resultValue.data;
        } else {
          this.loading = false;
          this.tableData = [];
          this.$message.error(data.resultHint);
        }
      });
    },
    add() {
      this.$refs.ip.setData("新增重要通道", {});
    },
    edit(row) {
      this.$refs.ip.setData("修改重要通道", row);
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
            value: value[label.indexOf(obj)] || "--"
          });
        }
      }
      this.$refs.detail.setData("重要通道详情", { list: arr });
    },
    deletePassage(row) {
      let that = this;
      handleSomething(
        "确定要删除重要通道" + '"' + row.passagewayName + '"' + "?",
        {
          url: "/tpiim/passageway/deletePassageway",
          type: "get",
          data: {
            objId: row.passagewayId
          }
        }
      ).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getPassageList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPassageList(val);
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
    this.getPassageList(1);
  }
};
</script>
