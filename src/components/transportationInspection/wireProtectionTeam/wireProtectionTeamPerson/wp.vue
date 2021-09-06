<template>
  <el-dialog
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    class="loadImage"
  >
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
        label="姓名:"
        :label-width="formLabelWidth"
        prop="personnelName"
        size="small"
      >
        <el-input
          v-model="form.personnelName"
          placeholder="请填写姓名"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="身份证号:"
        :label-width="formLabelWidth"
        prop="personnelIdcard"
        size="small"
      >
        <el-input
          v-model="form.personnelIdcard"
          clearable
          onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')"
          placeholder="请填写身份证号(X大写)"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属护线队:"
        :label-width="formLabelWidth"
        prop="teamName"
        size="small"
      >
        <el-input
          readonly
          placeholder="请选择护线队"
          @focus="showWPTTable"
          suffix-icon="el-icon-search"
          v-model="form.teamName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属地市:"
        :label-width="formLabelWidth"
        prop="cityName"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.cityName"
          placeholder="请选择所属地市"
          @change="setCity"
        >
          <el-option
            v-for="(item, index) in city"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="个人照片:"
        :label-width="formLabelWidth"
        prop=""
        size="small"
      >
        <el-upload
          style="display: flex; flex-wrap: wrap"
          ref="uploadPerson"
          action=""
          :on-preview="handlePersonPreview"
          :on-change="handlePersonChange"
          :on-remove="handlePersonRemove"
          :auto-upload="false"
          accept=".jpg,.png,.JPG,.PNG,.jpeg,.JPEG"
          list-type="picture-card"
          :on-exceed="onPersonExceed"
          :limit="1"
          :file-list="filePersonList"
        >
          <i class="el-icon-plus"></i>
          <div
            slot="tip"
            style="width: 100%; line-height: 20px; margin-top: 0px"
            class="el-upload__tip"
          >
            只能上传jpg/png/jpeg文件,大小不能超过2mb,一次最多上传1张
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogPersonVisible">
          <img width="100%" :src="dialogPersonImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="资质证书:"
        :label-width="formLabelWidth"
        prop=""
        size="small"
      >
        <el-upload
          multiple
          style="display: flex; flex-wrap: wrap"
          class="uploadwp"
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
          list-type="picture-card"
          :limit="5"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
          <div
            slot="tip"
            style="width: 100%; line-height: 20px; margin-top: 0px"
            class="el-upload__tip"
          >
            只能上传jpg/png/jpeg文件,每张大小不超过5mb,一次最多上传5张
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <div style="width:50%">
        <div v-for="(item, index) in expirationDate" :key="index">
          <el-form-item
            label="资质有效期:"
            :label-width="formLabelWidth"
            size="small"
            style="margin-bottom:118px"
          >
            <el-date-picker
              style="width:100%;"
              v-model="item.date"
              type="date"
              placeholder="有效期"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
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
    <publicDialog ref="WPT" @callBackFn="update"> </publicDialog>
  </el-dialog>
</template>

