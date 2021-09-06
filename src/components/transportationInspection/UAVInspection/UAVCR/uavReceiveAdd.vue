<template>
  <div>
    <el-dialog
      center
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="850px"
    >
      <div class="search-style">
        <el-form
          :inline="true"
          ref="ruleForm"
          :model="formData"
          :rules="formRules"
          label-width="130px"
        >
          <el-form-item label="所属巡视任务：" prop="taskName">
            <el-input
              :disabled="editBool"
              readonly
              class="w250"
              suffix-icon="el-icon-search"
              size="small"
              v-model="formData.taskName"
              placeholder="所属巡视任务："
              @focus="taskFn"
            ></el-input>
          </el-form-item>

          <el-form-item label="无人机装备：" prop="uavName">
            <el-input
              :disabled="editBool"
              readonly
              class="w250"
              suffix-icon="el-icon-search"
              size="small"
              v-model="formData.uavName"
              placeholder="请选择无人机"
              @focus="uavFn"
            ></el-input>
          </el-form-item>

          <el-form-item label="领用人：" prop="receiptUserName">
            <el-input
              :disabled="editBool"
              readonly
              class="w250"
              suffix-icon="el-icon-search"
              size="small"
              v-model="formData.receiptUserName"
              placeholder="请选择领用人"
              @focus="uavPeopleFn"
            ></el-input>
          </el-form-item>

          <el-form-item label="领用时间：" prop="receiptTimeObj">
            <el-date-picker
              :disabled="editBool"
              v-model="formData.receiptTimeObj"
              type="datetime"
              class="w250"
              size="small"
              placeholder="选择日期时间"
              @change="formData.receiptTime = $event.getTime()"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="所属地市：" prop="cityId">
            <div class="w150">
              <form-select
                url="/tpiim/baseData/getCityList"
                type="get"
                @callBackFn="selectBackFn"
                :value.sync="formData.cityId"
                :disabled="editBool"
              ></form-select>
            </div>
          </el-form-item>

          <el-form-item label="领用说明：" prop="receiptInstructions">
            <el-input
              :disabled="editBool"
              type="textarea"
              rows="2"
              v-model="formData.receiptInstructions"
              class="w645"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              :disabled="editBool"
              type="textarea"
              rows="2"
              v-model="formData.remark"
              class="w645"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span v-if="classify === 'edit'" slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="warning" @click="submitFn('editing')">
          保 存
        </el-button>
        <el-button size="small" type="primary" @click="submitFn('approving')">
          提 交
        </el-button>
      </span>
      <span v-if="classify === 'review'" slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" @click="submitFn('returned')" type="warning"
          >退 回</el-button
        >
        <el-button size="small" @click="submitFn('passed')" type="primary"
          >审 批</el-button
        >
      </span>
    </el-dialog>
    <uav-list
      ref="uavList"
      :dialogTitle="uavData.listTitle"
      :searchParams="uavData.searchParams"
      :filter="uavData.filter"
      :urlParams="uavData.urlParams"
      :tableItems="uavData.tableItems"
      @callBackFn="uavListBackFn"
    ></uav-list>
    <uav-list
      ref="taskList"
      :dialogTitle="taskData.listTitle"
      :searchParams="taskData.searchParams"
      :filter="taskData.filter"
      :urlParams="taskData.urlParams"
      :tableItems="taskData.tableItems"
      @callBackFn="taskListBackFn"
    ></uav-list>
    <uav-list
      ref="uavPeopleList"
      :dialogTitle="uavPeopleData.listTitle"
      :searchParams="uavPeopleData.searchParams"
      :filter="uavPeopleData.filter"
      :urlParams="uavPeopleData.urlParams"
      :tableItems="uavPeopleData.tableItems"
      @callBackFn="uavPeopleBackFn"
    ></uav-list>
  </div>
</template>

