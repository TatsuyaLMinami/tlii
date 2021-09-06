<template>
  <div>
    <el-dialog
      :title="title"
      :before-close="handleClose"
      :visible.sync="visible"
    >
      <el-form
        :model="form"
        :rules="fieldRules"
        ref="form"
        style=" display:flex;
                            flex-wrap:wrap;
                            flex-direction:row;
                            align-content:flex-start;
                            width:100%"
      >
        <el-form-item
          style="width:50%"
          label="设备名称:"
          :label-width="formLabelWidth"
          prop="name"
          size="small"
        >
          <el-input v-model="form.name" placeholder="请填写设备名称">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备类型:"
          :label-width="formLabelWidth"
          prop="type"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.type"
            placeholder="请选择设备类型"
          >
            <el-option
              v-for="(item, index) in dropDown.monitorType"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="所属单位:"
          :label-width="formLabelWidth"
          prop="unitName"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.unitName"
            placeholder="请选择所属单位"
            @change="setUnit"
          >
            <el-option
              v-for="(item, index) in dropDown.unit"
              :key="index"
              :label="item.deptName"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备编码:"
          :label-width="formLabelWidth"
          prop="coding"
          size="small"
        >
          <el-input v-model="form.coding" placeholder="请填写设备编码">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备所在网段:"
          :label-width="formLabelWidth"
          prop="networkSegment"
          size="small"
        >
          <el-input
            v-model="form.networkSegment"
            placeholder="请填写设备所在网段"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备IP:"
          :label-width="formLabelWidth"
          prop="ip"
          size="small"
        >
          <el-input v-model="form.ip" placeholder="请填写设备IP"> </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备端口号:"
          :label-width="formLabelWidth"
          prop="usPort"
          size="small"
        >
          <el-input v-model="form.usPort" placeholder="请填写设备端口号">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备登录用户名:"
          :label-width="formLabelWidth"
          prop="userName"
          size="small"
        >
          <el-input v-model="form.userName" placeholder="请填写设备登录用户名">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备登录密码:"
          :label-width="formLabelWidth"
          prop="usCipher"
          size="small"
        >
          <el-input v-model="form.usCipher" placeholder="请填写设备登录密码">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="关联设备:"
          :label-width="formLabelWidth"
          prop="parentId"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.parentId"
            placeholder="请选择关联设备"
          >
            <el-option
              v-for="(item, index) in dropDown.monitorDevice"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="rtsp流地址:"
          :label-width="formLabelWidth"
          prop="rtspUrl"
          size="small"
        >
          <el-input v-model="form.rtspUrl" placeholder="请填写rtsp流地址">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="rtmp流地址:"
          :label-width="formLabelWidth"
          prop="rtmpUrl"
          size="small"
        >
          <el-input v-model="form.rtmpUrl" placeholder="请填写rtmp流地址">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="网络视频录像机设备IP:"
          :label-width="formLabelWidth"
          prop="nvrIp"
          size="small"
        >
          <el-input
            v-model="form.nvrIp"
            placeholder="请填写网络视频录像机设备IP"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="网络视频录像机设备端口号:"
          :label-width="formLabelWidth"
          prop="nvrPort"
          size="small"
        >
          <el-input
            v-model="form.nvrPort"
            placeholder="网络视频录像机设备端口号"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="网络视频录像机设备用户名:"
          :label-width="formLabelWidth"
          prop="nvrUserName"
          size="small"
        >
          <el-input
            v-model="form.nvrUserName"
            placeholder="网络视频录像机设备用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="网络视频录像机设备密码:"
          :label-width="formLabelWidth"
          prop="nvrUserPass"
          size="small"
        >
          <el-input
            v-model="form.nvrUserPass"
            placeholder="网络视频录像机设备密码"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleClose">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleCreate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "m",
  data() {
    return {
      form: {},
      formLabelWidth: "120px",
      visible: false,
      title: "",
      dropDown: {
        monitorType: [],
        monitorDevice: [],
        unit: []
      },
      //向子件传递的数据
      fieldRules: {
        name: [
          {
            required: true,
            message: "请填写设备名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change"
          }
        ],
        unitName: [
          {
            required: true,
            message: "请选择所属单位",
            trigger: "change"
          }
        ],
        coding: [
          {
            required: true,
            message: "请填写设备编码",
            trigger: "blur"
          }
        ],
        networkSegment: [
          {
            required: true,
            message: "请填写设备所在网段",
            trigger: "blur"
          }
        ],
        ip: [
          {
            required: true,
            message: "请填写设备IP",
            trigger: "blur"
          }
        ],
        usPort: [
          {
            required: true,
            message: "请填写设备端口号",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请填写登录用户名",
            trigger: "blur"
          }
        ],
        usCipher: [
          {
            required: true,
            message: "请填写设备登录密码",
            trigger: "blur"
          }
        ],
        parentId: [
          {
            required: false,
            message: "请选择关联设备",
            trigger: "change"
          }
        ],
        rtspUrl: [
          {
            required: false,
            message: "请填写rtsp流地址",
            trigger: "blur"
          }
        ],
        rtmpUrl: [
          {
            required: false,
            message: "请填写rtmp流地址",
            trigger: "blur"
          }
        ],
        nvrIp: [
          {
            required: false,
            message: "请填写网络视频录像机设备IP",
            trigger: "blur"
          }
        ],
        nvrPort: [
          {
            required: false,
            message: "请填写网络视频录像机设备端口号",
            trigger: "blur"
          }
        ],
        nvrUserName: [
          {
            required: false,
            message: "请填写网络视频录像机设备用户名",
            trigger: "blur"
          }
        ],
        nvrUserPass: [
          {
            required: false,
            message: "请填写网络视频录像机设备密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setUnit(val) {
      this.form.unitId = val.objId;
      this.form.unitName = val.deptName;
    },
    setData(title, form, dropDown) {
      this.title = title;
      this.dropDown = dropDown;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.visible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = {};
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form
          };
          if (data.id) {
            const url =
              "yangkai/selfVideoDeviceAccess/updateSelfVideoDeviceAccess";
            this.handle(url, data);
          } else {
            const url =
              "yangkai/selfVideoDeviceAccess/createSelfVideoDeviceAccess";
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
      }).then(data => {
        if (data.successful) {
          this.$message.success(data.resultHint);
          this.$emit("updateData");
          this.handleClose();
        } else {
          this.$message.error(data.resultHint);
        }
      });
    }
  }
};
</script>
