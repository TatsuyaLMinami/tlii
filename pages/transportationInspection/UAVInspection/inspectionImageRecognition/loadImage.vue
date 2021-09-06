<template>
  <el-dialog
    :title="dialogTitle"
    :before-close="handleClose"
    :visible.sync="dialogFormVisible"
    class="loadImage"
  >
    <el-form
      :inline="true"
      v-if="dialogFormVisible"
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
      <!-- <el-form-item
                size="small"
                prop="inspectionDate"
                :label-width="formLabelWidth"
                label="巡视日期:"
            >
                <el-date-picker
                    
                    :picker-options="pickerOptions"
                    @change="getTaskList"
                    value-format="timestamp"
                    v-model="form.inspectionDate"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item> -->
      <el-form-item
        size="small"
        prop="inspectionTask"
        :label-width="formLabelWidth"
        label="巡视任务:"
      >
        <el-input
          placeholder="请选择巡视任务"
          readonly
          @focus="showTaskTable()"
          suffix-icon="el-icon-search"
          v-model="form.inspectionTask"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="关联杆塔:"
        :label-width="formLabelWidth"
        prop="towerId"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.towerId"
          placeholder="请选择关联杆塔"
          clearable
        >
          <el-option
            v-for="(item, index) in tower"
            :key="index"
            :label="item.objName"
            :value="item.objId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 100%;display:flex;"
        label="缺陷图片:"
        :label-width="formLabelWidth"
        prop=""
        size="small"
      >
        <el-upload
          multiple
          class=""
          ref="uploadPic"
          action=""
          :data="{}"
          :name="'filesPic'"
          :auto-upload="false"
          accept=".jpg,.png"
          list-type="picture-card"
          :on-preview="handlePicPreview"
          :on-change="handlePicChange"
          :on-remove="handlePicRemove"
        >
          <i class="el-icon-plus"></i>
          <div
            slot="tip"
            style="width: 100%; line-height: 20px; margin-top: 0px"
            class="el-upload__tip"
          >
            只能上传jpg/png图片文件,总大小不得大于10GB
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="压缩文件:"
        :label-width="formLabelWidth"
        prop=""
        size="small"
      >
        <el-upload
          :disabled="disabledPac"
          multiple
          class=""
          ref="uploadPac"
          action=""
          :data="{}"
          :name="'filesPac'"
          :on-preview="handlePacPreview"
          :on-change="handlePacChange"
          :on-remove="handlePacRemove"
          :auto-upload="false"
          accept=".zip,.rar"
          :file-list="fileListPac"
        >
          <el-button
            :disabled="disabledPac"
            class="el-icon-upload"
            size="small"
            type="primary"
            >上传压缩包</el-button
          >
          <div
            slot="tip"
            style="width: 100%; line-height: 20px; margin-top: 0px"
            class="el-upload__tip"
          >
            只能上传rar/zip文件,总大小不得大于10GB
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialog ref="task" @callBackFn="update"> </publicDialog>
  </el-dialog>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
import axios from "axios";
export default {
  name: "loadImage",
  props: ["dialogTitle", "dialogFormVisible", "inspectionTask"],
  components: {
    publicDialog
  },
  data() {
    let validateTaskName = (rule, value, callback) => {
      if (!this.form.inspectionTask) {
        callback(new Error("请选择巡视任务"));
      } else {
        callback();
      }
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogType: "",
      dialogTaskVisible: false,
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      disabledPic: false,
      disabledPac: false,
      tower: [],
      form: { inspectionTask: "" },
      formLabelWidth: "120px",
      token: sessionStorage.getItem("token"),
      fileListPic: [],
      fileListPac: [],
      fieldRules: {
        inspectionDate: [
          {
            required: true,
            message: "请选择巡视日期",
            trigger: "change"
          }
        ],
        inspectionTask: [
          {
            required: true,
            validator: validateTaskName,
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    fileListPic() {
      if (this.fileListPic.length > 0) {
        this.disabledPic = false;
        this.disabledPac = true;
        this.fileListPac = [];
      } else if (
        this.fileListPac.length === 0 &&
        this.fileListPic.length === 0
      ) {
        this.disabledPic = false;
        this.disabledPac = false;
      }
    },
    fileListPac() {
      if (this.fileListPac.length > 0) {
        this.disabledPic = true;
        this.disabledPac = false;
        this.fileListPic = [];
      } else if (
        this.fileListPac.length === 0 &&
        this.fileListPic.length === 0
      ) {
        this.disabledPic = false;
        this.disabledPac = false;
      }
    }
  },
  methods: {
    update(val, row) {
      if (val === "task") {
        this.form.taskId = row.objId;
        this.form.inspectionTask = row.taskName;
        this.getTower(row.lineId);
      }
    },
    getTower(lineId) {
      let data = {
        objType: "tower",
        objId: lineId
      };
      const baseUrl = "/tpiim/line/getLineNameTreeList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            this.tower = res.resultValue || [];
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    showTaskTable() {
      this.$refs.task.setDialogType("task");
    },
    getTaskList(date) {
      let data = {
        ispDate: this.$moment(date)
          .utcOffset(8)
          .format("YYYY-MM-DD")
      };
      const baseUrl = "/yangkai/taskPicInfo/getTaskList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            let list = res.resultValue || [],
              inspectionTask = [];
            for (let i = 0; i < list.length; i++) {
              list.push({
                code: list[i].objId,
                name: list[i].task
              });
            }
            this.inspectionTask = inspectionTask;
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
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
      this.$refs.uploadPic.clearFiles();
      this.$refs.uploadPac.clearFiles();
      this.fileListPic = [];
      this.fileListPac = [];
      this.$emit("handleClose");
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let fd = new FormData(),
            form = JSON.parse(JSON.stringify(this.form)),
            size = 0;
          if (this.fileListPic.length > 0) {
            for (let i = 0; i < this.fileListPic.length; i++) {
              size += this.fileListPic[i].size;
            }
            if (size / 1024 / 1024 / 1024 > 10) {
              this.$message.error("图片大小不能超过10GB!");
              return false;
            }
          } else if (this.fileListPac.length > 0) {
            for (let i = 0; i < this.fileListPac.length; i++) {
              size += this.fileListPac[i].size;
            }
            if (size / 1024 / 1024 / 1024 > 10) {
              this.$message.error("压缩包大小不能超过10GB!");
              return false;
            }
          } else {
            this.$message.error("请添加图片或压缩包");
            return false;
          }
          let fileList =
            this.fileListPic.length === 0 ? this.fileListPac : this.fileListPic;
          for (let i = 0; i < fileList.length; i++) {
            fd.append("multipart", fileList[i].raw);
          }
          fd.append("taskName", form.inspectionTask);
          if (form.towerId) {
            fd.append("towerId", form.towerId);
          }
          axios({
            method: "post",
            url: "/yangkai/taskPicInfo/importPics",
            data: fd,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.token
            }
          })
            .then(res => {
              if (res.data.successful) {
                this.$refs.form.resetFields();
                this.$refs.uploadPic.clearFiles();
                this.$refs.uploadPac.clearFiles();
                this.fileListPic = [];
                this.fileListPac = [];
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
    handlePicPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传触发
    handlePicChange(file, fileList) {
      this.fileListPic = fileList;
    },
    handlePicRemove(file, fileList) {
      this.fileListPic = fileList;
    },
    handlePacPreview(file) {},
    //上传触发
    handlePacChange(file, fileList) {
      this.fileListPac = fileList;
    },
    handlePacRemove(file, fileList) {
      this.fileListPac = fileList;
    },
    handleRemove(file, fileList) {
      this.fileListPic = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
