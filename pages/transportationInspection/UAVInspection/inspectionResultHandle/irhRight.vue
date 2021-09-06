<template>
  <div class="irhRightStyle baseStyle">
    <div
      style="
                border: 1px solid #eee;
                width: 60%;
                height: 300px;
                display: flex;
                flex-wrap: wrap;
            "
    >
      <div id="inspectionImage"></div>
    </div>
    <div style="width: calc(40% - 2px); display: flex; flex-wrap: wrap">
      <div style="width: 100%;display: block;">
        <el-button
          type="primary"
          size="small"
          style="float:right"
          @click="checkImage"
          >巡视图像识重</el-button
        >
      </div>
      <el-form
        :model="form"
        style="margin-left: 85px; width: 335px; height: 90px"
      >
        <div>缺陷详情:</div>
        <div
          style="
                        overflow-x: auto;
                        white-space: nowrap;

                    "
        >
          图像名称:{{ form.picName }}<br />
          巡视任务:{{ form.taskName }}<br />
          巡视线路:{{ form.lineName }}<br />
          <!-- 所属线路:{{ form.lineName }}<br /> -->
        </div>
      </el-form>
      <div
        style="
                    width: 85px;
                    display: flex;
                    flex-wrap: wrap;
                    height: 130px;
                    margin-top: 57px;
                "
      >
        <el-button
          size="small"
          @click.native.prevent="clear"
          style="width: 80%; height: 35px; margin-left: 10px"
          >还 原</el-button
        >
        <el-button
          size="small"
          @click.native.prevent="remark"
          style="width: 80%; height: 35px"
          >重 标</el-button
        >
        <el-button
          style="width: 80%; height: 35px"
          size="small"
          type="primary"
          @click.native.prevent="handleCreate"
          >确 定</el-button
        >
      </div>
      <el-table
        style="width: 335px; overflow-y: auto"
        height="180"
        stripe
        :data="table"
        border
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="defectType"
          label="缺陷类型"
        >
          <template slot-scope="scope">
            <el-input
              size="small"
              v-if="scope.row.edit"
              v-model="scope.row.defectType"
              placeholder=""
            ></el-input>
            <span v-else>{{ scope.row.defectType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="state"
          label="状态"
        >
        </el-table-column>
      </el-table>
    </div>
    <checkImage
      @handleClose="handleCheckClose"
      :dialogTitle="dialogCheckTitle"
      :dialogFormVisible="dialogFormCheckVisible"
    >
    </checkImage>
  </div>
</template>

<script>
import checkImage from "./checkImage";
import AILabel from "ailabel";
export default {
  name: "irhRight",
  props: ["image", "points", "form", "tableData", "objId"],
  components: {
    checkImage
  },
  data() {
    return {
      dialogCheckTitle: "",
      dialogFormCheckVisible: false,
      token: sessionStorage.getItem("token"),
      formLabelWidth: "120px",
      gMap: "",
      pointsData: [],
      table: []
    };
  },
  watch: {
    totalPagesData() {
      this.totalPages = JSON.parse(JSON.stringify(this.totalPagesData));
    },
    image: {
      handler() {
        this.drawImage();
      },
      deep: true
    },
    points: {
      handler() {
        this.pointsData = JSON.parse(JSON.stringify(this.points));
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler() {
        this.table = JSON.parse(JSON.stringify(this.tableData));
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.drawImage();
  },
  methods: {
    handleCheckClose() {
      this.dialogFormCheckVisible = false;
    },
    checkImage() {
      this.dialogCheckTitle = "巡视图像识重";
      this.dialogFormCheckVisible = true;
    },
    drawImage() {
      let that = this;
      // 常用样式声明
      const gFetureStyle = new AILabel.Style({
        strokeColor: "#0000FF",
        lineWeight: 2
      });
      // js声明-容器声明（参数：zoom: 缩放比; {cx: cy:}：初始中心点位置；zoomMax、zoomMin：缩放的比例限制）
      this.gMap = new AILabel.Map("inspectionImage", {
        zoom: 1080,
        cx: 0,
        cy: 0,
        zoomMax: 650 * 10,
        zoomMin: 650 / 10,
        autoPan: true,
        drawZoom: true
      });
      // 图片层实例\添加//'http://192.168.4.237/picture/202011/20201117152004_defect.jpg'
      const gImageLayer = new AILabel.Layer.Image(
        "inspectionImg",
        that.image.imageUrl,
        {
          w: that.image.imageWidth,
          h: that.image.imageHeight
        },
        {
          zIndex: 1
        }
      );
      this.gMap.addLayer(gImageLayer);
      let featureLayerId = "featureLayer" + "-" + that.randomNum();
      let gFeatureLayer = new AILabel.Layer.Feature(featureLayerId, {
        zIndex: 2,
        transparent: true
      });
      this.gMap.addLayer(gFeatureLayer);
      let textLayerId = "textLayer" + "-" + that.randomNum();
      const textLayer = new AILabel.Layer.Text(textLayerId);
      this.gMap.addLayer(textLayer);
      for (let i = 0; i < this.points.length; i++) {
        const bounds = AILabel.Util.getBounds(this.points[i].point);
        const leftTopPoint = bounds[0]; // 边界坐上角坐标
        let fea = new AILabel.Feature.Rect(
          "feature" + "-" + that.randomNum(),
          bounds,
          {
            name: "",
            text: i + 1,
            textId: i,
            textLayerId: textLayerId,
            featureLayerId: featureLayerId,
            edit: this.points[i].edit
          },
          gFetureStyle
        );
        gFeatureLayer.addFeature(fea);
        let text = new AILabel.Text(
          i,
          {
            text: i + 1,
            pos: {
              x: leftTopPoint.x,
              y: leftTopPoint.y
            },
            offset: {
              x: -10,
              y: -10
            }
          },
          gFetureStyle
        );
        textLayer.addText(text);
      }
    },
    clear() {
      this.drawImage();
      this.pointsData = JSON.parse(JSON.stringify(this.points));
      this.table = JSON.parse(JSON.stringify(this.tableData));
    },
    remark() {
      let that = this;
      // 常用样式声明
      const gFetureStyle = new AILabel.Style({
        strokeColor: "#0000FF",
        lineWeight: 2
      });
      // 设置当前操作模式为‘drawRect’
      this.gMap.setMode("drawRect", gFetureStyle);

      this.gMap.events.on("geometryDrawDone", function(type, points) {
        let featureLayerId = "featureLayer" + "-" + that.randomNum();
        let gFeatureLayer = new AILabel.Layer.Feature(featureLayerId, {
          zIndex: 2,
          transparent: true
        });
        that.gMap.addLayer(gFeatureLayer);
        let textLayerId = "textLayer" + "-" + that.randomNum();
        const textLayer = new AILabel.Layer.Text(textLayerId);
        that.gMap.addLayer(textLayer);
        that.pointsData.push({
          edit: true,
          point: points
        });
        let textId = that.pointsData.length - 1;
        let fea = new AILabel.Feature.Rect(
          "feature" + "-" + that.randomNum(),
          points,
          {
            name: "",
            text: that.pointsData.length,
            textId: textId,
            textLayerId: textLayerId,
            featureLayerId: featureLayerId,
            edit: true
          },
          gFetureStyle
        );
        gFeatureLayer.addFeature(fea);
        let text = new AILabel.Text(
          textId,
          {
            text: that.pointsData.length,
            pos: {
              x: points[0].x,
              y: points[0].y
            },
            offset: {
              x: -10,
              y: -10
            }
          },
          gFetureStyle
        );
        textLayer.addText(text);
        that.table.push({
          defectType: "",
          state: "未确认",
          edit: true,
          points: {
            edit: true,
            point: points
          }
        });
      });
      this.gMap.events.on("geometryEditDone", function(
        type,
        activeFeature,
        points
      ) {
        if (!activeFeature.data.edit) return;
        activeFeature.update({
          points
        });
        activeFeature.show();
      });
      // feature-reset监听
      this.gMap.events.on("featureStatusReset", function() {
        that.gMap.mLayer.removeAllMarkers();
      });
      this.gMap.events.on("geometryEditing", function(type, feature, points) {
        if (!feature.data.edit) return;
        if (!that.gMap.mLayer) return;
        const marker = that.gMap.mLayer.getMarkerById(`marker-${feature.id}`);
        if (!marker) return;
        const bounds = AILabel.Util.getBounds(points);
        const leftTopPoint = bounds[0]; // 边界坐上角坐标
        marker.update({
          x: leftTopPoint.x,
          y: leftTopPoint.y
        });

        const textLayer = that.gMap.getLayerById(feature.data.textLayerId);
        const text = textLayer.getTextById(feature.data.textId);
        text.update({
          text: feature.data.text,
          pos: {
            x: leftTopPoint.x,
            y: leftTopPoint.y
          },
          offset: {
            x: -10,
            y: -10
          }
        });
        that.pointsData[feature.data.textId].point = points;
        that.pointsData[feature.data.textId].edit = true;
        that.table[feature.data.textId].points =
          that.pointsData[feature.data.textId];
      });
      this.gMap.events.on("featureSelected", function(feature) {
        let cFeature = feature;
        if (!cFeature.data.edit) return;
        // 删除按钮添加
        const featureBounds = cFeature.getBounds();
        const leftTopPoint = featureBounds[0]; // 边界坐上角坐标
        let deleteMarker = new AILabel.Marker(`marker-${cFeature.id}`, {
          src: require("@/assets/icon/delete.png"),
          x: leftTopPoint.x,
          y: leftTopPoint.y,
          offset: {
            x: 0,
            y: 0
          },
          featureId: cFeature.id
        });
        that.gMap.mLayer.addMarker(deleteMarker);
        deleteMarker.regEvent("click", function() {
          that.table.splice(cFeature.data.textId, 1);
          that.pointsData.splice(cFeature.data.textId, 1);
          var layers = that.gMap.getAllLayers();

          for (let i = 0; i < layers.length; i++) {
            if (layers[i].id.indexOf("featureLayer") >= 0) {
              layers[i].removeAllFeatures();
            }
            if (layers[i].id.indexOf("textLayer") >= 0) {
              layers[i].removeAllTexts();
            }
          }
          let featureLayerId = "featureLayer" + "-" + that.randomNum();
          let featureLayer = new AILabel.Layer.Feature(featureLayerId, {
            zIndex: 2,
            transparent: true
          });
          that.gMap.addLayer(featureLayer);
          let textLayerId = "textLayer" + "-" + that.randomNum();
          const textLayer = new AILabel.Layer.Text(textLayerId);
          that.gMap.addLayer(textLayer);
          if (that.pointsData.length > 0) {
            for (let i = 0; i < that.pointsData.length; i++) {
              let fea = new AILabel.Feature.Rect(
                "feature" + "-" + that.randomNum(),
                that.pointsData[i].point,
                {
                  name: "",
                  text: i + 1,
                  textId: i,
                  textLayerId: textLayerId,
                  featureLayerId: featureLayerId,
                  edit: that.pointsData[i].edit
                },
                gFetureStyle
              );
              featureLayer.addFeature(fea);
              let bounds = AILabel.Util.getBounds(that.pointsData[i].point);
              let leftTopPoint = bounds[0]; // 边界坐上角坐标
              let text = new AILabel.Text(
                i,
                {
                  text: i + 1,
                  pos: {
                    x: leftTopPoint.x,
                    y: leftTopPoint.y
                  },
                  offset: {
                    x: -10,
                    y: -10
                  }
                },
                gFetureStyle
              );
              textLayer.addText(text);
            }
          }
          // 对应删除标注层中删除（x）icon
          that.gMap.mLayer.removeAllMarkers();
        });
      });
      //}
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    },
    handleCreate() {
      let layers = this.gMap.getAllLayers();
      if (this.table.length > 0) {
        for (let i = 0; i < this.table.length; i++) {
          if (this.table[i].defectType === "") {
            this.$message.error("请填写缺陷类型");
            return false;
          }
        }
      }
      let signList = [];
      if (layers.length > 0) {
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].id.indexOf("featureLayer") >= 0) {
            let features = layers[i].getAllFeatures();
            let width = "",
              height = "",
              x = "",
              y = "",
              defectType = "";
            for (let j = 0; j < features.length; j++) {
              let points = features[j].points;
              x = points[0].x;
              y = points[0].y;
              width = points[1].x - points[0].x;
              height = points[0].y - points[2].y;
              signList.push({
                imageId: this.form.objId,
                defectType: "",
                x: x,
                y: y,
                width: Math.round(width),
                height: Math.round(height)
              });
            }
          }
        }
        for (let i = 0; i < this.table.length; i++) {
          signList[i].defectType = this.table[i].defectType;
        }
      }
      const baseUrl = "/yangkai/picDefectInfo/confirmDefectType";
      const url = `${baseUrl}`;
      $axios({
        url: url,
        type: "post",
        data: {
          signList: signList
        }
      })
        .then(res => {
          if (res.successful) {
            this.$emit("update", this.form.objId);
            this.$message.success(res.resultHint);
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>

<style lang="less">
.irhRightStyle {
  #inspectionImage {
    width: 100%; // 必须
    height: 300px; // 必须
    position: relative; // 必须
    //border: 1px solid red;
    cursor: pointer;
  }

  .el-input--small .el-input__inner {
    height: 28px;
    line-height: 28px;
  }

  width: 100%;
  height: 300px;
  display: flex;
  flex-wrap: wrap;

  .el-table td,
  .el-table th {
    padding: 5px 0px;
  }
}
</style>
