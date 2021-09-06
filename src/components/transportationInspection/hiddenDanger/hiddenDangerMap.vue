<template>
  <div style="height: 100%; width: 100%">
    <div id="hdMap" :style="style">
      <div class="epgis-control-container">
        <div class="bottom-right">
          <div class="block">
            <div class="title">治理状态统计</div>
            <div
              class="content"
              v-for="(item, index) in natureTotal"
              :key="index"
            >
              <div class="des" style="width: 50%">
                {{ item.troubleLevelName }}
              </div>
              <div class="num" style="width: 50%">
                {{ item.troubleLevelTotal }}
              </div>
            </div>
          </div>
          <div class="block">
            <div class="title">隐患等级统计</div>
            <div
              class="content"
              v-for="(item, index) in stateTotal"
              :key="index"
            >
              <div class="des" style="width: 50%">
                {{ item.isCompleted }}
              </div>
              <div class="num" style="width: 20%">
                {{ item.stateTroubleNumber }}
              </div>
              <div class="cor" style="width: 25%">
                <el-image
                  style="width: 20px; height: 20px"
                  :src="item.src"
                ></el-image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <publicDetail ref="detail"> </publicDetail>
  </div>
</template>
<script>
import formItems from "@/store/formItems/transportationInspection/defect/d.js";
import publicDetail from "@/pages/public/publicDetail";
import $store from "@/store/data.js";
import mapData from "@/store/mapItems/hdData.js";
export default {
  name: "hiddenDangerMap",
  components: { publicDetail },
  data() {
    return {
      url: $store.getters.url,
      mapData: mapData,
      stateTotal: [],
      natureTotal: [],
      //首页地图
      map: "",
      //地图服务
      serviceTask: ""
    };
  },
  computed: {
    style() {
      return { height: document.body.clientHeight - 210 + "px" };
    }
  },
  methods: {
    setData() {
      const url = "/yangkai/ptmihdrecord/hdShow";
      $axios({ url: url, type: "post", data: {} })
        .then(data => {
          if (data.successful) {
            this.stateTotal = [];
            this.stateTotal.push(
              {
                isCompleted: "待治理",
                stateTroubleNumber: data.resultValue.stateTotal.notManagedTotal,
                src: require("@/assets/icon/tower-bad.png")
              },
              {
                isCompleted: "治理中",
                stateTroubleNumber:
                  data.resultValue.stateTotal.hiddenDangerTotal -
                  data.resultValue.stateTotal.managedTotal -
                  data.resultValue.stateTotal.notManagedTotal,
                src: require("@/assets/icon/tower-warn.png")
              },
              {
                isCompleted: "已治理",
                stateTroubleNumber: data.resultValue.stateTotal.managedTotal,
                src: require("@/assets/icon/tower.png")
              }
            );
            for (let i = 0; i < data.resultValue.list.length; i++) {
              for (let key in this.mapData) {
                if (
                  data.resultValue.list[i]["isCompletedName"] ===
                  this.mapData[key]["isCompletedName"]
                ) {
                  this.mapData[key].features.push({
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [
                        data.resultValue.list[i].longitude * 1,
                        data.resultValue.list[i].latitude * 1
                      ]
                    },
                    properties: {
                      data: data.resultValue.list[i]
                    }
                  });
                }
              }
            }
            this.natureTotal = data.resultValue.troubleLevelTotal;
            this.drawEpgis();
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //绘制地图
    drawEpgis() {
      let that = this;
      if (epgis) {
        epgis.tokenTask
          .login(
            "321d20a810863a34925eace58b0865b6",
            "d82383fa19343fe5b856de10379ac214"
          )
          .then(function() {
            that.map = new epgis.Map({
              container: "hdMap", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
              style: "aegis://styles/aegis/Streets",
              zoom: 9,
              center: [116.41076533, 39.90962118],
              localIdeographFontFamily: "Microsoft YoHei",
              trackResize: true
            });
            that.map.addControl(
              new epgis.ScaleControl({
                maxWidth: 80,
                unit: "metric"
              }),
              "bottom-left"
            );
            that.map.addControl(new epgis.NavigationControl(), "top-right");
            for (let key in that.mapData) {
              that.map.on("load", function(e) {
                that.addHiddenDangerLayer(
                  that.mapData[key].id,
                  that.mapData[key].features,
                  that.mapData[key].img
                );
              });
              that.map.on("click", that.mapData[key].id, function(e) {
                let row = JSON.parse(e.features[0].properties.data);
                that.getPic(row["objId"]).then(data => {
                  if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                      data[i].url = that.url + data[i].fileId;
                    }
                  }
                  row.imageUrl = data;
                  let label = Object.keys(row),
                    value = Object.values(row),
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
                  arr.push({
                    label: "隐患图片",
                    width: "100%",
                    img: "img",
                    value: data
                  });
                  that.$refs.detail.setData("隐患详情", { list: arr });
                });
              });
            }
          });
      } else {
        this.$message.error("地图资源加载失败!");
      }
    },
    getPic(objId) {
      return new Promise(function(resolve, reject) {
        const baseUrl = "/yangkai/ptmihdrecord/getById";
        const url = `${baseUrl}?objId=${objId}`;
        $axios({ url: url, type: "get" })
          .then(data => {
            if (data.successful) {
              resolve(data.resultValue.ptmiDefectFile);
            } else {
              console.error(data.resultHint);
              resolve(false);
            }
          })
          .catch(error => {
            console.error(error);
            resolve(false);
          });
      });
    },
    //添加缺陷图层
    addHiddenDangerLayer(id, features, imageName) {
      let vm = this;
      vm.map.loadImage(require("@/assets/icon/" + imageName), function(
        error,
        image
      ) {
        //添加图片到map，第一个参数为图片设置id
        let imgid = "defectImage" + vm.randomNum();
        vm.map.addImage(imgid, image);
        vm.map.addLayer({
          id: id,
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: features
            }
          },
          layout: {
            // 为图层设置引用的图片ID
            "icon-image": imgid,
            "icon-size": 0.6,
            "icon-ignore-placement": true,
            "text-ignore-placement": false
          }
        });
      });
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    },
    // 加载底图样式
    loadStyle(value) {
      this.serviceTask = new epgis.ServiceTask();
      let that = this;
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
                  that.map.setLayoutProperty(
                    item.id.toString(),
                    key.toString(),
                    item.layout[key]
                  );
                });
              }
              if (item.paint) {
                Object.keys(item.paint).forEach(function(key) {
                  that.map.setPaintProperty(
                    item.id.toString(),
                    key.toString(),
                    item.paint[key]
                  );
                });
              }
            });
          }
        });
    }
  }
};
</script>

<style lang="less">
#hdMap {
  //height:calc(100% - 50px);
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
  .bottom-right {
    text-align: center;
    bottom: 0px;
    position: absolute;
    z-index: 200;
    right: 0;
    width: 140px;
    .el-collapse-item__content {
      padding-bottom: 0px;
    }
  }
  .block {
    border-bottom: 1px white solid;
    .title {
      font-size: 14px;
      background: rgba(0, 0, 0, 0.5);
      color: white !important;
      line-height: 25px;
      height: 25px;
    }
    .content {
      height: 20px;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 13px;
      text-align: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      padding: 3px;
    }
  }
}
</style>
