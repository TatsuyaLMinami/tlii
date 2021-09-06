<template>
  <div class="queryTable">
    <el-form :inline="true" v-show="visible">
      <el-form-item size="small" label="装置编号:" class="inputClass">
        <el-input
          :label-width="formLabelWidth"
          @change="getOMList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.deviceCode"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="线路名称:" class="inputClass">
        <el-input
          :label-width="formLabelWidth"
          @change="getOMList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.defectdLineName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="杆塔名称:" class="inputClass">
        <el-input
          :label-width="formLabelWidth"
          @change="getOMList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.defectTowerName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="运维班组:" class="selectClass">
        <el-select
          @change="getOMList(1)"
          v-model="filter.maintainTeamName"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(item, index) in dropDown.maintainTeam"
            :key="index"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="装置类型:" class="selectClass">
        <el-select
          @change="getOMList(1)"
          v-model="filter.deviceType"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.deviceType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="装置状态:" class="selectClass">
        <el-select
          @change="getOMList(1)"
          clearable
          v-model="filter.deviceState"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in dropDown.deviceState"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small" label="时段:" class="dateClass">
        <el-date-picker
          :picker-options="pickerOptions"
          @change="getOMList(1)"
          v-model="filter.omTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <omTable
      :tableHeight="tableHeight"
      :tableItems="tableItems"
      :tableData="tableData"
      :loading="loading"
    >
    </omTable>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="totalPages"
    >
    </el-pagination>
  </div>
</template>
<script>
import { tableItemData } from "@/store/chartItems/queryData.js";
import $store from "@/store/data.js";
import tableItems from "@/store/tableItems/tableItems.js";
import omTable from "./queryTable/omTable.vue";
export default {
  name: "queryTable",
  components: { omTable },
  data() {
    return {
      visible: true,
      tableItems: [],
      tableData: [],
      tableHeight: 390,
      totalPages: 0,
      deviceType: "",
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      //下拉菜单数据
      dropDown: {
        deviceType: [],
        deviceState: [],
        volLevel: [],
        city: [],
        maintainTeam: []
      },
      //向子件传递的数据
      dialogLoading: true,
      dialogTotalPages: 0,
      dialogTableData: [],
      dialogTitle: "",
      //筛选条件数据
      filter: {
        deviceCode: "",
        omTime: [],
        defectdLineName: "",
        defectTowerName: "",
        deviceType: "",
        deviceState: "",
        maintainTeamName: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    setData(deviceType, visible) {
      this.visible = visible;
      if (deviceType) {
        this.deviceType = deviceType;
        this.filter.deviceType = deviceType;
        this.getOMList(1);
      } else {
        this.getOMList(1);
      }
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    getOMList(pageNum) {
      let data = {};
      this.loading = true;
      if (this.visible) {
        let omStartTime, omEndTime;
        if (this.filter.omTime && this.filter.omTime.length === 2) {
          omStartTime = new Date(this.filter.omTime[0]).getTime();
          omEndTime = new Date(this.filter.omTime[1]).getTime();
        } else {
          omStartTime = "";
          omEndTime = "";
        }
        this.filter.deviceType =
          this.filter.deviceType === "" ? "003_001" : this.filter.deviceType;
        data = {
          pageNum: pageNum,
          pageSize: this.pageSize,
          startTime: omStartTime,
          endTime: omEndTime,
          ...this.filter
        };
      } else {
        data = {
          pageNum: pageNum,
          pageSize: 10,
          deviceType: this.deviceType
        };
      }
      const url = "/yangkai/selfMonitorInformation/getList";
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          let deviceType = this.filter.deviceType;
          if (this.visible) {
            this.tableHeight = 490;
            this.tableItems = [...tableItemData, ...tableItems[deviceType]];
          } else {
            this.tableHeight = 390;
            this.tableItems = [...tableItems[deviceType]];
          }
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
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOMList(val);
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
    this.getOMList(1);
  }
};
</script>
<style lang="less">
.queryTable {
  .el-form {
    .inputClass {
      width: 31%;
      .el-form-item__content {
        width: 65%;
      }
    }
    .selectClass {
      width: 22%;
      .el-form-item__content {
        width: 65%;
      }
    }
    .dateClass {
      width: 27%;
      .el-form-item__content {
        width: 78%;
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 0px;
    left: 50%;
  }
}
</style>
