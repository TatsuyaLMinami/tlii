// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import "@/assets/css/index.css";
import "@/assets/css/style.css";
import "@/assets/scroll.css";
import "@/assets/css/public.css";
import App from "./App";

import router from "@/router";
import store from "@/store";

import Echarts from "echarts";
Vue.prototype.$echarts = Echarts;

import ailabel from "ailabel";
Vue.prototype.$ailabel = ailabel;

import moment from "moment";
moment.locale("zh-cn"); //moment.lang('zh-cn');
Vue.prototype.$moment = moment;

// if (process.env.NODE_ENV === "development") {
// 	require("@/mock/index.js")
// }
import "./http/index";

Vue.use(ElementUI);
Vue.config.productionTip = false;

//过滤器
import { parseTime } from "@/utils/index";
Vue.filter("parseTime", parseTime);
new Vue({
  el: "#app",
  store,
  router,
  watch: {
    $route(to, from) {
      var flag = false;
      if (to.path == "/" || to.path == "/login") {
        return;
      }
      for (var item of this.$store.state.tabs.editableTabs) {
        if (item.route === to.path) {
          this.$store.commit("setActiveTab", to.path);
          flag = true;
          break;
        }
      }

      if (this.$store.state.menus.length == 0) {
        return;
      }

      for (var item of this.$store.state.menus) {
        if (item.path == to.path && item.children && item.children.length > 0) {
          if (
            item.children[0].children &&
            item.children[0].children.length > 0
          ) {
            this.$router.push(item.children[0].children[0]);
          } else {
            this.$router.push(item.children[0]);
          }

          return;
        }
      }
      if (!flag) {
        this.$store.commit("addTab", { route: to.path, name: to.name });
        this.$store.commit("setActiveTab", to.path);
      }
    }
  },
  components: { App },
  template: "<App/>"
});
