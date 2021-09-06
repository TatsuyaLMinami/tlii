<template>
  <el-dialog
    class="baseStyle"
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    append-to-body
  >
    <el-form
      :model="form"
      ref="form"
      :rules="fieldRules"
      style="
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                width: 100%;
            "
    >
      <el-form-item
        style="width:50%"
        :label="form.labelD"
        :label-width="formLabelWidth"
        prop="department"
        size="small"
      >
        <el-input
          :placeholder="form.tipD"
          readonly
          @focus="showDepartmentTable"
          suffix-icon="el-icon-search"
          v-model="form.department"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        :label="form.labelP"
        :label-width="formLabelWidth"
        prop="person"
        size="small"
      >
        <el-input
          :placeholder="form.tipP"
          readonly
          @focus="showPersonTable"
          suffix-icon="el-icon-search"
          v-model="form.person"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        :label="form.labelT"
        :label-width="formLabelWidth"
        prop="time"
        size="small"
      >
        <el-date-picker
          :picker-options="pickerOptions"
          style="width:100%;"
          size="small"
          v-model="form.time"
          value-format="timestamp"
          type="datetime"
          :placeholder="form.tipT"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width:100%"
        :label="form.labelC"
        :label-width="formLabelWidth"
        prop="com"
        size="small"
      >
        <el-input
          type="textarea"
          maxlength="200"
          show-word-limit
          v-model="form.com"
          :placeholder="form.tipC"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialog @callBackFn="update" ref="person"> </publicDialog>
    <publicDialog @callBackFn="update" ref="department"> </publicDialog>
  </el-dialog>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog";
export default {
  name: "al",
  components: {
    publicDialog
  },
  data() {
    let validatePerson = (rule, value, callback) => {
      if (!this.form.person) {
        callback(new Error("请选择人员"));
      } else {
        callback();
      }
    };
    let validateDepartment = (rule, value, callback) => {
      if (!this.form.department) {
        callback(new Error("请选择部门"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      form: { person: "", department: "" },
      formLabelWidth: "120px",
      title: "",
      type: "",
      visible: false,
      fieldRules: {
        person: [
          {
            required: true,
            validator: validatePerson,
            trigger: "change"
          }
        ],
        department: [
          {
            required: true,
            validator: validateDepartment,
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        com: [
          {
            required: true,
            message: "请填写措施",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    update(val, row) {
      if (val === "department") {
        this.form.department = row.deptName;
        if (this.type === "close") {
          this.form.dStaffDept = row.objId;
          this.form.dStaffDeptName = row.deptName;
        } else {
          this.form.pusherDept = row.objId;
          this.form.pusherDeptName = row.deptName;
        }
      }
      if (val === "person") {
        this.form.person = row.staffName;
        if (this.type === "close") {
          this.form.dStaff = row.objId;
          this.form.dStaffName = row.staffName;
        } else {
          this.form.pusher = row.objId;
          this.form.pusherName = row.staffName;
        }
      }
    },
    showPersonTable() {
      this.$refs.person.setDialogType("person");
    },
    showDepartmentTable() {
      this.$refs.department.setDialogType("department");
    },
    setData(title,form, type) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.type = type;
      if (type === "close") {
        this.form["labelD"] = "处理部门:";
        this.form["tipD"] = "请选择处理部门";
        this.form["labelP"] = "处理人员:";
        this.form["tipP"] = "请选择处理人员";
        this.form["labelT"] = "处理时间:";
        this.form["tipT"] = "请选择处理时间";
        this.form["labelC"] = "处理措施:";
        this.form["tipC"] = "请填写处理措施";
      } else {
        this.form["labelD"] = "推送部门:";
        this.form["tipD"] = "请选择推送部门";
        this.form["labelP"] = "推送人员:";
        this.form["tipP"] = "请选择推送人员";
        this.form["labelT"] = "推送时间:";
        this.form["tipT"] = "请选择推送时间";
        this.form["labelC"] = "推送措施:";
        this.form["tipC"] = "请填写推送措施";
      }
      this.visible = true;
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { person: "", department: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var data = {},
            url = "";
          if (this.type === "close") {
            data = {
              ...this.form,
              dAlarmTime: this.form.time,
              alarmCom: this.form.com
            };
            url = "/tpiim/monitoringAlarm/closeAlarm";
          } else {
            data = {
              ...this.form,
              pushTime: this.form.time,
              pushCom: this.form.com
            };
            url = "/tpiim/monitoringAlarm/pushAlarm";
          }
          $axios({ url: url, type: "post", data: data })
            .then(res => {
              if (res.successful) {
                this.$message.success(res.resultHint);
                this.handleClose();
                this.$emit("updateData");
              } else {
                this.$message.error(res.resultHint);
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
