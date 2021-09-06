<template>
  <div class="baseStyle" style="display:flex;">
    <el-aside width="250px;" style="overflow-x: hidden">
      <orgTree></orgTree>
    </el-aside>
    <div style="width:calc(100% - 250px)">
      <el-form :inline="true">
        <el-form-item size="small" label="组织性质:">
          <el-select
            @change="getOrganizationList(1)"
            clearable
            v-model="filter.deptStyle"
            placeholder="请选择"
          >
            <el-option value="本部">本部</el-option>
            <el-option value="外委">外委</el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="组织类型:">
          <el-select
            @change="getOrganizationList(1)"
            clearable
            v-model="filter.deptType"
            placeholder="请选择"
          >
            <el-option value="单位">单位</el-option>
            <el-option value="部门">部门</el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="所属网省:">
          <el-input
            :label-width="formLabelWidth"
            @change="getOrganizationList(1)"
            minlength="0"
            maxlength="10"
            clearable
            v-model="filter.provinceName"
            placeholder="请填写内容"
          ></el-input>
        </el-form-item>
        <el-form-item size="small" label="所属地市:">
          <el-select
            @change="getOrganizationList(1)"
            clearable
            v-model="filter.cityName"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in city"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
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
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="deptName"
          label="组织名称"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="deptStyle"
          label="组织性质"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="deptType"
          label="组织类型"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pName"
          label="上级组织"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="manageLevel"
          label="管理级别"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="deptSimp"
          label="组织简称"
        >
          <template slot-scope="scope">
            {{ scope.row.deptSimp === null ? "--" : scope.row.deptSimp }}
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="provinceName"
          label="所属网省"
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
          prop="countyName"
          label="所属供电公司"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="deptLevel"
          label="单位级别"
        >
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button
              @click="deleteOrganization(scope.row)"
              type="text"
              size="small"
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
    </div>
    <or ref="or" @updateData="updateData">
    </or>
  </div>
</template>

<script>
import orgTree from "./orgTree";
import $store from "../../store/data.js";
import or from "./organization/or";
import { handleSomething } from "@/tools/common";
export default {
  name: "organization",
  components: {
    or,
    orgTree
  },
  data() {
    return {
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      city: [],
      //筛选条件数据
      filter: {
        deptStyle: "",
        deptType: "",
        provinceName: "",
        cityName: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateData() {
      this.getOrganizationList(this.currentPage);
    },
    getOrganizationList(pageNum) {
      this.loading = true;
      const baseUrl = "/tpiim/sysOrg/getSysOrgList";
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
      this.$refs.or.setData("新增组织机构",{},this.city);
    },
    edit(row) {
      this.$refs.or.setData("修改组织机构",row,this.city);
    },
    deleteOrganization(row) {
      let that = this;
      handleSomething("确定要删除组织" + '"' + row.deptName + '"' + "?", {
        url: "/tpiim/sysOrg/deleteSysOrg",
        type: "get",
        data: {
          orgId: row.objId
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
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrganizationList(val);
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
    this.city = $store.getters.city || [];
    this.getOrganizationList(1);
  }
};
</script>
