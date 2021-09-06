<template>
  <div class="wrapper">
    <div class="login-wrapper" :model="form">
      <div class="bg-color3 b-radius8 login-content">
        <div class="frm-login">
          <div class="login-tips" v-show="isShow">{{ resultHint }}</div>
          <el-form
            :model="form"
            :rules="fieldRules"
            ref="form"
            style="
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content:center;
              width: 100%;
            "
          >
            <el-form-item
              style="width: 80%"
              label=""
              prop="userName"
              size="small"
            >
              <el-input
                placeholder="请输入账号"
                prefix-icon="el-icon-user"
                v-model="form.userName"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              style="width: 80%"
              label=""
              prop="password"
              size="small"
            >
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-view"
                type="password"
                v-model="form.password"
              >
              </el-input>
            </el-form-item>
            <el-button
              style="width:80%;margin-top:30px;"
              type="primary"
              @click="login"
              >登录</el-button
            >
          </el-form>
        </div>
        <div class="login-intr">
          <div class="login-intr-right">
            为保证最佳效果，请使用<br />
            1280×800以上分辨率<br />
            chrome或IE9以上版本浏览器
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logincss from "~/assets/css/login.css";
import { mapState, mapActions } from "vuex";
import dictionaries from "@/store/dictionaries/dictionaries";
export default {
  name: "Login",
  data() {
    return {
      layout:"full",
      isShow: false,
      resultHint: "",
      form: {
        userName: "",
        password: ""
      },
      fieldRules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请填写账号"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请填写密码"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("dictionaries", ...[Object.keys(dictionaries.actions)]),
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const url = "/user/login";
          $axios({ url: url, type: "post", data: this.form })
            .then(res => {
              if (res.successful) {
                for (let key in dictionaries.actions) {
                  dictionaries.actions[key]();
                }
                sessionStorage.setItem("userName", res.resultValue.userName);
                sessionStorage.setItem("Authorization", res.resultValue.token);
                store.commit("setMenus", res.resultValue.menus);             
                this.$router.push({ name: "deviceResource-resource" });
                this.$message.success(res.resultHint);
              } else {
                sessionStorage.clear();
                this.$message.error(res.resultHint);
              }
            })
            .catch(error => {
              sessionStorage.clear();
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
