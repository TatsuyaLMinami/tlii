<template>
  <div>
    <div class="tower-bad-popup">
      <div>
        <label>
          告警 ：
          <span class="gaojing" @click="badFn('gaojing')">{{
            popupData.alarmCount
          }}</span>
        </label>
      </div>
      <div>
        <label>
          缺陷 ：
          <span class="quexian" @click="badFn('quexian')">{{
            popupData.defectCount
          }}</span>
        </label>
      </div>
      <div>
        <label>
          隐患 ：
          <span class="yinhuan" @click="badFn('yinhuan')">{{
            popupData.hdCount
          }}</span>
        </label>
      </div>
      <div>
        <label>
          故障 ：
          <span class="guzhang" @click="badFn('guzhang')">{{
            popupData.faultCount
          }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/pages/common/eventBus";
export default {
  name: "",
  data() {
    return {};
  },
  props: ["popupData", "towerId"],
  methods: {
    badFn(type) {
      eventBus.$emit("backFn", {
        type: type,
        towerId: this.towerId
      });
    }
  }
};
</script>
<style lang="less" scoped>
.tower-bad-popup {
  padding: 5px 10px 0;
  color: #555;
  span {
    display: inline-block;
    padding: 1px 0;
    text-decoration: underline;
    cursor: pointer;
  }
  .gaojing {
    color: #d05353;
  }
  .quexian {
    color: #eda635;
  }
  .yinhuan {
    color: #27b3b3;
  }
  .guzhang {
    color: #2faaf9;
  }
}
</style>
