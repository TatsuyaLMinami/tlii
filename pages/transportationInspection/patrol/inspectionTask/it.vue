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
          label="巡视线路:"
          :label-width="formLabelWidth"
          prop="lineId"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.lineId"
            placeholder="请选择巡视线路"
            @change="loadTower"
          >
            <el-option
              v-for="(item, index) in lines"
              :key="index"
              :label="item.objName"
              :value="item.objId"
            >
            </el-option>
          </el-select>
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
          label="起始杆塔:"
          :label-width="formLabelWidth"
          prop="startTower"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.startTower"
            placeholder="请选择起始杆塔"
            @change="loadSTowerName"
          >
            <el-option
              v-for="(item, index) in towers"
              :key="index"
              :label="item.objName"
              :value="item.objId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="终止杆塔:"
          :label-width="formLabelWidth"
          prop="endTower"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.endTower"
            placeholder="请选择终止杆塔"
            @change="loadETowerName"
          >
            <el-option
              v-for="(item, index) in towers"
              :key="index"
              :label="item.objName"
              :value="item.objId"
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
              v-for="(item, index) in dropDown.taskMode"
              :key="index"
              :label="item.name"
              :value="item.code"
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
              v-for="(item, index) in dropDown.taskType"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="巡视班组:"
          :label-width="formLabelWidth"
          prop="ispTeam"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.ispTeam"
            placeholder="请选择巡视班组"
            @change="loadTeamName"
          >
            <el-option
              v-for="(item, index) in dropDown.taskTeam"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="计划巡视日期:"
          :label-width="formLabelWidth"
          prop="planIspDate"
          size="small"
        >
          <el-date-picker
            style="width:100%"
            v-model="form.planIspDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择计划巡视日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="所属地市"
          :label-width="formLabelWidth"
          prop="cityName"
          size="small"
        >
          <el-input
            readOnly
            v-model="form.cityName"
            placeholder="请选择所属地市"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
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
          style="width:100%"
          label="巡视范围:"
          :label-width="formLabelWidth"
          prop="ispRange"
          size="small"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写巡视范围"
            v-model="form.ispRange"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:100%"
          label="巡视内容:"
          :label-width="formLabelWidth"
          prop="ispContent"
          size="small"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请填写巡视内容"
            v-model="form.ispContent"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:100%"
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
  </div>
</template>

<script>
export default {
  name: "it",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      form: {},
      formLabelWidth: "120px",
      visible: false,
      title: "",

      dropDown: {
        taskType: [],
        taskMode: [],
        taskTeam: [],
        volLevel: [],
      },
      lines: [],
      towers: [],
      //向子件传递的数据
      fieldRules: {
        lineId: [
          {
            required: true,
            message: "请选择巡视线路",
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
        ispMode: [
          {
            required: true,
            message: "请选择巡视方式",
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
        ispTeam: [
          {
            required: true,
            message: "请选择巡视班组",
            trigger: "change"
          }
        ],
        planIspDate: [
          {
            required: true,
            message: "请选择计划巡视日期",
            trigger: "change"
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
        ispContent: [
          {
            required: true,
            message: "请填写巡视内容",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        ispRange: [
          {
            required: true,
            message: "请填写巡视范围",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        startTower: [
          {
            required: true,
            message: "请选择起始杆塔",
            trigger: "change"
          }
        ],
        endTower: [
          {
            required: true,
            message: "请选择终止杆塔",
            trigger: "change"
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
  mounted() {
    //线路
    const baseUrl5 = "/tpiim/line/getLineNameTreeList";
    const url5 = `${baseUrl5}`;
    $axios({
      url: url5,
      type: "post",
      data: {
        objType: "line"
      }
    }).then(data => {
      if (data.successful) {
        this.lines = data.resultValue;
      } else {
        console.error(data.resultHint);
      }
    });
  },
  methods: {
    setData(title, form, dropDown) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify(form));
      if (this.form.lineId) {
        this.loadTower(this.form.lineId);
      }
      this.dropDown = JSON.parse(JSON.stringify(dropDown));
      this.visible = true;
    },
    loadTower(val) {
      let obj = this.lines.find(item => {
        return item.objId === val;
      });
      this.form.lineName = obj.objName;
      //杆塔
      let baseUrl = "/tpiim/line/getLineNameTreeList";
      let url = `${baseUrl}`;
      $axios({
        url: url,
        type: "post",
        data: {
          objType: "tower",
          objId: val
        }
      }).then(data => {
        if (data.successful) {
          this.towers = data.resultValue;
          if (this.form.objId) {
            let hasST = this.towers.find(item => {
                return item.objId === this.form.startTower;
              }),
              hasET = this.towers.find(item => {
                return item.objId === this.form.endTower;
              });
            if (!hasST) {
              this.form.startTower = "";
            }
            if (!hasET) {
              this.form.endTower = "";
            }
          }
        } else {
          console.error(data.resultHint);
        }
      });
    },
    loadSTowerName(val) {
      let obj = this.towers.find(item => {
        return item.objId === val;
      });
      this.form.startTowername = obj.objName;
    },
    loadETowerName(val) {
      let obj = this.towers.find(item => {
        return item.objId === val;
      });
      this.form.endTowername = obj.objName;
    },
    loadTeamName(val) {
      let obj = this.dropDown.taskTeam.find(item => {
        return item.code === val;
      });
      this.form.ispTeamname = obj.name;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.form =  {};
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ...this.form,
            sourceType: "1"
          };
          if (data.objId) {
            const url = "/tpiim/ptmiInsTask/update";
            this.handle(url, data);
          } else {
            data.dataStatus = "0";
            const url = "/tpiim/ptmiInsTask/add";
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
