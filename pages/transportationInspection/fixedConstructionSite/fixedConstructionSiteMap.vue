<template>
  <div style="height: 100%; width: 100%">
    <div id="fcsMap" :style="style">
      <div class="epgis-control-container">
        <div class="bottom-right">
          <div class="block">
            <div class="title">施工状态统计</div>
            <div class="content">
              <div class="des" style="width: 50%">
                施工中:
              </div>
              <div class="num" style="width: 20%">
                {{ fsIng.length }}
              </div>
              <div class="cor" style="width: 25%">
                <el-image
                  style="width: 20px; height: 20px"
                  :src="fsIngImg"
                ></el-image>
              </div>
            </div>
            <div class="content">
              <div class="des" style="width: 50%">
                已结束:
              </div>
              <div class="num" style="width: 20%">
                {{ fsEd.length }}
              </div>
              <div class="cor" style="width: 25%">
                <el-image
                  style="width: 20px; height: 20px"
                  :src="fsEdImg"
                ></el-image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "fixedConstructionSiteMap",
  data() {
    return {
      fsEdImg: require("@/assets/icon/fs-ed.png"),
      fsIngImg: require("@/assets/icon/fs-ing.png"),
      //首页地图
      map: "",
      fsEd: [],
      fsIng: [],
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
      const url = "/yangkai/selffixedconstructionpoint/showConstructionPoint";
      $axios({ url: url, type: "get" })
        .then(data => {
          if (data.successful) {
            let fsEd = [],
              fsIng = [];
            for (let key in data.resultValue) {
              if (data.resultValue[key].isOver === 0) {
                fsEd.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      data.resultValue[key].longitude * 1,
                      data.resultValue[key].latitude * 1
                    ]
                  }
                });
              } else {
                fsIng.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      data.resultValue[key].longitude * 1,
                      data.resultValue[key].latitude * 1
                    ]
                  }
                });
              }
            }
            this.fsIng = fsIng;
            this.fsEd = fsEd;
            this.drawEpgis();
          } else {
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
              container: "fcsMap", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
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
            that.map.on("load", function(e) {
              that.addFsLayer("fsIngId", that.fsIng, "fs-ing.png");
              that.addFsLayer("fsEdId", that.fsEd, "fs-ed.png");
            });
          });
      } else {
        this.$message.error("地图资源加载失败!");
      }
    },
    //添加缺陷图层
    addFsLayer(id, features, imageName) {
      let vm = this;
      vm.map.loadImage(require("@/assets/icon/" + imageName), function(
        error,
        image
      ) {
        //添加图片到map，第一个参数为图片设置id
        let imgid = "fsImage" + vm.randomNum();
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
#fcsMap {
  height: 100%;
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
