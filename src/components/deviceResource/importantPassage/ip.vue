<template>
  <div>
    <el-dialog
      :title="title"
      :before-close="handleClose"
      :visible.sync="visible"
    >
      <el-form
        :model="form"
        :rules="fieldRules"
        ref="form"
        style=" display:flex;
                            flex-wrap:wrap;
                            flex-direction:row;
                            align-content:flex-start;
                            width:100%"
      >
        <el-form-item
          style="width:50%"
          label="通道名称:"
          :label-width="formLabelWidth"
          prop="passagewayName"
          size="small"
        >
          <el-input
            v-model="form.passagewayName"
            placeholder="请填写通道名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          style="width:50%"
          label="等级条件:"
          :label-width="formLabelWidth"
          prop="passagewayLevel"
          size="small"
        >
          <el-input
            v-model="form.passagewayLevel"
            placeholder="请填写等级条件"
          ></el-input>
        </el-form-item>

        <el-form-item
          style="width:50%"
          label="所属线路:"
          :label-width="formLabelWidth"
          prop="pLine"
          size="small"
        >
          <el-input
            readonly
            placeholder="请选择所属线路"
            @focus="showLineTable"
            suffix-icon="el-icon-search"
            v-model="form.pLine"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          style="width:50%"
          label="运维单位:"
          :label-width="formLabelWidth"
          prop="maintainUnitname"
          size="small"
        >
          <el-input
            readonly
            v-model="form.maintainUnitname"
            placeholder="请填写单位名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          style="width:50%"
          label="所属地市"
          :label-width="formLabelWidth"
          prop="cityName"
          size="small"
        >
          <el-input
            readonly
            v-model="form.cityName"
            placeholder="请填写所属地市"
          ></el-input>
        </el-form-item>

        <el-form-item
          style="width:100%"
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
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleClose">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleCreate"
          >确 定</el-button
        >
      </div>
      <publicDialog ref="line" @callBackFn="update"> </publicDialog>
    </el-dialog>
  </div>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "ip",
  components: {
    publicDialog
  },
  data() {
    let validateLineName = (rule, value, callback) => {
      if (!this.form.pLine) {
        callback(new Error("请选择所属线路"));
      } else {
        callback();
      }
    };
    return {
      form: { pLine: "" },
      formLabelWidth: "120px",
      visible: false,
      title: "",
      //向子件传递的数据
      fieldRules: {
        passagewayName: [
          {
            required: true,
            message: "请填写重要通道名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        passagewayLevel: [
          {
            required: true,
            message: "请填写通道等级条件",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        pLine: [
          {
            required: true,
            validator: validateLineName,
            trigger: "change"
          }
        ],
        remark: [
          {
            required: false,
            message: "请填写备注",
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
    setData(title, form) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.visible = true;
    },
    update(val, row) {
      if (val === "line") {
        this.form.pLineId = row.pmsId;
        this.form.pLine = row.lineName;
        this.form.maintainUnitname = row.maintainTeamname;
        this.form.maintainUnit = row.maintainTeam;
        this.form.cityId = row.cityId;
        this.form.cityName = row.cityName;
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { pLine: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form
          };
          if (data.passagewayId) {
            const url = "tpiim/passageway/updatePassageway";
            this.handle(url, data);
          } else {
            const url = "tpiim/passageway/createPassageway";
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
