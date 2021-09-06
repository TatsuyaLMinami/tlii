<template>
  <el-dialog :title="title" :before-close="handleClose" :visible.sync="visible">
    <el-form
      :model="form"
      :rules="fieldRules"
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
        style="width: 100%"
        label="任务名称:"
        :label-width="formLabelWidth"
        prop="name"
        size="small"
      >
        <el-input
          style="width: 100%"
          v-model="form.name"
          placeholder="请填写任务名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="任务类型:"
        :label-width="formLabelWidth"
        prop="type"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.type"
          placeholder="请选择任务类型"
          @change="setTaskType"
        >
          <el-option
            v-for="(item, index) in dropDown.taskType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="(form.type !== 0 && form.type !== 1) || form.type === 0"
        style="width: 100%"
        label="监控装置:"
        :label-width="formLabelWidth"
        prop="videoDevice"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.videoDevice"
          placeholder="请选择监控装置"
          @change="setVideoDevice"
        >
          <el-option
            v-for="(item, index) in dropDown.monitorDevice"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="form.type === 1"
        style="width: 100%"
        label="监控装置:"
        :label-width="formLabelWidth"
        prop="channelDevice"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.channelDevice"
          placeholder="请选择监控装置"
          @change="setChannelDevice"
        >
          <el-option
            v-for="(item, index) in dropDown.monitorDevice"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="拍照频率:"
        :label-width="formLabelWidth"
        prop="peroid"
        size="small"
      >
        <el-input
          type="Number"
          style="width: 100%"
          v-model="form.peroid"
          placeholder="请填写拍照频率"
        >
          <template slot="append">次/min</template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="备注:"
        :label-width="formLabelWidth"
        prop="remark"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.remark"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "mt",
  components: {},
  data() {
    var checkVideo = (rule, value, callback) => {
      if (this.form.type === 0) {
        if (!value) {
          return callback(new Error("请选择监控装置"));
        } else {
          checkChannel = callback();
          callback();
        }
      } else if (this.form.type === 1) {
        callback();
      } else {
        return callback(new Error("请选择监控装置"));
      }
    };
    var checkChannel = (rule, value, callback) => {
      if (this.form.type === 1) {
        if (!value) {
          return callback(new Error("请选择监控装置"));
        } else {
          callback();
        }
      } else if (this.form.type === 0) {
        callback();
      } else {
        return callback(new Error("请选择监控装置"));
      }
    };
    return {
      form: {},
      formLabelWidth: "120px",
      dropDown: { taskType: [], monitorDevice: [] },
      visible: false,
      title: "",
      videoDevice: [],
      channelDevice: [],
      deviceId: "",
      deviceCode: "",
      fieldRules: {
        name: [
          {
            required: true,
            message: "请填写任务名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择任务类型",
            trigger: "change"
          }
        ],
        videoDevice: [
          { validator: checkVideo, trigger: "blur" },
          {
            required: false,
            message: "请选择监控装置",
            trigger: "change"
          }
        ],
        channelDevice: [
          { validator: checkChannel, trigger: "blur" },
          {
            required: false,
            message: "请选择监控装置",
            trigger: "change"
          }
        ],
        peroid: [
          {
            required: true,
            message: "请填写拍照频率",
            trigger: "blur"
          }
        ],
        remark: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form, dropDown) {
      this.title = title;
      this.videoDevice = [];
      this.channelDevice = [];
      for (let key in dropDown.monitorDevice) {
        if (dropDown.monitorDevice[key].name.indexOf("摄像头") > -1) {
          this.videoDevice.push(dropDown.monitorDevice[key]);
        } else {
          this.channelDevice.push(dropDown.monitorDevice[key]);
        }
      }
      if (form.type === 0) {
        form.videoDevice = form.deviceName;
        this.dropDown.monitorDevice = this.videoDevice;
      } else {
        form.channelDevice = form.deviceName;
        this.dropDown.monitorDevice = this.channelDevice;
      }
      this.form = JSON.parse(JSON.stringify({ ...form }));
      this.dropDown.taskType = dropDown.taskType;
      this.visible = true;
    },
    setTaskType(val) {
      if (val === 0) {
        this.dropDown.monitorDevice = this.videoDevice;
      } else {
        this.dropDown.monitorDevice = this.channelDevice;
      }
    },
    setVideoDevice(val) {
      this.form.videoDevice = val.name;
      this.deviceCode = val.coding;
      this.deviceId = val.id;
    },
    setChannelDevice(val) {
      this.form.channelDevice = val.name;
      this.deviceCode = val.coding;
      this.deviceId = val.id;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = {};
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let presetIndex = "",
            url = "";
          if (this.form.type === 0) {
            if (!this.form.videoDevice) {
              this.$message.warning("请选择监控设备");
              return false;
            } else {
              presetIndex = this.form.videoDevice.substring(
                5,
                this.form.videoDevice.length
              );
            }
          } else {
            if (!this.form.channelDevice) {
              this.$message.warning("请选择监控设备");
              return false;
            } else {
              presetIndex = this.form.channelDevice.substring(
                4,
                this.form.channelDevice.length
              );
            }
          }
          let data = {
            ...this.form,
            presetIndex: presetIndex * 1,
            coding: this.deviceCode,
            deviceId: this.deviceId * 1
          };
          if (data.objId) {
            url = "/yangkai/selfVideoTask/updateTask";
            this.handle(url, data);
          } else {
            url = "/yangkai/selfVideoTask/addTask";
            this.handle(url, data);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, data) {
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          if (res.successful) {
            this.$message.success(res.resultHint);
            this.$emit("updateData");
            this.handleClose();
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
