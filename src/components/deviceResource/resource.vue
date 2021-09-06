<template>
  <div id="resourceMap">
    <div class="epgis-control-container">
      <publicTransition ref="d"></publicTransition>
      <div class="epgis-ctrl epgis-ctrl-group toolBar">
        <el-button
          v-for="(item, i) in layerBut.slice(0, 4)"
          :key="i"
          class="epgis-ctrl-icon el-epgis"
          type="text"
          style="border-radius: 0px"
          @click="handle(item.type)"
          >{{ item.title }}
        </el-button>
      </div>
    </div>
    <!-- 4图层按钮组 -->
    <div class="layers">
      <el-button
        v-for="(item, i) in layerBut.slice(4, 8)"
        :key="i"
        :type="item.color"
        size="small"
        @click="handle(item.type)"
      >
        {{ item.title }}
      </el-button>
    </div>
    <!-- 4图层联动按钮 -->
    <div class="layer-link">
      <el-button
        circle
        v-for="(item, i) in layerBut.slice(4, 8)"
        :key="i"
        v-show="item.color"
        size="small"
        @click="handleDialog(item.type)"
      >
        {{ item.title1 }}<br />{{ item.title2 }}
      </el-button>
    </div>
    <equipment ref="Equipment"></equipment>
    <state-popup ref="StatePopup"></state-popup>
    <work-popup-msg ref="WorkPopupMsg"></work-popup-msg>
    <project-popup-msg ref="ProjectPopupMsg"></project-popup-msg>
    <zi-yuan ref="device"></zi-yuan>
    <san-kua ref="theme"></san-kua>
    <zuo-ye ref="work"></zuo-ye>
    <jian-ce ref="state"></jian-ce>
  </div>
</template>

