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
        label="菜单名称:"
        :label-width="formLabelWidth"
        prop="resName"
        size="small"
      >
        <el-input placeholder="请填写菜单名称" v-model="form.resName">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="资源图标:"
        :label-width="formLabelWidth"
        prop="resIcon"
        size="small"
      >
        <el-input placeholder="请填写资源图标" v-model="form.resIcon">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="菜单级别:"
        :label-width="formLabelWidth"
        prop="orderNo"
        size="small"
      >
        <el-input placeholder="请填写菜单级别" v-model="form.orderNo">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="页面地址:"
        :label-width="formLabelWidth"
        prop="defaultUrl"
        size="small"
      >
        <el-input placeholder="请填写页面地址" v-model="form.defaultUrl">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="父级菜单:"
        :label-width="formLabelWidth"
        prop="menu"
        size="small"
      >
        <el-input
          placeholder="请选择父级菜单"
          readonly
          @focus="showMenuTable"
          suffix-icon="el-icon-search"
          v-model="form.menu"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="备注:"
        :label-width="formLabelWidth"
        prop="remark"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.remark"
        />
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
  name: "me",
  components: {
    publicDialogMulti
  },
  data() {
    let validateMenuName = (rule, value, callback) => {
      if (!this.form.menu) {
        callback(new Error("请选择父级菜单"));
      } else {
        callback();
      }
    };
    return {
      form: { menuName: "" },
      title: "",
      visible: false,
      formLabelWidth: "120px",
      fieldRules: {
        resName: [
          {
            required: true,
            message: "请填写菜单名称",
            trigger: "blur"
          }
        ],
        resIcon: [
          {
            required: true,
            message: "请填写资源图标",
            trigger: "blur"
          }
        ],
        orderNo: [
          {
            required: true,
            message: "请填写菜单级别",
            trigger: "blur"
          }
        ],
        defaultUrl: [
          {
            required: true,
            message: "请填写页面地址",
            trigger: "blur"
          }
        ],
        menu: [
          {
            required: true,
            validator: validateMenuName,
            trigger: "change"
          }
        ],
        remark: [
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
    setData(title, form) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      if (form.objId) {
        this.form.menu = this.form.menuList.join(",");
      }
      this.visible = true;
    },
    update(val, row) {
      if (val === "menu") {
        this.form.pId = [];
        this.form.menuName = [];
        let menu = "";
        for (let key in row) {
          this.form.pId.push(row[key].objId);
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
      this.form = { menuName: "" };
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
            const url = "/lilianjin/sysMenu/createSysMenu";
            this.handle(url, data);
          } else {
            const url = "/lilianjin/sysMenu/updateSysMenu";
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
