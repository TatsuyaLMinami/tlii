<template>
  <el-dialog
    title="消缺详情"
    :before-close="handleClose"
    :visible.sync="visible"
  >
    <el-tabs v-model="tabsValue" type="card">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <publicForm :list="{ list: item.arr }"></publicForm>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import publicForm from "@/pages/public/publicForm";
import formItems from "@/store/formItems/transportationInspection/defect/h.js";
import $store from "@/store/data.js";
export default {
  name: "defectDisplay",
  components: { publicForm },
  data() {
    return {
      tabsValue: "1",
      tabs: [],
      formLabelWidth: "120px",

      url: $store.getters.url,
      visible: false,
      title: ""
    };
  },
  methods: {
    setData(objId) {
      const url = "/yangkai/ptmidefectrecord/handleGetByMainId";
      $axios({ url: url, type: "get", data: { mainId: objId, state: "list" } })
        .then(data => {
          if (data.successful) {
            let result = data.resultValue.reverse();
            for (let i = 0; i < result.length; i++) {
              let label = Object.keys(result[i]),
                value = Object.values(result[i]),
                imageUrl = result[i].ptmiDefectFile,
                arrImg = [],
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
              result[i].name = Number(i + 1).toString();
              result[i].title = "第" + Number(i + 1) + "次";
              for (let j = 0; j < imageUrl.length; j++) {
                arrImg.push({ url: this.url + imageUrl[j].fileId });
              }
              arr.push({
                label: "消缺图片",
                width: "100%",
                img: "img",
                value: arrImg
              });
              result[i].arr = arr;
            }
            this.tabs = result;
            this.visible = true;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose() {
      this.tabs = [];
      this.tabsValue = "1";
      this.visible = false;
    }
  }
};
</script>
