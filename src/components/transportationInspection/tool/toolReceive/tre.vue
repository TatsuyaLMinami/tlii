<template>
  <el-dialog :title="title" :before-close="handleClose" :visible.sync="visible">
    <el-form
      :model="form"
      :rules="fieldRules"
      ref="form"
      style="
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    align-content: flex-start;
                    width: 100%;
                "
    >
      <el-form-item
        style="width: 50%"
        label="领用单编号:"
        :label-width="formLabelWidth"
        prop="toolsReceiptNum"
        size="small"
      >
        <el-input
          v-model="form.toolsReceiptNum"
          placeholder="请填写领用单编号"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属巡视任务:"
        :label-width="formLabelWidth"
        prop="objId"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.objId"
          placeholder="请选择所属巡视任务"
        >
          <el-option
            v-for="(item, index) in dropDown.insTasks"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="领用人:"
        :label-width="formLabelWidth"
        prop="receiptUserId"
        size="small"
      >
        <el-input
          v-model="form.receiptUserId"
          placeholder="请填写领用人"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="领用时间:"
        :label-width="formLabelWidth"
        prop="receiptTime"
        size="small"
      >
        <el-date-picker
          style="width: 100%"
          v-model="form.receiptTime"
          align="right"
          value-format="timestamp"
          type="datetime"
          placeholder="选择领用时间"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="领用工器具:"
        :label-width="formLabelWidth"
        prop="toolsName"
        size="small"
      >
        <el-input
          type="textarea"
          autosize
          placeholder="请选择领用工器具"
          readonly
          @focus="showToolTable"
          suffix-icon="el-icon-search"
          v-model="form.toolsName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属地市"
        :label-width="formLabelWidth"
        prop="cityName"
        size="small"
      >
        <el-input
          v-if="form.cityName"
          readonly
          v-model="form.cityName"
          placeholder="所属地市"
        ></el-input>
        <el-input
          v-else
          readonly
          v-model="userData.cityName"
          placeholder="所属地市"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="领用说明:"
        :label-width="formLabelWidth"
        prop="receiptInstructions"
        size="small"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容,最多200字"
          v-model="form.receiptInstructions"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="备注信息:"
        :label-width="formLabelWidth"
        prop="remark"
        size="small"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容,最多200字"
          v-model="form.remark"
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
    <publicDialogMulti ref="tool" @callBackFn="update"> </publicDialogMulti>
  </el-dialog>
</template>
<script>
import publicDialogMulti from "@/pages/public/publicDialogMulti.vue";
export default {
  name: "tre",
  components: {
    publicDialogMulti
  },
  data() {
    let validateToolName = (rule, value, callback) => {
      if (!this.form.toolsName) {
        callback(new Error("请选择领用工器具"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      title: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dropDown: {
        insTasks: []
      },
      userData: {},
      loading: false,
      form: { toolsName: "" },
      formLabelWidth: "120px",
      //向子件传递的数据
      fieldRules: {
        toolsReceiptNum: [
          {
            required: true,
            message: "请填写领用单编号",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        objId: [
          {
            required: true,
            message: "请选择所属巡视任务",
            trigger: "change"
          }
        ],
        receiptUserId: [
          {
            required: true,
            message: "请填写领用人",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        receiptTime: [
          {
            required: true,
            message: "请选择领用日期",
            trigger: "change"
          }
        ],
        toolsName: [
          {
            required: true,
            validator: validateToolName,
            trigger: "change"
          }
        ],
        receiptInstructions: [
          {
            required: true,
            message: "请填写领用说明",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        remark: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写0-200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form, dropDown, userData) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.dropDown = dropDown;
      this.userData = userData;
      this.visible = true;
    },
    update(val, row) {
      if (val === "tool") {
        let toolsName = "",
          toolsId = "";
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            toolsName += row[i].toolsName + ",";
            toolsId += row[i].toolsId + ",";
          }
        }
        this.form.toolsId = toolsId.substr(0, toolsId.lastIndexOf(","));
        this.form.toolsName = toolsName.substr(0, toolsName.lastIndexOf(","));
      }
    },
    showToolTable() {
      this.$refs.tool.setDialogType("tool");
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { toolsName: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let url = "",
            data = {};
          if (this.form.toolsReceiptId) {
            data = {
              toolsReceiptState: "0",
              ...this.form
            };
            url = "/tpiim/toolsReceipt/updateToolsReceipt";
            this.handle(url, data);
          } else {
            data = {
              toolsReceiptState: "0",
              ...this.form,
              ...this.userData
            };
            url = "/tpiim/toolsReceipt/createToolsReceipt";
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
