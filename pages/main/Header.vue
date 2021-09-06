<template>
  <div>
    <div class="logo">地市级输电全景智慧物联监控平台</div>
    <el-menu
      :default-active="'/' + $route.path.split('/')[1]"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgb(0, 150, 136)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        :index="item.path"
        v-for="(item, index) in menus"
        :key="index"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <div class="userinfo">
      <el-avatar
        shape="square"
        size="small"
        icon="el-icon-user-solid"
      ></el-avatar>
      <span>{{ userName }}</span>
      <a @click="logout">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: "",
      menus: []
    };
  },
  mounted() {
    if (process.client) {
      this.userName = sessionStorage.getItem("userName");
      this.menus = JSON.parse(sessionStorage.getItem("menus"));
    }
  },

  methods: {
    logout() {
      const url = "/user/logout";
      $axios({
        url: url,
        type: "post"
      })
        .then(data => {
          if (data.successful) {
            this.$message.success(data.resultHint);
            sessionStorage.clear();
            this.$router.push({
              name: "login"
            });
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
