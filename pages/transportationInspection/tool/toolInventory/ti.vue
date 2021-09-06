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
        label="工器具名称:"
        :label-width="formLabelWidth"
        prop="toolsName"
        size="small"
      >
        <el-input
          v-model="form.toolsName"
          placeholder="请填写工器具名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="工器具分类:"
        :label-width="formLabelWidth"
        prop="toolsClass"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.toolsClass"
          placeholder="请选择工器具分类"
        >
          <el-option
            v-for="(item, index) in dropDown.toolType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属仓库:"
        :label-width="formLabelWidth"
        prop="toolsWarehouseId"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.toolsWarehouseId"
          placeholder="请选择所属工器具仓库"
        >
          <el-option
            v-for="(item, index) in dropDown.toolsWarehouse"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="工器具编号:"
        :label-width="formLabelWidth"
        prop="toolsNum"
        size="small"
      >
        <el-input
          v-model="form.toolsNum"
          placeholder="请填写工器具编号"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="规格型号:"
        :label-width="formLabelWidth"
        prop="toolsModel"
        size="small"
      >
        <el-input
          v-model="form.toolsModel"
          placeholder="请填写工器具规格型号"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="生产厂家:"
        :label-width="formLabelWidth"
        prop="toolsManufacturer"
        size="small"
      >
        <el-input
          v-model="form.toolsManufacturer"
          placeholder="请填写工器具生产厂家"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="出厂日期:"
        :label-width="formLabelWidth"
        prop="toolsDate"
        size="small"
      >
        <el-date-picker
          style="width: 100%"
          v-model="form.toolsDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="保管人:"
        :label-width="formLabelWidth"
        prop="userId"
        size="small"
      >
        <el-input v-model="form.userId" placeholder="请填写保管人"></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="保管单位:"
        :label-width="formLabelWidth"
        prop="unitId"
        size="small"
      >
        <el-input v-model="form.unitId" placeholder="请填写保管单位"></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
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
        <el-input v-else v-model="userData.cityName" readonly></el-input>
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
  name: "ti",
  data() {
    return {
      dropDown: {
        toolsWarehouse: [],
        toolType: []
      },
      userData: {},
      form: {},
      title: "",
      visible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      form: {},
      formLabelWidth: "120px",
      fieldRules: {
        toolsName: [
          {
            required: true,
            message: "请填写工器具名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        toolsClass: [
          {
            required: true,
            message: "请选择工器具分类",
            trigger: "change"
          }
        ],
        toolsWarehouseId: [
          {
            required: true,
            message: "请选择工器具仓库",
            trigger: "change"
          }
        ],
        toolsNum: [
          {
            required: true,
            message: "请填写工器具编号",
            trigger: "blur"
          }
        ],
        toolsModel: [
          {
            required: true,
            message: "请填写工器具规格型号",
            trigger: "blur"
          }
        ],
        toolsManufacturer: [
          {
            required: true,
            message: "请填写工器具生产厂家",
            trigger: "blur"
          }
        ],
        toolsDate: [
          {
            required: true,
            message: "请選擇工器具出厂日期",
            trigger: "change"
          }
        ],
        userId: [
          {
            required: true,
            message: "请填写保管人",
            trigger: "blur"
          },
          {
            pattern: /^.{2,4}$/,
            message: "只能填写2-4个字",
            trigger: "blur"
          }
        ],
        unitId: [
          {
            required: true,
            message: "请填写保管单位",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
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
    setData(title, form, dropDown, userData) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.userData = userData;
      this.dropDown = dropDown;
      this.visible = true;
    },
    handleClose() {
      this.form = {};
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let url = "";
          if (this.form.toolsId) {
            url = "/tpiim/tools/updateTool";
            this.handle(url, this.form);
          } else {
            let data = {
              ...this.form,
              ...this.userData,
              toolsState: "0"
            };
            url = "/tpiim/tools/createTool";
            this.handle(url, data);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, data) {
      $axios({ url: url, type: "post", data: data })
        .then(data => {
          if (data.successful) {
            this.$message.success(data.resultHint);
            this.$emit("updateData");
            this.handleClose();
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
