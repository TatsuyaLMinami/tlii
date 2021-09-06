<template>
    <div id="example">
        <template v-if="$route.path == '/login' || $route.path == '/'">
            <router-view />
        </template>
        <template v-else>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-container style="overflow-y: hidden;">
                    <template v-if="$route.path == '/'">
                        <router-view />
                    </template>
                    <template v-else>
                        <el-aside width="220px">
                            <Left />
                        </el-aside>
                        <el-main>
                            <Main />
                        </el-main>
                    </template>
                </el-container>
            </el-container>
            <el-dialog
                title="表单"
                :width="$store.state.dialog.width"
                :visible.sync="$store.state.dialog.visible"
                destroy-on-close
            >
                <component
                    :is="$store.state.dialog.component"
                    v-bind="$store.state.dialog.params"
                    :ref="$store.state.dialog.url"
                ></component>
            </el-dialog>
        </template>
    </div>
</template>

<script>
import Header from "@/pages/main/Header";
import Left from "@/pages/main/Left";
import Main from "@/pages/main/Main";

export default {
    name: "App",
    components: {
        Header,
        Left,
        Main,
    },
};
</script>
<style lang="less">
.loadImage {
    .el-form-item__content{
        max-width: calc(100% - 120px);
    }
    .el-upload-list--picture-card .el-upload-list__item {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        //width: 80px;
        //height: 80px;
        margin: 0 8px 8px 0;
        display: inline-block;
    }
    .el-upload--picture-card {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        //width: 80px;
        //height: 80px;
        //line-height: 86px;
        vertical-align: top;
    }
}
.baseStyle {
    height: 100%;
    width: 100%;
    min-width: 1000px;
    .el-dialog {
        margin-top: 10vh !important;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        .readonly {
            width: 50%;
            text-align: left;
            margin-bottom: 0px;
        }
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
            padding: 25px 50px 10px 20px;
        }
        .el-pagination {
            position: absolute;
            bottom: 0px;
            left: 40%;
        }
        .el-dialog__footer {
            .dialog-footer {
                text-align: center;
            }
        }
    }
    .el-pagination {
        position: absolute;
        bottom: 0px;
        left: 40%;
    }
}
.el-table .warning-row {
    background: oldlace;
}
.el-table .success-row {
    background: #f0f9eb;
}
.el-message-box__header {
    border-bottom: 1px solid #eee;
}
.el-tabs__content {
    overflow-y: auto !important;
}
//解决table列对不齐问题
body .el-table th.gutter {
    display: table-cell !important;
}
//超出宽度隐藏，悬浮显示
.overflowText,
.tableOverflowText {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.overflowText:hover {
    overflow: visible;
    white-space: inherit;
}
</style>