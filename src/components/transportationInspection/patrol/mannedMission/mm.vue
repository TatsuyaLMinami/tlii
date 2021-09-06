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
          style="width: 50%"
          label="关联隐患"
          :label-width="formLabelWidth"
          prop="reTroubleDesc"
          size="small"
        >
          <el-input
            v-show="!show"
            readonly
            v-model="form.reTroubleDesc"
          ></el-input>
          <el-input
            v-show="show"
            readonly
            @focus="showHDTable"
            suffix-icon="el-icon-search"
            v-model="form.reTroubleDesc"
            placeholder="请选择关联隐患"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="影响线路:"
          :label-width="formLabelWidth"
          prop="lineName"
          size="small"
        >
          <el-input
            readonly
            placeholder="请选择影响线路"
            @focus="showLineTable"
            suffix-icon="el-icon-search"
            v-model="form.lineName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="任务部门:"
          :label-width="formLabelWidth"
          prop="deptId"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.deptId"
            placeholder="请选择任务部门"
            @change="loadUserT"
          >
            <el-option
              v-for="(item, index) in dropDown.depts"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="任务负责人:"
          :label-width="formLabelWidth"
          prop="dutyer"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.dutyer"
            placeholder="请选择任务负责人"
            @change="loadSuserName"
          >
            <el-option
              v-for="(item, index) in susers"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="值守部门:"
          :label-width="formLabelWidth"
          prop="oDept"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.oDept"
            placeholder="请选择值守部门"
            @change="loadUserM"
          >
            <el-option
              v-for="(item, index) in dropDown.depts"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="值守负责人:"
          :label-width="formLabelWidth"
          prop="guarder"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.guarder"
            placeholder="请选择值守负责人"
            @change="loadZuserName"
          >
            <el-option
              v-for="(item, index) in zusers"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          style="width: 50%"
          label="联系电话"
          :label-width="formLabelWidth"
          prop="guarderphone"
          size="small"
        >
          <el-input
            v-model="form.guarderphone"
            placeholder="请填写联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="值守级别:"
          :label-width="formLabelWidth"
          prop="oLevel"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="form.oLevel"
            placeholder="请选择值守级别"
          >
            <el-option
              v-for="(item, index) in dropDown.oLevels"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="值守开始日期:"
          :label-width="formLabelWidth"
          prop="oStarttime"
          size="small"
        >
          <el-date-picker
            style="width: 100%"
            v-model="form.oStarttime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择计划巡视日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="值守地点"
          :label-width="formLabelWidth"
          prop="oLocatiom"
          size="small"
        >
          <el-input
            v-model="form.oLocatiom"
            placeholder="填写值守地点"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="经度"
          :label-width="formLabelWidth"
          prop="longitude"
          size="small"
        >
          <el-input
            v-model="form.longitude"
            placeholder="请填写经度"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="纬度"
          :label-width="formLabelWidth"
          prop="latitude"
          size="small"
        >
          <el-input v-model="form.latitude" placeholder="请填写纬度"></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="所属地市"
          :label-width="formLabelWidth"
          prop="cityName"
          size="small"
        >
          <el-input
            readonly
            v-model="form.cityName"
            placeholder="所属地市"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="排序号"
          :label-width="formLabelWidth"
          prop="orderNo"
          size="small"
        >
          <el-input
            v-model="form.orderNo"
            placeholder="请填写排序号"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="施工方联系人"
          :label-width="formLabelWidth"
          prop="cPerson"
          size="small"
        >
          <el-input
            v-model="form.cPerson"
            placeholder="请填写施工方联系人"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="施工方联系电话"
          :label-width="formLabelWidth"
          prop="cPhone"
          size="small"
        >
          <el-input
            v-model="form.cPhone"
            placeholder="请填写施工方联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 100%"
          label="值守原因:"
          :label-width="formLabelWidth"
          prop="ondutyCom"
          size="small"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写值守原因"
            v-model="form.ondutyCom"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 100%"
          label="备注信息:"
          :label-width="formLabelWidth"
          prop="remark"
          size="small"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写备注信息"
            v-model="form.remark"
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
    <publicDialog ref="line" @callBackFn="update"> </publicDialog>
    <publicDialog ref="hiddenDanger" @callBackFn="update"> </publicDialog>
  </div>
</template>

