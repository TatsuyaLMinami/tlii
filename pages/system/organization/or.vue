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
        label="组织名称:"
        :label-width="formLabelWidth"
        prop="deptName"
        size="small"
      >
        <el-input
          v-model="form.deptName"
          placeholder="请填写组织名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="组织性质:"
        :label-width="formLabelWidth"
        prop="deptStyle"
        size="small"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.deptStyle"
          placeholder="请选择组织性质"
        >
          <el-option value="本部">本部</el-option>
          <el-option value="外委">外委</el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="组织类型:"
        :label-width="formLabelWidth"
        prop="deptType"
        size="small"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.deptType"
          placeholder="请选择组织类型"
        >
          <el-option value="单位">单位</el-option>
          <el-option value="部门">部门</el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="管理级别:"
        :label-width="formLabelWidth"
        prop="manageLevel"
        size="small"
      >
        <el-input
          v-model="form.manageLevel"
          placeholder="请填写管理级别"
        ></el-input>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="组织简称:"
        :label-width="formLabelWidth"
        prop="deptSimp"
        size="small"
      >
        <el-input
          v-model="form.deptSimp"
          placeholder="请填写组织简称"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="单位级别:"
        :label-width="formLabelWidth"
        prop="deptLevel"
        size="small"
      >
        <el-input
          v-model="form.deptLevel"
          placeholder="请填写单位级别"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="上级组织:"
        :label-width="formLabelWidth"
        prop="pName"
        size="small"
      >
        <el-input v-model="form.pName" placeholder="请填写上级组织"></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属网省:"
        :label-width="formLabelWidth"
        prop="provinceName"
        size="small"
      >
        <el-input
          v-model="form.provinceName"
          placeholder="请填写所属网省"
        ></el-input>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="所属地市:"
        :label-width="formLabelWidth"
        prop="cityName"
        size="small"
      >
        <el-select
          style="width: 100%"
          clearable
          v-model="form.cityName"
          placeholder="请选择所属地市"
        >
          <el-option
            v-for="(item, index) in city"
            :key="index"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        style="width: 50%"
        label="所属供电公司:"
        :label-width="formLabelWidth"
        prop="countyName"
        size="small"
      >
        <el-input
          v-model="form.countyName"
          placeholder="请填写所属供电公司"
        ></el-input>
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
  name: "or",
  data() {
    return {
      form: {},
      city: [],
      visible:false,
      title:"",
      formLabelWidth: "120px",
      fieldRules: {
        deptName: [
          {
            required: true,
            message: "请填写组织名称",
            trigger: "blur"
          }
        ],
        deptStyle: [
          {
            required: true,
            message: "请选择组织性质",
            trigger: "change"
          }
        ],
        deptType: [
          {
            required: true,
            message: "请选择组织类型",
            trigger: "change"
          }
        ],
        pName: [
          {
            required: true,
            message: "请填写上级组织名称",
            trigger: "blur"
          }
        ],
        manageLevel: [
          {
            required: true,
            message: "请填写管理级别",
            trigger: "blur"
          }
        ],
        provinceName: [
          {
            required: true,
            message: "请填写所属网省",
            trigger: "blur"
          }
        ],
        cityName: [
          {
            required: true,
            message: "请选择所属地市",
            trigger: "change"
          }
        ],
        countyName: [
          {
            required: true,
            message: "请填写所属供电公司",
            trigger: "blur"
          }
        ],
        deptLevel: [
          {
            required: true,
            message: "请填写单位级别",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form, city) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.city = city;
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
          let data = {
            ...this.form
          };
          if (data.objId) {
            const url = "tpiim/sysOrg/updateSysOrg";
            this.handle(url, data);
          } else {
            const url = "/tpiim/sysOrg/createSysOrg";
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
