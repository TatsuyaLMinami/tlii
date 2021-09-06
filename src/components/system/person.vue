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
        <el-table-column prop="staffName" label="姓名"></el-table-column>
        <el-table-column prop="staffSex" label="性别"></el-table-column>
        <el-table-column prop="telphone" label="手机号码"></el-table-column>
        <el-table-column prop="account" label="用户名称"></el-table-column>
        <el-table-column prop="userNo" label="员工编号"></el-table-column>
        <el-table-column prop="cardId" label="身份证号"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="isEffective" label="是否有效"></el-table-column>
        <el-table-column prop="isCancel" label="是否撤销"></el-table-column>
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
            <el-button @click="deletePerson(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="getMenu(scope.row)" type="text" size="small"
              >查看权限菜单</el-button
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
    <pe ref="pe" @updateData="updateData"></pe>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import orgTree from "./orgTree";
import formItems from "@/store/formItems/system/pe.js";
import publicDetail from "@/pages/public/publicDetail";
import pe from "./person/pe";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
export default {
  name: "person",
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
    orgTree,
    pe,
    publicDetail
  },
  methods: {
    updateData() {
      this.getPersonList(this.currentPage);
    },
    // 加载数据
    getPersonList(pageNum) {
      this.tableData = [];
      this.tableLoading = true;
      $axios({
        url: "/lilianjin/sysUser/getUserList",
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
      this.getPersonList(val);
    },
    add() {
      this.$refs.pe.setData("新增人员", {});
    },
    edit(row) {
      this.$refs.pe.setData("修改人员", row);
    },
    detail(row) {
      row.role = row.roleList.join(",");
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
      this.$refs.detail.setData("用户详情", { list: arr });
    },
    deletePerson(row) {
      let that = this;
      handleSomething("确定要删除该人员" + '"' + row.staffName + '"' + "?", {
        url: "/lilianjin/sysUser/deleteSysUser",
        type: "get",
        data: {
          userId: row.objId
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
    getMenu(row) {
      $axios({
        url: "/lilianjin/sysUser/getUserMenuNames",
        type: "get",
        data: {
          userId: row.objId
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
    this.getPersonList(1);
  }
};
</script>
