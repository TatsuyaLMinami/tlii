<template>
  <div class="lines-tree" :style="treeStyle">
    <el-tree
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
import eventBus from "@/pages/common/eventBus";
export default {
  name: "lineTree",
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
        return resolve([
          {
            objName: "线路",
            objType: "line",
            objId: ""
          }
        ]);
      } else if (node.level === 2) {
        resolve([
          {
            objName: "杆塔",
            objType: "tower",
            objId: node.data.objId
          },
          {
            objName: "绝缘子",
            objType: "insulator",
            objId: node.data.objId
          },
          {
            objName: "导线  ",
            objType: "wire",
            objId: node.data.objId
          },
          {
            objName: "地线",
            objType: "earthWire",
            objId: node.data.objId
          },
          {
            objName: "三跨",
            objType: "span",
            objId: node.data.objId
          },
          {
            objName: "重要通道",
            objType: "passageway",
            objId: node.data.objId
          }
        ]);
      } else if (node.level === 1 || node.level === 3) {
        $axios({
          url: "/tpiim/line/getLineNameTreeList",
          type: "post",
          data: {
            objType: node.data.objType,
            objId: node.data.objId
          }
        }).then(data => {
          if (data.successful) {
            resolve(data.resultValue);
          } else {
            this.$message.error(data.resultHint);
          }
        });
      } else if (node.level === 4) {
        return resolve([]);
      }
    },
    nodeClickFn(data, node) {
      // 隐藏查询条件
      this.$emit("basicInfoFn");
      if (node.level === 2 || node.level === 4) {
        eventBus.$emit("linesNodeFn", {
          id: data.objId,
          type: node.parent.data.objType
        });
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
