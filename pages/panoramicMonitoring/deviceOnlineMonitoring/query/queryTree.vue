<template>
  <div class="omQueryLines-tree" :style="treeStyle">
    <el-tree
      accordion
      ref="linesTree"
      :props="props"
      :load="loadNode"
      @node-click="nodeClickFn"
      lazy
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "linesTree",
  data() {
    return {
      props: {
        label: "objName",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  computed: {
    treeStyle() {
      return { height: document.body.clientHeight - 160 + "px" };
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        $axios({
          url: "/yangkai/line/getLineNameTreeList",
          type: "post",
          data: {
            objType: "line",
            objId: ""
          }
        }).then(data => {
          if (data.successful) {
            let result = data.resultValue;
            for (let i = 0; i < result.length; i++) {
              result[i].objName =
                result[i].objName +
                "(在运:" +
                result[i].workingDeviceCount +
                ")";
            }
            resolve(result);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else if (node.level === 1) {
        $axios({
          url: "/yangkai/line/getLineNameTreeList",
          type: "post",
          data: {
            objType: "tower",
            objId: node.data.objId
          }
        }).then(data => {
          if (data.successful) {
            let result = data.resultValue;
            for (let i = 0; i < result.length; i++) {
              result[i].objName =
                result[i].objName + "(总数:" + result[i].deviceCount + ")";
            }
            resolve(result);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else if (node.level === 2) {
        $axios({
          url: "/yangkai/monitoringDevice/getByTower",
          type: "post",
          data: {
            towerId: node.data.objId,
            state: "1"
          }
        }).then(data => {
          if (data.successful) {
            let arr = [];
            for (let i = 0; i < data.resultValue.length; i++) {
              arr.push({
                objName:
                  data.resultValue[i].deviceName +
                  "(" +
                  data.resultValue[i].deviceStateName +
                  ")",
                objId: data.resultValue[i].deviceCode,
                deviceType: data.resultValue[i].deviceType,
                imageUrl: data.resultValue[i].url || ""
              });
            }
            resolve(arr);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else if (node.level === 3) {
        $axios({
          url: "/yangkai/selfMonitorInformation/getList",
          type: "post",
          data: {
            pageNum: 1,
            pageSize: 10,
            deviceCode: node.data.objId,
            deviceType: node.data.deviceType
          }
        }).then(data => {
          if (data.successful) {
            let arr = [];
            arr.push(
              {
                objName: "装置安装图片",
                objId: node.data.deviceCode,
                imageUrl: node.data.imageUrl
              },
              {
                objName: "告警信息",
                objId: node.data.objId,
                deviceCode: node.data.deviceCode
              }
            );
            resolve(arr);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else if (node.level === 4) {
        if (node.data.objName === "装置安装图片") {
          return resolve([]);
        }
        if (node.data.objName === "告警信息") {
          return resolve([]);
        }
      } else {
        return resolve([]);
      }
    },
    nodeClickFn(data, node) {
      if (node.level === 3) {
        this.$emit("showTable", node.data.deviceType);
      }
      if (node.level === 4) {
        if (node.data.objName === "装置安装图片") {
          this.$emit("showImage", node.data.imageUrl);
        }
        if (node.data.objName === "告警信息") {
          this.$emit("showDialog", node.data.deviceCode);
        }
      }
    }
  }
};
</script>
<style lang="less">
.omQueryLines-tree {
  width: 250px;
  border-right: 1px solid #eee;
  padding-right: 1px;
  overflow: auto;
  .el-tree > .el-tree-node {
    /*设置横向滚动条*/
    min-width: 100%;
    display: inline-block;
  }
}
</style>
