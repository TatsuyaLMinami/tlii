<template>
    <div style="height: 100%">
        <el-tabs
            v-model="$store.state.tabs.activeIndex"
            closable
            @tab-click="tabClick"
            @tab-remove="removeTab"
            @contextmenu.prevent.native="openMenu($event)"
        >
            <el-tab-pane
                v-for="(item, index) in $store.state.tabs.editableTabs"
                :key="index"
                :label="item.name"
                :name="item.route"
            >
                <component
                    :is="item.component"
                    v-bind="item.params"
                    :ref="item.url"
                ></component>
            </el-tab-pane>
        </el-tabs>
        <ul
            class="contextmenu"
            v-show="visible"
            :style="{ left: left + 'px', top: top + 'px' }"
        >
            <!-- <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li> -->
            <!-- <li @click="closeOthersTags">关闭所有</li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
        };
    },
    methods: {
        //切换选项卡
        tabClick(tab) {
            this.$router.push({ path: this.$store.state.tabs.activeIndex });
        },
        openMenu(e) {
            this.visible = true;
            this.left = e.clientX;
            this.top = e.clientY;
        },
        //删除选项卡
        removeTab(targetName) {
            var activeIndex = this.$store.state.tabs.activeIndex;
            var editableTabs = this.$store.state.tabs.editableTabs;
            var hasRoute = this.$store.state.tabs.hasRoute;
            if (editableTabs.length === 1) {
                return;
            }
            this.$store.commit("deleteTab", targetName);
            if (activeIndex === targetName) {
                if (editableTabs && editableTabs.length >= 1) {
                    this.$store.commit(
                        "setActiveTab",
                        editableTabs[editableTabs.length - 1].route
                    );
                    if (hasRoute) {
                        this.$router.push({
                            path: editableTabs[editableTabs.length - 1].route,
                        });
                    }
                }
            }
        },
        closeSelectedTag(view) {},
        closeOthersTags() {
            // this.$store.commit("deleteAllTab");
            // this.$router.push({
            //   path: "/deviceResource/resource",
            //   query: {
            //     t: new Date().getTime(),
            //   },
            // });
            var activeIndex = this.$store.state.tabs.activeIndex;
            // this.$router.push({ path: activeIndex });
            this.visible = false;
        },
        closeAllTags() {},
    },
};
</script>
<style lang="less">
.el-tabs {
    height: 100%;
    .el-tabs__content {
        height: calc(100% - 40px);
        .el-tab-pane {
            height: 100%;
        }
    }
}
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
</style>
