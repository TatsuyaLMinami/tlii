<template>
  <div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="1000px">
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
        span: {
          lineName: "所属线路",
          volLevel: "电压等级",
          startTower: "起始杆塔",
          endTower: "终止杆塔",
          crossStyle: "被跨越物类型",
          crossName: "被跨越物名称",
          crossVollevel: "被跨越线路电压等级",
          crossCityname: "被跨越线路地市名称",
          measDate: "测量日期",
          isMaincross: "是否三跨",
          crossLand: "跨越点地形",
          crossPlanlen: "交跨要求距离（m）",
          crossActlen: "交跨实际距离（m）",
          crossAngle: "交跨角度",
          pullTower: "耐张段杆塔号",
          crossSpace: "交跨档档距（m）",
          stDecimal: "小号侧杆塔型号",
          stNature: "小号侧杆塔性质",
          stLen: "离小号侧距离（m）",
          btDecimal: "大号侧杆塔型号",
          btNature: "大号侧杆塔性质",
          btLen: "离大号侧距离（m）",
          cityName: "所属地市名称",
          maintainTeamname: "运维班组名称"
        },
        sgd: {
          constructionSite: "施工地点",
          constructionContact: "施工联系人",
          contactPhoneNumber: "联系人电话",
          riskLevel: "风险级别",
          personCharge: "负责人",
          deptName: "部门名称",
          cityName: "所属城市"
        }
      }
    };
  },
  methods: {
    initFn(id, type) {
      this.dialogVisible = true;
      if (type === "span") {
        this.loadData(
          {
            url: "/tpiim/span/getSpan",
            type: "get",
            data: {
              objId: id
            }
          },
          type
        );
      } else {
        this.loadData(
          {
            url: "/tpiim/selffixedconstructionpoint/getById",
            type: "get",
            data: {
              objId: id
            }
          },
          type
        );
      }
    },

    loadData(params, type) {
      let oneDict = this.towerDic[type];
      $axios(params)
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
