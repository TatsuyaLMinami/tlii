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
        prop="roleName"
        size="small"
      >
        <el-input placeholder="请填写角色名称" v-model="form.roleName">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="角色编码:"
        :label-width="formLabelWidth"
        prop="roleCode"
        size="small"
      >
        <el-input placeholder="请填写角色编码" v-model="form.roleCode">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="角色级别:"
        :label-width="formLabelWidth"
        prop="roleLevel"
        size="small"
      >
        <el-input placeholder="请填写角色级别" v-model="form.roleLevel">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="角色主页:"
        :label-width="formLabelWidth"
        prop="roleJsp"
        size="small"
      >
        <el-input placeholder="请填写角色主页" v-model="form.roleJsp">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="分配菜单:"
        :label-width="formLabelWidth"
        prop="menu"
        size="small"
      >
        <el-input
          placeholder="请分配菜单"
          readonly
          @focus="showMenuTable"
          suffix-icon="el-icon-search"
          v-model="form.menu"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialogMulti ref="menu" @callBackFn="update"> </publicDialogMulti>
  </el-dialog>
</template>

<script>
import publicDialogMulti from "@/pages/public/publicDialogMulti.vue";
export default {
  name: "ro",
  components: {
    publicDialogMulti
  },
  data() {
    let validateMenuName = (rule, value, callback) => {
      if (!this.form.menu) {
        callback(new Error("请分配菜单"));
      } else {
        callback();
      }
    };
    return {
      form: { menu: "" },
      title: "",
      visible: false,
      formLabelWidth: "120px",
      fieldRules: {
        roleName: [
          {
            required: true,
            message: "请填写角色名称",
            trigger: "blur"
          }
        ],
        roleCode: [
          {
            required: true,
            message: "请填写角色编码",
            trigger: "blur"
          }
        ],
        roleLevel: [
          {
            required: true,
            message: "请填写角色级别",
            trigger: "blur"
          }
        ],
        roleJsp: [
          {
            required: true,
            message: "请填写角色主页",
            trigger: "blur"
          }
        ],
        menu: [
          {
            required: true,
            validator: validateMenuName,
            trigger: "change"
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
        this.form.menu = this.form.menuList.join(",");;
      }
      this.visible = true;
    },
    update(val, row) {
      if (val === "menu") {
        this.form.resId = [];
        this.form.menuName = [];
        let menu = "";
        for (let key in row) {
          this.form.resId.push(row[key].objId);
          this.form.menuName.push(row[key].resName);
          menu += row[key].resName + ",";
        }
        this.form.menu = menu.substr(0, menu.lastIndexOf(","));
      }
    },
    showMenuTable() {
      this.$refs.menu.setDialogType("menu");
    },
    handleClose() {
      this.form = { menu: "" };
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
            const url = "/lilianjin/sysRole/updateSysRole";
            this.handle(url, data);
          } else {
            const url = "/lilianjin/sysRole/createSysRole";
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
