<template>
  <div class="task-tree" :style="treeStyle">
    <el-tree
      accordion
      ref="taskTree"
      :props="props"
      :load="loadNode"
      @node-click="nodeClickFn"
      lazy
    >
    </el-tree>
  </div>
</template>

<script>
import $store from "@/store/data.js";
export default {
  name: "taskTree",
  data() {
    return {
      url: $store.getters.url,
      props: {
        label: "objName",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  computed: {
    treeStyle() {
      //return { height: 100 + "%" };
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([
          {
            objName: "监控任务",
            objType: "",
            objId: ""
          }
        ]);
      } else if (node.level === 1) {
        $axios({
          url: "/yangkai/selfVideoTask/getTimerTaskTree",
          type: "get"
        })
          .then(data => {
            if (data.successful) {
              let res = data.resultValue,
                arr = [];
              for (let i = 0; i < res.length; i++) {
                arr.push({
                  objName: res[i].name,
                  objType: res[i].type,
                  objId: res[i].objId
                });
              }
              resolve(arr);
            } else {
              this.$message.error(data.resultHint);
            }
          })
          .catch(error => {
            console.log("未知错误");
          });
      } else if (node.level === 2) {
        $axios({
          url: "/yangkai/selfVideoTask/getVideoTypeList",
          type: "post",
          data: {
            objId: node.data.objId,
            type: node.data.objType
          }
        })
          .then(res => {
            if (res.successful) {
              let result = res.resultValue,
                arr = [];
              for (let i = 0; i < result.length; i++) {
                arr.push({
                  objName: result[i].deviceName,
                  objType: result[i].type,
                  objId: result[i].objId
                });
              }
              resolve(arr);
            } else {
              this.$message.error(res.resultHint);
            }
          })
          .catch(error => {
            console.log("未知错误");
          });
      } else {
        return resolve([]);
      }
    },
    nodeClickFn(data, node) {
      if (node.level === 3) {
        $axios({
          url: "/yangkai/selfVideoTask/getVideoTypeList",
          type: "post",
          data: {
            name: node.data.objName,
            objId: node.data.objId,
            type: node.data.objType,
            pageNum: 1
            //pageSize:1
          }
        })
          .then(res => {
            if (res.successful) {
              let result = res.resultValue,
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
              let val = {
                info: {
                  name: node.data.objName,
                  objId: node.data.objId,
                  type: node.data.objType
                },
                image: {
                  imageUrl: this.url + result[0].imagePath,
                  imageWidth: result[0].picWidth,
                  imageHeight: result[0].picHeight,
                  points: points
                },
                table: table,
                form: {
                  name: result[0].name,
                  deviceName: result[0].deviceName
                },
                totalPages: res.resultValue.total
              };
              this.$emit("getImage", val);
            } else {
              //this.$message.error(data.resultHint);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
    }
  }
};
</script>
<style scoped>
.task-tree {
  border-right: 1px solid #eee;
  padding-right: 1px;
}
</style>
