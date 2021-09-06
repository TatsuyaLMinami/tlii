<template>
  <div>
    <i
      style="right: 0 !important"
      @click="showBoard = true"
      class="el-icon-caret-left borderIcon"
      v-show="!showBoard"
    ></i>
    <transition name="slideFade">
      <div class="board" v-if="showBoard" transiton="slideFade">
        <i
          style="top: -1px !important"
          @click="showBoard = false"
          class="el-icon-caret-right borderIcon fadeleftIn faderightOut"
        ></i>
        <div
          style="
                            font-size: 15px;
                            text-align: center;
                            margin-bottom: 2px;
                            font-weight: bold;
                        "
        >
          {{ title }}
        </div>
        <el-form
          :model="data"
          ref="weather"
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
            v-for="(item, i) in data.arr"
            :key="i"
            :label="item.label"
            style="width:100%"
            :label-width="formLabelWidth"
          >
            {{ item.value }}
          </el-form-item>
        </el-form>
        <div style="text-align: right" v-show="weather">
          <el-link
            style="color: blue !important"
            :underline="false"
            @click="showWeather"
            >>>24小时气象预报</el-link
          >
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import gridDisasterData from "@/store/chartItems/gridDisasterData.js";
export default {
  name: "publicTransition",
  data() {
    return {
      formLabelWidth: "",
      title: "",
      weather: false,
      showBoard: true,
      data: { id: "", arr: [] }
    };
  },
  methods: {
    setData(title, type) {
      this.title = title;
      if (type === "weather") {
        this.formLabelWidth = "80px";
        this.weather = true;
        this.getWeather();
      } else {
        this.formLabelWidth = "120px";
        this.weather = false;
        this.getDefect();
      }
    },
    getDefect() {
      this.data.arr = [
        {
          label: "危急消缺数量:",
          value: 0
        },
        {
          label: "严重消缺数量:",
          value: 0
        },
        {
          label: "一般消缺数量:",
          value: 0
        }
      ];
      $axios({
        url: "yangkai/ptmidefectrecord/defectShow",
        type: "post",
        data: {
          names: ["noHdNatureTotal"],
          "​state": "0"
        }
      })
        .then(res => {
          if (res.successful) {
            this.data.arr[0].value =
              res.resultValue.noHdNatureTotal[0].natureDefectNumber;
            this.data.arr[1].value =
              res.resultValue.noHdNatureTotal[1].natureDefectNumber;
            this.data.arr[2].value =
              res.resultValue.noHdNatureTotal[2].natureDefectNumber;
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getWeather() {
      this.data.arr = gridDisasterData.weatherData;
      $axios({
        url: "yangkai/damageMeteorologicalCurrentInfo/getMeteorologicalCurrent",
        type: "post",
        data: {}
      })
        .then(res => {
          if (res.successful) {
            res.resultValue.airpressure = (
              res.resultValue.airpressure / 10
            ).toFixed(2);
            let keys = Object.keys(res.resultValue),
              values = Object.values(res.resultValue);
            this.data.id = res.resultValue.id;
            for (let key in this.data.arr) {
              for (let index in keys) {
                if (this.data.arr[key].name === keys[index]) {
                  this.data.arr[key].value =
                    values[index] + this.data.arr[key].unit;
                }
              }
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    showWeather() {
      this.$emit("showWeather", this.data.id);
    }
  }
};
</script>
<style lang="less" scoped>
.board {
  box-shadow: 0px 10px 5px rgb(0, 150, 136);
  border: 1px solid rgb(0, 150, 136);
  background: white;
  width: 160px;
  position: absolute;
  right: 0px;
  top: 55px;
  z-index: 10;
  opacity: 0.9;

  .el-form-item {
    margin-bottom: 0px;
  }

  .el-form-item--small .el-form-item__label {
    line-height: 25px;
  }

  .el-form-item--small .el-form-item__content {
    line-height: 25px;
  }
}
.slideFade-enter {
  animation: slideFade-dialog-fade-in 0.5s ease;
}

.slideFade-leave {
  animation: slideFade-dialog-fade-out 0.5s ease forwards;
}

.slideFade-enter-active {
  animation: slideFade-dialog-fade-in 0.5s ease;
}

.slideFade-leave-active {
  animation: slideFade-dialog-fade-out 0.5s ease forwards;
}

@keyframes slideFade-dialog-fade-in {
  0% {
    transform: translate3d(
      100%,
      0,
      0
    ); //修改这个可以控制，上下左右动画，例如：100%为从右到左
    opacity: 1;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideFade-dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
}
.borderIcon {
  cursor: pointer;
  background: rgb(0, 150, 136);
  padding: 20px 0px;
  z-index: 10;
  position: absolute;
  right: 160px;
  top: 55px;
  font-size: 20px;
  border-radius: 5px 0 0 5px;
}
</style>
