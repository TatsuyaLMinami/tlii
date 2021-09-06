import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
    debug: true,
    state: {
        //显示用户名称
        userName: "",
        //菜单
        menus: [],
        //模态框信息
        dialog: {
            width: null,
            component: null,
            params: {},
            visible: false
        }
    },
    mutations: {
        //设置用户名称
        setUserName(state, userName) {
            state.userName = userName;
            if (userName) {
                sessionStorage.setItem('userName', userName);
            }
        },
        //设置菜单
        setMenus(state, p_menus) {
            var menus = [];
            for (var i = 0; i < p_menus.length; i++) {
                if (p_menus[i].meta && p_menus[i].meta.isShow == false) {
                    continue;
                }
                menus.push(p_menus[i]);
            }
            state.menus = menus;
            if (menus) {
                sessionStorage.setItem('menus', JSON.stringify(menus));
            }
        },
        //显示模态框
        showDialog(state, p_params, p_width, p_height) {
            state.dialog.component = p_params.component;
            state.dialog.params = p_params.params;
            state.dialog.width = p_width || $config.dialogWidth;
            state.dialog.visible = true;
        },
        //隐藏模态框
        hideDialog(state) {
            state.dialog.visible = false;
        },
    }

});
//刷新页面时从sessionStorage 获取菜单
if (process.client) {
    window.store = store;
    var menusItem = sessionStorage.getItem('menus');
    if (menusItem) {
        try {
            var menus = JSON.parse(menusItem);
            store.commit('setMenus', menus);
        } catch (e) {

        }
    }
    var userName = sessionStorage.getItem('userName');
    if (userName) {
        store.commit('setUserName', userName);
    }
}
export default () => {
    return store
}