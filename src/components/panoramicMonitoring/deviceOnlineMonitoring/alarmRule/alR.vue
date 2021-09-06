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
          label="规则级别:"
          :label-width="formLabelWidth"
          prop="ruleLevel"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.ruleLevel"
            placeholder="请选择规则级别"
          >
            <el-option
              v-for="(item, index) in dropDown.ruleLevel"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="规则状态:"
          :label-width="formLabelWidth"
          prop="ruleStatus"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.ruleStatus"
            placeholder="请选择规则状态"
          >
            <el-option
              v-for="(item, index) in dropDown.ruleStatus"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
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
          label="监测类型:"
          :label-width="formLabelWidth"
          prop="monitoringType"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.monitoringType"
            placeholder="请选择监测类型"
            @change="getDeviceType"
          >
            <el-option
              v-for="(item, index) in dropDown.monitoringType"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="装置类型:"
          :label-width="formLabelWidth"
          prop="deviceType1"
          size="small"
          v-if="disabled1"
        >
          <el-select
            style="width:100%"
            v-model="form.deviceType1"
            placeholder="请选择装置类型"
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
          label="装置类型:"
          :label-width="formLabelWidth"
          prop="deviceType2"
          size="small"
          v-if="disabled2"
        >
          <el-select
            style="width:100%"
            v-model="form.deviceType2"
            placeholder="请选择装置类型"
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
          label="缺陷类型:"
          :label-width="formLabelWidth"
          prop="defectType"
          size="small"
        >
          <el-select
            style="width:100%"
            :disabled="disabled1"
            @change="getDefectSubclass"
            v-model="form.defectType"
            placeholder="请选择缺陷类型"
          >
            <el-option
              v-for="(item, index) in dropDown.defectTypeOne"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="缺陷小类:"
          :label-width="formLabelWidth"
          prop="defectSubclass"
          size="small"
        >
          <el-select
            style="width:100%"
            :disabled="disabled1"
            v-model="form.defectSubclass"
            placeholder="请选择缺陷小类"
          >
            <el-option
              v-for="(item, index) in dropDown.defectSubclass"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          style="width:50%"
          label="阈值上限:"
          :label-width="formLabelWidth"
          prop="upperThreshold"
          size="small"
        >
          <el-input-number
            style="width:100%"
            :disabled="disabled2"
            v-model="form.upperThreshold"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="阈值下限:"
          :label-width="formLabelWidth"
          prop="lowerThreshold"
          size="small"
        >
          <el-input-number
            style="width:100%"
            :disabled="disabled2"
            v-model="form.lowerThreshold"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          style="width:100%"
          label="规则说明:"
          :label-width="formLabelWidth"
          prop="ruleCom"
          size="small"
        >
          <el-input
            type="textarea"
            rows="2"
            maxlength="200"
            show-word-limit
            v-model="form.ruleCom"
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
  </div>
</template>
<script>
import $store from "@/store/data.js";
export default {
  name: "alR",
  data() {
    return {
      form: { defectSubclass: "", deviceType2: "", deviceType1: "" },
      formLabelWidth: "120px",
      visible: false,
      title: "",
      disabled1: true,
      disabled2: false,
      formData: {
        deviceType: "",
        upperThreshold: "",
        lowerThreshold: "",
        defectSubclass: "",
        defectType: ""
      },
      dropDown: {
        city: [],
        monitoringType: [],
        ruleLevel: [],
        ruleStatus: [],
        defectTypeOne: [],
        defectSubclass: [],
        deviceType: []
      },
      //向子件传递的数据
      fieldRules: {
        monitoringType: [
          {
            required: true,
            message: "请选择监测类型",
            trigger: "change"
          }
        ],
        ruleLevel: [
          {
            required: true,
            message: "请选择规则级别",
            trigger: "change"
          }
        ],
        cityId: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        ruleStatus: [
          {
            required: true,
            message: "请选择规则状态",
            trigger: "change"
          }
        ],
        ruleCom: [
          {
            required: true,
            message: "请填写规则说明",
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
    setData(title, form, dropDown) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.dropDown = JSON.parse(JSON.stringify(dropDown));
      if (this.form.id) {
        if (this.form.monitoringType === "1") {
          this.dropDown.deviceType = $store.getters["deviceType"];
          this.form.deviceType1 = JSON.parse(
            JSON.stringify(this.form.deviceType)
          );
          this.disabled1 = true;
          this.disabled2 = false;
        } else {
          this.dropDown.deviceType = $store.getters["deviceTypeVideo"];
          this.form.deviceType2 = JSON.parse(
            JSON.stringify(this.form.deviceType)
          );
          this.disabled1 = false;
          this.disabled2 = true;
        }
        if (this.form.defectType) {
          this.getDefectSubclass(this.form.defectType);
        }
      }
      this.visible = true;
    },
    getDeviceType(val) {
      if (val === "1") {
        this.dropDown.deviceType = $store.getters["deviceType"];
        let obj = this.dropDown.deviceType.find(item => {
          return item.code === this.form.deviceType1;
        });
        if (!obj) {
          this.form.deviceType1 = "";
        }
        this.disabled1 = true;
        this.disabled2 = false;
      } else {
        this.dropDown.deviceType = $store.getters["deviceTypeVideo"];
        if (!this.form.defectSubclass) {
          this.getDefectSubclass(this.dropDown.defectTypeOne[0].code);
        }
        let obj = this.dropDown.deviceType.find(item => {
          return item.code === this.form.deviceType2;
        });
        if (!obj) {
          this.form.deviceType2 = "";
        }
        this.disabled1 = false;
        this.disabled2 = true;
      }
    },
    getDefectSubclass(val) {
      const baseUrl = "tpiim/baseData/getDefectTwoList";
      const url = `${baseUrl}?pCode=${val}`;
      $axios({ url: url, type: "get" })
        .then(res => {
          if (res.successful) {
            this.dropDown.defectSubclass = res.resultValue;
            let obj = this.dropDown.defectSubclass.find(item => {
              return item.code === this.form.defectSubclass;
            });
            if (!obj) {
              this.form.defectSubclass = "";
            }
          } else {
            this.dropDown.defectSubclass = [];
            this.form.defectSubclass = "";
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.disabled1 = true;
      this.disabled2 = false;
      this.form = { defectSubclass: "", deviceType2: "", deviceType1: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form
          };
          if (data.monitoringType === "2") {
            if (data.deviceType2 && data.defectType && data.defectSubclass) {
              data.deviceType = data.deviceType2;
            } else {
              this.$message.error("请选择装置类型/缺陷类型/缺陷小类");
              return false;
            }
          } else if (data.monitoringType === "1") {
            if (
              data.deviceType1 &&
              data.upperThreshold &&
              data.lowerThreshold
            ) {
              if (data.upperThreshold <= data.lowerThreshold) {
                this.$message.error("阈值上限必须大于阈值下限");
                return false;
              }
              data.deviceType = data.deviceType1;
            } else {
              this.$message.error("请填写装置类型/阈值上限/阈值下限");
              return false;
            }
          }
          if (data.id) {
            const url = "tpiim/selfAlarmRules/update";
            this.handle(url, data);
          } else {
            const url = "tpiim/selfAlarmRules/add";
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
