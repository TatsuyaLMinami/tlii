<template>
  <div>
    <el-dialog
      title="巡检任务详情"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <div class="main-style">
        <div class="info-item" v-for="(item, i) in formData" :key="i">
          <label class="info-item-left">{{ item.name }}：</label>
          <span class="info-item-right">{{ item.val }}</span>
        </div>
        <div v-if="physicalTower.length">
          <div class="line"></div>
          <div class="info-item" v-for="(item, i) in physicalTower" :key="i">
            <label class="info-item-left">{{ item.name }}：</label>
            <span class="info-item-right">{{ item.val }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "infoA",
      dialogVisible: false,
      formData: [],
      physicalTower: [],
      towerDic: {
        lineName: "所属线路",
        ispTypeName: "巡视类型",
        ispModeName: "巡视方式",
        volLevelName: "电压等级",
        cityName: "所属地市",
        planIspDate: "巡视计划日期",
        ispRange: "巡视范围",
        startTowername: "起始杆塔",
        endTowername: "终止杆塔",
        ispContent: "巡视内容",
        ispTeamname: "巡视班组",
        dataStatusName: "任务状态"
      }
    };
  },
  methods: {
    initFn(id) {
      this.dialogVisible = true;
      this.loadData(id);
    },

    loadData(id) {
      let oneDict = this.towerDic;
      $axios({
        url: "/tpiim/ptmiInsTask/getById",
        type: "get",
        data: {
          objId: id
        }
      })
        .then(res => {
          this.infoLoadingBool = false;
          this.formData = [];
          for (let keyB in oneDict) {
            for (let keyA in res.resultValue) {
              if (keyA === keyB) {
                let val = res.resultValue[keyA];
                if (typeof val === "number" && val.toString().length > 12) {
                  val = this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
                }
                this.formData.push({
                  name: oneDict[keyB],
                  val: val
                });
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.main-style {
  /* height: 500px; */
  overflow: auto;
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
.line {
  width: 98%;
  border-top: 1px solid #eee;
  display: inline-block;
}
</style>
