<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-button
        type="primary"
        size="small"
        style="float: right;margin-bottom: 18px"
        @click="add()"
        >新增</el-button
      >
    </el-form>
    <el-table
      stripe
      max-height="500"
      :data="tableData"
      border
      v-loading="tableLoading"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="resName" label="菜单名称"></el-table-column>
      <el-table-column prop="defaultUrl" label="页面地址"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="240px">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button @click="edit(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="deleteMenu(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="getChildMenu(scope.row)" type="text" size="small"
            >查看子菜单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <me ref="me" @updateData="updateData"></me>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/system/me.js";
import publicDetail from "@/pages/public/publicDetail";
import me from "./menu/me";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "menuSys",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      //分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {
    me,
    publicDetail
  },
  methods: {
    updateData() {
      this.getMenuList(this.currentPage);
    },
    // 加载数据
    getMenuList(pageNum) {
      this.tableData = [];
      this.tableLoading = true;
      $axios({
        url: "/lilianjin/sysMenu/getSysMenuList",
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize
        }
      })
        .then(data => {
          this.tableLoading = false;
          if (data.successful) {
            this.tableData = data.resultValue.data;
            this.total = data.resultValue.total;
          }
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMenuList(val);
    },
    add() {
      this.$refs.me.setData("新增菜单", {});
    },
    edit(row) {
      this.$refs.me.setData("修改菜单", row);
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
      this.$refs.detail.setData("菜单详情", { list: arr });
    },
    deleteMenu(row) {
      let that = this;
      handleSomething("确定要删除该菜单" + '"' + row.resName + '"' + "?", {
        url: "/lilianjin/sysMenu/deleteSysMenu",
        type: "get",
        data: {
          objId: row.objId
        }
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    getChildMenu(row) {
      $axios({
        url: "/lilianjin/sysMenu/getChildSysMenus",
        type: "get",
        data: {
          objId: row.objId
        }
      })
        .then(data => {
          this.tableLoading = false;
          if (data.successful) {
            this.$message.success(data.resultHint);
            console.log(data.resultValue);
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.tableLoading = false;
        });
    }
  },
  mounted() {
    this.getMenuList(1);
  }
};
</script>
