import RESTClient from './RESTClient'
import jsonUtil from './JsonUtil';
import store from '@/store'

/**
 * 提供了一些权限相关常用方法。
 */

function AuthUtil() {
    var me = this;

    /**
     * 根据后台返回的菜单判断路由是否有权限
     */
    me.hasAuth = function (path) {
        // if (path == "/") {
        // 	return true;
        // }
        return true;
        // var item = jsonUtil.getItem(store.state.menus, "path", path, 3);
        // if (item) {
        // 	return true;
        // }
        //return false;
    }
    /**
     * 判断是否登录
     */
    me.isLogin = function () {
        var token = me.getToken();
        return cube.notEmpty(token);
    }

    /**
     * 登录
     */
    me.login = function (model) {
        var client = new RESTClient();
        client.post($config.loginURL, JSON.stringify({ "userName": model.form.userName, "password": model.form.password }), function (data) {
            if (data.successful) {
                store.commit('setUserName', data.resultValue.userName);
                sessionStorage.setItem("userName", data.resultValue.userName);
                sessionStorage.setItem("token", data.resultValue.token);
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.resultValue)
                );
                //后台返回结构根据实际情况修改
                me.setToken(data.resultValue.token);
                model.$router.push({ path: "/" });
                //获取菜单
                // client.get($config.menuURL, function(data){
                // 	if (data.successful) {
                // 		var routers = me.initRoute(data.resultValue.nodes);

                // 		me.setMenus(routers);
                // 		model.$router.push({ path: "/" });
                // 	}
                // })
            } else {
                //显示错误提示信息
                model.resultHint = data.resultHint || cube.msg("REQUEST_FAIL");
                model.isShow = true;
            }
        })
    }

    /**
     * 退出
     */
    me.logout = function (model, logoutURL) {
        var client = new RESTClient();
        client.post(($config.logoutURL), function (data) {
            if (data.successful) {
                sessionStorage.clear()
                me.setToken(null);
                model.$router.push({ path: "/login" });
            } else {
                cube.indicate(cube.msg("LOGOUT_FAIL"));
            }
        })
    }

    /**
     * 根据后台返回数据初始化菜单
     */
    me.initRoute = function (nodes) {
        const accessedRouters = nodes.map((value, index) => {
            return {
                name: value.text,
                path: value.route,
                //	            component: value.hasChildren?{render: h => h('router-view')}:(resolve => {require(['../'+value.url.substr(1)+'.vue'], resolve);}),
                children: value.hasChildren ? me.initRoute(value.childNodes) : []
            }
        })
        return accessedRouters;
    }

    /**
     * 设置菜单
     */
    me.setMenus = function (menus) {
        store.commit('setMenus', menus);
    }

    /**
     * 存储token
     */
    me.setToken = function (token) {
        var key = $config.tokenName || "token";
        if (token) {
            sessionStorage.setItem(key, token);
        } else {
            sessionStorage.removeItem(key);
        }
    }

    /**
     * 获取token
     */
    me.getToken = function () {
        return sessionStorage.getItem($config.tokenName || 'token');
    }

}

export default new AuthUtil();
