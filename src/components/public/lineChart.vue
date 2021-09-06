<template>
  <div :key="keyWord" style="display: flex; flex-wrap: wrap; width: 100%">
    <div class="Echarts" v-for="(item, index) in echartData" :key="index">
      <div :id="item.id" :style="{ width: width, height: height }"></div>
    </div>
  </div>
</template>
<script>
import { setLineOption } from "@/tools/chartOption.js";
export default {
  name: "lineChart",
  data() {
    return {
      echartData: [],
      keyWord: 0,
      width: "",
      height: ""
    };
  },
  methods: {
    showChart(data, width, height) {
      this.echartData = data;
      this.keyWord = 1;
      this.width = width;
      this.height = height;
      for (let i = 0; i < data.length; i++) {
        setLineOption(
          data[i]
        ).then(res => {
          this.$echarts
            .init(document.getElementById(data[i].id))
            .setOption(res, true);
        });
      }
    }
  }
};
</script>
