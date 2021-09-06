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
        label="施工点名称:"
        :label-width="formLabelWidth"
        prop="constructionSite"
        size="small"
      >
        <el-input
          v-model="form.constructionSite"
          placeholder="请填写施工点名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="施工联系人:"
        :label-width="formLabelWidth"
        prop="constructionContact"
        size="small"
      >
        <el-input
          v-model="form.constructionContact"
          placeholder="请填写施工联系人"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="联系电话:"
        :label-width="formLabelWidth"
        prop="contactPhoneNumber"
        size="small"
      >
        <el-input
          v-model="form.contactPhoneNumber"
          placeholder="请填写联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="负责人:"
        :label-width="formLabelWidth"
        prop="personCharge"
        size="small"
      >
        <el-input
          v-model="form.personCharge"
          placeholder="请填写负责人"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="风险等级:"
        :label-width="formLabelWidth"
        prop="riskLevel"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.riskLevel"
          placeholder="请选择风险等级"
        >
          <el-option
            v-for="(item, index) in riskLevel"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属地市"
        :label-width="formLabelWidth"
        prop="cityName"
        size="small"
      >
        <el-input v-model="form.cityName" readonly></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属部门"
        :label-width="formLabelWidth"
        prop="deptName"
        size="small"
      >
        <el-input v-model="form.deptName" readonly></el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="经度:"
        :label-width="formLabelWidth"
        prop="longitude"
        size="small"
      >
        <el-input v-model="form.longitude" placeholder="请填写经度"> </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="纬度:"
        :label-width="formLabelWidth"
        prop="latitude"
        size="small"
      >
        <el-input v-model="form.latitude" placeholder="请填写纬度"> </el-input>
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
  name: "fcs",
  data() {
    return {
      form: {},
      riskLevel: [],
      visible: false,
      title: "",
      formLabelWidth: "120px",
      fieldRules: {
        constructionSite: [
          {
            required: true,
            message: "请填写固定施工点名称",
            trigger: "blur"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        constructionContact: [
          {
            required: true,
            message: "请填写施工联系人",
            trigger: "change"
          },
          {
            pattern: /^.{1,50}$/,
            message: "只能填写1-50个字",
            trigger: "blur"
          }
        ],
        contactPhoneNumber: [
          {
            required: true,
            message: "请填写联系电话",
            trigger: "change"
          }
        ],
        riskLevel: [
          {
            required: true,
            message: "请选择风险等级",
            trigger: "change"
          }
        ],
        personCharge: [
          {
            required: true,
            message: "请填写负责人",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "请填写经度",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "请填写纬度",
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
    setData(title, form, riskLevel) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.riskLevel = riskLevel;
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
              ...this.form,
              isOver: "1"
            },
            url = "";
          if (data.objId) {
            this.handle(url, data);
            url = "/tpiim/selffixedconstructionpoint/update";
          } else {
            url = "/tpiim/selffixedconstructionpoint/add";
            this.handle(url, data);
          }
          $axios({
            url: url,
            type: "post",
            data: data
          })
            .then(data => {
              if (data.successful) {
                this.$message.success(data.resultHint);
                this.$refs.form.resetFields();
                this.$emit("updateData");
              } else {
                this.$message.error(data.resultHint);
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
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
