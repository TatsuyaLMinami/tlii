 <template>
    <el-dialog
        :title="dialogTitle"
        :before-close="handleClose"
        :visible.sync="dialogFormVisible"
        class="imageStyle"
    >
        <el-form
            v-if="dialogFormVisible"
            :model="form"
            ref="form"
            style="
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                width: 100%;
            "
        >
            <el-form-item style="width: 100%"
                size="small">
                <!-- <div class="block" v-for="(item,index) in imageUrl" :key="index"> -->
                    <el-image
                        :preview-src-list="[imageUrl]"
                        style="width: 100%; height:100%"
                        :src="imageUrl"
                        fit="fill"
                        lazy
                    >
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                <!-- </div> -->
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    name: "imageDialog",
    props: [ "dialogTitle","imageUrl","dialogFormVisible"],
    data() {
        return {
            form:{},
            fileList:[],
        }
    },
    methods: {
        handleClose() {
            this.$emit("handleClose");
        },
    },
};
</script>
<style  lang="less">
.imageStyle {
    height: 100%;
    width: 100%;
    min-width: 1000px;
    .el-dialog {
        margin-top: 10vh !important;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        .el-dialog__header {
            text-align: center;
            border-bottom: 1px solid #eee;
        }
        .el-dialog__headerbtn {
            top: 15px;
        }
        .el-dialog__close {
            color: black;
        }
        .el-dialog__body {
            text-align: center;
            padding: 5px;
        }
    }
}
</style>
