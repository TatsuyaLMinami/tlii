<template>
  <div class="inspection" :style="tabStyle">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="无人机巡检结果" name="task">
        <inspection-task></inspection-task>
      </el-tab-pane>
      <el-tab-pane label="无人机巡检杆塔" name="tower">
        <inspection-tower></inspection-tower>
      </el-tab-pane>
      <el-tab-pane label="无人机巡检缺陷" name="defect">
        <inspection-defect></inspection-defect>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import inspectionTask from "./inspection/inspectionTask";
import inspectionTower from "./inspection/inspectionTower";
import inspectionDefect from "./inspection/inspectionDefect";
export default {
  name: "inspection",
  data() {
    return {
      activeName: "task",
    };
  },
  components: {
    inspectionTask,
    inspectionTower,
    inspectionDefect,
  },
  computed: {
    tabStyle() {
      return { height: document.body.clientHeight - 180 + "px" };
    },
  },
};
</script>
<style scoped>
</style>
