<template>
  <div>
    <el-form :inline="true">
      <el-form-item size="small" label="线路名称:">
        <el-input
          :label-width="formLabelWidth"
          @change="getDefectList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.lineName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="发现日期:">
        <el-date-picker
          :picker-options="pickerOptions"
          @change="getDefectList(1)"
          value-format="timestamp"
          v-model="filter.discovDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="缺陷类型:">
        <el-select
          @change="getDefectList(1)"
          clearable
          v-model="filter.defectType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.defectType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="缺陷部位:">
        <el-select
          @change="getDefectList(1)"
          clearable
          v-model="filter.defectPart"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.defectPart"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="运维班组:">
        <el-select
          @change="getDefectList(1)"
          clearable
          v-model="filter.maintainTeamName"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.maintainTeam"
            :key="index"
            :label="item.teamName"
            :value="item.teamName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        size="small"
        style="float: right; margin-left: 5px"
        @click="exportExcel"
        >导出Excel</el-button
      >
      <el-button
        type="primary"
        size="small"
        style="float: right"
        @click="register"
        >缺陷登记</el-button
      >
    </el-form>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      max-height="380"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="defectTypeName"
        label="缺陷类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="defectPartName"
        label="缺陷部位"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="defectNatureName"
        label="缺陷性质"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="defectStateName"
        label="缺陷状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="isCompletedName"
        label="消缺状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="所属线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="maintainTeamName"
        label="运维班组"
      >
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="discovDate"
        label="发现时间"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.isChanged === '0'"
            @click="detail(scope.row)"
            type="text"
            size="small"
            >缺陷详情</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.defectStateName === '待提交'
            "
            @click="edit(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.defectStateName === '待提交'
            "
            @click="submit(scope.row)"
            type="text"
            size="small"
            >提交</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.defectStateName === '待提交'
            "
            @click="transfer(scope.row)"
            type="text"
            size="small"
            >转为隐患</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.defectStateName === '待审核'
            "
            @click="examine(scope.row)"
            type="text"
            size="small"
            >审核</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '未消缺' &&
                scope.row.defectStateName === '审核通过'
            "
            @click="clear(scope.row)"
            type="text"
            size="small"
            >消缺</el-button
          >
          <el-button
            v-show="
              (scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '消缺中') ||
                scope.row.isCompletedName === '已消缺'
            "
            @click="display(scope.row)"
            type="text"
            size="small"
            >消缺详情</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '消缺中'
            "
            @click="check(scope.row)"
            type="text"
            size="small"
            >验收</el-button
          >
          <el-button
            v-show="scope.row.isChanged === '1'"
            disabled
            type="text"
            size="small"
            >已转为隐患</el-button
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
    <hs ref="transfer" @updateData="updateData"> </hs>
    <ds ref="ds" @updateData="updateData"> </ds>
    <defectClear ref="clear" @updateData="updateData"></defectClear>
    <defectCheck ref="check" @updateData="updateData"></defectCheck>
    <defectDisplay ref="display"></defectDisplay>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/defect/d.js";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import defectCheck from "./defectStatistics/defectCheck.vue";
import hs from "../hiddenDanger/hiddenDangerStatistics/hs.vue";
import defectDisplay from "./defectStatistics/defectDisplay.vue";
import defectClear from "./defectStatistics/defectClear.vue";
import ds from "./defectStatistics/ds.vue";
import {
  submitFormData,
  examineFormData,
  checkFormData,
  exportMethod
} from "@/tools/common";
export default {
  name: "defectStatistics",
  components: {
    defectCheck,
    defectDisplay,
    defectClear,
    publicDetail,
    ds,
    hs
  },
  data() {
    return {
      token: sessionStorage.getItem("token"),
      url: $store.getters.url,
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      dropDown: {
        //新增、修改下拉
        defectNature: [],
        ispTask: [],
        //当前页下拉
        maintainTeam: [],
        defectType: [],
        defectPart: [],
        //隐患转换下拉
        troubleType: [],
        troubleLevel: []
      },
      //筛选条件数据
      filter: {
        discovDate: "",
        lineName: "",
        defectType: "",
        defectPart: "",
        maintainTeamName: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    updateData() {
      this.getDefectList(this.currentPage);
    },
    getDefectList(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        ...this.filter
      };
      const baseUrl = "/yangkai/ptmidefectrecord/findPage";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          if (data.successful) {
            this.loading = false;
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
            if (this.tableData.length === 0) {
            } else {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].discovDate = this.$moment(
                  this.tableData[i].discovDate
                )
                  .utcOffset(8)
                  .format("YYYY-MM-DD HH:mm:ss");
                this.tableData[i].regDate = this.$moment(
                  this.tableData[i].regDate
                )
                  .utcOffset(8)
                  .format("YYYY-MM-DD HH:mm:ss");
              }
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
    exportExcel() {
      let myObj = {
        method: "post",
        url: "/yangkai/ptmidefectrecord/export",
        fileName:
          "缺陷查询统计列表" +
          this.$moment(new Date())
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss"),
        data: { ...this.filter }
      };
      exportMethod(myObj);
    },
    register() {
      this.$refs.ds.setData("缺陷登记", {}, this.dropDown);
    },
    edit(row) {
      this.getPic(row).then(data => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].url = this.url + data[i].fileId;
          }
        }
        row.imgUrl = data;
        this.$refs.ds.setData("缺陷修改", row, this.dropDown);
      });
    },
    getPic(row) {
      return new Promise(function(resolve, reject) {
        const baseUrl = "/yangkai/ptmidefectrecord/getById";
        let objId = row.objId;
        const url = `${baseUrl}?objId=${objId}`;
        $axios({ url: url, type: "get" })
          .then(data => {
            if (data.successful) {
              resolve(data.resultValue.ptmiDefectFile);
            } else {
              console.error(data.resultHint);
              resolve(false);
            }
          })
          .catch(error => {
            console.error(error);
            resolve(false);
          });
      });
    },
    detail(row) {
      this.getPic(row).then(data => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].url = this.url + data[i].fileId;
          }
        }
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
          label: "缺陷图片",
          width: "100%",
          img: "img",
          value: data
        });
        this.$refs.detail.setData("缺陷详情", { list: arr });
      });
    },
    submit(row) {
      let that = this;
      submitFormData("确定提交该缺陷?", "/yangkai/ptmidefectrecord/update", {
        objId: row.objId,
        isCompleted: "0",
        defectState: "2"
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    examine(row) {
      let that = this;
      examineFormData("确定审核该缺陷?", "/yangkai/ptmidefectrecord/update", {
        objId: row.objId,
        isCompleted: "0",
        defectState: "3"
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.updateData();
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    display(row) {
      this.$refs.display.setData(row.objId);
    },
    check(row) {
      this.$refs.check.setData(row.objId);
    },
    clear(row) {
      this.$refs.clear.setData(row);
    },
    transfer(row) {
      let form = { chId: row.objId };
      this.$refs.transfer.setData("缺陷转为隐患", form, this.dropDown);
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDefectList(val);
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
    this.getDefectList(1);
  }
};
</script>
