<template>
  <el-dialog
    class="baseStyle"
    title="发起特巡任务"
    :before-close="handleClose"
    :visible.sync="visible"
    append-to-body
  >
    <el-form
      :model="form"
      ref="form"
      :rules="fieldRules"
      style="
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                width: 100%;
            "
    >
      <el-form-item
        style="width: 50%"
        label="所属线路:"
        :label-width="formLabelWidth"
        prop="lineName"
        size="small"
      >
        <el-input
          readonly
          placeholder="请选择所属线路"
          @focus="showLineTable"
          suffix-icon="el-icon-search"
          v-model="form.lineName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="起始杆塔:"
        :label-width="formLabelWidth"
        prop="startTowername"
        size="small"
      >
        <el-input
          placeholder="请选择起始杆塔"
          readonly
          @focus="showTowerTable('s')"
          suffix-icon="el-icon-search"
          v-model="form.startTowername"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="终止杆塔:"
        :label-width="formLabelWidth"
        prop="endTowername"
        size="small"
      >
        <el-input
          placeholder="请选择终止杆塔"
          readonly
          @focus="showTowerTable('e')"
          suffix-icon="el-icon-search"
          v-model="form.endTowername"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="电压等级:"
        :label-width="formLabelWidth"
        prop="volLevel"
        size="small"
      >
        <el-select
          style="width:100%"
          v-model="form.volLevel"
          placeholder="请选择电压等级"
        >
          <el-option
            v-for="(item, index) in dropDown.volLevel"
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
        prop="cityName"
        size="small"
      >
        <el-select
          style="width:100%"
          @change="setCity"
          v-model="form.cityName"
          placeholder="请选择所属地市"
        >
          <el-option
            v-for="(item, index) in dropDown.city"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="巡视类型:"
        :label-width="formLabelWidth"
        prop="ispType"
        size="small"
      >
        <el-select
          style="width:100%"
          v-model="form.ispType"
          placeholder="请选择巡视类型"
        >
          <el-option
            v-for="(item, index) in dropDown.ispType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="巡视方式:"
        :label-width="formLabelWidth"
        prop="ispMode"
        size="small"
      >
        <el-select
          style="width:100%"
          v-model="form.ispMode"
          placeholder="请选择巡视方式"
        >
          <el-option
            v-for="(item, index) in dropDown.ispMode"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="巡视范围:"
        :label-width="formLabelWidth"
        prop="ispRange"
        size="small"
      >
        <el-input v-model="form.ispRange" placeholder="请填写巡视范围" />
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="任务状态:"
        :label-width="formLabelWidth"
        prop="dataStatus"
        size="small"
      >
        <el-select
          style="width:100%"
          v-model="form.dataStatus"
          placeholder="请选择任务状态"
        >
          <el-option
            v-for="(item, index) in dropDown.dataStatus"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="排序号:"
        :label-width="formLabelWidth"
        prop="orderNo"
        size="small"
      >
        <el-input v-model="form.orderNo" placeholder="请填写排序号" />
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="巡视内容:"
        :label-width="formLabelWidth"
        prop="ispContent"
        size="small"
      >
        <el-input v-model="form.ispContent" placeholder="请填写巡视内容" />
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="任务来源类型:"
        :label-width="formLabelWidth"
        prop="sourceType"
        size="small"
      >
        <el-select
          style="width:100%"
          v-model="form.sourceType"
          placeholder="请选择任务来源类型"
        >
          <el-option
            v-for="(item, index) in dropDown.sourceType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="计划巡视时间:"
        :label-width="formLabelWidth"
        prop="planIspDate"
        size="small"
      >
        <el-date-picker
          :picker-options="pickerOptions"
          style="width:100%;"
          size="small"
          v-model="form.planIspDate"
          value-format="timestamp"
          type="datetime"
          placeholder="请选择计划巡视时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width:100%"
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
    <publicDialog ref="line" @callBackFn="update"> </publicDialog>
    <publicDialog ref="tower" @callBackFn="update"> </publicDialog>
  </el-dialog>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "alarmPatrol",
  components: {
    publicDialog
  },
  data() {
    let validateLineName = (rule, value, callback) => {
      if (!this.form.lineName) {
        callback(new Error("请选择所属线路"));
      } else {
        callback();
      }
    };
    let validateStartTowerName = (rule, value, callback) => {
      if (!this.form.startTowername) {
        callback(new Error("请选择起始杆塔"));
      } else {
        callback();
      }
    };
    let validateEndTowerName = (rule, value, callback) => {
      if (!this.form.endTowername) {
        callback(new Error("请选择终止杆塔"));
      } else {
        callback();
      }
    };
    return {
      //下拉菜单数据
      dropDown: {
        deviceType: "",
        alarmState: "",
        volLevel: "",
        city: "",
        ispType: "",
        ispMode: "",
        dataStatus: "",
        sourceType: "",
        sourceTable: ""
      },
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      visible:false,
      form: { lineName: "", startTowername: "", endTowername: "" },
      formLabelWidth: "120px",
      fieldRules: {
        lineName: [
          {
            required: true,
            validator: validateLineName,
            trigger: "change"
          }
        ],
        startTowername: [
          {
            required: true,
            validator: validateStartTowerName,
            trigger: "change"
          }
        ],
        endTowername: [
          {
            required: true,
            validator: validateEndTowerName,
            trigger: "change"
          }
        ],
        volLevel: [
          {
            required: true,
            message: "请选择电压等级",
            trigger: "change"
          }
        ],
        cityName: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        ispType: [
          {
            required: true,
            message: "请选择巡视类型",
            trigger: "change"
          }
        ],
        ispMode: [
          {
            required: true,
            message: "请选择巡视方式",
            trigger: "change"
          }
        ],
        sourceType: [
          {
            required: true,
            message: "请选择任务来源类型",
            trigger: "change"
          }
        ],
        dataStatus: [
          {
            required: true,
            message: "请选择任务状态",
            trigger: "change"
          }
        ],
        planIspDate: [
          {
            required: true,
            message: "请选择计划巡视时间",
            trigger: "change"
          }
        ],
        ispRange: [
          {
            required: true,
            message: "请填写计划巡视范围",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        ispContent: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        orderNo: [
          {
            required: true,
            message: "请填写排序号",
            trigger: "blur"
          },
          {
            pattern: /^.{1,20}$/,
            message: "只能填写1-20个字",
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
    setData(form,dropDown) {
      this.dropDown = dropDown;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.visible = true;
    },
    setCity(val) {
      this.form.cityId = val.code;
      this.form.cityName = val.name;
    },
    update(val, row) {
      if (val === "line") {
        this.form.lineId = row.pmsId;
        this.form.lineName = row.lineName;
        this.form.ispTeamname = row.maintainTeamname;
        this.form.ispTeam = row.maintainTeam;
      }
      if (val === "startTower") {
        this.form.startTower = row.pmsId;
        this.form.startTowername = row.objOrder;
      }
      if (val === "endTower") {
        this.form.endTower = row.pmsId;
        this.form.endTowername = row.objOrder;
      }
    },
    showTowerTable(val) {
      if (val === "s") {
        this.$refs.tower.setDialogType("startTower");
      }
      if (val === "e") {
        +this.$refs.tower.setDialogType("endTower");
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    disabledDate(time) {
      if (time.getTime() < Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { lineName: "", startTowername: "", endTowername: "" };
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form,
            
          };
          const url = "/tpiim/ptmiInsTask/add";
          $axios({ url: url, type: "post", data: data })
            .then(res => {
              if (res.successful) {
                this.$message.success(res.resultHint);
                this.handleClose();
                this.$emit("updateData");
              } else {
                this.$message.error(res.resultHint);
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
