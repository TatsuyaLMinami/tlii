import {
    Message
} from 'element-ui'

export default function ({ store, redirect, app: { $axios } }) {
    if (process.client) {
        window.$axios = $axios;
    }
    
    $axios.onRequest((options) => {
        const method = (options.type || options.method || "get").toLowerCase();
        const data = options.data;
        const config = {
            url: options.url,
            method: method,
            timeout: options.timeout || 0,
            data: data
        };
        //替换路径参数
        if (data) {
            config.url = config.url.replace(/{\w+}/g, function (v) {
                const key = v.substring(1, v.length - 1);
                const value = data[key];
                delete data[key];
                return value;
            });
        }
        const headers = {
            Authorization: sessionStorage.getItem("token") || ""
        };
        if (method === "get") {
            config.params = data;
        }
        if (options.formdata) {
            config.transformRequest = [
                function (data) {
                    let ret = "";
                    for (let it in data) {
                        if (data[it] !== void 0 && data[it] !== null) {
                            ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                        }
                    }
                    return ret;
                }
            ];
            headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
        } else if (options.multipart) {
            let fromData = new FormData();
            for (let it in data) {
                if (data[it] !== void 0 && data[it] !== null) {
                    fromData.append(it, data[it])
                }
            }
            config.data = fromData;
            headers["Content-Type"] = "multipart/form-data";
        } else {
            headers["Content-Type"] = "application/json;charset=UTF-8";
        }
        config.headers = headers;
        if (options.responseType) {
            config.responseType = options.responseType;
        }
        config.data = JSON.stringify(options.data);
        return config;
    })
    $axios.onRequestError((err) => {
        console.log(err);
    })
    $axios.onError((error) => {
        console.log(error)
        switch (error.response.status) {
            case 101:
                Message.error("注册失败");
                break;
            case 102:
                Message.error("该用户已存在，清重新输入");
                break;
            case 103:
                Message.error("登录失败,用户名或密码错误");
                break;
            case 400:
                Message.error("请求错误");
                break;
            case 401:
                Message.error("暂无权限");
                break;
            case 500:
                Message.error("服务异常");
                break;
            default:
                break;
        }
    })
    $axios.onResponse((res) => {
        return JSON.parse(res.data);
    })
    $axios.onResponseError((err) => {
        console.log(err);
    })
}

