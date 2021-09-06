<template>
  <div class="baseStyle threeCross">
    <el-form :inline="true">
      <el-form-item size="small" label="线路名称:">
        <el-input
          :label-width="formLabelWidth"
          @input="getSpanList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.lineName"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="被跨越物类型:">
        <el-input
          :label-width="formLabelWidth"
          @input="getSpanList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.crossStyle"
          placeholder="请填写内容"
        ></el-input>
      </el-form-item>
      <el-form-item size="small" label="是否三跨:">
        <el-select
          @change="getSpanList(1)"
          clearable
          v-model="filter.isMaincross"
          placeholder="请选择"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
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
        prop="lineName"
        label="线路名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="startTowername"
        label="起始杆塔 "
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="endTowername"
        label="终止杆塔"
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
        prop="maintainTeamname"
        label="运维班组"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="isMaincross"
        label="是否三跨"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="crossName"
        label="被跨越物名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="crossStyle"
        label="被跨越物类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :formatter="dateFormat"
        prop="measDate"
        label="测量时间"
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
          <el-button @click="deleteSpan(scope.row)" type="text" size="small"
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
    <tc ref="tc" @updateData="updateData"> </tc>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/deviceResource/tc.js";
import tc from "./threeCross/tc";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "threeCorss",
  components: {
    tc,
    publicDetail
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      url: $store.getters.url,
      //下拉菜单数据
      //向子件传递的数据
      //筛选条件数据
      filter: {
        crossStyle: "",
        lineName: "",
        isMaincross: ""
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
    getSpanList(pageNum) {
      this.loading = true;
      const url = "/tpiim/span/getSpanList";
      $axios({
        url: url,
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
      this.$refs.tc.setData("新增三跨", {});
    },
    edit(row) {
      row.measDate = this.$moment(row.measDate)
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss");
      row.imgUrl = [
        {
          url: this.url + row.crossPhoto
        }
      ];
      this.$refs.tc.setData("修改三跨", row);
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
      arr.push({
        label: "被跨越物照片",
        width: "100%",
        img: "img",
        value: [{ url: this.url + row.crossPhoto }]
      });
      this.$refs.detail.setData("三跨详情", { list: arr });
    },
    deleteSpan(row) {
      let that = this;
      handleSomething("确定要删除该三跨?", {
        url: "/tpiim/span/deleteSpan",
        type: "get",
        data: {
          objId: row.objId
        }
      }).then(function(result) {
        if (result.res) {
          that.getSpanList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSpanList(val);
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
    this.getSpanList(1);
  }
};
</script>
