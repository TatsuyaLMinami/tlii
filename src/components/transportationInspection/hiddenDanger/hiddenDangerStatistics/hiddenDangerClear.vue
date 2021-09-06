<template>
  <el-dialog
    title="治理隐患"
    :before-close="handleClose"
    :visible.sync="visible"
    class="loadImage"
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
        label="处理人员:"
        :label-width="formLabelWidth"
        prop="handleStaffName"
        size="small"
      >
        <el-input
          placeholder="请选择处理人员"
          readonly
          @focus="showPersonTable"
          suffix-icon="el-icon-search"
          v-model="form.handleStaffName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="处理班组:"
        :label-width="formLabelWidth"
        prop="handleTeamname"
        size="small"
      >
        <el-input
          placeholder="请选择处理班组"
          readonly
          @focus="showTeamTable"
          suffix-icon="el-icon-search"
          v-model="form.handleTeamname"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="处理时间:"
        :label-width="formLabelWidth"
        prop="handleDate"
        size="small"
      >
        <el-date-picker
          :picker-options="pickerOptions"
          style="width:100%;"
          size="small"
          v-model="form.handleDate"
          value-format="timestamp"
          type="datetime"
          placeholder="请选择处理时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="登记时间:"
        :label-width="formLabelWidth"
        prop="regDate"
        size="small"
      >
        <el-input readonly v-model="form.regDate"></el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="排序号:"
        :label-width="formLabelWidth"
        prop="orderNoCopy"
        size="small"
      >
        <el-input
          v-model="form.orderNoCopy"
          placeholder="请填写排序号"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="登记人:"
        :label-width="formLabelWidth"
        prop="regStuffName"
        size="small"
      >
        <el-input readonly v-model="form.regStaffName"></el-input>
      </el-form-item>

      <el-form-item
        style="width:100%"
        label="遗留问题:"
        :label-width="formLabelWidth"
        prop="remainingProblem"
        size="small"
      >
        <el-input
          type="textarea"
          maxlength="200"
          show-word-limit
          v-model="form.remainQuestion"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width:100%"
        label="处理措施:"
        :label-width="formLabelWidth"
        prop="measureCom"
        size="small"
      >
        <el-input
          type="textarea"
          maxlength="200"
          show-word-limit
          v-model="form.measureCom"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width:100%;margin-bottom:0px;"
        label="治理图片:"
        size="small"
        :label-width="formLabelWidth"
      >
        <el-upload
          multiple
          style="display:flex;flex-wrap:wrap;"
          class="uploadResource"
          ref="upload"
          action=""
          :data="{}"
          :name="'files'"
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          accept=".jpg,.png,.JPG,.PNG,.jpeg,.JPEG"
          :on-exceed="onExceed"
          :limit="5"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
          <div
            slot="tip"
            style="width:100%;line-height:20px;margin-top:0px;"
            class="el-upload__tip"
          >
            只能上传jpg/png/jpeg文件，且每张不超过5mb,一次最多上传5张
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialog ref="person" @callBackFn="update"> </publicDialog>
    <publicDialog ref="team" @callBackFn="update"> </publicDialog>
  </el-dialog>
</template>
<script>
import axios from "axios";

import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "hiddenDangerClear",
  components: {
    publicDialog
  },
  data() {
    let validateHandleStaffName = (rule, value, callback) => {
      if (!this.form.handleStaffName) {
        callback(new Error("请选择处理人员"));
      } else {
        callback();
      }
    };
    let validateHandleTeamName = (rule, value, callback) => {
      if (!this.form.handleTeamName) {
        callback(new Error("请选择处理部门"));
      } else {
        callback();
      }
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      visible: false,
      title: "",
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      token: sessionStorage.getItem("token"),
      form: { handleStaffName: "", handleTeamname: "" },
      formLabelWidth: "120px",
      fileList: [],
      upload: true,
      fieldRules: {
        handleStaffName: [
          {
            required: true,
            validator: validateHandleStaffName,
            trigger: "change"
          }
        ],
        handleTeamname: [
          {
            required: true,
            validator: validateHandleTeamName,
            trigger: "change"
          }
        ],
        handleDate: [
          {
            required: true,
            message: "请选择处理时间",
            trigger: "change"
          }
        ],
        orderNoCopy: [
          {
            required: true,
            message: "请填写排序号",
            trigger: "blur"
          }
        ],
        remainingProblem: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        measureCom: [
          {
            required: true,
            message: "请填写处理措施",
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
    setData(form) {
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.visible = true;
    },
    update(val, row) {
      if (val === "team") {
        this.form.handleTeam = row.objId;
        this.form.handleTeamName = row.teamName;
      }
      if (val === "person") {
        this.form.handleStaffId = row.objId;
        this.form.handleStaffName = row.staffName;
      }
    },
    showTeamTable() {
      this.$refs.team.setDialogType("team");
    },
    showPersonTable() {
      this.$refs.person.setDialogType("person");
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
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.form = { handleStaffName: "", handleTeamname: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let fd = new FormData();
          let form = JSON.parse(JSON.stringify(this.form));
          if (
            new Date(form.handleDate).getTime() <
            new Date(this.form.regDate).getTime()
          ) {
            this.$message.error("处理时间不得早于登记时间");
            return false;
          }
          if (this.fileList.length > 0) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].size / 1024 / 1024 > 5) {
                this.$message.error("图片大小不能超过5mb!");
                return false;
              }
            }
          } else {
            this.$message.error("请添加图片");
            return false;
          }
          for (let i = 0; i < this.fileList.length; i++) {
            fd.append("multipartFile", this.fileList[i].raw);
          }
          form.mainId = form.objId;
          form.isCompleted = "1";
          form.defectState = "3";
          form.orderNo = form.orderNoCopy;
          for (let key in form) {
            fd.append(key, form[key] || "");
          }
          axios({
            method: "post",
            url: "/yangkai/ptmidefectrecord/handleAdd",
            data: fd,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.token
            }
          })
            .then(res => {
              if (res.data.successful) {
                this.handleClose();
                this.$message.success(res.data.resultHint);
                this.$emit("updateData");
              } else {
                this.$message.error(res.data.resultHint);
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    },
    //上传触发
    handleChange(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      if (fileList.length > 4) {
        list.style.display = "none";
      } else {
        list.style.display = "block";
      }
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      list.style.display = "block";
      this.fileList = fileList;
    },
    //一次上传超出
    onExceed(file, fileList) {
      this.$message.warning("一次最多上传5张图片");
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
