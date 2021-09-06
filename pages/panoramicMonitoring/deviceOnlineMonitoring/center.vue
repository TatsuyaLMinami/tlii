<template>
  <div style="height: 100%; width: 100%">
    <div id="omMap" :style="style">
      <div class="epgis-control-container"></div>
      <div class="layers">
        <el-button size="small" @click="showDialog">监测数据 </el-button>
        <el-button size="small" @click="showTable" v-show="!tableVisible"
          >设备列表
        </el-button>
        <el-button size="small" @click="showChart" v-show="!echartVisible"
          >在线数据
        </el-button>
      </div>
    </div>
    <omDialog ref="omD"> </omDialog>
    <omTable ref="omT" @showTower="showTower" @closeTable="closeTable">
    </omTable>
    <omChart ref="omE" @closeChart="closeChart"> </omChart>
    <div class="omCenterTower" :style="style" v-show="towerVisible">
      <div
        class="echartContent"
        v-for="(item, index) in realTimeData"
        :key="index"
      >
        <div class="echartTitle">{{ item.title }}</div>
        <el-divider></el-divider>
        <div
          class="echartData"
          v-for="(realtime, index1) in item.realTime"
          :key="index1"
          style="display:inline;"
        >
          {{ realtime.name }}: {{ realtime.data }}{{ realtime.unit }}
        </div>
        <div class="echart">
          <div class="Charts">
            <div :id="item.id" :style="item.style"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="imageShow"
      style="
                position: absolute;
                left: 2px;
                top: 50px;
                background: white;
                padding: 10px;
            "
    >
      <el-image
        style="width: 250px; height: 150px"
        :src="imageUrl"
        :preview-src-list="[imageUrl]"
      >
      </el-image>
    </div>
  </div>
