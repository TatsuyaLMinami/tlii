<template>
  <div class="baseStyle" style="display:flex;">
    <el-aside width="250px;" style="overflow-x: hidden">
      <orgTree></orgTree>
    </el-aside>
    <div style="width:calc(100% - 250px)">
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
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleCode" label="角色编码"></el-table-column>
        <el-table-column prop="roleLevel" label="角色级别"></el-table-column>
        <el-table-column prop="roleJsp" label="角色主页"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="240px"
        >
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="deleteRole(scope.row)" type="text" size="small"
              >删除</el-button
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
    </div>
    <ro ref="ro" @updateData="updateData"></ro>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import orgTree from "./orgTree";
import formItems from "@/store/formItems/system/ro.js";
import publicDetail from "@/pages/public/publicDetail";
import ro from "./role/ro";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "role",
  data() {
    return {
      tableData: [],
      unit: [],
      tableLoading: false,
      //分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {
    ro,
    publicDetail,
    orgTree
  },
  methods: {
    updateData() {
      this.getRoleList(this.currentPage);
    },
    // 加载数据
    getRoleList(pageNum) {
      this.tableData = [];
      this.tableLoading = true;
      $axios({
        url: "/lilianjin/sysRole/getSysRoleList",
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
      this.getRoleList(val);
    },
    add() {
      this.$refs.ro.setData("新增角色", {});
    },
    edit(row) {
      this.$refs.ro.setData("修改角色", row);
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
      this.$refs.detail.setData("角色详情", { list: arr });
    },
    deleteRole(row) {
      let that = this;
      handleSomething("确定要删除该角色" + '"' + row.roleName + '"' + "?", {
        url: "/lilianjin/sysRole/deleteSysRole",
        type: "get",
        data: {
          roleId: row.objId
        }
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    }
  },
  mounted() {
    this.getRoleList(1);
  }
};
</script>
