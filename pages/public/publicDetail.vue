<template>
  <div>
    <el-dialog
      ref="dialog"
      class="baseStyle"
      :title="title"
      :before-close="handleClose"
      :visible.sync="visible"
      append-to-body
      @open="open"
    >
      <publicForm :list="form" ref="form"></publicForm>
    </el-dialog>
  </div>
</template>
<script>
import publicForm from "@/pages/public/publicForm";
export default {
  name: "publicDetail",
  components: { publicForm },
  data() {
    return {
      title: "",
      visible: false,
      form: {}
    };
  },
  methods: {
    open() {},
    setData(title, form) {
      this.$refs.dialog.open();
      this.title = title;
      this.$nextTick(() => {
        this.form = form;
        //this.$refs.form.setData(form);
        this.visible = true;
      });
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>
