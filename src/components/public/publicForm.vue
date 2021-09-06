<template>
  <el-form
    :model="form"
    ref="form"
    style="
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    align-content: flex-start;
                    width: 100%;
                "
  >
    <el-form-item
      size="small"
      v-for="(item, i) in form.list"
      :key="i"
      :label="item.label"
      :style="{ width: item.width || '50%' }"
      :label-width="item.formLabelWidth || formLabelWidth"
    >
      <el-input v-if="item.time" readonly v-model="item.value"> </el-input>
      <div class="block" v-else-if="item.img">
        <!-- :style="{ width: 100 / item.value.length - 1 + '%' }" -->
        <div
          style="width: 200px;height:200px"
          v-for="(key, index) in item.value"
          :key="index"
        >
          <el-image
            :preview-src-list="[key.url]"
            :src="key.url"
            fit="fill"
            style="width: 200px;height:200px"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>
      <div class="block" v-else-if="item.imgArr">
        <div
          style="width: 100%;height:200px"
          v-for="(key, index) in item.imgArr"
          :key="index"
        >
          <el-image
            :preview-src-list="[key]"
            :src="key"
            fit="fill"
            style="width: 200px;height:200px"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>
      <div class="block" v-else-if="item.dateArr">
        <div
          v-for="(key, index) in item.dateArr"
          :key="index"
          style="width: 100%;height:200px"
        >
          <el-input readonly v-model="key.date"> </el-input>
        </div>
      </div>
      <el-input
        :class="item.class"
        v-else-if="item.textarea"
        readonly
        type="textarea"
        :rows="2"
        show-word-limit
        v-model="item.value"
      >
      </el-input>
      <el-input v-else readonly v-model="item.value">
        <template v-if="item.unit" slot="append">{{ item.unit }}</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "publicForm",
  props: ["list"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {}
    };
  },
  watch: {
    list: {
      handler(newName, oldName) {
        let form = JSON.parse(JSON.stringify(this.list));
        this.setData(form);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setData(form) {
      for (let item in form.list) {
        form.list[item].label += ":";
        if (form.list[item].time) {
          form.list[item].value = this.parseTime(form.list[item].value);
        }
        form.list[item].value = this.parse(form.list[item].value);
      }
      this.form = form;
    },
    parse(val) {
      if (val !== "" && val !== null && val !== "--" && val !== "undefined") {
        return val;
      } else {
        return "--";
      }
    },
    parseTime(val) {
      if (val && val !== null && val !== "--" && val !== "undefined") {
        return this.$moment(val)
          .utcOffset(8)
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "--";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.block {
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
}
.warn {
  /deep/.el-textarea__inner,
  .el-form-item__label {
    color: red;
    font-weight: bold;
  }
}
</style>
