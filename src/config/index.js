const env = process.env;

var config = {};
if (env.NODE_ENV == 'development') {//开发环境
    config = {
        webName: "地市级输电全景智慧物联监控平台",
        //微服务地址
        baseUrl: "http://192.168.4.237:9004",
        mock: false,// mock为true时根据mock目录下的配置返回模拟数据
        //是否开启远程登录退出及菜单获取
        isRemote: false,
        //登录地址，后端返回格式：{"successful":true,"resultValue":{"userName":"张三","token":"111111"},"resultHint":"","errorPage":"","type":""}
        loginURL: "http://192.168.4.237:9004/user/login",
        //退出地址，后端返回格式：{"successful":true,"resultValue":true,"resultHint":"","errorPage":"","type":""}
        
        logoutURL: "http://192.168.4.237:9004/user/logout",
        //获取菜单地址，后端返回格式：{ "successful":true,"resultValue": { "nodes": [{"id":"2", "route":"/organizational","text":"组织管理", "hasChildren": true, "childNodes": [{"id":"21","route":"/organizational/department","text":"部门管理","hasChildren": false}, {"id":"22","route":"/organizational/employee","text":"员工管理", "hasChildren": false}]} ]}}
        menuURL: "http://192.168.4.237:9004/getResource",
        //存储和传递token的key和name
        tokenName: "token",
        //弹框默认宽度
        dialogWidth: "800px",
        //弹框默认高度
        dialogHeight: "500px",
        //sm2的公钥，微服务后端配置相应私钥
        key2: "04b0a59f4c23f4a26542deceb9605858bf90828d4f6e22998073455c0f31098f2c879f740baff69acc192b40a17570246f2b05c5505565e707c5f3754c417a995b",
        // 需要加密的数据，key为url（不包含config.baseUrl）,value为需要加密的值对应的参数名数组
        encrypt: {
            "/user/login": ["password"]
        }
    };
} else if (env.NODE_ENV == 'production') {//生产环境
    config = {

        webName: "地市级输电全景智慧物联监控平台",
        //微服务地址
        baseUrl: "tpiim",
        //是否开启远程登录退出及菜单获取
        isRemote: true,
        //登录地址，后端返回格式：{"successful":true,"resultValue":{"userName":"张三","token":"111111"},"resultHint":"","errorPage":"","type":""}
        loginURL: "tpiim/user/login",
        //退出地址，后端返回格式：{"successful":true,"resultValue":true,"resultHint":"","errorPage":"","type":""}
        logoutURL: "tpiim/user/logout",
        //获取菜单地址，后端返回格式：{ "successful":true,"resultValue": { "nodes": [{"id":"2", "route":"/organizational","text":"组织管理", "hasChildren": true, "childNodes": [{"id":"21","route":"/organizational/department","text":"部门管理","hasChildren": false}, {"id":"22","route":"/organizational/employee","text":"员工管理", "hasChildren": false}]} ]}}
        menuURL: "tpiim/user/getMenus",
        //存储和传递token的key和name
        tokenName: "token",
        //弹框默认宽度
        dialogWidth: "800px",
        //弹框默认高度
        dialogHeight: "500px",
        //sm2的公钥，微服务后端配置相应私钥
        key2: "04b0a59f4c23f4a26542deceb9605858bf90828d4f6e22998073455c0f31098f2c879f740baff69acc192b40a17570246f2b05c5505565e707c5f3754c417a995b",
        // 需要加密的数据，key为url（不包含config.baseUrl）,value为需要加密的值对应的参数名数组
        encrypt: {
            "/user/login": ["password"]
        }
    };
} else if (env.NODE_ENV == 'test') {//测试环境
    config = {

        webName: "地市级输电全景智慧物联监控平台",

    };
}

/**
 * 设置前后端请求时参数加密的全局回调函数，当该函数不为null时会在RESTClient的send方法中调用该函数对参数进行处理。
 * 参数： p_data，一个json对象，前端请求到后端的参数
 * 参数： url，请求的url
 * 参数： method，请求的方法（get或post）
 */
