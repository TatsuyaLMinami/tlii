<template>
  <div class="baseStyle" style="height: 100%; width: 100%">
    <div id="gridDisasterMap">
      <!--地质灾害图层切换按钮  -->
      <div class="gridDisasterLayer">
        <el-button
          v-for="(item, index) in gridDisasterData.disasterLayerType"
          :key="index"
          :type="layerBtnColor[item.type]"
          size="small"
          @click="loadFn(item.type)"
          >{{ item.title }}专题
        </el-button>
      </div>
      <!-- 地质灾害 历史数据查询 -->
      <div class="gridDisasterLayer-but" v-show="showDate">
        <div style="">
          <el-date-picker
            style="width: 250px"
            size="small"
            value-format="timestamp"
            v-model="searchDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button
            size="small"
            type="primary"
            @click="searchHistory(0)"
            icon="el-icon-search"
          ></el-button>
        </div>
        <el-button
          v-for="(item, index) in disasterLayerBut"
          v-show="item.show"
          :key="index"
          type="primary"
          size="small"
          @click="searchHistory(item.date)"
          >{{ item.title }}
        </el-button>
      </div>
      <!-- 地质灾害 统计、历史数据查询 按钮-->
      <div class="gridDisasterLayer-link">
        <el-button
          v-for="(item, index) in gridDisasterData.disasterLayerType"
          v-show="layerBtnColor[item.type]"
          :key="index"
          circle
          size="small"
          @click="showInfo(item.type, '', '')"
          >{{ item.title1 }}<br />{{ item.title2 }}
        </el-button>
      </div>
      <!-- 气象数据框及动画效果-->
      <publicTransition ref="wt" @showWeather="showWeather"></publicTransition>
      <!-- 地质灾害详情数据 -->
      <dialogDetail ref="dialogDetail"> </dialogDetail>
      <!-- 未来24小时天气预报信息 -->
      <dialogWeather ref="dialogWeather"></dialogWeather>
      <!-- 地质灾害 统计、历史数据查询 按钮-->
      <dialogInfo ref="dialogInfo"></dialogInfo>
    </div>
  </div>
</template>

