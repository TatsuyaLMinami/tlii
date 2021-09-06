<template>
    <div>
        <el-table
            v-loading="loading"
            stripe
            :data="tableData"
            border
            :max-height="tableHeight"
        >
            <el-table-column type="index" label="序号" width="50">
            </el-table-column
            ><el-table-column
                v-for="(item, i) in tableItems"
                :key="i"
                :label="item.label"
                :width="item.width"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <span v-if="item.time">{{
                        scope.row[item.prop] 
                    }}</span>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: "omTable",
    props: ["loading", "tableItems", "tableData","tableHeight"],
};
</script>