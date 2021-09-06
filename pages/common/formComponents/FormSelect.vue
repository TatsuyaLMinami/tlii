<template>
    <el-select
        class="width250"
        clearable
        @change="changeFn"
        :value="value"
        :disabled="disabled"
        size="small"
    >
        <el-option
            v-for="(item, i) in options"
            :key="i"
            :value="item.code"
            :label="item.name"
        >
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: "selectCom",
    props: {
        url: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            activeVal: "",
            options: [],
        };
    },
    created() {
        this.initFn();
    },
    methods: {
        initFn() {
            $axios({
                url: this.url,
                type: this.type,
            })
                .then((res) => {
                    this.options = res.resultValue;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        changeFn(code) {
            if (code) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].code === code) {
                        this.$emit("callBackFn", this.options[i]);
                    }
                }
            } else {
                this.$emit("callBackFn", {
                    code: "",
                    name: "",
                });
            }
        },
    },
};
</script>
<style scoped>
.width250 {
    width: 250px;
}
</style>
