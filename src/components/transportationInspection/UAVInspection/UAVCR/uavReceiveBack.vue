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
          <el-form-item label="所属巡视任务：">
            <el-input
              :disabled="true"
              class="w250"
              size="small"
              v-model="formData.taskName"
            ></el-input>
          </el-form-item>

          <el-form-item label="无人机装备：">
            <el-input
              :disabled="true"
              class="w250"
              size="small"
              v-model="formData.uavName"
            ></el-input>
          </el-form-item>

          <el-form-item label="归还人：" prop="returnUserName">
            <el-input
              :disabled="editBool"
              readonly
              class="w250"
              suffix-icon="el-icon-search"
              size="small"
              v-model="formData.returnUserName"
              placeholder="请选择归还人"
              @focus="uavPeopleFn"
            ></el-input>
          </el-form-item>

          <el-form-item label="归还时间：" prop="returnTimeObj">
            <el-date-picker
              :disabled="editBool"
              v-model="formData.returnTimeObj"
              type="datetime"
              class="w250"
              size="small"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="所属地市：">
            <el-input
              :disabled="true"
              class="w250"
              size="small"
              v-model="formData.cityName"
            ></el-input>
          </el-form-item>

          <el-form-item label="归还说明：" prop="returnInstructions">
            <el-input
              :disabled="editBool"
              type="textarea"
              rows="2"
              v-model="formData.returnInstructions"
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
        <el-button size="small" type="primary" @click="submitFn('confirming')">
          提 交
        </el-button>
      </span>
      <span v-if="classify === 'review'" slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" @click="submitFn('returned')" type="warning"
          >退 回</el-button
        >
        <el-button size="small" @click="submitFn('confirmed')" type="primary"
          >审 批</el-button
        >
      </span>
    </el-dialog>
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
import uavList from "./uavList";
export default {
  name: "exportPathsView",
  data() {
    return {
      formData: {
        objId: "",
        taskName: "",
        uavId: "",
        uavName: "",
        returnUserId: "",
        returnUserName: "",
        returnTime: "",
        returnTimeObj: "",
        returnInstructions: "",
        uavReturnState: "",
        registrantUserId: "",
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
      formRules: {
        returnUserName: [
          { required: true, message: "请选择归还人", trigger: "change" },
        ],
        returnTimeObj: [
          { required: true, message: "请选择归还时间", trigger: "change" },
        ],
        returnInstructions: [
          { required: true, message: "请输入归还说明", trigger: "blur" },
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
    };
  },
  components: {
    uavList,
  },
  methods: {
    initFn(row, type) {
      this.dialogVisible = true;
      this.formType = type;
      if (type === "edit") {
        this.formData = { ...row };
        this.formData.returnTimeObj = row.returnTime;
        if (
          row.uavReturnState === "editing" ||
          row.uavReturnState === "returned"
        ) {
          //编辑中，已退回
          this.editBool = false;
          this.classify = "edit";
        } else if (row.uavReturnState === "confirming") {
          //审批中
          this.editBool = true;
          this.classify = "review";
        } else if (row.uavReturnState === "confirmed") {
          // 已通过
          this.editBool = true;
          this.classify = "";
        }
      } else {
        this.editBool = false;
        this.classify = "edit";
        this.formData.objId = row.objId;
        this.formData.taskName = row.taskName;
        this.formData.uavId = row.uavId;
        this.formData.uavName = row.uavName;
        this.formData.cityId = row.cityId;
        this.formData.cityName = row.cityName;
        this.formData.uavReceiptId = row.uavReceiptId;
      }
    },
    submitFn(type) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm("确定操作吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (typeof this.formData.returnTimeObj === "object") {
              this.formData.returnTime = this.formData.returnTimeObj.getTime();
            }
            if (
              this.formData.uavReturnState === "returned" &&
              type === "editing"
            ) {
              this.formData.uavReturnState = "returned";
            } else {
              this.formData.uavReturnState = type;
            }
            let pathType = "";
            if (this.formType === "add") {
              pathType = "createUavReturn";
            } else {
              pathType = "updateUavReturn";
            }
            $axios({
              url: "/tpiim/uavReturn/" + pathType,
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
    uavPeopleFn() {
      this.$refs.uavPeopleList.initFn();
    },
    uavPeopleBackFn(row) {
      this.formData.returnUserId = row.objId;
      this.formData.returnUserName = row.staffName;
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
.w250 {
  width: 250px;
}
.w645 {
  width: 645px;
}
</style>
