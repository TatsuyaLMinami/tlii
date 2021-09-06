<template>
  <div>
    <el-dialog title="资源统计" :visible.sync="visible" width="1050px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="(item, i) in tabs.slice(0, 4)"
          :key="i"
          :label="item.label"
          :name="item.name"
        >
          <barChart :ref="item.ref"></barChart>
        </el-tab-pane>
        <el-tab-pane label="监测装置状态汇总统计" name="infoE">
          <pieChart ref="pieZiYuan"></pieChart>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import barChart from "@/pages/public/barChart";
import pieChart from "@/pages/public/pieChart";
import chartData from "@/store/chartItems/resourceData.js";
export default {
  name: "ZiYuan",
  components: {
    barChart,
    pieChart
  },
  data() {
    return {
      echartData: chartData,
      tabs: [
        {
          label: "监测装置类型规模统计",
          name: "infoA",
          ref: "barChartAZiYuan"
        },
        {
          label: "线路电压等级分布统计",
          name: "infoB",
          ref: "barChartBZiYuan"
        },
        {
          label: "监测装置投运年限分布统计",
          name: "infoC",
          ref: "barChartCZiYuan"
        },
        {
          label: "杆塔生产厂家分布统计",
          name: "infoD",
          ref: "barChartDZiYuan"
        },
        {
          label: "监测装置状态汇总统计",
          name: "infoE",
          ref: "pieChartZiYuan"
        }
      ],
      activeName: "infoA",
      visible: false
    };
  },
  methods: {
    initFn() {
      this.visible = true;
      this.activeName = "infoA";
      this.$nextTick(() => {
        this.loadData({
          url: "/tpiim/indexEquipment/getDeviceTypeTotal",
          type: "get",
          id: "deviceType"
        });
        this.loadData({
          url: "/tpiim/indexEquipment/getLineVoltageTotal",
          type: "get",
          id: "lineVoltage"
        });
        this.loadData({
          url: "/tpiim/indexEquipment/getDeviceYearTotal",
          type: "get",
          id: "deviceYear"
        });
        this.loadData({
          url: "/tpiim/indexEquipment/getTowerManufactorTotal",
          type: "get",
          id: "towerManufactor"
        });
        this.loadData({
          url: "/tpiim/indexEquipment/getDeviceStateTotal",
          type: "get",
          id: "deviceState"
        });
      });
    },
    loadData(params) {
      $axios({
        url: params.url,
        type: params.type
      })
        .then(res => {
          let xAxis = [],
            series = [],
            data = [];
          for (let key in res.resultValue) {
            for (let i = 0; i < this.echartData.length; i++) {
              if (this.echartData[i].id === params.id) {
                xAxis.push(key);
                series.push(res.resultValue[key]);
                data.push({ name: key, value: res.resultValue[key] });
                this.echartData[i].xAxis = xAxis;
                this.echartData[i].series.data = series;
                if (params.id === "deviceState") {
                  this.echartData[i].series[0].data = data;
                }
              }
            }
          }
          for (let key in this.tabs.slice(0, 4)) {
            this.$refs[this.tabs.slice(0, 4)[key].ref][0].showChart(
              [this.echartData[key]],
              "1000px",
              "500px"
            );
          }
          this.$refs.pieZiYuan.showChart(
            [this.echartData[4]],
            "1000px",
            "500px"
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
