<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item label="施工地点:">
        <el-input
          clearable
          @input="getList(1)"
          v-model="filter.constructionSite"
          size="small"
          placeholder="请填写固定施工点"
        ></el-input>
      </el-form-item>
      <el-form-item label="风险等级:">
        <el-select
          clearable
          @input="getList(1)"
          v-model="filter.riskLevel"
          size="small"
        >
          <el-option
            v-for="(item, index) in riskLevel"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属地市:">
        <el-input
          clearable
          @input="getList(1)"
          v-model="filter.cityName"
          size="small"
          placeholder="请填写所属地市名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="所属部门:">
        <el-input
          clearable
          @input="getList(1)"
          v-model="filter.deptName"
          size="small"
          placeholder="请填写所属部门名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="施工状态:">
        <el-select
          clearable
          @change="getList(1)"
          v-model="filter.isOver"
          size="small"
        >
          <el-option value="1" label="施工中">施工中</el-option>
          <el-option value="0" label="已结束">已结束</el-option>
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
    <el-table :data="tableData" border max-height="350">
      <el-table-column type="index" width="55" label="序号"></el-table-column>
      <el-table-column prop="constructionSite" label="施工地点">
      </el-table-column>
      <el-table-column prop="constructionContact" label="施工联系人">
      </el-table-column>
      <el-table-column prop="contactPhoneNumber" label="联系人电话">
      </el-table-column>
      <el-table-column prop="riskLevel" label="风险等级"> </el-table-column>
      <el-table-column prop="cityName" label="所属地市"> </el-table-column>
      <el-table-column prop="deptName" label="所属部门"> </el-table-column>
      <el-table-column prop="isOver" label="施工状态">
        <template slot-scope="scope">
          {{ scope.row.isOver == "1" ? "施工中" : "已结束" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.isOver == '1'"
            >修改</el-button
          >
          <el-button
            @click="deleteFCS(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.isOver == '1'"
            >删除</el-button
          >
          <el-button
            @click="end(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.isOver == '1'"
            >结束</el-button
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
    <fcs ref="fcs" @updateData="updateData"></fcs>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/transportationInspection/fixedConstructionSite/f.js";
import $store from "@/store/data.js";
import { handleSomething } from "@/tools/common";
import publicDetail from "@/pages/public/publicDetail";
import fcs from "./fcs";
export default {
  name: "fixedConstructionSiteTable",
  components: {
    fcs,
    publicDetail
  },
  data() {
    return {
      filter: {
        constructionSite: "",
        riskLevel: "",
        cityName: "",
        deptName: "",
        isOver: ""
      },
      tableLoading: false,
      tableData: [],

      //分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      //向子件传递的数据
      riskLevel: [],
      userData: {
        cityId: "",
        cityName: "",
        deptName: "",
        deptId: ""
      }
    };
  },
  methods: {
    updateData() {
      this.getList(this.currentPage);
    },
    getList(pageNum) {
      this.tableLoading = true;
      $axios({
        url:
          "/tpiim/selffixedconstructionpoint/findPage?ect=" +
          new Date().getTime(),
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          ...this.filter
        }
      })
        .then(data => {
          this.tableLoading = false;
          this.total = data.resultValue.total;
          this.tableData = data.resultValue.data;
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val);
    },
    add() {
      this.$refs.fcs.setData("新增固定施工点", this.userData, this.riskLevel);
    },
    edit(row) {
      this.$refs.fcs.setData("修改固定施工点", row, this.riskLevel);
    },

    detail(row) {
      row.isOverName = row.isOver === 1 ? "施工中" : "已结束";
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
      this.$refs.detail.setData("固定施工点详情", { list: arr });
    },
    deleteFCS(row) {
      let title = "确定删除固定施工点" + '"' + row.constructionSite + '"' + "?";
      this.handle(
        title,
        "/tpiim/selffixedconstructionpoint/deleteById",
        row.objId
      );
    },
    end(row) {
      this.handle(
        "确定要结束施工?",
        "/tpiim/selffixedconstructionpoint/endConstructionPoint",
        row.objId
      );
    },
    handle(title, url, objId) {
      let that = this;
      handleSomething(title, {
        url: url,
        type: "post",
        data: objId
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
    this.userData.cityId = $store.getters.userData.orgId;
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName;
    this.userData.deptName = $store.getters.userData.deptName;
    this.userData.deptId = $store.getters.userData.deptId;
    this.riskLevel = $store.getters.riskLevel;
    this.getList(1);
  }
};
</script>
