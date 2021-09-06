<template>
  <div class="baseStyle">
    <el-header height="45px;">
      <el-button type="primary" size="small" @click="add">新增</el-button>
    </el-header>
    <el-form :inline="true"> </el-form>
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
        prop="wireProtectionTeamName"
        label="护线队名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="constructionUnit"
        label="施工单位"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityName"
        label="所属城市"
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
    <w ref="w"></w>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/wireProtectionTeam/wireProtectionTeam/w.js";
import $store from "@/store/data.js";
import w from "./wireProtectionTeam/w.vue";
import publicDetail from "@/pages/public/publicDetail";
export default {
  name: "wireProtectionTeamPerson",
  components: {
    w,
    publicDetail
  },
  data() {
    return {
      //当前页面所用数据
      url: $store.getters.url,
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      dropDown: {
        city: []
      },
      //向子件传递的数据
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
      this.getWPT(this.currentPage);
    },
    getWPT(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        pageNum: pageNum
      };
      const baseUrl = "/yangkai/wireProtectionTeam/getWireProtectionTeamList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          if (data.successful) {
            this.loading = false;
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
            if (this.tableData.length === 0) {
            }
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
      this.$refs.w.setData("新增护线队", {}, this.dropDown);
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
      if (row.teamCertificateArrays) {
        for (let i = 0; i < row.teamCertificateArrays.length; i++) {
          imageUrl.push({ url: this.url + row.teamCertificateArrays[i] });
        }
      }
      arr.push({
        label: "资质图片",
        width: "100%",
        img: "img",
        value: imageUrl
      });

      this.$refs.detail.setData("护线队详情", { list: arr });
    },
    edit(row) {
      let arr = [];
      for (let i = 0; i < row.teamCertificateArrays.length; i++) {
        arr.push({ url: this.url + row.teamCertificateArrays[i] });
      }
      row.imgUrl = arr;
      this.$refs.w.setData("编辑护线队", row, this.dropDown);
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getWPT(val);
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
    this.dropDown.city = $store.getters.city;
    this.getWPT(1);
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
