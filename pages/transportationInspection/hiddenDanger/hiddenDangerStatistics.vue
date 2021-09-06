<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="线路名称:">
        <el-input
          :label-width="formLabelWidth"
          @change="gethiddenDangerList(1)"
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
          @change="gethiddenDangerList(1)"
          value-format="timestamp"
          v-model="filter.discovDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="隐患类型:">
        <el-select
          @change="gethiddenDangerList(1)"
          clearable
          v-model="filter.troubleType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.troubleType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="隐患级别:">
        <el-select
          @change="gethiddenDangerList(1)"
          clearable
          v-model="filter.troubleLevel"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.troubleLevel"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="运维班组:">
        <el-select
          @change="gethiddenDangerList(1)"
          clearable
          v-model="filter.lineOperationGroupName"
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
        >隐患登记</el-button
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
        prop="troubleTypeName"
        label="隐患类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="troubleLevelName"
        label="隐患级别"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="troubleStateName"
        label="隐患状态"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="isCompletedName"
        label="治理状态"
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
        prop="lineOperationGroupName"
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
            >隐患详情</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.troubleStateName === '待提交'
            "
            @click="edit(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.troubleStateName === '待提交'
            "
            @click="submit(scope.row)"
            type="text"
            size="small"
            >提交</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.troubleStateName === '待提交'
            "
            @click="transfer(scope.row)"
            type="text"
            size="small"
            >转为缺陷</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.troubleStateName === '待审核'
            "
            @click="examine(scope.row)"
            type="text"
            size="small"
            >审核</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '待治理' &&
                scope.row.troubleStateName === '审核通过'
            "
            @click="clear(scope.row)"
            type="text"
            size="small"
            >治理</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '待治理' &&
                scope.row.troubleStateName === '审核通过'
            "
            @click="createTask(scope.row)"
            type="text"
            size="small"
            >新增值守任务</el-button
          >
          <el-button
            v-show="
              scope.row.isChanged === '0' &&
                scope.row.isCompletedName === '已治理'
            "
            @click="display(scope.row)"
            type="text"
            size="small"
            >治理详情</el-button
          >
          <el-button
            v-show="scope.row.isChanged === '1'"
            disabled
            type="text"
            size="small"
            >已转为缺陷</el-button
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
    <hs ref="hs" @updateData="updateData"> </hs>
    <ds ref="transfer" @updateData="updateData"></ds>
    <hiddenDangerClear ref="clear" @updateData="updateData"></hiddenDangerClear>
    <publicDetail ref="display"></publicDetail>
    <mm ref="mm" @updateData="updateData"> </mm>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/hiddenDanger/hd.js";
import formItemsH from "@/store/formItems/transportationInspection/hiddenDanger/h.js";
import $store from "@/store/data.js";
import hiddenDangerClear from "./hiddenDangerStatistics/hiddenDangerClear.vue";
import ds from "../defect/defectStatistics/ds.vue";
import publicDetail from "@/pages/public/publicDetail";
import mm from "../patrol/mannedMission/mm";
import hs from "./hiddenDangerStatistics/hs.vue";
import { submitFormData, examineFormData, exportMethod } from "@/tools/common";
export default {
  name: "hiddenDangerStatistics",
  components: {
    ds,
    hiddenDangerClear,
    publicDetail,
    hs,
    mm
  },
  data() {
    return {
      token: sessionStorage.getItem("token"),
      url: $store.getters.url,
      //当前页面所用数据
      userData: {
        cityId: "",
        cityName: "",
        reTroubleDesc: "",
        objId: ""
      },
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      dropDown: {
        //缺陷转换下拉
        defectType: [],
        defectPart: [],
        defectNature: [],
        ispTask: [],
        //当前页下拉、新增、修改下拉
        maintainTeam: [],
        troubleType: [],
        troubleLevel: [],
        //值守任务下拉
        oLevels: [],
        depts: []
      },
      //筛选条件数据
      filter: {
        discovDate: "",
        lineName: "",
        troubleType: "",
        troubleLevel: "",
        lineOperationGroupName: ""
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
      this.gethiddenDangerList(this.currentPage);
    },
    gethiddenDangerList(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        ...this.filter
      };
      const url = "/yangkai/ptmihdrecord/findPage";
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
      let data = {
        ...this.filter
      };
      let myObj = {
        method: "post",
        url: "/yangkai/ptmihdrecord/export",
        fileName:
          "隐患查询统计列表" +
          this.$moment(new Date())
            .utcOffset(8)
            .format("YYYY-MM-DD HH:mm:ss"),
        data: data
      };
      exportMethod(myObj);
    },
    register(row) {
      this.$refs.hs.setData("隐患登记", {}, this.dropDown);
    },
    edit(row) {
      this.getPic(row).then(data => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].url = this.url + data[i].fileId;
          }
        }
        row.imgUrl = data;
        this.$refs.hs.setData("隐患修改", row, this.dropDown);
      });
    },
    getPic(row) {
      return new Promise(function(resolve, reject) {
        const baseUrl = "/yangkai/ptmihdrecord/getById";
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
        row.imageUrl = data;
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
          label: "隐患图片",
          width: "100%",
          img: "img",
          value: data
        });
        this.$refs.detail.setData("隐患详情", { list: arr });
      });
    },
    submit(row) {
      let that = this;
      submitFormData("确定提交该隐患?", "/yangkai/ptmihdrecord/update", {
        objId: row.objId,
        isCompleted: "0",
        troubleState: "2"
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
      examineFormData("确定审核该隐患?", "/yangkai/ptmihdrecord/update", {
        objId: row.objId,
        isCompleted: "0",
        troubleState: "3"
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
      const baseUrl = "/yangkai/ptmihdrecord/handleGetByMainId";
      const url = `${baseUrl}?mainId=${row.objId}`;
      $axios({ url: url, type: "get" })
        .then(data => {
          if (data.successful) {
            let label = Object.keys(data.resultValue),
              value = Object.values(data.resultValue),
              imageUrl = data.resultValue.ptmiDefectFile,
              arrImg = [],
              arr = [];
            for (let key in formItemsH) {
              var obj = label.find(item => {
                return item === formItemsH[key].prop;
              });
              if (obj) {
                arr.push({
                  ...formItemsH[key],
                  value: value[label.indexOf(obj)]
                });
              }
            }
            for (let j = 0; j < imageUrl.length; j++) {
              arrImg.push({ url: this.url + imageUrl[j].fileId });
            }
            arr.push({
              label: "治理图片",
              width: "100%",
              img: "img",
              value: arrImg
            });
            this.$refs.display.setData("治理详情", { list: arr });
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    clear(row) {
      this.$refs.clear.setData(row);
    },
    transfer(row) {
      let form = { chId: row.objId };
      this.$refs.transfer.setData("隐患转为缺陷", form, this.dropDown);
    },
    createTask(row) {
      this.userData.reTroubleDesc = "【隐患编号】" + row.objId;
      this.userData.reTrouble = row.objId;
      this.$refs.mm.setData(
        "新增值守任务",
        this.userData,
        this.dropDown,
        false
      );
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gethiddenDangerList(val);
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
    this.userData.cityId = $store.getters.userData.orgId;
    this.userData.cityName =
      $store.getters.userData.orgName === null
        ? "合肥市"
        : $store.getters.userData.orgName || "";
    this.gethiddenDangerList(1);
  }
};
</script>
