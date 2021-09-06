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
        label="归还单编号:"
        :label-width="formLabelWidth"
        prop="toolsReturnNum"
        size="small"
      >
        <el-input
          v-model="form.toolsReturnNum"
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
          @change="getReceipt"
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
        label="所属领用单:"
        :label-width="formLabelWidth"
        prop="toolsReceiptId"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.toolsReceiptId"
          placeholder="请选择所属领用单"
          @change="loadTools"
        >
          <el-option
            v-for="(item, index) in dropDown.toolsReceipt"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="归还人:"
        :label-width="formLabelWidth"
        prop="returnUserId"
        size="small"
      >
        <el-input
          v-model="form.returnUserId"
          placeholder="请填写归还人"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="归还时间:"
        :label-width="formLabelWidth"
        prop="returnTime"
        size="small"
      >
        <el-date-picker
          style="width: 100%"
          v-model="form.returnTime"
          align="right"
          value-format="timestamp"
          type="datetime"
          placeholder="选择归还时间"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="归还工器具:"
        :label-width="formLabelWidth"
        prop="toolsName"
        size="small"
      >
        <el-input
          type="textarea"
          autosize
          placeholder="请选择归还工器具"
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
          readonly
          v-if="form.cityName"
          v-model="form.cityName"
          placeholder="所属地市"
        ></el-input>
        <el-input
          readonly
          v-else
          v-model="userData.cityName"
          placeholder="所属地市"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="归还说明:"
        :label-width="formLabelWidth"
        prop="returnInstructions"
        size="small"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容,最多200字"
          v-model="form.returnInstructions"
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
        callback(new Error("请选择归还工器具"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      title: "",
      toolsId: "",
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
        toolsReturnNum: [
          {
            required: true,
            message: "请填写归还单编号",
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
        toolsReceiptId: [
          {
            required: true,
            message: "请选择所属的领用单",
            trigger: "change"
          }
        ],
        returnUserId: [
          {
            required: true,
            message: "请填写归还人",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        returnTime: [
          {
            required: true,
            message: "请选择归还日期",
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
        returnInstructions: [
          {
            required: true,
            message: "请填写归还说明",
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
      this.$refs.tool.setDialogType("tool", this.toolsId);
    },
    handleClose() {
      this.form = { toolsName: "" };
      this.$refs.form.resetFields();
      this.visible = false;
    },
    getReceipt(item) {
      let url = "/tpiim/toolsReceipt/getInsTaskByTaskIdDict";
      $axios({
        url: url,
        type: "post",
        data: { objectId: item }
      })
        .then(data => {
          if (data.successful) {
            this.form.toolsName = "";
            this.form.toolsId = "";
            this.dropDown.toolsReceipt = data.resultValue;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadTools(objectId) {
      this.form.toolsName = "";
      this.form.toolsId = "";
      let url = "/tpiim/toolsReceipt/getToolsReceipt";
      $axios({
        url: url,
        type: "post",
        data: objectId
      })
        .then(data => {
          if (data.successful) {
            this.toolsId = data.resultValue.toolsId;
            this.$refs.tool.setDialogType("tool", data.resultValue.toolsId);
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let url = "",
            data = {};
          if (this.form.toolsReturnId) {
            data = {
              toolsReturnState: "0",
              ...this.form
            };
            url = "/tpiim/toolsReturn/createToolsReturn";
            this.handle(url, data);
          } else {
            data = {
              toolsReturnState: "0",
              ...this.form,
              ...this.userData
            };
            url = "/tpiim/toolsReturn/createToolsReturn";
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