<script>
import Equipment from "./resource/Equipment";
import eventBus from "@/pages/common/eventBus";
//图标点击弹出层
import Vue from "vue";
import MapLabelWindow from "./resource/MapLabelWindow";
const WindowConstroctor = Vue.extend(MapLabelWindow);
import { common } from "@/tools/common.js";
import StatePopup from "./resource/StatePopup";
import WorkPopupMsg from "./resource/WorkPopupMsg";
import ProjectPopupMsg from "./resource/ProjectPopupMsg";
import ZiYuan from "./resource/fourPopup/ZiYuan";
import SanKua from "./resource/fourPopup/SanKua";
import ZuoYe from "./resource/fourPopup/ZuoYe";
import JianCe from "./resource/fourPopup/JianCe";
import publicTransition from "@/pages/public/publicTransition";
export default {
  name: "resource",
  data() {
    return {
      layerBut: [
        { title: "测距", type: "line" },
        { title: "测面", type: "area" },
        { title: "清空", type: "clear" },
        { title: "影像图", type: "image" },
        {
          title: "设备图层",
          title1: "资源",
          title2: "状态",
          type: "device",
          source1: "towerPoint",
          img1: "tower.png",
          source2: "towerLine",
          data1: {},
          data2: {},
          color: "primary"
        },
        {
          title: "作业图层",
          title1: "作业",
          title2: "状态",
          type: "work",
          source1: "workUav",
          img1: "task.png",
          source2: "workPeople",
          img2: "person.png",
          data1: {},
          data2: {},
          color: ""
        },
        {
          title: "状态图层",
          title1: "监测",
          title2: "告警",
          type: "state",
          source1: "towerPointBad",
          img1: "tower-bad.png",
          source2: "towerPointGood",
          img2: "tower.png",
          data1: {},
          data2: {},
          color: ""
        },
        {
          title: "专题图层",
          title1: "三跨",
          title2: "统计",
          type: "theme",
          source1: "spanLayer",
          img1: "threeCross.png",
          source2: "sgdLayer",
          img2: "construction.png",
          data1: {},
          data2: {},
          color: ""
        }
      ],
      showBoard: true,
      formLabelWidth: "120px",
      //首页地图
      map: "",
      //地图服务
      serviceTask: "",
      //画直线
      drawPolyline: "",
      drawPolylineArray: [],
      popupStartArray: [],
      popupDistanceArray: [],
      popupCloseArray: [],
      distance: 0,
      //面积
      drawPolygon: "",
      drawPolygonArray: [],
      popupAreaArray: [],
      popupAreaCloseArray: [],
      //图层
      hasImage: 0,
      // 弹出层
      popupInfoWindow: null
    };
  },
  components: {
    Equipment,
    StatePopup,
    WorkPopupMsg,
    ProjectPopupMsg,
    ZiYuan,
    SanKua,
    ZuoYe,
    JianCe,
    publicTransition
  },
  methods: {
    // 清除图层
    clearFourLayerFn() {
      if (this.popupInfoWindow) this.popupInfoWindow.remove();
      for (let key in this.layerBut.slice(4, 8)) {
        this.map.getSource(this.layerBut.slice(4, 8)[key].source1).setData({
          type: "FeatureCollection",
          features: []
        });
        this.map.getSource(this.layerBut.slice(4, 8)[key].source2).setData({
          type: "FeatureCollection",
          features: []
        });
      }
    },
    handleDialog(type) {
      this.$refs[type].initFn();
    },
    handle(type) {
      if (type === "line") {
        this.initLine();
        this.drawPolyline.startDraw();
      } else if (type === "area") {
        this.initArea();
        this.drawPolygon.startDraw();
      } else if (type === "clear") {
        this.clearFn();
      } else if (type === "image") {
        this.hasImage = this.addLayer(
          this.hasImage,
          "image-satellite",
          "Satellite512"
        );
      } else {
        this.clearFourLayerFn();
        for (let key in this.layerBut.slice(4, 8)) {
          this.layerBut.slice(4, 8)[key].color = "";
        }
        for (let key in this.layerBut.slice(4, 8)) {
          if (this.layerBut.slice(4, 8)[key].type === type) {
            this.layerBut.slice(4, 8)[key].color = "primary";
            this.map
              .getSource(this.layerBut.slice(4, 8)[key].source1)
              .setData(this.layerBut.slice(4, 8)[key].data1);
            this.map
              .getSource(this.layerBut.slice(4, 8)[key].source2)
              .setData(this.layerBut.slice(4, 8)[key].data2);
            this.setCenterFn(this.layerBut.slice(4, 8)[key].data1);
          }
        }
      }
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
              container: "resourceMap", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
              style: "aegis://styles/aegis/Streets",
              zoom: 10,
              center: [
                ...vm.layerBut[4].data1?.features[0]?.geometry?.coordinates
              ],
              localIdeographFontFamily: "Microsoft YoHei",
              trackResize: true
            });
            vm.map.on("load", function() {
              // 初始化点
              for (let key in vm.layerBut.slice(4, 8)) {
                vm.initPointFn(
                  vm.layerBut.slice(4, 8)[key].source1,
                  vm.layerBut.slice(4, 8)[key].img1
                );
                vm.initPointFn(
                  vm.layerBut.slice(4, 8)[key].source2,
                  vm.layerBut.slice(4, 8)[key].img2
                );
              }
              // 初始化线
              vm.initLineFn();
              // 图标点击事件
              vm.initPopupFn();
              setTimeout(() => {
                vm.handle("device");
              }, 1000);
            });
          });
      } else {
        this.$message.error("地图资源加载失败!");
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
    //添加图层
    addLayer(hasLayer, id, layer) {
      if (hasLayer === 0) {
        this.map.addLayer(
          {
            id: id,
            source: {
              type: "raster",
              url: "aegis://aegis.Satellite512",
              tileSize: window.devicePixelRatio >= 2 ? 256 : 512
            },
            type: "raster",
            minzoom: 0,
            maxzoom: 20
          },
          "Railway/1"
        );
        this.loadStyle("aegis://styles/aegis/" + layer, layer);
        this.layerBut[3].title = "矢量图";
        hasLayer = 1;
      } else if (hasLayer === 1) {
        this.loadStyle("aegis://styles/aegis/Streets");
        this.map.getLayer(id) &&
          this.map.removeLayer(id) &&
          this.map.removeSource(id);
        hasLayer = 0;
        this.layerBut[3].title = "影像图";
      }
      return hasLayer;
    },
    addPointLayer(id, cords, distance) {
      this.map.addLayer({
        id: id,
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: cords
                },
                properties: {
                  title: distance,
                  name: distance
                }
              }
            ]
          }
        },
        paint: {
          "circle-radius": 4,
          "circle-color": "#fff",
          "circle-stroke-color": "#4aabf7",
          "circle-stroke-width": 3
        }
      });
    },
    // 设备图层杆塔数据
    loadTowerPointFn(params) {
      return new Promise(function(resolve, reject) {
        $axios(params)
          .then(res => {
            let features = [],
              coordinates = [];
            for (let i = 0; i < res.resultValue.length; i++) {
              if (params.data) {
                if (params.data.mode === "artificial") {
                  coordinates = [
                    +res.resultValue[i].currentTower.longitude,
                    +res.resultValue[i].currentTower.latitude
                  ];
                } else if (params.data.mode === "uav") {
                  coordinates = [
                    +res.resultValue[i].startTower.longitude,
                    +res.resultValue[i].startTower.latitude
                  ];
                } else if (params.data.mode === "nb") {
                  coordinates = [
                    +res.resultValue[i].startTower.longitude,
                    +res.resultValue[i].startTower.latitude
                  ];
                  res.resultValue[i].name = res.resultValue[i].lineName;
                }
              } else {
                if (res.resultValue.length === 0) {
                  features.push({
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [116.41076533, 39.90962118]
                    },
                    properties: ""
                  });
                } else {
                  coordinates = [
                    +res.resultValue[i].longitude,
                    +res.resultValue[i].latitude
                  ];
                  res.resultValue[i].name =
                    res.resultValue[i].constructionSite ||
                    res.resultValue[i].name;
                }
                features.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: coordinates
                  },
                  properties: res.resultValue[i]
                });
              }
            }
            resolve({
              type: "FeatureCollection",
              features: features
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 设备图层线路数据
    loadTowerLineFn() {
      $axios({
        url: "/yangkai/indexEquipment/getLineLayer",
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
          this.layerBut[4].data2 = {
            type: "FeatureCollection",
            features: features
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCenterFn(data) {
      if (data.features.length) {
        let lngLat = data.features[0].geometry.coordinates;
        this.map.setZoom(12);
        this.map.setCenter(lngLat);
      }
    },
    // 初始化点
    initPointFn(id, imageName) {
      if (id === "towerLine") {
        return;
      }
      let vm = this;
      if (!vm.map.getSource(id)) {
        vm.map.loadImage(require("@/assets/icon/" + imageName), function(
          error,
          image
        ) {
          //添加图片到map，第一个参数为图片设置id
          let imgid = id + vm.randomNum();
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
        });
      }
    },
    // 图标点击事件
    initPopupFn() {
      let vm = this;
      //绑定点的弹窗
      vm.popupInfoWindow = new epgis.Popup({
        closeButton: false,
        closeOnClick: true,
        offset: {
          bottom: [0, -34]
        }
      });
      vm.map.on("click", "towerPoint", e => {
        let id = e.features[0].properties.id;
        vm.$refs.Equipment.initFn(id);
      });

      vm.map
        .on("mouseover", "workUav", e => {
          let features = e.features[0];
          vm.popupInfoWindow
            .setLngLat(features.geometry.coordinates)
            .setHTML(
              `<div><span style="color: #555;">巡检任务：</span>${features.properties.taskName}</div>`
            )
            .addTo(vm.map);
        })
        .on("mouseout", "workUav", e => {
          vm.popupInfoWindow.remove();
        })
        .on("click", "workUav", e => {
          vm.$refs.WorkPopupMsg.initFn(e.features[0].properties.id);
        });
      vm.map
        .on("mouseover", "workPeople", e => {
          let features = e.features[0];
          let currentTower = JSON.parse(features.properties.currentTower);
          vm.popupInfoWindow
            .setLngLat(features.geometry.coordinates)
            .setHTML(
              `
              <div><span style="color: #555;">人员姓名：</span>${features.properties.staffName}</div>
              <div><span style="color: #555;">当前任务进度：</span>${features.properties.rateOfProgress}</div>
              <div><span style="color: #555;">当前位置：</span>${currentTower.longitude},${currentTower.latitude}</div>
            `
            )
            .addTo(vm.map);
        })
        .on("mouseout", "workPeople", e => {
          vm.popupInfoWindow.remove();
        })
        .on("click", "workPeople", e => {
          vm.$refs.WorkPopupMsg.initFn(e.features[0].properties.id);
        });
      vm.map.on("click", "spanLayer", e => {
        vm.$refs.ProjectPopupMsg.initFn(e.features[0].properties.id, "span");
      });
      vm.map.on("click", "sgdLayer", e => {
        vm.$refs.ProjectPopupMsg.initFn(e.features[0].properties.id, "sgd");
      });
      vm.map.on("click", "towerPointGood", function(e) {
        let features = e.features[0];
        $axios({
          url: "/yangkai/indexStatus/getCountByTowerId",
          type: "post",
          data: {
            towerId: features.properties.id
          }
        })
          .then(res => {
            let popupData = res.resultValue;
            const domEl = new WindowConstroctor({
              el: document.createElement("div"),
              propsData: {
                popupData: popupData,
                towerId: features.properties.id
              }
            });
            domEl.show = true;
            vm.popupInfoWindow
              .setLngLat(features.geometry.coordinates)
              .setHTML("<div id='towerGoodPopup'></div>")
              .addTo(vm.map);
            document.querySelector("#towerGoodPopup").append(domEl.$el);
          })
          .catch(err => {
            console.log(err);
          });
      });
      vm.map.on("click", "towerPointBad", function(e) {
        let features = e.features[0];
        $axios({
          url: "/yangkai/indexStatus/getCountByTowerId",
          type: "post",
          data: {
            towerId: features.properties.id
          }
        })
          .then(res => {
            let popupData = res.resultValue;
            const domEl = new WindowConstroctor({
              el: document.createElement("div"),
              propsData: {
                popupData: popupData,
                towerId: features.properties.id
              }
            });
            domEl.show = true;
            vm.popupInfoWindow
              .setLngLat(features.geometry.coordinates)
              .setHTML("<div id='towerBadPopup'></div>")
              .addTo(vm.map);
            document.querySelector("#towerBadPopup").append(domEl.$el);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 初始化线
    initLineFn() {
      let vm = this;
      if (!vm.map.getSource("towerLine")) {
        vm.map.addLayer({
          id: "towerLine",
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
            //'line-dasharray':[4,4]
          }
        });
      }
    },
    clearFn() {
      for (let keyA in this.drawPolylineArray) {
        this.drawPolylineArray[keyA].clearData();
        for (let keyB in this.drawPolylineArray[keyA].options.featuresList) {
          for (let keyC in this.drawPolylineArray[keyA].options.featuresList[
            keyB
          ].geometry.coordinates) {
            let id =
              this.drawPolylineArray[keyA].options.featuresList[keyB].properties
                .id +
              this.drawPolylineArray[keyA].options.featuresList[keyB].geometry
                .coordinates[keyC][0];
            if (this.map.getLayer(id)) {
              this.map.removeLayer(id) && this.map.removeSource(id);
            }
          }
        }
      }
      for (let key in this.popupStartArray) {
        this.popupStartArray[key].remove();
      }
      for (let key in this.popupDistanceArray) {
        this.popupDistanceArray[key].remove();
      }
      for (let key in this.popupCloseArray) {
        this.popupCloseArray[key].remove();
      }
      for (let key in this.drawPolygonArray) {
        this.drawPolygonArray[key].clearData();
      }
      for (let key in this.popupAreaArray) {
        this.popupAreaArray[key].remove();
      }
      for (let key in this.popupAreaCloseArray) {
        this.popupAreaCloseArray[key].remove();
      }
    },
    initLine() {
      var vm = this;
      this.drawPolyline = new epgis.DrawPolylineHandler({
        map: this.map,
        enableEdit: false,
        featuresList: []
      });
      var popupStart = new epgis.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "bottom",
        className: "popupStart"
      });
      var popupClose = new epgis.Popup({
        closeButton: true,
        closeOnClick: false,
        anchor: "left",
        className: "popupClose"
      });
      // 添加节点
      this.drawPolyline.on("draw.polyline.addPoint", function(data) {
        var point1 = [data.currentPoint[0], data.currentPoint[1]],
          point2 = [data.lastPoint[0], data.lastPoint[1]];
        // 返回lastPoint: 前一个节点，currentPoint：当前节点
        if (point1[0] === point2[0] && point1[1] === point2[1]) {
          if (vm.map.getLayer(data.currentPoint[0])) {
          } else {
            vm.addPointLayer(
              (
                data.target.options.featuresList[0].properties.id +
                data.currentPoint[0]
              ).toString(),
              point1,
              "起点"
            );
            var div = document.createElement("div");
            div.className = data.target._currentDrawId;
            div.innerHTML = "起点";
            popupStart
              .setLngLat([data.currentPoint[0], data.currentPoint[1]])
              .setDOMContent(div)
              .addTo(vm.map);
            vm.popupStartArray.push(popupStart);
          }
        } else {
          var distance = epgis.GeometryUtil.distance(point1, point2),
            distanceData = "";
          vm.distance += distance;
          distanceData =
            vm.distance > 1000
              ? (vm.distance / 1000).toFixed(1) + "公里"
              : vm.distance.toFixed(0) + "米";
          if (vm.map.getLayer(data.currentPoint[0])) {
          } else {
            vm.addPointLayer(
              (
                data.target.options.featuresList[0].properties.id +
                data.currentPoint[0]
              ).toString(),
              point1,
              distanceData
            );
            var popupDistance = new epgis.Popup({
              closeButton: false,
              closeOnClick: false,
              anchor: "bottom",
              className: "popupDistance"
            });
            var div = document.createElement("div");
            div.className = data.target._currentDrawId;
            div.innerHTML = distanceData;
            popupDistance
              .setLngLat([data.currentPoint[0], data.currentPoint[1]])
              .setDOMContent(div)
              .addTo(vm.map);
            vm.popupDistanceArray.push(popupDistance);
          }
        }
      });
      // 画线结束
      this.drawPolyline.on("draw.polyline.end", function(data) {
        vm.distance = 0;
        vm.drawPolylineArray.push(vm.drawPolyline);
        popupClose
          .setLngLat([data.currentPoint[0], data.currentPoint[1]])
          .setHTML("")
          .addTo(vm.map);
        vm.popupCloseArray.push(popupClose);
        popupClose.on("close", function() {
          for (let key in vm.drawPolylineArray) {
            if (vm.drawPolylineArray[key].options.featuresList.length > 0) {
              if (
                vm.drawPolylineArray[key].options.featuresList[0].properties
                  .id === data.feature.properties.id
              ) {
                vm.drawPolylineArray[key].clearDataById(
                  data.feature.properties.id
                );
                vm.drawPolylineArray.splice(key, 1);
              }
            }
          }
          var div = document.getElementsByClassName(data.target._currentDrawId);
          for (var j = div.length - 1; j >= 0; j--) {
            document.body.appendChild(div[j]);
            div[j].parentNode.removeChild(div[j]);
          }
          var coordinates = data.feature.geometry.coordinates;
          for (let k = 0; k < coordinates.length; k++) {
            var id = data.feature.properties.id + coordinates[k][0];
            if (vm.map.getLayer(id)) {
              vm.map.removeLayer(id) && vm.map.removeSource(id);
            }
          }
        });
      });
    },
    initArea() {
      var vm = this;
      this.drawPolygon = new epgis.DrawPolygonHandler({
        map: vm.map,
        enableEdit: false,
        featuresList: []
      });
      var popupClose = new epgis.Popup({
        closeButton: true,
        closeOnClick: false,
        anchor: "left",
        className: "popupClose"
      });
      // 画面结束
      this.drawPolygon.on("draw.polygon.end", function(data) {
        if (vm.drawPolygon.getFeatures()[0]) {
          var cords = vm.drawPolygon.getFeatures()[0].geometry.coordinates[0],
            area = epgis.GeometryUtil.ringArea(cords), // 闭环二维数组
            areaData =
              area > 1000
                ? (area / 1000000).toFixed(1) + "平方公里"
                : area.toFixed(0) + "平米";
          var popupArea = new epgis.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: "bottom",
            className: "popupArea"
          });
          var div = document.createElement("div");
          div.className = data.target._currentDrawId;
          div.innerHTML = areaData;
          popupArea
            .setLngLat([data.currentPoint[0], data.currentPoint[1]])
            .setDOMContent(div)
            .addTo(vm.map);
          vm.popupAreaArray.push(popupArea);
          vm.drawPolygonArray.push(vm.drawPolygon);
          popupClose
            .setLngLat([data.currentPoint[0], data.currentPoint[1]])
            .setHTML("")
            .addTo(vm.map);
          vm.popupAreaCloseArray.push(popupClose);
          popupClose.on("close", function() {
            for (let key in vm.drawPolygonArray) {
              if (vm.drawPolygonArray[key].options.featuresList.length > 0) {
                if (
                  vm.drawPolygonArray[key].options.featuresList[0].properties
                    .id === data.feature.properties.id
                ) {
                  vm.drawPolygonArray[key].clearDataById(
                    data.feature.properties.id
                  );
                  vm.drawPolygonArray.splice(key, 1);
                }
              }
            }
            var div = document.getElementsByClassName(
              data.target._currentDrawId
            );
            for (var j = div.length - 1; j >= 0; j--) {
              document.body.appendChild(div[j]);
              div[j].parentNode.removeChild(div[j]);
            }
          });
        }
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
      this.loadTowerPointFn({
        url: "/yangkai/indexEquipment/getTowerLayer",
        type: "get"
      }).then(res => {
        this.layerBut[4].data1 = res;
        this.drawEpgis();
      });
    }
  },
  updated() {
    this.$refs.d.setData("消缺提醒", "defect");
  },
  mounted() {
    this.loadTowerPointFn({
      url: "/yangkai/indexEquipment/getTowerLayer",
      type: "get"
    }).then(res => {
      this.layerBut[4].data1 = res;
      this.drawEpgis();
      this.$refs.d.setData("消缺提醒", "defect");
    });
  },
  created() {
    eventBus.$on("backFn", params => {
      this.$nextTick(() => {
        this.$refs.StatePopup.initFn(params);
      });
    });
    // 设备图层-线路
    this.loadTowerLineFn();
    //作业图层-人
    this.loadTowerPointFn({
      url: "/yangkai/indexTask/getTodayTaskLayer",
      type: "get",
      data: {
        mode: "artificial"
      }
    }).then(res => {
      this.layerBut[5].data2 = res;
    });
    //作业图层-无人机
    this.loadTowerPointFn({
      url: "/yangkai/indexTask/getTodayTaskLayer",
      type: "get",
      data: {
        mode: "uav"
      }
    }).then(res => {
      this.layerBut[5].data1 = res;
    });
    //状态图层-有缺陷
    this.loadTowerPointFn({
      url: "/yangkai/indexStatus/getTodayMarkTowerLayer",
      type: "get"
    }).then(res => {
      this.layerBut[6].data1 = res;
    });
    //状态图层-无缺陷
    this.loadTowerPointFn({
      url: "/yangkai/indexStatus/getTodayNormalTowerLayer",
      type: "get"
    }).then(res => {
      this.layerBut[6].data2 = res;
    });
    //专题-三跨
    this.loadTowerPointFn({
      url: "/yangkai/indexTopic/getSpanLayer",
      type: "get",
      data: {
        mode: "nb"
      }
    }).then(res => {
      this.layerBut[7].data1 = res;
    });
    //专题-施工点
    this.loadTowerPointFn({
      url: "/yangkai/indexTopic/getConstructionPointLayer",
      type: "get"
    }).then(res => {
      this.layerBut[7].data2 = res;
    });
  }
};
</script>

<style lang="less">
#resourceMap {
  height: 100%;
  min-width: calc(100% - 64px);
  .popupStart,
  .popupDistance,
  .popupArea {
    padding-bottom: 5px;
    display: flex;
    .epgis-popup-tip {
      display: none;
    }
    .epgis-popup-content {
      background: wheat;
      padding: 1px 1px;
    }
  }
  .popupClose {
    padding-left: 25px;
    padding-bottom: 15px;
    display: flex;
    .epgis-popup-tip {
      display: none;
    }
    .epgis-popup-content {
      padding: 0;
    }
    .epgis-popup-close-button {
      font: inherit;
      right: 0px;
      top: 0px;
      font-size: 25px;
      background: orange;
      width: 19px;
      height: 19px;
      border-radius: 3px;
      outline: none;
      padding: 0px 0px;
    }
    .epgis-popup-close-button :hover {
      background: red;
    }
  }
  .el-epgis {
    color: black;
    border-top: 0px;
    border-radius: 0px;
    width: 60px;
    margin-left: 0px !important;
  }
  .toolBar {
    z-index: 1;
    margin: 0;
    border-radius: 0px;
    background: deepskyblue;
  }

  .toolBar:not(:empty) {
    position: absolute;
    box-shadow: none;
    right: 0;
    bottom: 0;
    width: 60px;
  }

  .toolBar > button {
    border-bottom: solid 1px white;
    padding: 5px;
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
  .layers {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
  }
  .layer-link {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 10;
  }
}
</style>