<script>
import publicDialog from "@/pages/public/publicDialog.vue";
import { isIdentityId } from "@/tools/isIdentityId.js";
import axios from "axios";
export default {
  name: "wp",
  components: {
    publicDialog
  },
  data() {
    let validateTeamName = (rule, value, callback) => {
      if (!this.form.teamName) {
        callback(new Error("请选择护线队"));
      } else {
        callback();
      }
    };
    let validateIDCard = (rule, value, callback) => {
      var errorMsg = isIdentityId(value);
      if (errorMsg != "") {
        callback(new Error(errorMsg));
      }
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogPersonImageUrl: "",
      dialogPersonVisible: false,
      token: sessionStorage.getItem("token"),
      expirationDate: [],
      filePersonList: [],
      fileList: [],
      visible: false,
      title: "",
      form: { teamName: "" },
      city: [],
      formLabelWidth: "120px",
      fieldRules: {
        personnelName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "只能填写中文",
            trigger: "blur"
          },
          {
            pattern: /^.{2,4}$/,
            message: "只能填写2-4个字",
            trigger: "blur"
          }
        ],
        personnelIdcard: [
          {
            required: true,
            validator: validateIDCard,
            trigger: "blur"
          }
        ],
        teamName: [
          {
            required: true,
            validator: validateTeamName,
            trigger: "change"
          }
        ],
        cityName: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: false
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
    setData(title, form, city) {
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.city = city;
      this.title = title;
      if (form.personnelId) {
        this.fileList = form.imgUrl;
        this.filePersonList = form.imgPersonUrl;
        this.expirationDate = form.expirationDate;
        this.$nextTick(function() {
          var list1 = document.getElementsByClassName(
              "el-upload--picture-card"
            )[0],
            list2 = document.getElementsByClassName(
              "el-upload--picture-card"
            )[1];
          list1.style.display = "none";
          if (this.fileList.length < 5) {
            list2.style.display = "block";
          } else {
            list2.style.display = "none";
          }
        });
      } else {
        this.fileList = [];
        this.filePersonList = [];
        this.$nextTick(function() {
          var list1 = document.getElementsByClassName(
              "el-upload--picture-card"
            )[0],
            list2 = document.getElementsByClassName(
              "el-upload--picture-card"
            )[1];
          list1.style.display = "block";
          list2.style.display = "block";
        });
      }
      this.visible = true;
    },
    setCity(val) {
      this.form.cityName = val.name;
      this.form.cityId = val.code;
    },
    //上传触发
    handlePersonChange(file, filePersonList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      this.filePersonList = filePersonList;
      if (filePersonList.length > 0) {
        list.style.display = "none";
      } else {
        list.style.display = "block";
      }
    },
    handlePersonRemove(file, filePersonList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      list.style.display = "block";
      this.filePersonList = filePersonList;
    },
    handlePersonPreview(file) {
      this.dialogPersonImageUrl = file.url;
      this.dialogPersonVisible = true;
    },
    onPersonExceed(file, fileList) {
      this.$message.warning("一次最多上传1张图片");
    },
    handleChange(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[1];
      if (this.fileList.length === 4) {
        list.style.display = "none";
        this.expirationDate.push({
          date: ""
        });
      } else {
        list.style.display = "block";
        this.expirationDate.push({
          date: ""
        });
      }
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[1];
      list.style.display = "block";
      let index = this.fileList.indexOf(file);
      this.expirationDate.splice(index, 1);
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed(file, fileList) {
      this.$message.warning("一次最多上传5张图片");
    },
    update(val, row) {
      if (val === "WPT") {
        this.form.wireProtectionTeamId = row.wireProtectionTeamId;
        this.form.teamName = row.wireProtectionTeamName;
      }
    },
    showWPTTable() {
      this.$refs.WPT.setDialogType("WPT");
    },
    handleClose() {
      this.expirationDate = [];
      this.$refs.form.resetFields();
      this.$refs.upload.clearFiles();
      this.$refs.uploadPerson.clearFiles();
      this.fileList = [];
      this.filePersonList = [];
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let fd = new FormData();
          var dateArr = [];
          let form = JSON.parse(JSON.stringify(this.form));
          if (this.filePersonList.length > 0) {
            for (let i = 0; i < this.filePersonList.length; i++) {
              if (this.filePersonList[i].size / 1024 / 1024 > 2) {
                this.$message.error("个人照片大小不能超过2mb!");
                return false;
              }
            }
          } else {
            this.$message.error("请添加个人照片");
            return false;
          }

          if (this.fileList.length > 0) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].size / 1024 / 1024 > 5) {
                this.$message.error("资质证书图片大小不能超过5mb!");
                return false;
              }
            }
          } else {
            this.$message.error("请添加资质证书图片");
            return false;
          }
          let expirationDate = Object.values(this.expirationDate);
          for (let date in expirationDate) {
            if (!expirationDate[date].date) {
              this.$message.error("请填写资质有效期");
              return false;
            } else {
              dateArr.push(expirationDate[date].date);
            }
          }
          for (let i = 0; i < this.fileList.length; i++) {
            fd.append("personnelCertificateMultipart", this.fileList[i].raw);
          }
          form.personnelMultipart = this.filePersonList[0].raw;
          form.expirationDate = dateArr;
          for (let key in form) {
            fd.append(key, form[key] || "");
          }
          if (fd.personnelId) {
            url = "/yangkai/personnel/updatePersonnel";
            this.handle(url, fd);
          } else {
            url = "/yangkai/personnel/createPersonnel";
            this.handle(url, fd);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, data) {
      axios({
        method: "post",
        url: url,
        data: data,
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
    }
  }
};
</script>
<style lang="less" scoped>
.uploadwp {
  /deep/.el-upload-list--picture-card{
    width:100%;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    height: 150px;
    display: block;
    width: 150px;
  }
}
</style>
