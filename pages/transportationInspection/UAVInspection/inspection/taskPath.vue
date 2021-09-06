<template>
  <div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="1000px">
      <div class="main-style">
        <el-divider content-position="left">基本信息</el-divider>
        <div class="basic-info">
          <div class="info-item">
            <label class="info-item-left">巡视任务：</label>
            <span class="info-item-right">{{ formData.taskName }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">线路名称：</label>
            <span class="info-item-right">{{ formData.lineName }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">运维区段：</label>
            <span class="info-item-right">{{ formData.towerSection }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">任务执行时间：</label>
            <span class="info-item-right">{{
              formData.startTime 
            }}</span>
          </div>
          <div class="info-item">
            <label class="info-item-left">装备信息：</label>
            <span class="info-item-right">{{ formData.planeDetails }}</span>
          </div>
          <div class="info-item detail">
            <label class="info-item-left">任务详情：</label>
            <span class="info-item-right">{{ formData.taskDetails }}</span>
          </div>
          <div class="info-item detail">
            <label class="info-item-left">巡视图片：</label>
            <span class="info-item-img" v-for="(item, i) in taskImgs" :key="i">
              <img
                :src="basicPath + item.fileId"
                @click="bigImgFn(basicPath + item.fileId)"
              />
            </span>
          </div>
        </div>
        <el-divider content-position="left">巡视轨迹</el-divider>
        <div id="map"></div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import $store from "@/store/data.js"
export default {
  name: "",
  data() {
    return {
      map: null,
      dialogVisible: false,
      imgVisible: false,
      formData: {},
      taskImgs: [],
      basicPath: $store.getters.url,
      dialogImageUrl: "",
    };
  },
  methods: {
    initFn(row) {
      this.dialogVisible = true;
      this.drawEpgis(row.taskId);
      this.formData = row;
    },
    //绘制地图
    drawEpgis(taskId) {
      let that = this;
      if (epgis) {
        epgis.tokenTask
          .login(
            "321d20a810863a34925eace58b0865b6",
            "d82383fa19343fe5b856de10379ac214"
          )
          .then(function () {
            that.map = new epgis.Map({
              container: "map", //标准底图使用的是矢量切片，样式美观可定制，但是渲染性能消耗较多，暂时只推荐pc端使用
              style: "aegis://styles/aegis/Streets",
              zoom: 15,
              center: [116.41076533, 39.90962118],
              localIdeographFontFamily: "Microsoft YoHei",
              trackResize: true,
            });
            that.map.addControl(
              new epgis.ScaleControl({
                maxWidth: 80,
                unit: "metric",
              }),
              "bottom-left"
            );
            that.map.addControl(new epgis.NavigationControl(), "top-right");
            // 加载完成
            that.map.on("load", () => {
              that.loadData(taskId);
            });
          });
      } else {
        this.$message.error("地图资源加载失败!");
      }
    },

    loadData(taskId) {
      $axios({
        url: "/tpiim/uavInspectResult/getUavInspectPicByTaskId",
        type: "get",
        data: {
          taskId: taskId,
        },
      })
        .then((res) => {
          this.taskImgs = res.resultValue;
        })
        .catch((error) => {
          console.log(error);
        });
      $axios({
        url: "/tpiim/uavInspectResult/getUavLocationTracks",
        type: "get",
        data: {
          taskId: taskId,
          equipmentCode: "",
        },
      })
        .then((res) => {
          const coordinates = [];
          for (let i = 0; i < res.resultValue.length; i++) {
            let points = [
              res.resultValue[i].longitude,
              res.resultValue[i].latitude,
            ];
            coordinates.push(points);
          }

          this.drawLineFn(coordinates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    drawLineFn(coordinates) {
      this.map.setCenter(coordinates[0]);
      this.map.addLayer({
        id: "power-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates,
                },
              },
            ],
          },
        },
      });
      this.map.addLayer({
        id: "choicePoi",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        layout: {
          // 为图层设置引用的图片ID
          // "icon-image": "poi",
          // "icon-size": 1,
          // "icon-ignore-placement": true,
          // "text-ignore-placement": false,
          // 自定义图标下显示的文字
          "text-field": "{name}",
          "text-size": 12,
          "text-anchor": "top",
          "text-allow-overlap": false,
          "icon-anchor": "bottom",
          "text-offset": [0, 0],
          "text-max-width": 8,
          "text-font": ["Microsoft YaHei Regular"],
        },
        paint: {
          "text-color": "#f00",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 1.33333,
        },
      });

      this.map.getSource("choicePoi").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coordinates[0],
            },
            properties: {
              name: "起始点",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coordinates[coordinates.length - 1],
            },
            properties: {
              name: "终点",
            },
          },
        ],
      });
    },
    bigImgFn(path) {
      this.imgVisible = true;
      this.dialogImageUrl = path;
    },
  },
};
</script>
<style scoped>
.main-style {
  height: 65vh;
  overflow: auto;
}
#map {
  width: 90%;
  height: 500px;
  margin: auto;
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
</style>
