<template>
  <div class="baseStyle">
    <el-header height="45px">
      <el-button type="primary" size="small" @click="tableFn()"
        >条件查询</el-button
      >
      <el-button type="primary" size="small" @click="mapFn()"
        >二维地图</el-button
      >
    </el-header>
    <div style="width: 100; height: calc(100%-45px)">
      <fixedConstructionSite-table
        v-show="mainBool.table"
      ></fixedConstructionSite-table>
      <fixedConstructionSite-map
        ref="map"
        v-show="mainBool.map"
        :mapVisible="mainBool.map"
      ></fixedConstructionSite-map>
    </div>
  </div>
</template>

<script>
import fixedConstructionSiteTable from "./fixedConstructionSite/fixedConstructionSiteTable";
import fixedConstructionSiteMap from "./fixedConstructionSite/fixedConstructionSiteMap";
export default {
  name: "fixedConstructionSite",
  data() {
    return {
      mainBool: {
        table: true,
        map: false
      }
    };
  },
  components: {
    fixedConstructionSiteTable,
    fixedConstructionSiteMap
  },
  methods: {
    tableFn() {
      this.mainBool.table = true;
      this.mainBool.map = false;
    },
    mapFn() {
      this.$refs.map.setData();
      this.mainBool.table = false;
      this.mainBool.map = true;
    }
  }
};
</script>

<style scoped>
.el-header {
  text-align: right;
  line-height: 45px;
  margin-bottom: 10px;
}
</style>
