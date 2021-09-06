<template>
  <div class="baseStyle taskRight">
    <div
      style="
                border: 1px solid #eee;
                width: calc(70% - 2px);
                height: calc(100% - 2px);
                display: flex;
                flex-wrap: wrap;
            "
    >
      <div id="taskImage"></div>
      <el-pagination
        style="left: 34%"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next, jumper"
        :total="totalPages"
      >
      </el-pagination>
    </div>
    <div
      style="
                border: 1px solid #eee;
                width: calc(30% - 2px);
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
            "
    >
      <el-form :model="formData">
        <div style="margin-top: 10px">缺陷详情:</div>
        <div
          style="
                        overflow-x: auto;
                        white-space: nowrap;
                    "
        >
          任务名称:{{ formData.name }}<br />
          设备名称:{{ formData.deviceName }}<br />
          <!-- 巡视线路:{{ formData.lineName }}<br /> -->
          <!-- 所属线路:{{ form.lineName }}<br /> -->
        </div>
      </el-form>
      <el-table
        style="margin-top: 10px; overflow-y: auto"
        height="500"
        stripe
        :data="tableData"
        border
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="defectType"
          label="缺陷类型"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="state"
          label="状态"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import $store from "@/store/data.js";
import AILabel from "ailabel";
export default {
  name: "taskRight",
  props: ["image", "points", "form", "table", "totalPages", "info"],
  data() {
    return {
      url: $store.getters.url,
      token: sessionStorage.getItem("token"),
      formLabelWidth: "120px",
      gMap: "",
      dialogFormVisible: false,

      imageData: {},
      pointsData: [],
      formData: {},
      tableData: [],
      //分页数据
      currentPage: 1,
      //totalPages: 0,
      pageSize: 1
    };
  },
  watch: {
    image: {
      handler() {
        this.imageData = JSON.parse(JSON.stringify(this.image));
        this.drawImage(this.imageData);
      },
      deep: true
    },
    form: {
      handler() {
        this.formData = JSON.parse(JSON.stringify(this.form));
      },
      deep: true
    },
    table: {
      handler() {
        this.tableData = JSON.parse(JSON.stringify(this.table));
      },
      deep: true
    }
  },
  methods: {
    updateData() {
      this.handleClose();
      this.$emit("updateData");
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    createTask() {
      this.dialogFormVisible = true;
    },
    drawImage(image) {
      let that = this;
      // 常用样式声明
      const gFetureStyle = new AILabel.Style({
        strokeColor: "#0000FF",
        lineWeight: 2
      });
      // js声明-容器声明（参数：zoom: 缩放比; {cx: cy:}：初始中心点位置；zoomMax、zoomMin：缩放的比例限制）
      this.gMap = new AILabel.Map("taskImage", {
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
        "taskImg",
        image.imageUrl,
        { w: image.imageWidth, h: image.imageHeight },
        { zIndex: 1 }
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
      for (let i = 0; i < image.points.length; i++) {
        const bounds = AILabel.Util.getBounds(image.points[i]);
        const leftTopPoint = bounds[0]; // 边界左上角坐标
        let fea = new AILabel.Feature.Rect(
          "feature" + "-" + that.randomNum(),
          bounds,
          {
            name: "",
            text: i + 1,
            textId: i,
            textLayerId: textLayerId,
            featureLayerId: featureLayerId
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
    getImage(pageNum) {
      $axios({
        url: "/yangkai/selfVideoTask/getVideoTypeList",
        type: "post",
        data: {
          name: this.info.name,
          objId: this.info.objId,
          type: this.info.objType,
          pageNum: pageNum
          //pageSize: 1,
        }
      })
        .then(res => {
          if (res.successful) {
            let result = res.resultValue.data,
              table = [],
              points = [];
            for (let i = 0; i < result.length; i++) {
              table.push({
                defectType: result[i].defectType,
                state: result[i].state
              });
              points.push([
                {
                  x: result[i].leftBelowX,
                  y: result[i].leftBelowY
                },
                {
                  x: result[i].rightBelowX,
                  y: result[i].rightBelowY
                },
                {
                  x: result[i].rightX,
                  y: result[i].rightY
                },
                {
                  x: result[i].leftX,
                  y: result[i].leftY
                }
              ]);
            }
            this.tableData = table;
            this.formData = {
              name: result[0].name,
              deviceName: result[0].deviceName
            };
            this.drawImage({
              imageUrl: this.url + result[0].imagePath,
              imageWidth: result[0].picWidth,
              imageHeight: result[0].picHeight,
              points: points
            });
            let val = {
              info: {
                name: node.data.objName,
                objId: node.data.objId,
                type: node.data.objType
              },
              table: table,
              form: {
                name: result[0].name,
                deviceName: result[0].deviceName
              },
              totalPages: res.resultValue.total
            };
          } else {
            //this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getImage(val);
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    }
  }
};
</script>
<style lang="less">
.taskRight {
  #taskImage {
    width: 100%; // 必须
    height: calc(100% - 40px); // 必须
    position: relative; // 必须
    //border: 1px solid red;
    cursor: pointer;
  }
  .el-input--small .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-table td,
  .el-table th {
    padding: 5px 0px;
  }
}
</style>