cube.encryptData = function (p_data, url, method) {
    //以下为一次一密及摘要示例，仅为参考。
    //生成sm4的密钥
    var keypair = SG_sm2generateKeyPair();
    var key4 = keypair.ecprvhex.substring(0, 16);

    // 使用sm4进行加密
    if (cube.notEmpty(config.encrypt) && cube.notEmpty(url)) {
        var paramKeys = [];

        if (url.indexOf(config.baseUrl) != -1) {
            url = url.substring(config.baseUrl.length);
        }

        if (url.indexOf("?") != -1) {
            url = url.split("?")[0];
        }

        for (var key in config.encrypt) {
            if (config.encrypt.hasOwnProperty(key)) {
                if (key == url) {
                    paramKeys = config.encrypt[key];
                    break;
                }
            }
        }

        if (paramKeys && paramKeys.length > 0) {
            if (cube.isString(p_data)) {
                try {
                    var dataStr = $.parseJSON(p_data);
                    //加密操作
                    encryptValue(dataStr, key4, paramKeys);
                    p_data = JSON.stringify(dataStr);
                } catch (e) {
                }
            } else {
                //加密操作
                encryptValue(p_data, key4, paramKeys);
            }
        }
    }

    // 对sm4的密钥使用sm2的公钥进行加密
    var auth1 = SG_sm2Encrypt(key4, config.key2);
    var auth2 = "";

    //对数据进行排序
    var auth2Str = jsonSort(p_data, method) + "|" + key4;
    //使用sm3生成摘要
    auth2 = SG_sm3encrypt(auth2Str);

    //AUTH1和AUTH2会通过header传递到后端
    var obj = {
        "AUTH1": auth1, //sm4的密钥的密文，后端获取该值后使用sm2的私钥进行解密，然后再使用解密后的值作为sm4的密钥对数据进行解密。
        "AUTH2": auth2  //数据摘要，后端获取参数进行排序后同样使用sm3生成摘要后和该值进行对比
    };

    var customHeaders = cube.customHeaders;
    if (cube.notEmpty(customHeaders)) {
        $.extend(customHeaders, obj);
    } else {
        customHeaders = obj;
    }

    return {
        data: p_data,
        customHeaders: customHeaders,
        secretKey: key4 //该值不会传递到后端，会传递给cube.decryptData方法
    };
}

/**
 * 设置前后端请求时参数解密的全局回调函数，当该函数不为null时会在RESTClient的send方法中调用该函数对返回数据进行处理。
 * 参数： p_resultValue，一个json对象，前端请求到后端的参数
 * 参数： textStatus
 * 参数： request
 * 参数： secretKey，cube.encryptData中设置的secretKey
 */
cube.decryptData = function (p_config, p_resultValue, textStatus, request, secretKey) {
    //以下为对后端返回数据进行解密及摘要对比示例，仅为参考。
    //该示例后端返回的为数据整体加密后的密文：{cipherText: "通过前端传递到后端的sm4的密钥加密后的密文"}，secretKey为cube.encryptData中设置的secretKey。
    //AUTH2为后端返回到header中的数据通过sm3加密后的摘要。

    var url = p_config.url;

    if (cube.isEmpty(secretKey)) {
        return p_resultValue;
    }

    var str = "";

    //解密
    if (p_resultValue && secretKey && cube.notEmpty(p_resultValue.cipherText)) {
        str = SG_sm4decrypt(p_resultValue.cipherText, secretKey);
        try {
            p_resultValue = JSON.parse(str);
        } catch (e) {

        }

    } else {
        str = JSON.stringify(p_resultValue);
    }

    // 摘要对比
    var auth2 = SG_sm3encrypt(str);
    var responseAUTH2 = request.getResponseHeader("AUTH2");

    if (p_resultValue && cube.notEmpty(p_resultValue.cipherText) && (cube.isEmpty(auth2) || cube.isEmpty(responseAUTH2)
        || auth2.toLowerCase() != responseAUTH2.toLowerCase())) {
        cube.indicate("warning", "前后端摘要不一致!");
        return { successful: false };
    }

    return p_resultValue;

}

// 对数据进行排序
function jsonSort(jsonObj, method) {
    if (cube.isObject(jsonObj)) {
        var arr = [];
        for (var key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }

        if (method == "GET") {
            arr.sort();
        }

        var str = "";
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                str += arr[i] + "=" + jsonObj[arr[i]]
                    + (method == "GET" ? "|" : "&");
            }
        }

        return str.substr(0, str.length - 1);
    }

    if (typeof (jsonObj) == "undefined" || jsonObj === null) {
        jsonObj = "";
    }

    return jsonObj;
}

// 对数据进行加解密
function encryptValue(p_obj, p_key, p_paramKeys, p_decrypt) {
    var result = null;
    if (cube.isArray(p_obj)) {
        result = [];
        var i = p_obj.length;
        while (i--) {
            encryptValue(p_obj[i], p_key, p_paramKeys, p_decrypt);
        }
    } else if (cube.isObject(p_obj)) {
        if (p_obj.constructor != RegExp) {
            for (var k in p_obj) {
                if (p_obj.hasOwnProperty(k)) {
                    if (cube.isObject(p_obj[k])) {
                        encryptValue(p_obj[k], p_key, p_paramKeys, p_decrypt);
                    } else {
                        if (p_paramKeys.indexOf(k) != -1 && cube.notEmpty(p_obj[k])) {
                            if (p_decrypt === true) {
                                // 解密
                                p_obj[k] = SG_sm4decrypt(p_obj[k], p_key);
                            } else {
                                p_obj[k] = SG_sm4encrypt(p_obj[k], p_key);
                            }
                        }
                    }
                }
            }
        }
    }
};

export default config;