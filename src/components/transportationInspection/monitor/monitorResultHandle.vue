 <template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-aside width="200px" style="border: 1px solid #eee;">
                <taskTree @getImage="getImage"></taskTree>
            </el-aside>
            <el-container class="right">
                <taskRight
                    :image="image"
                    :points="points"
                    :table="table"
                    :form="form"
                    :totalPages="totalPages"
                    :info="info"
                >
                </taskRight>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import $store from "@/store/data.js";
import taskTree from "./monitorResultHandle/taskTree";
import taskRight from "./monitorResultHandle/taskRight";
export default {
    name: "monitorResultHandle",
    data() {
        return {
            url: $store.getters.url,
            image: "",
            points: [],
            table: [],
            form: {},
            totalPages:0,
            info:{},
        };
    },
    components: {
        taskTree,
        taskRight,
    },
    methods: {
        getImage(val) {
            this.image = val.image;
            this.points = val.points;
            this.table = val.table;
            this.form = val.form;
            this.totalPages = val.totalPages;
            this.info = val.info;
        },
    },
    mounted() {},
};
</script>
<style  lang="less">
.right {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}
</style>
