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
          style="width: 50%"
          label="巡视方式:"
          :label-width="formLabelWidth"
          prop="ispMode"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.ispMode"
            placeholder="请选择巡视方式"
          >
            <el-option
              v-for="(item, index) in dropDown.ispMode"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="线路重要等级:"
          :label-width="formLabelWidth"
          prop="lineDegree"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.lineDegree"
            placeholder="请选择线路重要等级"
          >
            <el-option
              v-for="(item, index) in dropDown.lineDegree"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="线路编码集合:"
          :label-width="formLabelWidth"
          prop="lineCodeName"
          size="small"
        >
          <el-input
            type="textarea"
            autosize
            readonly
            @focus="showLineTable"
            placeholder="请选择线路编码集合"
            suffix-icon="el-icon-search"
            v-model="form.lineCodeName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="所属地市:"
          :label-width="formLabelWidth"
          prop="city"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.city"
            placeholder="请选择所属地市"
          >
            <el-option
              v-for="(item, index) in dropDown.city"
              :key="index"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="巡视周期(天):"
          :label-width="formLabelWidth"
          prop="ispCycle"
          size="small"
        >
          <el-input-number
            style="width: 100%"
            v-model="form.ispCycle"
            :min="1"
            label="请填写巡视周期"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="提前预警天数:"
          :label-width="formLabelWidth"
          prop="preWarningDays"
          size="small"
        >
          <el-input-number
            style="width: 100%"
            v-model="form.preWarningDays"
            :min="1"
            label="请填写提前预警天数"
          ></el-input-number>
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
      <publicDialogMulti ref="line" @callBackFn="update"> </publicDialogMulti>
    </el-dialog>
  </div>
</template>
<script>
import publicDialogMulti from "@/pages/public/publicDialogMulti.vue";
export default {
  name: "ic",
  components: {
    publicDialogMulti
  },
  data() {
    let validateLineCodeName = (rule, value, callback) => {
      if (!this.form.lineCodeName) {
        callback(new Error("请选择线路编码集合"));
      } else {
        callback();
      }
    };
    return {
      form: {lineCodeName:""},
      formLabelWidth: "120px",
      visible: false,
      title: "",

      dropDown: {
        ispMode: [],
        lineDegree: [],
        city: [],
        volLevel: []
      },
      //向子件传递的数据
      fieldRules: {
        ispMode: [
          {
            required: true,
            message: "请选择巡视方式",
            trigger: "change"
          }
        ],
        ispCycle: [
          {
            required: true,
            message: "请填写巡视周期",
            trigger: "blur"
          }
        ],
        preWarningDays: [
          {
            required: true,
            message: "请填写提前预警天数",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        lineDegree: [
          {
            required: true,
            message: "请选择线路重要等级",
            trigger: "change"
          }
        ],
        lineCodeName: [
          {
            required: true,
            validator: validateLineCodeName,
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
    update(val, row) {
      if (val === "line") {
        let lineCodeName = "",
          lineCode = [];
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            lineCodeName += row[i].lineName + ",";
            lineCode.push(row[i].lineCode);
          }
        }
        this.form.lineCode = lineCode;
        this.form.lineCodeName = lineCodeName.substr(
          0,
          lineCodeName.lastIndexOf(",")
        );
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    setData(title, form, dropDown) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({...this.form,...form}));
      this.dropDown = JSON.parse(JSON.stringify(dropDown));
      this.visible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form =  {lineCodeName:""};
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ispType: this.form.ispMode,
            ...this.form
          };
          const url = "/tpiim/selfInsCycle/add";
          this.handle(url, data);
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