<script>
import publicTransition from "@/pages/public/publicTransition";
import gridDisasterData from "@/store/chartItems/gridDisasterData.js";
import { setLineOption } from "@/tools/chartOption";
import dialogWeather from "./gridDisaster/dialogWeather.vue";
import dialogInfo from "./gridDisaster/dialogInfo.vue";
import dialogDetail from "./gridDisaster/dialogDetail.vue";
const actions = ["fire", "ice", "thunder", "typhoon", "wave", "disaster"];
export default {
  name: "gridDisaster",
  components: {
    publicTransition,
    dialogDetail,
    dialogWeather,
    dialogInfo
  },
  data() {
    return {
      //定时变换线路颜色
      alarm: "",
      index: 0,
      lineData: {},
      formLabelWidth: "80px",
      searchDate: "",
      disasterLayer: "",
      showDate: false,
      layerBtnColor: {
        fire: "",
        ice: "",
        thunder: "",
        typhoon: "",
        wave: "",
        disaster: ""
      },
      gridDisasterData: gridDisasterData,
      disasterLayerBut: gridDisasterData.disasterLayerBut,
      //地图  数据
      towerPointData: {
        type: "FeatureCollection",
        features: []
      },
      lineData: {
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
    showThree: {
      get() {
        return this.showThree;
      },
      set(value) {
        this.disasterLayerBut[1].show = value;
      }
    },
    showFifteen: {
      get() {
        return this.showFifteen;
      },
      set(value) {
        this.disasterLayerBut[3].show = value;
      }
    },
    showThirty: {
      get() {
        return this.showThirty;
      },
      set(value) {
        this.disasterLayerBut[4].show = value;
      }
    }
  },
  methods: {
    //24小时气象数据
    showWeather(id) {
      this.$refs.dialogWeather.setData(id);
    },
    //灾害告警统计信息
    showInfo(type, startTime, endTime) {
      this.$refs.dialogInfo.setData(type, startTime, endTime);
    },
    // 图标点击事件
    initPopupFn() {
      let vm = this;
      vm.map.on("click", vm.disasterLayer, e => {
        vm.$refs.dialogDetail.setData(vm.disasterLayer, e);
      });
    },
    //灾害位置图层
    loadFn(type) {
      if (this.disasterLayer === type) {
        return;
      } else {
        this.layerBtnColor = {
          fire: "",
          ice: "",
          thunder: "",
          typhoon: "",
          wave: "",
          disaster: ""
        };
        this.layerBtnColor[type] = "primary";
        this.showDate = true;
        this.disasterLayer = type;
        if (type === "ice" || type === "wave") {
          this.showThree = true;
          this.showFifteen = false;
          this.showThirty = false;
        }
        if (
          type === "fire" ||
          type === "thunder" ||
          type === "typhoon" ||
          type === "disaster"
        ) {
          this.showThree = false;
          this.showFifteen = true;
          this.showThirty = true;
        }
        this.clearLayer();
        this.setLayer(type, "", "");
      }
    },
    //清除所有灾害图层
    clearLayer() {
      for (let i = 0; i < actions.length; i++) {
        if (this.map.getLayer(actions[i])) {
          this.map.removeLayer(actions[i]);
        }
        if (this.map.getLayer(actions[i] + "Point")) {
          this.map.removeLayer(actions[i] + "Point");
        }
        if (this.map.getLayer(actions[i] + "Line")) {
          this.map.removeLayer(actions[i] + "Line");
        }
        if (this.map.getSource(actions[i])) {
          this.map.removeSource(actions[i]);
        }
        if (this.map.getSource(actions[i] + "Line")) {
          this.map.removeSource(actions[i] + "Line");
        }
        if (this.map.getSource(actions[i] + "Point")) {
          this.map.removeSource(actions[i] + "Point");
        }
      }
    },
    //灾害位置图层
    setLayer(type, startTime, endTime) {
      let url = gridDisasterData.disasterUrl[type][1],
        data = {
          startTime: startTime,
          endTime: endTime
        };
      this.loadLayer(type, url, data);
    },
    //获取图层数据
    loadLayer(type, url, data) {
      //清除定时器
      clearInterval(this.alarm);
      if (type === "ice" || type === "wave") {
        this.loadIceWaveLayer(type, url, data);
      } else {
        this.loadTypeLayer(type, url, data);
      }
    },
    //覆冰及舞动图层数据
    loadIceWaveLayer(type, url, data) {
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          if (res.successful) {
            let featuresLine = [],
              featuresPoint = [],
              result = res.resultValue;
            if (result.length === 0) {
              this.$message.info("结果为空");
              //恢复设备图层
              this.map.getSource("colorLayer").setData(this.towerLineData);
            } else {
              for (let i = 0; i < result.length; i++) {
                let objLine = {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: []
                  },
                  properties: {}
                };
                objLine.geometry.coordinates.push(
                  [
                    result[i].startLongitude ||
                      result[i].coordinate[0].longitude,
                    result[i].startLatitude || result[i].coordinate[0].latitude
                  ],
                  [
                    result[i].endLongitude || result[i].coordinate[1].longitude,
                    result[i].endLatitude || result[i].coordinate[1].latitude
                  ]
                );
                featuresLine.push(objLine);
                result[i].monitotime =
                  this.$moment(result[i].monitotime)
                    .utcOffset(8)
                    .format("YYYY-MM-DD HH:MM:SS") || "";
                result[i].longitude =
                  result[i].longitude || result[i].coordinate[2].longitude;
                result[i].latitude =
                  result[i].latitude || result[i].coordinate[2].latitude;
                featuresPoint.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [result[i].longitude, result[i].latitude]
                  },
                  properties: {
                    ...result[i]
                  }
                });
              }
              this.lineData = {
                type: "FeatureCollection",
                features: featuresLine
              };
              let dataPoint = {
                type: "FeatureCollection",
                features: featuresPoint
              };
              this.alarm = setInterval(this.flash, 500);
              this.loadLayers(type, dataPoint);
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //台风图层数据
    loadTyphoonLayer(features, points, result) {
      for (let i = 0; i < result.length; i++) {
        let point = [],
          items = result[i].items;
        for (let j = 0; j < items.length; j++) {
          (items[j].longitude = items[j].centerLongitude || ""),
            (items[j].latitude = items[j].centerLatitude || "");
          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [items[j].longitude, items[j].latitude]
            },
            properties: {
              ...items[j],
              "circle-radius": items[j].windCircleRadius
            }
          });
          point.push([longitude, latitude]);
        }
        points.push(point);
      }
      let data = {
        type: "FeatureCollection",
        features: features
      };
      this.loadLayers("typhoon", data, points);
    },
    //图层数据
    loadTypeLayer(type, url, data) {
      //恢复设备图层
      this.map.getSource("colorLayer").setData(this.towerLineData);
      if (type === "typhoon") {
        this.loadTyphoonLayer([], [], []);
      }
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          if (res.successful) {
            let features = [],
              //每个台风的坐标
              //所有台风的坐标，嵌套point
              points = [],
              result = res.resultValue;
            if (result.length === 0) {
              this.$message.info("结果为空");
            } else {
              if (type === "typhoon") {
                this.loadTyphoonLayer(features, points, result);
              } else {
                for (let i = 0; i < result.length; i++) {
                  (result[i].longitude = result[i].longitude || ""),
                    (result[i].latitude = result[i].latitude || "");
                  result[i].monitotime =
                    this.$moment(result[i].monitotime)
                      .utcOffset(8)
                      .format("YYYY-MM-DD HH:MM:SS") || "";
                  features.push({
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [result[i].longitude, result[i].latitude]
                    },
                    properties: {
                      ...result[i]
                    }
                  });
                }
                let data = {
                  type: "FeatureCollection",
                  features: features
                };
                this.loadLayers(type, data, points);
              }
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //线路闪烁
    flash() {
      var colors = [],
        color = "";
      if (this.disasterLayer === "ice") {
        colors = ["#02A7F0", "white"];
      } else if (this.disasterLayer === "wave") {
        colors = ["#D9001B", "white"];
      }
      color = colors[this.index];
      this.index++;
      if (this.index === colors.length) {
        this.index = 0;
      }
      let lineData = JSON.parse(JSON.stringify(this.lineData));
      for (let i = 0; i < lineData.features.length; i++) {
        lineData.features[i].properties = {
          "line-color": color
        };
      }
      this.map.getSource("colorLayer").setData(lineData);
    },
    //灾害位置画图
    loadLayers(type, data, points) {
      if (type === "typhoon") {
        this.loadTyphoonLayers(data);
        this.loadTyphoonLineLayers(points);
      } else {
        this.drawImage(type, data);
      }
    },
    //台风图层画圆
    loadTyphoonLayers(data) {
      this.map.addLayer({
        id: "typhoon",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        },
        paint: {
          "circle-color": "rgb(156, 194, 209)",
          //圆虚化的程度。1 表示把圆虚化到只有圆心是不透明的。
          "circle-blur": ["get", "circle-blur"],
          //绘制圆的不透明度。
          "circle-opacity": ["get", "circle-opacity"],
          //圆的轮廓颜色
          //"circle-stroke-color": "rgb(0, 150, 136)",
          "circle-stroke-color": "white",
          "circle-stroke-width": 3,
          "circle-radius": ["get", "circle-radius"]
        }
      });
      this.map.addLayer({
        id: "typhoonPoint",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        },
        paint: {
          "circle-color": "blue",
          "circle-radius": 5
        }
      });
      this.map.getSource("typhoon").setData(data);
      this.map.getSource("typhoonPoint").setData(data);
      this.initPopupFn();
    },
    //台风图层画线
    loadTyphoonLineLayers(points) {
      let featuresLine = [],
        typhoonLineData = {},
        objLine = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: []
          },
          properties: {
            "line-dasharray": [2, 2],
            "line-color": "#ed6498"
          }
        };
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          if (points[i].length > 1) {
            objLine.geometry.coordinates.push([points[i][j], points[i][j + 1]]);
          } else {
            objLine.geometry.coordinates.push([points[i][j]]);
          }
        }
        featuresLine.push(objLine);
      }
      typhoonLineData = {
        type: "FeatureCollection",
        features: featuresLine
      };
      this.map.addLayer({
        id: "typhoonLine",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        },
        paint: {
          "line-dasharray": [2, 2],
          "line-color": "#ed6498",
          "line-width": 5,
          "line-gap-width": 0,
          "line-blur": 0,
          "line-opacity": 0.8
          //"line-offset": 5,
        }
      });
      this.map.getSource("typhoonLine").setData(typhoonLineData);
    },
    //历史山火点位置
    searchHistory(date) {
      let now = "",
        history = "";
      if (date === 0) {
        if (!this.searchDate) {
          return false;
        } else {
          now = this.searchDate[1];
          history = this.searchDate[0];
        }
      } else if (date === 1) {
        now = "";
        history = "";
      } else {
        now = new Date().getTime();
        history = now - date * 1 * 24 * 60 * 60 * 1000;
      }
      this.clearLayer();
      this.setLayer(this.disasterLayer, history, now);
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
              container: "gridDisasterMap", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
              style: "aegis://styles/aegis/Streets",
              zoom: 10,
              center: [...vm.towerPointData.features[0].geometry.coordinates],
              localIdeographFontFamily: "Microsoft YoHei",
              trackResize: true
            });

            vm.map.on("load", function() {
              vm.initPointFn();
              // 设备图层-杆塔
              //vm.loadTowerPointFn();
              // 设备图层-线路
              vm.loadTowerLineFn();
              // 图标点击事件
              //vm.initPopupFn();
              setTimeout(() => {
                vm.setCenterFn(vm.towerPointData);
              }, 1000);
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
          if (res.successful) {
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
          } else {
            this.$message.error(res.resultHint);
          }
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
          if (res.successful) {
            let features = [];
            for (let i = 0; i < res.resultValue.length; i++) {
              let obj = {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: []
                },
                properties: {
                  "line-color": res.resultValue[i].color,
                  "line-dasharray": []
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

            this.initLineFn();
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化点
    initPointFn() {
      this.drawImage("tower", this.towerPointData);
    },
    // 初始化线
    initLineFn() {
      this.drawLine("gridDisaster", this.towerLineData);
      this.drawLine("colorLayer", this.towerLineData);
    },
    //画线
    drawLine(id, data) {
      this.map.addLayer({
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
          "line-gap-width": 0,
          "line-blur": 0,
          "line-opacity": 0.8,
          "line-offset": 5
          //"line-dasharray": ["get", "line-dasharray"],//控制虚线的疏密
        }
      });
      this.map.getSource(id).setData(data);
    },
    //画图标
    drawImage(type, data) {
      let vm = this;
      this.map.loadImage(require("@/assets/icon/" + type + ".png"), function(
        error,
        image
      ) {
        //添加图片到map，第一个参数为图片设置id
        let imgid = type + vm.randomNum();
        vm.map.addImage(imgid, image);
        vm.map.addLayer({
          id: type,
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: []
            }
          },
          layout: {
            "icon-image": imgid,
            "icon-size": 0.8,
            "icon-ignore-placement": true,
            "text-ignore-placement": false,
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
        vm.map.getSource(type).setData(data);
        vm.initPopupFn();
      });
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    }
  },
  watch: {
    $route() {
      this.clearLayer();
      this.loadTowerPointFn();
    }
  },
  updated() {
    this.$refs.wt.setData("实时气象信息", "weather");
  },
  mounted() {
    this.$refs.wt.setData("实时气象信息", "weather");
    this.loadTowerPointFn();
    clearInterval(this.alarm);
  }
};
</script>

<style lang="less">
.gridDisasterLayer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.gridDisasterLayer-but {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 10;
  width: 554px;
  display: flex;
  justify-content: space-between;
}

.gridDisasterLayer-link {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
}

#gridDisasterMap {
  .disasterDetail {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  height: 100%;
  min-width: calc(100% - 64px);

  .el-dialog .el-dialog__body {
    flex-wrap: wrap;
    padding: 10px;
    display: flex;

    .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 10px 0;
    }

    .el-divider--vertical {
      display: inline-block;
      width: 1px;
      height: 400px;
      margin: 0 8px;
      vertical-align: middle;
      position: relative;
    }
  }

  .weather {
    position: absolute;
    left: 250px;
    top: 50px;
    background: white;
    z-index: 10;
  }

  .el-epgis {
    color: black;
    border-top: 0px;
    border-radius: 0px;
    width: 90px;
    margin-left: 0px !important;
  }

  .toolBar {
    margin: 0;
    border-radius: 0px;
    background: deepskyblue;
  }

  .toolBar:not(:empty) {
    right: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    position: absolute;
    bottom: 0;
  }

  .toolBar > .el-checkbox-group {
    width: 130px;
  }

  .toolBar > .el-checkbox {
    color: black;
    height: 20px;
    padding: 5px;
    border-bottom: 1px solid white;
    width: 130px;
  }

  .toolBar > .el-checkbox-group > .el-checkbox {
    color: black;
    height: 20px;
    padding: 5px;
    border-bottom: 1px solid white;
    width: 130px;
  }

  .toolBar > button {
    border-bottom: solid 1px white;
  }

  .toolBar > button:active {
    box-shadow: 0 0 2px 2px rgba(0, 150, 255, 1);
    color: #0096ff;
  }

  .toolBar > button:focus:first-child {
    border-radius: 0px;
  }

  .toolBar > button:focus:last-child {
    border-radius: 0px;
  }

  .epgis-logo,
  .epgis-attribution {
    display: none;
  }
}
</style>
