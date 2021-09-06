<template>
  <div id="index">
    <Login />
  </div>
</template>

<script>
import Login from "./login/index.vue";
export default {
  name: "index",
  layout: 'default',
  components: {
    Login,
  }
};
</script>
