<template>
  <div class="lines-tree" :style="treeStyle">
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
  name: "omTree",
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
      return { height: 500 + "px" };
    }
  },
  methods: {
    getData(data) {
      return $axios({
        url: "/yangkai/line/getLineNameTreeList",
        type: "post",
        data: data
      }).then(res => {
        if (res.successful) {
          return res.resultValue;
        } else {
          this.$message.error(res.resultHint);
        }
      });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getData({
          objType: "line",
          objId: ""
        }).then(res => {
          resolve(res);
        });
      } else if (node.level === 1) {
        this.getData({
          objType: "tower",
          objId: node.data.objId
        }).then(res => {
          resolve(res);
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
                objName: data.resultValue[i].deviceName,
                objId: data.resultValue[i].deviceCode,
                deviceType: data.resultValue[i].deviceType
              });
            }
            resolve(arr);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else {
        return resolve([]);
      }
    },
    nodeClickFn(data, node) {
      if (node.level === 3) {
        this.$emit("getOMList", 1, node.data.objId, node.data.deviceType);
      }
    }
  }
};
</script>
<style scoped>
.lines-tree {
  border-right: 1px solid #eee;
  padding-right: 1px;
}
</style>
