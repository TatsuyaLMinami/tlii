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
          label="监测类型:"
          :label-width="formLabelWidth"
          prop="deviceType"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.deviceType"
            placeholder="请选择监测类型"
          >
            <el-option
              v-for="(item, index) in dropDown.deviceType"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="设备状态:"
          :label-width="formLabelWidth"
          prop="deviceState"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.deviceState"
            placeholder="请选择设备状态"
          >
            <el-option
              v-for="(item, index) in dropDown.deviceState"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="所属杆塔:"
          :label-width="formLabelWidth"
          prop="towerName"
          size="small"
        >
          <el-input
            placeholder="请选择所属杆塔"
            readonly
            @focus="showTowerTable"
            suffix-icon="el-icon-search"
            v-model="form.towerName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="所属地市:"
          :label-width="formLabelWidth"
          prop="cityId"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.cityId"
            placeholder="请选择所属地市"
          >
            <el-option
              v-for="(item, index) in dropDown.city"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="生产厂家:"
          :label-width="formLabelWidth"
          prop="manuName"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.manuName"
            placeholder="请选择生产厂家"
          >
            <el-option
              v-for="(item, index) in dropDown.manufacturer"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="装置型号:"
          :label-width="formLabelWidth"
          prop="deviceModel"
          size="small"
        >
          <el-input v-model="form.deviceModel" placeholder="请填写装置型号">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="出厂编号:"
          :label-width="formLabelWidth"
          prop="manuNo"
          size="small"
        >
          <el-input v-model="form.manuNo" placeholder="请填写出厂编号">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="出厂时间:"
          :label-width="formLabelWidth"
          prop="manuDate"
          size="small"
        >
          <el-date-picker
            :picker-options="pickerManuOptions"
            style="width:100%;"
            size="small"
            v-model="form.manuDate"
            value-format="timestamp"
            type="datetime"
            placeholder="请选择出厂时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="安装时间:"
          :label-width="formLabelWidth"
          prop="runDate"
          size="small"
        >
          <el-date-picker
            :picker-options="pickerRunOptions"
            style="width:100%;"
            size="small"
            v-model="form.runDate"
            value-format="timestamp"
            type="datetime"
            placeholder="请选择安装时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          style="width:100%"
          label="安装位置说明:"
          :label-width="formLabelWidth"
          prop="installLocation"
          size="small"
        >
          <el-input
            type="textarea"
            rows="2"
            maxlength="200"
            show-word-limit
            v-model="form.installLocation"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleClose">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleCreate"
          >确 定</el-button
        >
      </div>
      <publicDialog @callBackFn="update" ref="tower"> </publicDialog>
    </el-dialog>
  </div>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "ac",
  components: {
    publicDialog
  },
  data() {
    let validateTowerName = (rule, value, callback) => {
      if (!this.form.towerName) {
        callback(new Error("请选择所属杆塔"));
      } else {
        callback();
      }
    };
    return {
      pickerRunOptions: {
        disabledDate: this.disabledDisDate
      },
      pickerManuOptions: {
        disabledDate: this.disabledDisDate
      },
      form: { towerName: "" },
      formLabelWidth: "120px",
      visible: false,
      title: "",

      dropDown: {
        deviceType: "",
        deviceState: "",
        manufacturer: "",
        volLevel: "",
        city: ""
      },
      //向子件传递的数据
      fieldRules: {
        deviceType: [
          {
            required: true,
            message: "请选择装置类型",
            trigger: "change"
          }
        ],
        deviceState: [
          {
            required: true,
            message: "请选择装置状态",
            trigger: "change"
          }
        ],
        towerName: [
          {
            required: true,
            trigger: "change",
            validator: validateTowerName
          }
        ],
        cityId: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        manuName: [
          {
            required: true,
            message: "请选择生产厂家",
            trigger: "change"
          }
        ],
        deviceModel: [
          {
            required: true,
            message: "请填写装置型号",
            trigger: "blur"
          }
        ],
        manuNo: [
          {
            required: true,
            message: "请填写出厂编号",
            trigger: "blur"
          }
        ],
        manuDate: [
          {
            required: true,
            message: "请选择出厂时间",
            trigger: "change"
          }
        ],
        runDate: [
          {
            required: true,
            message: "请选择安装时间",
            trigger: "change"
          }
        ],
        installLocation: [
          {
            required: true,
            message: "请填写安装位置说明",
            trigger: "blur"
          },
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
    update(val, row) {
      if (val === "tower") {
        this.form.towerId = row.pmsId;
        this.form.towerName = row.objOrder;
      }
    },
    showTowerTable() {
      this.$refs.tower.setDialogType("tower");
    },
    disabledDisDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    setData(title, form, dropDown) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.dropDown = JSON.parse(JSON.stringify(dropDown));
      this.visible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { lineCodeName: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.runDate < this.form.manuDate) {
            this.$message.error("安装时间不得早于出厂时间");
            return false;
          }
          let data = {
            ...this.form
          };
          if (data.deviceId) {
            const url = "/tpiim/monitoringDevice/updateDeMonitoringDevice";
            this.handle(url, data);
          } else {
            const url = "/tpiim/monitoringDevice/createDeMonitoringDevice";
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
