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
        label="护线队名称:"
        :label-width="formLabelWidth"
        prop="wireProtectionTeamName"
        size="small"
      >
        <el-input
          v-model="form.wireProtectionTeamName"
          placeholder="请填写护线队名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="施工单位:"
        :label-width="formLabelWidth"
        prop="constructionUnit"
        size="small"
      >
        <el-input v-model="form.constructionUnit" placeholder="请填写施工单位">
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
            v-for="(item, index) in dropDown.city"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="资质证书:"
        :label-width="formLabelWidth"
        prop=""
        size="small"
      >
        <el-upload
          multiple
          style="display: flex; flex-wrap: wrap"
          class=""
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
            只能上传jpg/png/jpeg文件，且每张不超过5mb,一次最多上传5张
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "w",
  data() {
    return {
      visible: false,
      title: "",
      dialogImageUrl: "",
      dialogVisible: false,
      token: sessionStorage.getItem("token"),
      fileList: [],

      form: {},
      dropDown: {
        city: []
      },
      formLabelWidth: "120px",
      fieldRules: {
        wireProtectionTeamName: [
          {
            required: true,
            message: "请填写护线队名称",
            trigger: "blur"
          }
        ],
        constructionUnit: [
          {
            required: true,
            message: "请填写施工单位",
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
            required: false,
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
    setData(title, form, dropDown) {
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.dropDown = dropDown;
      this.title = title;
      if (form.wireProtectionTeamId) {
        this.fileList = form.imgUrl;
        this.$nextTick(function() {
          var list = document.getElementsByClassName(
            "el-upload--picture-card"
          )[0];
          if (this.fileList.length < 5) {
            list.style.display = "block";
          } else {
            list.style.display = "none";
          }
        });
      } else {
        this.fileList = [];
        this.$nextTick(function() {
          var list = document.getElementsByClassName(
            "el-upload--picture-card"
          )[0];
          list.style.display = "block";
        });
      }
      this.visible = true;
    },
    setCity(val) {
      this.form.cityName = val.name;
      this.form.city = val;
    },
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
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed(file, fileList) {
      this.$message.warning("一次最多上传5张图片");
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form));
          if (this.fileList.length > 0) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].size / 1024 / 1024 > 5) {
                this.$message.error("图片大小不能超过5mb!");
                return false;
              }
            }
          } else {
            this.$message.error("请添加资质证书图片");
            return false;
          }
          let fd = new FormData(),url="";
          for (let key in this.form) {
            fd.append(key, this.form[key] || "");
          }
          fd.append("cityId", form.city.code);
          for (let i = 0; i < this.fileList.length; i++) {
            fd.append("certificateMultipartFile", this.fileList[i].raw);
          }
          if (this.form.wireProtectionTeamId) {
            //fd.append("certificateMultipartFileUrl", this.form.teamCertificateArrays);
            url = "/yangkai/wireProtectionTeam/updateWireProtectionTeam";
            this.handle(url, fd);
          } else {
            url = "/yangkai/wireProtectionTeam/createWireProtectionTeam";
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