<script>
import FormSelect from "@/pages/common/formComponents/FormSelect";
import uavList from "./uavList";
export default {
  name: "exportPathsView",
  data() {
    return {
      uavData: {
        listTitle: "无人机列表",
        searchParams: [
          {
            label: "无人机类别：",
            type: "select",
            modal: "planeUavType",
            option: [
              {
                name: "固定翼无人机",
                val: "固定翼无人机",
              },
              {
                name: "旋翼无人机",
                val: "旋翼无人机",
              },
            ],
          },
          {
            label: "设备状态：",
            type: "select",
            modal: "status",
            option: [
              {
                name: "正常",
                val: "normal",
              },
              {
                name: "维修",
                val: "repair",
              },
              {
                name: "工作中",
                val: "working",
              },
              {
                name: "退休",
                val: "retired",
              },
            ],
          },
        ],
        filter: {
          planeUavType: "",
          status: "",
        },
        urlParams: {
          url: "/tpiim/uavEquipment/getUavEquipmentList",
          type: "post",
        },
        tableItems: [
          {
            prop: "uavName",
            label: "无人机名称",
          },
          {
            prop: "planeUavType",
            label: "无人机类别",
          },
          {
            prop: "uavModelName",
            label: "型号名称",
          },
          {
            prop: "unitName",
            label: "单位名称",
          },
          {
            prop: "statusName",
            label: "设备状态",
          },
        ],
      },
      taskData: {
        listTitle: "任务列表",
        searchParams: [
          {
            label: "线路名称：",
            type: "input",
            modal: "lineName",
          },
          {
            label: "巡视方式：",
            type: "select",
            modal: "ispMode",
            option: [
              {
                name: "无人机巡视",
                val: "uav",
              },
              {
                name: "常规巡视",
                val: "artificial",
              },
            ],
          },
          {
            label: "巡视任务状态：",
            type: "select",
            modal: "dataStatus",
            option: [
              {
                name: "待发布",
                val: "0",
              },
              {
                name: "已发布",
                val: "1",
              },
              {
                name: "执行中",
                val: "2",
              },
              {
                name: "执行完成",
                val: "3",
              },
            ],
          },
        ],
        filter: {
          lineName: "",
          ispMode: "",
          dataStatus: "",
        },
        urlParams: {
          url: "/tpiim/ptmiInsTask/getInsTaskList",
          type: "post",
        },
        tableItems: [
          {
            prop: "taskName",
            label: "任务名称",
            width: "180",
          },
          {
            prop: "ispTypeName",
            label: "巡视类型",
          },
          {
            prop: "ispModeName",
            label: "巡视方式",
          },
          {
            prop: "lineName",
            label: "巡视线路",
          },
          {
            prop: "volLevelName",
            label: "电压等级",
          },
          {
            prop: "cityName",
            label: "地市",
          },
          {
            prop: "planIspDate",
            label: "计划巡视日期",
            time: true,
            width: "180",
          },
          {
            prop: "dataStatusName",
            label: "状态",
          },
        ],
      },
      uavPeopleData: {
        listTitle: "领用人列表",
        searchParams: [
          {
            label: "姓名：",
            type: "input",
            modal: "staffName",
          },
        ],
        filter: {
          staffName: "",
        },
        urlParams: {
          url: "/tpiim/sysUser/getUserList",
          type: "post",
        },
        tableItems: [
          {
            prop: "staffName",
            label: "姓名",
            width: "100",
          },
          {
            prop: "staffSex",
            label: "性别",
          },
          {
            prop: "deptName",
            label: "所属部门",
          },
          {
            prop: "orgName",
            label: "所属单位",
          },
        ],
      },
      formData: {
        objId: "",
        taskName: "",
        uavId: "",
        uavName: "",
        receiptUserId: "",
        receiptUserName: "",
        receiptTimeObj: "",
        receiptInstructions: "",
        uavReceiptState: "",
        registrantUserId: "",
        registrantTime: "",
        cityId: "",
        cityName: "",
        remark: "",
      },
      formType: "",
      editBool: false,
      dialogVisible: false,
      dialogTitle: "",
      tableLoading: false,
      tableData: [],
      classify: "edit",
      formReviewData: {
        pathId: "",
        pathStatus: "",
        remarks: "",
      },
      formRules: {
        taskName: [
          { required: true, message: "请选择巡视任务", trigger: "change" },
        ],
        uavName: [
          { required: true, message: "请选择无人机", trigger: "change" },
        ],
        receiptUserName: [
          { required: true, message: "请选择领用人", trigger: "change" },
        ],
        receiptTimeObj: [
          { required: true, message: "请选择领用时间", trigger: "change" },
        ],
        receiptInstructions: [
          { required: true, message: "请输入领用说明", trigger: "blur" },
        ],
        cityId: [
          { required: true, message: "请选择所属城市", trigger: "change" },
        ],
      },
    };
  },
  components: {
    uavList,
    FormSelect,
  },
  methods: {
    initFn(row) {
      this.dialogVisible = true;
      if (row) {
        this.formType = "edit";
        row.receiptTimeObj = row.receiptTime;
        this.formData = { ...row };
        if (
          row.uavReceiptState === "editing" ||
          row.uavReceiptState === "returned"
        ) {
          //编辑中，已退回
          this.editBool = false;
          this.classify = "edit";
        } else if (row.uavReceiptState === "approving") {
          //审批中
          this.editBool = true;
          this.classify = "review";
        } else if (
          row.uavReceiptState === "completed" ||
          row.uavReceiptState === "passed" ||
          row.uavReceiptState === "backing"
        ) {
          // 已通过，已归还
          this.editBool = true;
          this.classify = "";
        }
      } else {
        this.editBool = false;
        this.classify = "edit";
        this.formType = "add";
        this.resetFormFn();
      }
    },
    resetFormFn() {
      this.$nextTick(() => {
        this.formData = {
          objId: "",
          taskName: "",
          uavId: "",
          uavName: "",
          receiptUserId: "",
          receiptUserName: "",
          receiptTime: "",
          receiptTimeObj: "",
          receiptInstructions: "",
          uavReceiptState: "",
          registrantUserId: "",
          registrantTime: "",
          cityId: "",
          cityName: "",
          remark: "",
        };
        this.$refs.ruleForm.resetFields();
      });
    },
    submitFn(type) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm("确定操作吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (!this.formData.receiptTime) {
              this.formData.receiptTime = this.formData.receiptTimeObj.getTime();
            }
            if (
              this.formData.uavReceiptState === "returned" &&
              type === "editing"
            ) {
              this.formData.uavReceiptState = "returned";
            } else {
              this.formData.uavReceiptState = type;
            }
            let pathType = "";
            if (this.formType === "add") {
              pathType = "createUavReceipt";
            } else {
              pathType = "updateUavReceipt";
            }
            $axios({
              url: "/tpiim/uavReceipt/" + pathType,
              type: "post",
              data: this.formData,
            })
              .then((data) => {
                this.dialogVisible = false;
                this.$emit("callBackFn");
                this.$message({
                  message: data.resultHint,
                  type: data.successful ? "success" : "error",
                });
              })
              .catch((error) => {
                this.dialogVisible = false;
              });
          });
        }
      });
    },
    uavFn() {
      this.$refs.uavList.initFn();
    },
    uavPeopleFn() {
      this.$refs.uavPeopleList.initFn();
    },
    uavListBackFn(row) {
      this.formData.uavId = row.id;
      this.formData.uavName = row.uavName;
    },
    taskFn() {
      this.$refs.taskList.initFn();
    },
    taskListBackFn(row) {
      this.formData.objId = row.objId;
      this.formData.taskName = row.taskName;
    },
    uavPeopleBackFn(row) {
      this.formData.receiptUserId = row.objId;
      this.formData.receiptUserName = row.staffName;
    },
    selectBackFn(data) {
      this.formData.cityId = data.code;
      this.formData.cityName = data.name;
    },
  },
};
</script>
<style lang='less' scoped>
.search-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.w150 {
  width: 150px;
}
.w250 {
  width: 250px;
}
.w645 {
  width: 645px;
}
</style>
