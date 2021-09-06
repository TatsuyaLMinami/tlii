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
        style="width: 50%"
        label="仓库名称:"
        :label-width="formLabelWidth"
        prop="toolsWarehouseName"
        size="small"
      >
        <el-input
          v-model="form.toolsWarehouseName"
          placeholder="请填写仓库名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="仓库面积:"
        :label-width="formLabelWidth"
        prop="toolsWarehouseArea"
        size="small"
      >
        <el-input
          v-model="form.toolsWarehouseArea"
          placeholder="请填写仓库面积"
        >
          <template slot="append">m²</template></el-input
        >
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="库管员:"
        :label-width="formLabelWidth"
        prop="userId"
        size="small"
      >
        <el-input v-model="form.userId" placeholder="请填写库管员"></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属部门:"
        :label-width="formLabelWidth"
        prop="departmentName"
        size="small"
      >
        <el-input
          v-if="form.departmentName"
          v-model="form.departmentName"
          readonly
        ></el-input>
        <el-input
          v-else
          v-model="userData.departmentName"
          readonly
        ></el-input>
      </el-form-item>  
      <el-form-item
        style="width:50%"
        label="所属地市"
        :label-width="formLabelWidth"
        prop="cityName"
        size="small"
      >
        <el-input
          v-if="form.cityName"
          v-model="form.cityName"
          readonly
        ></el-input>
        <el-input
          v-else
          v-model="userData.cityName"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="仓库位置:"
        :label-width="formLabelWidth"
        prop="toolsWarehouseLocation"
        size="small"
      >
        <el-input
          type="textarea"
          :rows="2"
          show-word-limit
          maxlength="200"
          placeholder="请填写仓库位置,最多200字"
          v-model="form.toolsWarehouseLocation"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:100%"
        label="主要存储工器具:"
        :label-width="formLabelWidth"
        prop="toolsWarehouseTool"
        size="small"
      >
        <el-input
          type="textarea"
          :rows="2"
          show-word-limit
          maxlength="200"
          placeholder="请输入主要存储工器具,最多200字"
          v-model="form.toolsWarehouseTool"
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
          show-word-limit
          maxlength="200"
          placeholder="请输入内容,最多200字"
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
</template>
<script>
export default {
  name: "tw",
  data() {
    return {
      visible: false,
      title: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dropDown: {
        insTasks: []
      },
      userData: {},
      loading: false,
      form: {},
      formLabelWidth: "120px",
      //向子件传递的数据
      fieldRules: {
        toolsWarehouseName: [
          {
            required: true,
            message: "请填写工器具仓库名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        toolsWarehouseArea: [
          {
            required: true,
            message: "请填写仓库面积",
            trigger: "blur"
          },
          {
            pattern: /^\+?(0|[1-9][0-9]*)$/,
            message: "只能填写大于零的数值",
            trigger: "blur"
          }
        ],
        userId: [
          {
            required: true,
            message: "请填写库管员",
            trigger: "blur"
          },
          {
            pattern: /^.{2,4}$/,
            message: "只能填写2-4个字",
            trigger: "blur"
          }
        ],
        toolsWarehouseLocation: [
          {
            required: true,
            message: "请填写仓库位置",
            trigger: "blur"
          },
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        toolsWarehouseTool: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
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
    setData(title, form, userData) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.userData = userData;
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
          let url = "";
          if (this.form.toolsWarehouseId) {
            url = "/tpiim/toolsWarehouse/updateToolsWarehouse";
            this.handle(url, this.form);
          } else {
            let data = {
              ...this.form,
              ...this.userData
            };
            url = "/tpiim/toolsWarehouse/createToolsWarehouse";
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