<script>
import publicDialog from "@/pages/public/publicDialog.vue";
export default {
  name: "mm",
  components: { publicDialog },
  data() {
    let validateLineName = (rule, value, callback) => {
      if (!this.form.lineName) {
        callback(new Error("请选择影响线路"));
      } else {
        callback();
      }
    };
    let validateReTroubleDesc = (rule, value, callback) => {
      if (!this.form.reTroubleDesc) {
        callback(new Error("请选择关联隐患"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      form: { lineName: "", reTroubleDesc: "" },
      formLabelWidth: "120px",
      visible: false,
      title: "",

      show: true,
      susers: [],
      zusers: [],

      dropDown: {
        oLevels: [],
        depts: []
      },
      //向子件传递的数据
      fieldRules: {
        reTroubleDesc: [
          {
            required: true,
            validator: validateReTroubleDesc,
            trigger: "change"
          }
        ],
        lineName: [
          {
            required: true,
            validator: validateLineName,
            trigger: "change"
          }
        ],
        ondutyCom: [
          {
            required: true,
            message: "请填写值守原因",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        deptId: [
          {
            required: true,
            message: "请选择任务所属部门",
            trigger: "change"
          }
        ],
        dutyer: [
          {
            required: true,
            message: "请选择任务负责人",
            trigger: "change"
          }
        ],
        oLevel: [
          {
            required: true,
            message: "请选择值守级别",
            trigger: "blur"
          }
        ],
        oDept: [
          {
            required: true,
            message: "请选择值守部门",
            trigger: "change"
          }
        ],
        guarder: [
          {
            required: true,
            message: "请选择值守负责人",
            trigger: "change"
          }
        ],
        guarderphone: [
          {
            required: true,
            message: "请填写值守联系电话",
            trigger: "blur"
          },
          {
            pattern: /^.{1,25}$/,
            message: "只能填写1-25个字",
            trigger: "blur"
          }
        ],
        oStarttime: [
          {
            required: true,
            message: "请选择值守开始日期",
            trigger: "change"
          }
        ],
        oLocatiom: [
          {
            required: true,
            message: "请填写值守地点",
            trigger: "blur"
          },
          {
            pattern: /^.{1,20}$/,
            message: "只能填写1-20个字",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "请填写经度",
            trigger: "blur"
          },
          {
            pattern: /^.{1,9}$/,
            message: "只能填写1-9个字",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "请填写纬度",
            trigger: "blur"
          },
          {
            pattern: /^.{1,9}$/,
            message: "只能填写1-9个字",
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
            pattern: /^.{1,18}$/,
            message: "只能填写1-18个字",
            trigger: "blur"
          }
        ],
        remark: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写0-200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form, dropDown, show) {
      this.title = title;
      this.form = { ...this.form, ...form };
      this.dropDown = dropDown;
      this.visible = true;
      this.show = show;
    },
    update(val, row) {
      if (val === "line") {
        this.form.lineId = row.pmsId;
        this.form.lineName = row.lineName;
      }
      if (val === "hiddenDanger") {
        this.form.reTrouble = row.objId;
        this.form.reTroubleDesc = "【隐患编号】" + row.troubleCode;
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    showHDTable() {
      this.$refs.line.setDialogType("hiddenDanger");
    },
    loadUserM(val) {
      this.loadUser(val, "m");
    },
    loadUserT(val) {
      this.loadUser(val, "t");
    },
    loadUser(val, str) {
      var obj = this.dropDown.depts.find(item => {
        return item.code === val;
      });
      if (str === "t") {
        this.form.deptName = typeof obj === "undefined"?"":obj.name;
      } else {
        this.form.oDeptname = typeof obj === "undefined"?"":obj.name;
      }
      let url = "/tpiim/sysUser/getUserNameListForTask";
      $axios({
        url: url,
        type: "post",
        data: val
      })
        .then(data => {
          if (data.successful) {
            if (str === "t") {
              this.susers = data.resultValue;
              let obj = this.susers.find(item => {
                return item.code === this.form.dutyer;
              });
              if (this.form.dutyer && !obj) {
                this.form.dutyer = "";
              }
            } else {
              this.zusers = data.resultValue;
              let obj = this.zusers.find(item => {
                return item.code === this.form.guarder;
              });
              if (this.form.guarder && !obj) {
                this.form.guarder = "";
              }
            }
          } else {
            console.error(data.resultHint);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadSuserName(val) {
      let obj = this.susers.find(item => {
        return item.code === val;
      });
      this.form.dutyerName = obj.name;
    },
    loadZuserName(val) {
      let obj = this.zusers.find(item => {
        return item.code === val;
      });
      this.form.guardername = obj.name;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form = { lineName: "", reTroubleDesc: "" };
      this.show = true;
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form,
            isFinished: "0"
          };
          if (data.objId) {
            const url = "/tpiim/ptmiDutyTask/update";
            delete data.regDate;
            this.handle(url, data);
          } else {
            data.taskState = "0";
            const url = "/tpiim/ptmiDutyTask/add";
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
