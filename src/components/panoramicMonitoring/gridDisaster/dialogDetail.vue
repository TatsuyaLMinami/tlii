<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
    class="disasterDetail"
  >
    <el-form
      :model="form"
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
        v-show="disasterLayer === 'fire' || disasterLayer === 'disaster'"
        style="width: 100%"
        size="small"
        label="位置:"
        :label-width="formLabelWidth"
      >
        经度:{{ form.longitude }},纬度:{{ form.latitude }}
      </el-form-item>

      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="冰厚:"
        :label-width="formLabelWidth"
      >
        {{ form.icingThickness }}mm
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="张力:"
        :label-width="formLabelWidth"
      >
        {{ form.icingTension }}N
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="风速:"
        :label-width="formLabelWidth"
      >
        {{ form.windSpeed }}m/s
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="风向:"
        :label-width="formLabelWidth"
      >
        {{ form.windDirection }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="降雨量:"
        :label-width="formLabelWidth"
      >
        {{ form.rainfall }}mm
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 50%"
        size="small"
        label="气压:"
        :label-width="formLabelWidth"
      >
        {{ form.pressure }}hPa
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'ice'"
        style="width: 100%"
        size="small"
        label="线路温度:"
        :label-width="formLabelWidth"
      >
        {{ form.lineRature }}℃
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 100%"
        size="small"
        label="台风名称:"
        :label-width="formLabelWidth"
      >
        {{ form.typhoonName }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 100%"
        size="small"
        label="中心位置:"
        :label-width="formLabelWidth"
      >
        经度:{{ form.centerLongitude }}, 纬度:{{ form.centerLatitude }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 50%"
        size="small"
        label="中心气压:"
        :label-width="formLabelWidth"
      >
        {{ form.minCentralPressure }}hPa
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 50%"
        size="small"
        label="最大风力:"
        :label-width="formLabelWidth"
      >
        {{ form.maxWindLevel }}级
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 50%"
        size="small"
        label="最大风速:"
        :label-width="formLabelWidth"
      >
        {{ form.maxWindSpeed }}m/s
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'typhoon'"
        style="width: 50%"
        size="small"
        label="移动速度:"
        :label-width="formLabelWidth"
      >
        {{ form.moveSpeed }}m/s
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'wave'"
        style="width: 100%"
        size="small"
        label="持续时间:"
        :label-width="formLabelWidth"
      >
        {{ form.lastTime }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'wave'"
        style="width: 100%"
        size="small"
        label="风险等级:"
        :label-width="formLabelWidth"
      >
        {{ form.riskLevel }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'disaster'"
        style="width: 50%"
        size="small"
        label="风险等级:"
        :label-width="formLabelWidth"
      >
        {{ form.riskLevel }}
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'disaster'"
        style="width: 50%"
        size="small"
        label="x轴移动:"
        :label-width="formLabelWidth"
      >
        {{ form.xMove }}m
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'disaster'"
        style="width: 50%"
        size="small"
        label="y轴移动:"
        :label-width="formLabelWidth"
      >
        {{ form.yMove }}m
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'disaster'"
        style="width: 50%"
        size="small"
        label="z轴移动:"
        :label-width="formLabelWidth"
      >
        {{ form.zMove }}m
      </el-form-item>
      <el-form-item
        v-show="disasterLayer === 'fire' || disasterLayer === 'ice'"
        style="width: 100%"
        size="small"
        label="监测时间:"
        :label-width="formLabelWidth"
      >
        {{ form.monitorTime }}
      </el-form-item>
      <el-form-item
        style="width: 100%"
        size="small"
        label="预警时间:"
        :label-width="formLabelWidth"
      >
        {{ form.alarmTime }}
      </el-form-item>
      <el-form-item
        style="width: 100%"
        size="small"
        label="预警等级:"
        :label-width="formLabelWidth"
      >
        {{ form.alarmLevel }}
      </el-form-item>
      <el-form-item
        style="width: 100%"
        size="small"
        label="预警信息:"
        :label-width="formLabelWidth"
      >
        {{ form.alarmInfo }}
      </el-form-item>
      <div class="disasterDivider"></div>
      <el-form-item
        style="width: 100%"
        size="small"
        label="影响线路数:"
        :label-width="formLabelWidth"
      >
        {{ form.lineCount }}条
      </el-form-item>
      <el-form-item
        style="width: 100%"
        size="small"
        label="影响杆塔数:"
        :label-width="formLabelWidth"
      >
        {{ form.towerCount }}个
      </el-form-item>
      <el-form-item
        style="width: 100%"
        size="small"
        label="线路总里程:"
        :label-width="formLabelWidth"
      >
        {{ form.lenSum }}km
      </el-form-item>
    </el-form>
    <div class="disasterTable">
      <el-table
        stripe
        :data="table"
        border
        max-height="200"
        header-align="center"
      >
        <el-table-column type="index" align="center" label="序号" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="towerName"
          label="杆塔号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="lineName"
          label="线路"
        >
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
import gridDisasterData from "@/store/chartItems/gridDisasterData.js";
export default {
  name: "dialogDetail",
  data() {
    return {
      formLabelWidth: "120px",
      form: {},
      table: [],
      title: "",
      visible: false,
      disasterLayer: ""
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    setData(type, e) {
      this.disasterLayer = type;
      let data1 = {},
        data2 = {},
        data3 = {
          disasterId: e.features[0].properties.id
        },
        url1 = gridDisasterData.disasterUrl[type][2],
        url2 = gridDisasterData.disasterUrl[type][0],
        url3 = gridDisasterData.disasterUrl[type][3];
      this.form = e.features[0].properties;
      if (type === "fire") {
        data1 = {
          wId: e.features[0].properties.id
        };
        data2 = {
          wId: e.features[0].properties.id,
          startTime: "",
          endTime: ""
        };
        this.title = e.features[0].properties.fpointid + "号火点信息";
        this.showDetail(url1, data1, url2, data2, url3, data3);
      } else if (type === "ice") {
        data1 = {
          iId: e.features[0].properties.id
        };
        data2 = {
          iId: e.features[0].properties.id,
          startTime: "",
          endTime: ""
        };
        this.title = e.features[0].properties.lineName + "覆冰预警";
        this.showDetail(url1, data1, url2, data2, url3, data3);
      } else if (type === "thunder") {
        data1 = {
          tId: e.features[0].properties.id
        };
        data2 = {
          tId: e.features[0].properties.id,
          startTime: "",
          endTime: ""
        };
        this.title = e.features[0].properties.lineName + "雷电预警";
        this.showDetail(url1, data1, url2, data2, url3, data3);
      } else {
        if (type === "typhoon") {
          this.title =
            e.features[0].properties.typhoonNumber + "号台风预警信息";
        }
        if (type === "wave") {
          this.title = e.features[0].properties.lineName + "舞动预警";
        }
        if (type === "disaster") {
          this.title = e.features[0].properties.lineName + "地质灾害预警";
        }
        this.form = e.features[0].properties;
        this.table = JSON.parse(e.features[0].properties.towerAndLine);
        this.form.lineCount = e.features[0].properties.influenceLineCount;
        this.form.towerCount = e.features[0].properties.influenceTowerCount;
        this.form.lenSum = e.features[0].properties.lineTotal;
        this.form.alarmTime = this.$moment(e.features[0].properties.alarmTime)
          .utcOffset(8)
          .format("YYYY-MM-DD HH:MM:SS");
        this.visible = true;
      }
    },
    showDetail(url1, data1, url2, data2, url3, data3) {
      let that = this;
      $axios({
        url: url1,
        type: "post",
        data: data1
      })
        .then(res1 => {
          if (res1.successful) {
            that.table = res1.resultValue;
            $axios({
              url: url2,
              type: "post",
              data: data2
            })
              .then(res2 => {
                if (res2.successful) {
                  that.form.lineCount =
                    typeof res2.resultValue[0] !== "undefined"
                      ? res2.resultValue[0].lineCount
                      : 0;
                  that.form.towerCount =
                    typeof res2.resultValue[0] !== "undefined"
                      ? res2.resultValue[0].towerCount
                      : 0;
                  that.form.lenSum =
                    typeof res2.resultValue[0] !== "undefined"
                      ? res2.resultValue[0].lenSum
                      : 0;
                  $axios({
                    url: url3,
                    type: "post",
                    data: data3
                  })
                    .then(res3 => {
                      if (res3.successful) {
                        that.form.alarmLevel = res3.resultValue.alarmLevel;
                        that.form.alarmTime = this.$moment(
                          res3.resultValue.alarmTime
                        )
                          .utcOffset(8)
                          .format("YYYY-MM-DD HH:MM:SS");
                        that.form.alarmInfo = res3.resultValue.alarmInfo;
                        that.visible = true;
                      } else {
                        this.$message.error(res3.resultHint);
                      }
                    })
                    .catch(err3 => {
                      console.log(err3);
                    });
                } else {
                  this.$message.error(res2.resultHint);
                }
              })
              .catch(err2 => {
                console.log(err2);
              });
          } else {
            this.$message.error(res1.resultHint);
          }
        })
        .catch(err1 => {
          console.log(err1);
        });
    }
  }
};
</script>
<style lang="less">
.disasterDivider {
  height: 2px;
  background-image: repeating-linear-gradient(
    90deg,
    rgb(0, 150, 136),
    rgb(0, 150, 136) 21px,
    #fff 0,
    #fff 32px
  );
  width: 100%;
}
.disasterTable {
  margin: 0 32px;
  width: 100%;
  .el-table td,
  .el-table th {
    padding: 5px 0;
  }
  .el-table th {
    color: white;
    background-color: rgb(0, 150, 136);
  }
}
</style>
