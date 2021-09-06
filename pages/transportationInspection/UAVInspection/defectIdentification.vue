<template>
  <div class="">
    <el-upload
      ref="upload"
      class="upload-demo"
      action="/tpiim/uavInspectResult/uploadInspectPics"
      :on-success="uploadSuccessFn"
      :headers="{ Authorization: token }"
      name="fileContent"
      accept=".jpg,.png,.JPG,.PNG,.jpeg,.JPEG"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <!-- <el-button size="small" type="primary">点击上传</el-button> -->

      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      token: sessionStorage.getItem("token"),
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    uploadSuccessFn(response) {
      console.log(response);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
</style>
