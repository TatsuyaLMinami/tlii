<template>
  <el-dialog
    ref="dialog"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="1400px"
    @open="open"
  >
    <div
      style="margin-bottom: 10px;
  text-align: center;
  width: 100%;"
    >
      <el-date-picker
        size="small"
        value-format="timestamp"
        v-model="searchInfoDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        size="small"
        type="primary"
        @click="searchInfoHistory(0)"
        icon="el-icon-search"
      ></el-button>
      <el-button
        v-for="(item, index) in disasterLayerBut"
        v-show="item.show"
        :key="index"
        type="primary"
        size="small"
        @click="searchInfoHistory(item.date)"
        >{{ item.title }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <lineChart style="width:680px" ref="el"></lineChart>
    <el-divider
      direction="vertical"
      style="height: 400px;width:2px;"
    ></el-divider>
    <lineChart style="width:680px" ref="er"></lineChart>
  </el-dialog>
</template>
<script>
import gridDisasterData from "@/store/chartItems/gridDisasterData.js";
import lineChart from "@/pages/public/lineChart";
export default {
  name: "dialogInfo",
  components: {
    lineChart
  },
  data() {
    return {
      searchInfoDate: "",
      disasterLayerBut: gridDisasterData.disasterLayerBut,
      infoChartData: gridDisasterData.infoChartData,
      visible: false,
      title: ""
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    setData(type, startTime, endTime) {
      let url = gridDisasterData.disasterUrl[type][0],
        data = {
          startTime: startTime,
          endTime: endTime
        };
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          if (res.successful) {
            this.title =
              gridDisasterData.disasterType[type] + "地质灾害预警信息";
            this.$refs.dialog.open();
            this.drawChart(type, res.resultValue);
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    open() {},
    //统计信息chart
    drawChart(type, data) {
      let xAxis = [],
        series = [],
        lineData = this.infoChartData[0].lineData,
        name = gridDisasterData.disasterChart[type].name;
      for (let i = 0; i < data.length; i++) {
        xAxis.push(data[i].day);
        for (let key in lineData) {
          lineData[key].push(data[i][key]);
        }
      }
      if (type === "disaster") {
        this.infoChartData[0].legend.data = this.infoChartData[0].legend.data1;
      }
      for (let i = 0; i < this.infoChartData[0].legend.data.length; i++) {
        series.push({
          data: Object.values(lineData)[i],
          name: this.infoChartData[0].legend.data[i],
          type: "line"
        });
      }
      this.infoChartData[0].xAxis = xAxis;
      this.infoChartData[0].series = series;
      this.infoChartData[0].title = gridDisasterData.disasterChart[type].title1;

      this.infoChartData[1].xAxis = xAxis;
      this.infoChartData[1].series = [
        {
          name: name,
          type: "line",
          data: lineData["wCount"]
        }
      ];
      this.infoChartData[1].legend = {
        data: [name],
        top: "8%",
        width: "350px"
      };
      this.infoChartData[1].title = gridDisasterData.disasterChart[type].title2;
      this.$nextTick(() => {
        this.$refs.er.showChart([this.infoChartData[0]], "680px", "400px");
        this.$refs.el.showChart([this.infoChartData[1]], "680px", "400px");
        this.visible = true;
      });
    },
    //历史灾害位置、影响线路、杆塔统计
    searchInfoHistory(date) {
      let now = "",
        history = "";
      if (date === 0) {
        if (!this.searchInfoDate) {
          return false;
        } else {
          now = this.searchInfoDate[1];
          history = this.searchInfoDate[0];
        }
      } else if (date === 1) {
        now = "";
        history = "";
      } else {
        now = new Date().getTime();
        history = now - date * 1 * 24 * 60 * 60 * 1000;
      }
      this.setData(this.disasterLayer, history, now);
    }
  }
};
</script>
