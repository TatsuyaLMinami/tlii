<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="线路名称:">
        <el-input
          :label-width="formLabelWidth"
          @input="getFaultList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.lineName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="时段:">
        <el-date-picker
          :picker-options="pickerOptions"
          @change="getFaultList(1)"
          v-model="filter.faultTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="电压等级:">
        <el-select
          @change="getFaultList(1)"
          clearable
          v-model="filter.volLevelName"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.volLevel"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="故障类型:">
        <el-select
          @change="getFaultList(1)"
          clearable
          v-model="filter.faultType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.faultType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="故障部位:">
        <el-select
          @change="getFaultList(1)"
          clearable
          v-model="filter.faultLocation"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.faultLocation"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="处理结果:">
        <el-select
          @change="getFaultList(1)"
          clearable
          v-model="filter.handleState"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.handleState"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        size="small"
        style="float: right"
        @click="register"
        >故障登记</el-button
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
        prop="faultTypeName"
        label="故障类型"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="faultLocationName"
        label="故障部位"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="handleStateName"
        label="故障状态"
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
        :show-overflow-tooltip="true"
        prop="volLevelName"
        label="电压等级"
      >
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="discovDate"
        label="发现时间"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >故障详情</el-button
          >
          <el-button
            v-show="scope.row.handleStateName === '待处理'"
            @click="edit(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            v-show="scope.row.handleStateName === '待处理'"
            @click="clear(scope.row)"
            type="text"
            size="small"
            >处理</el-button
          >
          <el-button
            v-show="scope.row.handleStateName === '已处理'"
            @click="display(scope.row)"
            type="text"
            size="small"
            >处理详情</el-button
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
    <fs ref="fs" updateData="updateData"></fs>
    <publicDetail ref="detail"> </publicDetail>
    <faultClear ref="clear" updateData="updateData"></faultClear>
    <publicDetail ref="display"> </publicDetail>
  </div>
</template>

<script>
import formItems from "@/store/formItems/transportationInspection/fault/f.js";
import formItemsH from "@/store/formItems/transportationInspection/fault/h.js";
import $store from "@/store/data.js";
import faultClear from "./faultStatistics/faultClear.vue";
import fs from "./faultStatistics/fs.vue";
import publicDetail from "@/pages/public/publicDetail";
import { handleSomething } from "@/tools/common";
export default {
  name: "faultStatistics",
  components: {
    publicDetail,
    faultClear,
    fs
  },
  data() {
    return {
      url: $store.getters.url,
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      dropDown: {
        //fs页面
        faultType: [],
        faultLocation: [],
        ispTask: [],
        //clear页面
        powerTransmission: [],
        //本页面
        volLevel: [],
        handleState: []
      },

      //向子件传递的数据

      displayForm: {},

      dialogClearForm: {},
      dialogClearTitle: "",
      dialogFormClearVisible: false,
      //筛选条件数据
      filter: {
        faultTime: [],
        lineName: "",
        faultType: "",
        faultLocation: "",
        disposalResults: "",
        volLevelName: ""
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
      this.getFaultList(this.currentPage);
    },
    getFaultList(pageNum) {
      let faultStartTime, faultEndTime;
      if (this.filter.faultTime && this.filter.faultTime.length === 2) {
        faultStartTime = new Date(this.filter.faultTime[0]).getTime();
        faultEndTime = new Date(this.filter.faultTime[1]).getTime();
      } else {
        faultStartTime = "";
        faultEndTime = "";
      }
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        faultStartTime: faultStartTime,
        faultEndTime: faultEndTime,
        ...this.filter
      };
      const url = "/yangkai/selffault/findPage ";
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(data => {
          if (data.successful) {
            this.loading = false;
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
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
    register(row) {
      this.$refs.fs.setData("故障登记", {}, this.dropDown);
    },
    edit(row) {
      this.getPic(row).then(data => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].url = this.url + data[i].fileId;
          }
        }
        row.imgUrl = data;
        this.$refs.fs.setData("故障修改", row, this.dropDown);
      });
    },
    getPic(row) {
      return new Promise(function(resolve, reject) {
        const baseUrl = "/yangkai/selffault/getById";
        const url = `${baseUrl}?objId=${row.objId}`;
        $axios({
          url: url,
          type: "get"
        })
          .then(data => {
            if (data.successful) {
              resolve(data.resultValue.selfFaultFile);
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
        this.$refs.detail.setData("故障详情", { list: arr });
      });
    },
    clear(row) {
      this.$refs.clear.setData(row, this.dropDown);
    },
    display(row) {
      const baseUrl = "/yangkai/selffaulthandlerecord/getByMainId";
      const url = `${baseUrl}?mainId=${row.objId}`;
      $axios({
        url: url,
        type: "get"
      })
        .then(data => {
          if (data.successful) {
            let label = Object.keys(data.resultValue),
              value = Object.values(data.resultValue),
              imageUrl = data.resultValue.selfFaultFile,
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
              label: "处理图片",
              width: "100%",
              img: "img",
              value: arrImg
            });
            this.$refs.display.setData("处理详情", { list: arr });
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFaultList(val);
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
    this.getFaultList(1);
  }
};
</script>
