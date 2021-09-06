<template>
  <el-dialog :title="title" :before-close="handleClose" :visible.sync="visible">
    <el-form
      :model="form"
      :rules="fieldRules"
      ref="form"
      style=" display:flex;
                            flex-wrap:wrap;
                            flex-direction:row;
                            align-content:flex-start;
                            width:100%;"
    >
      <el-form-item
        style="width: 50%"
        label="姓名:"
        :label-width="formLabelWidth"
        prop="staffName"
        size="small"
      >
        <el-input placeholder="请填写姓名" v-model="form.staffName"> </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="性别:"
        prop="staffSex"
        size="small"
        :label-width="formLabelWidth"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.staffSex"
          placeholder="请选择性别"
        >
          <el-option value="男" label="男"> </el-option>
          <el-option value="女" label="女"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="角色:"
        :label-width="formLabelWidth"
        prop="role"
        size="small"
      >
        <el-input
          placeholder="请选择角色"
          readonly
          @focus="showRoleTable"
          suffix-icon="el-icon-search"
          v-model="form.role"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属部门:"
        :label-width="formLabelWidth"
        prop="deptName"
        size="small"
      >
        <el-input
          placeholder="请选择所属部门"
          readonly
          @focus="showDepartmentTable"
          suffix-icon="el-icon-search"
          v-model="form.deptName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="账户名称:"
        :label-width="formLabelWidth"
        prop="account"
        size="small"
      >
        <el-input placeholder="请填写账户名称" v-model="form.account">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="登录密码:"
        :label-width="formLabelWidth"
        prop="password"
        size="small"
      >
        <el-input placeholder="请填写登录密码" v-model="form.password">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="手机号码:"
        :label-width="formLabelWidth"
        prop="telphone"
        size="small"
      >
        <el-input placeholder="请填写手机号码" v-model="form.telphone">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="身份证号:"
        :label-width="formLabelWidth"
        prop="cardId"
        size="small"
      >
        <el-input placeholder="请填写身份证号" v-model="form.cardId">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="员工编号:"
        :label-width="formLabelWidth"
        prop="userNo"
        size="small"
      >
        <el-input placeholder="请填写员工编号" v-model="form.userNo">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="是否有效:"
        :label-width="formLabelWidth"
        prop="isEffective"
        size="small"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.isEffective"
          placeholder="请选择是否有效"
        >
          <el-option value="是" label="是"> </el-option>
          <el-option value="否" label="否"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="是否撤销:"
        :label-width="formLabelWidth"
        prop="isCancel"
        size="small"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.isCancel"
          placeholder="请选择是否撤销"
        >
          <el-option value="是" label="是"> </el-option>
          <el-option value="否" label="否"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="用户级别:"
        :label-width="formLabelWidth"
        prop="orderNo"
        size="small"
      >
        <el-input placeholder="请填写用户级别" v-model="form.orderNo">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialog ref="department" @callBackFn="update"> </publicDialog>
    <publicDialogMulti ref="role" @callBackFn="update"> </publicDialogMulti>
  </el-dialog>
</template>

<script>
import publicDialogMulti from "@/pages/public/publicDialogMulti.vue";
import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "pe",
  components: {
    publicDialog,
    publicDialogMulti
  },
  data() {
    let validateDeptName = (rule, value, callback) => {
      if (!this.form.deptName) {
        callback(new Error("请选择所属部门"));
      } else {
        callback();
      }
    };
    let validateRoleName = (rule, value, callback) => {
      if (!this.form.role) {
        callback(new Error("请选择角色"));
      } else {
        callback();
      }
    };
    return {
      form: { deptName: "", role: "" },
      title: "",
      visible: false,
      formLabelWidth: "120px",
      fieldRules: {
        staffName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur"
          }
        ],
        staffSex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        role: [
          {
            required: true,
            validator: validateRoleName,
            trigger: "change"
          }
        ],
        deptName: [
          {
            required: true,
            validator: validateDeptName,
            trigger: "change"
          }
        ],
        account: [
          {
            required: true,
            message: "请填写账户名称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写登录密码",
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: "blur"
          }
        ],
        cardId: [
          {
            required: true,
            message: "请填写身份证号",
            trigger: "blur"
          }
        ],
        userNo: [
          {
            required: true,
            message: "请填写员工编号",
            trigger: "blur"
          }
        ],
        isEffective: [
          {
            required: true,
            message: "请选择是否有效",
            trigger: "change"
          }
        ],
        isCancel: [
          {
            required: true,
            message: "请选择是否撤销",
            trigger: "change"
          }
        ],
        orderNo: [
          {
            required: false,
            message: "",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      if (form.objId) {
        this.form.role = this.form.roleList.join(",");
      }
      this.visible = true;
    },
    update(val, row) {
      if (val === "department") {
        this.form.deptId = row.objId;
        this.form.deptName = row.deptName;
      }
      if (val === "role") {
        this.form.roleId = [];
        this.form.roleName = [];
        let role = "";
        for (let key in row) {
          this.form.roleId.push(row[key].objId);
          this.form.roleName.push(row[key].roleName);
          role += row[key].roleName + ",";
        }
        this.form.role = role.substr(0, role.lastIndexOf(","));
      }
    },
    showRoleTable() {
      this.$refs.role.setDialogType("role");
    },
    showDepartmentTable() {
      this.$refs.department.setDialogType("department");
    },
    handleClose() {
      this.form = { deptName: "", role: "" };
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form
          };
          if (data.objId) {
            const url = "/lilianjin/sysUser/updateSysUser";
            this.handle(url, data);
          } else {
            const url = "/lilianjin/sysUser/createSysUser";
            this.handle(url, data);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, data) {
      $axios({
        url: url,
        type: "post",
        data: data
      }).then(data => {
        if (data.successful) {
          this.$message.success(data.resultHint);
          this.$emit("updateData");
          this.handleClose();
        } else {
          this.$message.error(data.resultHint);
        }
      });
    }
  }
};
</script>
