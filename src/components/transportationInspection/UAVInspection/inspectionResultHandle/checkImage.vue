<template>
  <el-dialog
    :title="dialogTitle"
    :before-close="handleClose"
    :visible.sync="dialogFormVisible"
    class="checkImage"
  >
    <el-form
      :inline="true"
      v-if="dialogFormVisible"
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
        label="巡视任务:"
        :label-width="formLabelWidth"
        prop="inspectionTask"
        size="small"
        style="width: 100%"
      >
        <el-input
          type="textarea"
          autosize
          readonly
          @focus="showTaskTable"
          placeholder="请选择巡视任务"
          suffix-icon="el-icon-search"
          v-model="form.inspectionTask"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="关联杆塔:"
        :label-width="formLabelWidth"
        prop="towerId"
        size="small"
        style="width: 100%"
      >
        <el-select
          style="width: 100%"
          v-model="form.towerId"
          placeholder="请选择关联杆塔"
          clearable
        >
          <el-option
            v-for="(item, index) in tower"
            :key="index"
            :label="item.objName"
            :value="item.objId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleCreate"
        >确 定</el-button
      >
    </div>
    <publicDialogMulti ref="task" @callBackFn="update"> </publicDialogMulti>
  </el-dialog>
</template>
<script>
import publicDialogMulti from "@/pages/public/publicDialogMulti.vue";
import axios from "axios";
export default {
  name: "checkImage",
  props: ["dialogTitle", "dialogFormVisible", "inspectionTask"],
  components: {
    publicDialogMulti
  },
  data() {
    let validateTaskName = (rule, value, callback) => {
      if (!this.form.inspectionTask) {
        callback(new Error("请选择巡视任务"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      tower: [],
      form: {},
      formLabelWidth: "120px",
      token: sessionStorage.getItem("token"),
      fieldRules: {
        inspectionTask: [
          {
            required: true,
            validator: validateTaskName,
            trigger: "change"
          }
        ],
        towerId: [
          {
            required: true,
            message: "请选择关联杆塔",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    update(val, row) {
      if (val === "task") {
        let inspectionTask = "",
          inspectionTaskId = [],
          lineIds = [];
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            inspectionTask += row[i].taskName + ",";
            inspectionTaskId.push(row[i].objId);
            lineIds.push(row[i].lineId);
          }
        }
        this.form.inspectionTaskId = inspectionTaskId;
        this.form.inspectionTask = inspectionTask.substr(
          0,
          inspectionTask.lastIndexOf(",")
        );
        this.getTower(lineIds);
      }
    },
    getTower(lineIds) {
      let data = {
        objType: "tower",
        objIds: lineIds,
        objId: 0
      };
      const baseUrl = "/yangkai/line/getLineNameTreeList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            this.tower = res.resultValue || [];
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    showTaskTable() {
      this.$refs.task.setDialogType("task");
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.$emit("handleClose");
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const baseUrl = "/yangkai/picDefectInfo/removeRepetition";
          const url = `${baseUrl}`;
          $axios({
            url: url,
            type: "post",
            data: {
              ispTaskIds: this.form.inspectionTaskId,
              towerId: this.form.towerId
            }
          })
            .then(res => {
              if (res.successful) {
                this.$refs.form.resetFields();
                this.handleClose();
                this.$message.success(res.resultHint);
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
<style lang="less">
.checkImage {
  .el-form-item__content {
    width: calc(100% - 120px);
  }
}
</style>
