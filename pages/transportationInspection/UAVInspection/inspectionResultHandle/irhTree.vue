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
  name: "irhTree",
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
      return { height: 388 + "px" };
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        //部门
        $axios({
          url: "/tpiim/baseData/getCityList",
          type: "get"
        }).then(res => {
          if (res.successful) {
            var arr = [];
            let data = res.resultValue;
            for (let i = 0; i < data.length; i++) {
              arr.push({
                objName: data[i].name,
                objId: data[i].code
              });
            }
            resolve(arr);
          } else {
            console.error(res.resultHint);
          }
        });
      } else if (node.level === 1) {
        $axios({
          url: "/yangkai/indexEquipment/getLineLayer",
          type: "get"
        }).then(res => {
          if (res.successful) {
            var arr = [];
            let data = res.resultValue;
            for (let i = 0; i < data.length; i++) {
              arr.push({
                objName: data[i].name,
                objId: data[i].id
              });
            }
            resolve(arr);
          } else {
            this.$message.error(res.resultHint);
          }
        });
      } else {
        return resolve([]);
      }
    },
    nodeClickFn(data, node) {
      if (node.level === 1) {
        this.$emit("setLineName", "");
      }
      if (node.level === 2) {
        this.$emit("setLineName", node.data.objName);
      }
    }
  }
};
</script>
<style scoped>
/* .lines-tree {
    border-right: 1px solid #eee;
    padding-right: 1px;
} */
</style>