</template>
<script>
import monitorData from "@/store/tableItems/monitorData.js";
import $store from "@/store/data.js";
import omDialog from "./center/omDialog.vue";
import { common } from "@/tools/common.js";
import { setLineOption } from "@/tools/chartOption.js";
import omTable from "./center/omTable";
import omChart from "./center/omChart";
export default {
  name: "center",
  components: {
    omDialog,
    omTable,
    omChart
  },
  data() {
    return {
      realTimeData: monitorData,
      tableVisible: true,
      echartVisible: true,
      towerVisible: false,
      imageShow: false,
      imageUrl: "",
      //地图
      towerPointData: {
        type: "FeatureCollection",
        features: []
      },
      towerLineData: {
        type: "FeatureCollection",
        features: []
      },
      map: "",
      //地图服务
      serviceTask: ""
    };
  },
  computed: {
    style() {
      return { height: document.body.clientHeight - 154 + "px" };
    }
  },
  methods: {
    handleCloseTower() {
      this.towerVisible = false;
    },
    showChart() {
      this.echartVisible = true;
      this.$refs.omE.setData();
    },
    closeChart() {
      this.echartVisible = false;
    },
    showTable() {
      this.tableVisible = true;
      this.$refs.omT.setData();
    },
    closeTable() {
      this.tableVisible = false;
    },
    showDialog() {
      this.$refs.omD.setData();
    },
    //绘制地图
    drawEpgis() {
      let vm = this;
      if (epgis) {
        epgis.tokenTask
          .login(
            "321d20a810863a34925eace58b0865b6",
            "d82383fa19343fe5b856de10379ac214"
          )
          .then(function() {
            vm.map = new epgis.Map({
              container: "omMap", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
              style: "aegis://styles/aegis/Streets",
              zoom: 10,
              center: [...vm.towerPointData.features[0].geometry.coordinates],
              localIdeographFontFamily: "Microsoft YoHei",
              trackResize: true
            });

            vm.map.on("load", function() {
              // 初始化点
              vm.initPointFn();
              // 初始化线
              vm.initLineFn();
              // 图标点击事件
              vm.initPopupFn();
              setTimeout(() => {
                vm.setCenterFn(vm.towerPointData);
              }, 1000);
            });
            vm.map.on("click", function() {
              vm.clear();
            });
          });
      } else {
        this.$message.error("地图资源加载失败!");
      }
    },
    setCenterFn(data) {
      if (data.features.length) {
        let lngLat = data.features[0].geometry.coordinates;
        this.map.setZoom(12);
        this.map.setCenter(lngLat);
      }
    },
    // 加载底图样式
    loadStyle(value) {
      this.serviceTask = new epgis.ServiceTask();
      let vm = this;
      this.serviceTask
        .ajax({
          method: "GET",
          url: epgis.tokenTask.getStyleUrl(value)
        })
        .then(function(data) {
          var layers = data.layers;
          if (layers) {
            layers.forEach(function(item) {
              if (item.layout) {
                Object.keys(item.layout).forEach(function(key) {
                  vm.map.setLayoutProperty(
                    item.id.toString(),
                    key.toString(),
                    item.layout[key]
                  );
                });
              }
              if (item.paint) {
                Object.keys(item.paint).forEach(function(key) {
                  vm.map.setPaintProperty(
                    item.id.toString(),
                    key.toString(),
                    item.paint[key]
                  );
                });
              }
            });
          }
        });
    },
    // 设备图层杆塔数据
    loadTowerPointFn() {
      $axios({
        url: "/tpiim/indexEquipment/getTowerLayer",
        type: "get"
      })
        .then(res => {
          let features = [];
          if (res.resultValue.length === 0) {
            features.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [116.41076533, 39.90962118]
              },
              properties: {}
            });
          } else {
            for (let i = 0; i < res.resultValue.length; i++) {
              features.push({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    +res.resultValue[i].longitude,
                    +res.resultValue[i].latitude
                  ]
                },
                properties: {
                  name: res.resultValue[i].name,
                  id: res.resultValue[i].id
                }
              });
            }
          }
          this.towerPointData = {
            type: "FeatureCollection",
            features: features
          };
          this.drawEpgis();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 设备图层线路数据
    loadTowerLineFn() {
      $axios({
        url: "/tpiim/indexEquipment/getLineLayer",
        type: "get"
      })
        .then(res => {
          let features = [];
          for (let i = 0; i < res.resultValue.length; i++) {
            let obj = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: []
              },
              properties: {
                "line-color": res.resultValue[i].color
              }
            };
            for (let j = 0; j < res.resultValue[i].towers.length; j++) {
              obj.geometry.coordinates.push([
                +res.resultValue[i].towers[j].longitude,
                +res.resultValue[i].towers[j].latitude
              ]);
            }
            features.push(obj);
          }
          this.towerLineData = {
            type: "FeatureCollection",
            features: features
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化点
    initPointFn() {
      let vm = this;
      vm.map.loadImage(require("@/assets/icon/tower.png"), function(
        error,
        image
      ) {
        //添加图片到map，第一个参数为图片设置id
        let id = "towerPointOM";
        let imgid = "towerPointOM" + vm.randomNum();
        vm.map.addImage(imgid, image);
        vm.map.addLayer({
          id: id,
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: []
            }
          },
          layout: {
            // 为图层设置引用的图片ID
            "icon-image": imgid,
            "icon-size": 0.6,
            "icon-ignore-placement": true,
            "text-ignore-placement": false,
            // 自定义图标下显示的文字
            "text-field": "{name}",
            "text-size": 12,
            "text-anchor": "top",
            "text-allow-overlap": false,
            "icon-anchor": "bottom",
            "text-offset": [0, 0],
            "text-max-width": 8,
            "text-font": ["Microsoft YaHei Regular"]
          }
        });
        vm.map.getSource(id).setData(vm.towerPointData);
      });
    },
    // 图标点击事件
    initPopupFn() {
      let vm = this;
      vm.map.on("click", "towerPointOM", e => {
        let towerId = e.features[0].properties.id,
          towerName = e.features[0].properties.name;
        vm.getNowData(towerId);
        vm.getDeviceData(towerName);
        vm.getTowerPic(towerId);
      });
    },
    clear() {
      this.imageShow = false;
      this.towerVisible = false;
    },
    // 初始化线
    initLineFn() {
      let vm = this;
      let id = "towerLineOM" + vm.randomNum();
      vm.map.addLayer({
        id: id,
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        },
        paint: {
          "line-color": ["get", "line-color"],
          "line-width": 5,
          "line-opacity": 0.8,
          "line-offset": 5
        }
      });
      vm.map.getSource(id).setData(vm.towerLineData);
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    },
    showTower(towerId, towerName) {
      this.imageShow = false;
      this.towerVisible = false;
      this.getNowData(towerId);
      this.getDeviceData(towerName);
      this.getTowerPic(towerId);
    },
    getTowerPic(towerId) {
      let data = { towerId: towerId };
      let url = "/tpiim/monitoringDevice/getDevicePicByTowerId";
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            if (res.resultValue.length === 0) {
              this.clear();
            } else {
              this.imageUrl =
                $store.getters.url + res.resultValue[0].picFilePath;
              this.imageShow = true;
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getNowData(towerId) {
      const baseUrl = "/tpiim/realTimeMonitor/getRealTimeMonitorMsg";
      const url = `${baseUrl}?towerId=${towerId}`;
      $axios({ url: url, type: "get" })
        .then(res => {
          if (res.successful) {
            for (let key in res.resultValue) {
              if (res.resultValue[key]) {
                for (let i = 0; i < this.realTimeData.length; i++) {
                  for (
                    let j = 0;
                    j < this.realTimeData[i].realTime.length;
                    j++
                  ) {
                    if (
                      res.resultValue[key][
                        this.realTimeData[i].realTime[j].value
                      ]
                    ) {
                      this.realTimeData[i].realTime[j].data =
                        res.resultValue[key][
                          this.realTimeData[i].realTime[j].value
                        ];
                    }
                  }
                }
              } else {
              }
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getDeviceData(val) {
      let vm = this;
      const baseUrl = "/tpiim/realTimeMonitor/getMonitorTypeTotal";
      let now = new Date().getTime();
      let date = now - 7 * 24 * 3600 * 1000;
      let data = {
        startTime: date,
        endTime: now,
        towerName: val,
        pageSize: 10,
        pageNum: 1
      };
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            for (let i = 0; i < vm.realTimeData.length; i++) {
              var legend = {},
                xAxis = [],
                series = [],
                title = "";
              legend = {
                data: vm.realTimeData[i].legend,
                top: "2%",
                width: "350px"
              };
              if (res.resultValue[vm.realTimeData[i].model]) {
                vm.realTimeData[i].style = {
                  width: 400 + "px",
                  height: 300 + "px"
                };
                var model = res.resultValue[vm.realTimeData[i].model];
                for (
                  let j = 0;
                  j < model[vm.realTimeData[i].listweek].length;
                  j++
                ) {
                  model[vm.realTimeData[i].listweek][j] += "点";
                }
                xAxis = model[vm.realTimeData[i].listweek];
                for (let k = 0; k < vm.realTimeData[i].legend.length; k++) {
                  series.push({
                    name: vm.realTimeData[i].legend[k],
                    type: "line",
                    data: model[vm.realTimeData[i].monitorType[k]]
                  });
                }
              } else {
                vm.realTimeData[i].style = {
                  width: 400 + "px",
                  height: 30 + "px"
                };
              }
              setLineOption(legend, xAxis, series, title).then(data => {
                vm.$echarts
                  .init(document.getElementById(vm.realTimeData[i].id))
                  .setOption(data, true);
              });
            }
            vm.towerVisible = true;
          } else {
            vm.towerVisible = false;
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },
  watch: {
    $route() {
      this.loadTowerPointFn();
    }
  },
  mounted() {
    this.loadTowerPointFn();
  },
  created() {
    this.loadTowerLineFn();
  }
};
</script>

<style lang="less">
.omTable {
  bottom: 14px;
  position: absolute;
}
.circle {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
#omMap {
  height: 100%;
  min-width: calc(100% - 64px);
  .el-epgis {
    color: black;
    border-top: 0px;
    border-radius: 0px;
    width: 90px;
    margin-left: 0px !important;
  }
  .epgis-logo,
  .epgis-attribution {
    display: none;
  }
}
.layers {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
}
</style>
<style lang="less">
.omCenterTower {
  overflow-y: auto;
  overflow-x: hidden;
  width: 400px;
  background: white;
  top: 0;
  position: absolute;
  right: 0;
  .echartHeader {
    font-size: 12px;
    font-weight: bold;
    padding: 10px;
    /* padding: 10px; */
    background: #f7f7f7;
    color: black;
    .el-button {
      line-height: 22px;
      padding: 0;
      background: transparent;
      float: right;
      border: none;
    }
  }
  .echartContent {
    padding: 10px;
    .el-divider--horizontal {
      margin: 0;
    }
    .echartTitle {
      font-size: 12px;
      padding-left: 10px;
      font-weight: bold;
      border-left: 2px #087f7f solid;
      border-left-width: 5px;
      margin-bottom: 10px;
    }
    .echartData {
      font-size: 12px;
      font-weight: normal;
    }
  }
}
</style>
