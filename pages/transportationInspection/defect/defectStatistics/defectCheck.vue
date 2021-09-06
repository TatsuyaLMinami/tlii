<template>
  <el-dialog
    title="消缺验收"
    :before-close="handleClose"
    :visible.sync="visible"
    ref="dialog"
    @open="open"
  >
    <publicForm ref="form"></publicForm>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="unQualify">不合格</el-button>
      <el-button type="primary" @click.native.prevent="qualify"
        >合 格</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/defect/h.js";
import publicForm from "@/pages/public/publicForm";
import $store from "@/store/data.js";
export default {
  name: "defectCheck",
  components: { publicForm },
  data() {
    return {
      objId: "",
      url: $store.getters.url,
      visible: false
    };
  },
  methods: {
    open() {},
    setData(objId) {
      this.$refs.dialog.open();
      const url = "/yangkai/ptmidefectrecord/handleGetByMainId";
      $axios({ url: url, type: "get", data: { mainId: objId, state: "no" } })
        .then(data => {
          if (data.successful) {
            this.objId = data.resultValue.objId;
            let label = Object.keys(data.resultValue),
              value = Object.values(data.resultValue),
              arr = [];
            for (let key in formItems) {
              var obj = label.find(item => {
                return item === formItems[key].prop;
              });
              if (obj) {
                arr.push({
                  ...formItems[key],
                  value: value[label.indexOf(obj)]
                });
              }
            }
            let arrImg = [],
              imageUrl = data.resultValue.ptmiDefectFile;
            for (let i = 0; i < imageUrl.length; i++) {
              arrImg.push({ url: this.url + imageUrl[i].fileId });
            }
            arr.push({
              label: "消缺图片",
              width: "100%",
              img: "img",
              value: arrImg
            });
            this.$refs.form.setData({ list: arr });
            this.visible = true;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    unQualify() {
      this.$prompt("请输入不合格原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,200}$/,
        inputErrorMessage: "不能为空,且最多200个字符"
      })
        .then(({ value }) => {
          let data = {
            objId: this.objId,
            isCompleted: "0",
            acceptRemark: value
          };
          this.handle(data);
        })
        .catch(() => {});
    },
    qualify() {
      let data = {
        objId: this.objId,
        isCompleted: "1"
      };
      this.handle(data);
    },
    handle(data) {
      const baseUrl = "/yangkai/ptmidefectrecord/handleUpdate";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          if (data.successful) {
            this.$message.success(data.resultHint);
            this.$emit("updateData");
            this.handleClose();
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose() {
      this.visible = false;
    },
    parseTime(val) {
      if (val && val !== null && val !== "--") {
        return this.$moment(val)
          .utcOffset(8)
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "--";
      }
    }
  }
};
</script>
