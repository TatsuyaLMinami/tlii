<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <irhTree @setLineName="setLineName"></irhTree>
      </el-aside>
      <el-container class="right">
        <irhRight
          :image="image"
          :points="points"
          :tableData="tableDataSmall"
          :form="form"
          @update="update"
        >
        </irhRight>
        <irhTable :lineName="lineName" @showDetail="showDetail"> </irhTable>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import $store from "@/store/data.js";
import irhTree from "./inspectionResultHandle/irhTree";
import irhRight from "./inspectionResultHandle/irhRight";
import irhTable from "./inspectionResultHandle/irhTable";
export default {
  name: "inspectionResultHandle",
  data() {
    return {
      lineName: "",
      url: $store.getters.url,
      image: "",
      points: [],
      tableDataSmall: [],
      form: {}
    };
  },
  components: {
    irhTree,
    irhRight,
    irhTable
  },
  methods: {
    setLineName(lineName) {
      this.lineName = lineName;
    },
    update(id) {
      let data = {
          taskId: id || ""
        },
        tableData = [],
        form = {},
        points = [],
        imageUrl = "",
        imageWidth = "",
        imageHeight = "",
        image = {},
        objId = "",
        num = 0;
      const baseUrl1 = "/yangkai/picDefectInfo/getDefectType";
      const url1 = `${baseUrl1}`;
      $axios({
        url: url1,
        type: "get",
        data: data
      })
        .then(res => {
          if (res.successful) {
            tableData = res.resultValue || [];

            if (tableData.length > 0) {
              imageUrl = this.url + tableData[0].imagePath;
              imageWidth = tableData[0].picWidth;
              imageHeight = tableData[0].picHeight;
              image = {
                imageUrl: imageUrl,
                imageWidth: imageWidth,
                imageHeight: imageHeight
              };
              objId = tableData[0].objId;
              for (let i = 0; i < tableData.length; i++) {
                tableData[i].edit = false;
                if (tableData[i].state === "已确认") {
                  points.push({
                    edit: false,
                    point: [
                      {
                        x: tableData[i].leftBelowX,
                        y: tableData[i].leftBelowY
                      },
                      {
                        x: tableData[i].rightBelowX,
                        y: tableData[i].rightBelowY
                      },
                      {
                        x: tableData[i].rightX,
                        y: tableData[i].rightY
                      },
                      {
                        x: tableData[i].leftX,
                        y: tableData[i].leftY
                      }
                    ]
                  });
                } else {
                  points.push({
                    edit: true,
                    point: [
                      {
                        x: tableData[i].leftBelowX,
                        y: tableData[i].leftBelowY
                      },
                      {
                        x: tableData[i].rightBelowX,
                        y: tableData[i].rightBelowY
                      },
                      {
                        x: tableData[i].rightX,
                        y: tableData[i].rightY
                      },
                      {
                        x: tableData[i].leftX,
                        y: tableData[i].leftY
                      }
                    ]
                  });
                }
                tableData[i].points = points;
              }
            }
            const baseUrl2 = "/yangkai/picDefectInfo/getDefectDetail";
            const url2 = `${baseUrl2}`;
            $axios({
              url: url2,
              type: "get",
              data: data
            })
              .then(res => {
                if (res.successful) {
                  form = res.resultValue;
                  form.objId = objId;
                  this.tableDataSmall = tableData;
                  this.form = form;
                  this.image = image;
                  this.points = points;
                } else {
                  this.tableDataSmall = tableData;
                  this.form = form;
                  this.image = image;
                  this.points = points;
                  this.$message.error(res.resultHint);
                }
              })
              .catch(error => {
                this.$message.error(error);
              });
          } else {
            this.tableDataSmall = tableData;
            this.form = form;
            this.image = image;
            this.points = points;
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    showDetail(tableData, form, image, points) {
      this.tableDataSmall = tableData;
      this.form = form;
      this.image = image;
      this.points = points;
    }
  }
};
</script>

<style lang="less">
.right {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
