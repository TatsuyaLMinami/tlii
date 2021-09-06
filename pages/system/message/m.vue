<template>
  <el-dialog
    title="发送信息"
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
                            width:100%;"
    >
      <el-form-item
        style="width:100%"
        label="标题:"
        :label-width="formLabelWidth"
        prop="subject"
        size="small"
      >
        <el-input v-model="form.subject" placeholder="请填写标题"> </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        label="消息类型:"
        :label-width="formLabelWidth"
        prop="messageType"
        size="small"
      >
        <el-input v-model="form.messageType" placeholder="请填写消息类型">
        </el-input>
      </el-form-item>
      <el-form-item
        style="width:50%"
        size="small"
        label="接收人:"
        prop="receiverNames"
        :label-width="formLabelWidth"
      >
        <el-autocomplete
          style="width:100%"
          v-model="form.receiverNames"
          @input="changePerson"
          :fetch-suggestions="getReceiver"
          placeholder="请输入内容"
          @select="setPerson"
          clearable
          @clear="clearPerson"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item
        style="width:100%"
        label="消息内容:"
        :label-width="formLabelWidth"
        prop="content"
        size="small"
      >
        <el-input
          type="textarea"
          rows="5"
          maxlength="500"
          show-word-limit
          v-model="form.content"
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
</template>

<script>
export default {
  name: "m",
  data() {
    return {
      visible: false,
      form: {
        sendTime: new Date().getTime(),
        send: sessionStorage.getItem("userData").userName,
        sendId: sessionStorage.getItem("userData").userId
      },
      formLabelWidth: "120px",
      fieldRules: {
        subject: [
          {
            required: true,
            message: "请填写标题",
            trigger: "blur"
          }
        ],
        messageType: [
          {
            required: true,
            message: "请填写消息类型",
            trigger: "blur"
          }
        ],
        receiverNames: [
          {
            required: true,
            message: "请选择接收人",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请填写消息内容",
            trigger: "blur"
          },
          {
            pattern: /^.{1,500}$/,
            message: "只能填写1-500个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData() {
      this.visible = true;
    },
    setPerson(val) {
      this.form.receiverNames = val.value;
    },
    clearPerson() {
      this.form.receiverNames = "";
    },
    changePerson() {
      //this.form.receiver = "";
    },
    getReceiver(name, callback) {
      $axios({
        url: "/yangkai/sysUser/getUserList",
        type: "post",
        data: {
          staffName: name
        }
      })
        .then(res => {
          if (res.successful) {
            let obj = [],
              persons = res.resultValue.data;
            if (persons.length > 0) {
              for (let i = 0; i < persons.length; i++) {
                obj.push({
                  value: persons[i].staffName
                });
              }
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback(obj);
              }, 1000 * Math.random());
            } else {
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback([]);
              }, 1000 * Math.random());
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose() {
      this.form = {
        sendTime: new Date().getTime(),
        send: sessionStorage.getItem("userData").userName,
        sendId: sessionStorage.getItem("userData").userId
      };
      this.$refs.form.resetFields();
      this.visible = false;
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          $axios({
            url: "yangkai/comm/message/createNoticeNews",
            type: "post",
            data: {
              ...this.form
            }
          })
            .then(res => {
              if (res.successful) {
                this.$message.success(res.resultHint);
                this.$emit("updateData");
                this.handleClose();
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
