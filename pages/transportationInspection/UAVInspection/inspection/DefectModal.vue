<template>
  <div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="1000px">
      <div class="main-style">
        <div class="basic-info">
          <div class="info-item">
            <label class="info-item-left">线路名称：</label>
            <span class="info-item-right">{{ formData.lineName }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">发现日期：</label>
            <span class="info-item-right">{{
              formData.discovDate 
            }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">缺陷描述：</label>
            <span class="info-item-right">{{ formData.defectDes }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">巡视开始时间：</label>
            <span class="info-item-right">{{
              formData.startDate 
            }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">巡视结束时间：</label>
            <span class="info-item-right">{{
              formData.endDate 
            }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">所属地市：</label>
            <span class="info-item-right">{{ formData.cityName }}</span>
          </div>

          <div class="info-item detail">
            <label class="info-item-left">缺陷图片：</label>
            <span class="info-item-img">
              <img
                v-if="taskImgs.fileId"
                :src="basicPath + taskImgs.fileId"
                @click="bigImgFn(basicPath + taskImgs.fileId)"
              />
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import $store from "@/store/data.js"
export default {
  name: "",
  data() {
    return {
      map: null,
      dialogVisible: false,
      imgVisible: false,
      formData: {},
      taskImgs: [],
      basicPath: $store.getters.url,
      dialogImageUrl: "",
    };
  },
  methods: {
    initFn(row) {
      this.dialogVisible = true;
      this.formData = row;
      this.loadData(row.markId);
    },

    loadData(markId) {
      $axios({
        url: "/tpiim/uavInspectResult/getUavDefectPic",
        type: "get",
        data: {
          objId: markId,
        },
      })
        .then((res) => {
          this.taskImgs = res.resultValue;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    bigImgFn(path) {
      this.imgVisible = true;
      this.dialogImageUrl = path;
    },
  },
};
</script>
<style scoped>
.main-style {
  height: 500px;
  overflow: auto;
}
#map {
  width: 90%;
  height: 500px;
  margin: auto;
}
.info-item {
  float: left;
  width: 50%;
  line-height: 40px;
  color: #555;
}
.info-item-left,
.info-item-right {
  display: inline-block;
  width: 48%;
}
.info-item-left {
  text-align: right;
  font-weight: bold;
}
.detail {
  width: 100%;
}
.detail label {
  float: left;
  width: 24%;
}
.basic-info {
  overflow: hidden;
}
.info-item-img {
  float: left;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 5px;
}
.info-item-img img {
  cursor: pointer;
  width: 80px;
  height: 80px;
}
</style>
