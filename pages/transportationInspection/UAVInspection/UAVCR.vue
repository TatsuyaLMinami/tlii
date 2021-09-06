<template>
  <div class="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="领用" name="receive">
        <uav-receive :key="key"></uav-receive>
      </el-tab-pane>
      <el-tab-pane label="归还" name="back">
        <uav-back :key="key"></uav-back>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uavReceive from "./UAVCR/uavReceive";
import uavBack from "./UAVCR/uavBack";
export default {
  name: "",
  data() {
    return {
      activeName: "receive",
      key: 0,
    };
  },
  components: {
    uavReceive,
    uavBack,
  },
  methods: {
    // 组件刷新
    handleClick() {
      this.key++;
    },
  },
};
</script>
<style scoped>
</style>
