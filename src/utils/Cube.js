/**
 * 提供了一些数据类型的常用方法，该工具类中的方法通过全局对象cube调用。
 * 例：cube.isEmpty(obj);
 */
import { Message } from 'element-ui';

var self = cube || {};

/**
 * 判断对象是否为Object类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isObject = function(p_value) {
    return p_value != null && typeof(p_value) == "object";
}

/**
 * 判断对象是否为null、undefined或空字符串。
 * @param
 *     p_value - 要对其进行判断的对象。
 *     
 * @return
 *     如果p_value为null、undefined或空字符串则返回true，否则返回false
 */
self.isEmpty = function(p_value) {
    return p_value == null || ((typeof(p_value) == "string" && p_value.replace(/^\s*/, "").replace(/\s*$/, "") == "") || typeof(p_value) == "undefined");
};

/**
 * 判断对象是否不为null、undefined或空字符串。
 * @param
 *     p_value - 要对其进行判断的对象。
 *     
 * @return
 *     如果p_value不为null、undefined或空字符串则返回true，否则返回false
 */
self.notEmpty = function(p_value) {
    return !self.isEmpty(p_value);
};

/**
 * 判断对象是否为数组类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isArray = function(p_value) {
    return p_value != null && (typeof(p_value) == "object" && typeof(p_value.length) == "number" && typeof(p_value.splice) == "function" &&!(p_value.propertyIsEnumerable('length')));
};

/**
 * 判断对象是否为String类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isString = function(p_value) {
    return typeof(p_value) == "string";
};

/**
 * 判断对象是否为Number类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isNumber = function(p_value) {
    return typeof(p_value) == "number";
};

/**
 * 判断对象是否为Function类型。
 * @param
 *    p_value - 要对其进行判断的对象。
 */
self.isFunction = function(p_value) {
    return typeof(p_value) == "function";
}

/**
 * 判断对象是否为Date类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isDate = function(p_value) {
    return p_value != null && p_value.constructor == Date;
};

/**
 * 判断对象是否为boolean类型。
 * @param
 *     p_value - 要对其进行判断的对象。
 */
self.isBoolean = function(p_value) {
    return typeof(p_value) == "boolean";
};

/**
 * 判断两个对象的值是否相等。
 * @param
 *     p_value1  - 要进行判断的对象。
 *     p_value2  - 要进行判断的对象。
 *     p_ignoreCase  - 一个Boolean值，指定是否忽略大小写，tru忽略大小写，false不忽略大小写。此参数可省略，默认值为false
 *     
 * @return
 *     如果两个对象的值相等则返回true，否则返回false
 */
self.isEqual = function(p_value1, p_value2, p_ignoreCase) {
    if (p_ignoreCase == null) {
        p_ignoreCase = false;
    }
    if (p_ignoreCase) {
        if (typeof(p_value1) == "string") {
            p_value1 = p_value1.toLowerCase();
        }
        if (typeof(p_value2) == "string") {
            p_value2 = p_value2.toLowerCase();
        }
    }
    
    if (self.isArray(p_value1) && self.isArray(p_value2)) {
        if (p_value1.length != p_value2.length) return false;
        for (var i = 0; i < p_value1.length; i++) {
            if (!self.isEqual(p_value1[i], p_value2[i], p_ignoreCase)) {
                return false;
            }                     
        }
        return true;
    }
    
    if (p_value1 == p_value2) {
        return true;
    }
    if (p_value1 == null && p_value2 != null) {
        return false;
    } else if (p_value1 != null && p_value2 == null) {
        return false;
    } else {
        return p_value1.valueOf() == p_value2.valueOf();
    }
}

/**
 * 创建并返回对象的一个副本。
 * @param
 *     p_obj  - 要创建副本的对象。
 */
self.clone = function(p_obj) {
    var result = null;
    if (self.isArray(p_obj)) {
        result = [];
        var i = p_obj.length;
        while (i--) {
            result[i] = self.clone(p_obj[i]);
        }
        return result;
    } else if (self.isObject(p_obj)) {
 		if (p_obj.constructor == RegExp) {
 			result = new RegExp(p_obj.source);
 		} else {
    		result = {};
	        for (var k in p_obj) {
	            result[k] = self.clone(p_obj[k]);
	        }
    	}
        return result;
    } else {
        return p_obj;
    }
}  

/**
 * 判断 p_inst 是否是 p_class 的实例。
 * @param
 *     p_inst  - 一个对象。
 *     p_class  - 一个类。
 */
self.instanceOf = function(p_inst, p_class) {
    if (p_inst == null) {
        return false;
    }
    
    switch (typeof(p_inst)) {
        case "boolean":
            return p_class == Boolean;
            
        case "number":
            return p_class == Number;

        case "string":
            return p_class == String;
            
        case "function":
            return p_class == Function;
            
        case "object":
            if (typeof(p_inst.instanceOf) == "function") {
                return p_inst.instanceOf(p_class);
            } else if (self.isDate(p_inst)) {
                return p_class == Date;
            } else if (self.isArray(p_inst)) {
                return p_class == Array;
            } else {
                return false;
            }
    }
}


/**
 * 去除字符串两端空格。
 * @param
 *     p_str  - 一个字符串。
 */
self.trim = function(p_str) {
	if (self.isString(p_str)) {
		p_str = p_str.replace(/^\s*/, "").replace(/\s*$/, "");
	}
	return p_str;
}

/**
 * 对字符串中的脚本进行过滤
 * @param
 *     p_str  - 一个字符串。
 */
self.cleanScript = function(p_str) {
	if (self.isString(p_str)) {
		var script = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi];
		for (var i = 0; i < script.length; i++) {
			p_str = p_str.replace(script[i], "");
		}
	}
	
	return p_str;
};

/**
 * 对字符串中的特殊字符进行转义
 * @param
 *     p_str  - 一个字符串。
 */
self.escapeString = function(p_str, autoWrap) {
	if (self.isString(p_str)) {
		p_str = p_str.replace(/javascript:/gi, "");
		p_str = p_str.replace(/&/g, "&amp;");
		p_str = p_str.replace(/</g, "&lt;");
		p_str = p_str.replace(/>/g, "&gt;");
		p_str = p_str.replace(/ /g, "&nbsp;");
		p_str = p_str.replace(/\'/g, "&#039;");
		p_str = p_str.replace(/\"/g, "&quot;");
		
		if (autoWrap) {
			p_str = p_str.replace(/\n/g, "<br/>");
		}
	}
	
	return p_str;
};

/**
 * 获取IE浏览器版本号
 */
self.getIEVersion = function() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null){
        	rv = parseFloat(RegExp.$1);
        }
	}
    
    return rv;
}

/**
 * 获取随机数
 */
self.random = function (p_number){
	var seed = new Date().getTime();
	seed = (seed * 9301 + 49297) % 233280;
	if (p_number == null || parseInt(p_number) == NaN)
		return Math.ceil(seed/233280.0 * 10000000000000000);
	else
		return Math.ceil(seed/233280.0 * parseInt(p_number));
}

/**
 * 订阅属性变化
 */
self.subscribe = function(p_target, p_observable, p_callback, p_deep, p_immediate) {
	return p_target.$watch(p_observable, p_callback, p_deep, p_immediate);
}

/**
 * 返回一个场景对应的地址。需提前设置cube.bundleName与cube.name属性。
 * @param p_url
 *            一个字符串，表示特定的地址。 
 *            <p>
 *            该参数的形式包括:
 *            <ul>
 *            <li><b>~/</b> - 以“~/”开头表示获取当前模块的 face 目录地址。</li>
 *            <li><b>~/../</b> - 在模块项目中使用本框架时，如果引用其他模块项目的资源必须以该格式或者完整路径。
 *            <li><b>./</b> - 以“./”开头表示获取当前场景的根目录地址。</li>
 *            <li><b>$/</b> - 以“$/”开头表示获取当前场景的 resources 目录地址。</li>
 *            <li><b>$locale/</b> - 以“$locale/”开头表示获取当前场景的 resources/locales 目录地址。</li>
 *            <li><b>其余</b> - 其余请参见 cube.cubepath 方法。</li>
 *            </ul>
 *            </p>
 */
self.mappath = function(p_url) {
    if (typeof (p_url) != "string") return null;

    var rootPath = self.rootPath; 
    if (!rootPath) {
    	rootPath = "";
    }
    if(rootPath.lastIndexOf("/") != rootPath.length - 1) {
    	rootPath += "/";
    }
    
	var bundlePath = rootPath;
	bundlePath += self.bundleName != "" ? (self.bundleName + "/") : "";
	
    if (p_url.indexOf("~/../") == 0) {
        return rootPath + p_url.substr(5);
    } else if (p_url.indexOf("~/") == 0) {
        return bundlePath + p_url.substr(2);
    } else if (p_url.indexOf("./") == 0) {
        return bundlePath + self.name + p_url.substr(1);
    } else if (p_url.indexOf("$/") == 0) {
        return bundlePath + self.name + "/resources" + p_url.substr(1);
    } else if (p_url.indexOf("$locale/") == 0) {
        return bundlePath + self.name + "/resources/locales/"
                + self.locale + p_url.substr(7);
    } else {
        return self.cubepath(p_url);
    }
};

self.cubepath = function(p_url) {
    if (typeof (p_url) != "string") return null;
    
    var url = p_url;
    if (url.indexOf("~/") == 0) {
        url = self.rootPath + path.substring(1);
    } else if (url.indexOf("./") == 0) {
        url = self.rootPath + "/" + self.frameworkName + url.substring(1);
    } else if (url.indexOf("$/") == 0) {
        url = self.rootPath + "/" + self.frameworkName + "/resources" + url.substring(1);
    } else if (url.indexOf("$locale/") == 0) {
        url = self.rootPath + "/" + self.frameworkName + "/resources/locales/" + self.locale + url.substring(7);
    }

    return url;
};

/**
 * 返回一个字符串，表示国际化信息。
 * 
 * @param p_key
 *            一个字符串，表示指定的键。
 * @param [p_args=null]
 *            一个数组或 JSON 对象，传递给key对应的value中{0}、{1}...的参数。
 */
self.msg = function(p_key, p_args) {
	var p_string = $messages[p_key];
    if (p_string &&　p_string.indexOf("{") != -1 && p_string.indexOf("}") != -1){
    	if (typeof p_args == "string" || typeof p_args == "number"){
    		p_string = p_string.replace("{0}", p_args);
    	} else if ($.isArray(p_args) || $.isPlainObject(p_args)){
            for (var i in p_args) {
            	p_string = p_string.replace("{" + i + "}", p_args[i]);
            }
        }
    }
	return p_string;
}

/**
 * 显示信息提示窗口
 *  @param type 窗口类型，一个字符串（可选：info、warning、error, confirm，默认为info），或一个对象（参考msgdialog组件API属性）
 *  @param content 窗口内容
 *  @param callback 窗口确定按钮事件，type为confirm有效
 *  @param title 窗口标题
 *  @param isShowCancelBtn 是否显示取消按钮，默认为true
 */
self.indicate = function(type, content, callback, title, isShowCancelBtn) {
	if (type != "success" && type != "warning" && type != "info" && type != "error") {
		content = type;
		type = "info";
	} 
	
	if (Message) {
		Message({
			type: type,
			message: content
		});
	}
}

/**
 * 显示错误提示。
 * 
 * @param title 标题
 * @param content 内容
 * 
 */
self.showError = function(title, content){
	if(arguments.length == 1){
		content = title;
		title = "错误信息";
	}
	
	if (self.errorType && self.errorType == "friendly") {
		return;
	} else if (self.errorType && self.errorType == "console") {
		if (typeof(console) != "undefined" &&  typeof(console.error) != "undefined") {
            console.error(title + ":" + content);
            return;
        }
	}
	
	self.indicate("error", content, null, title);
}

/**
 * 获取url参数
 */
self.getUrlParams = function(p_url) {
	var params = {};
	if (p_url != null && p_url.indexOf("?") != -1) {
		var str = p_url.split("?")[1];
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i ++) { 
			var kv = strs[i].split("=");
			if (kv[0] == "params") {
				try {
					params[kv[0]] = JSON.parse(unescape(kv[1])); 
				} catch(e) {
					
				}
				
			} else {
				params[kv[0]] = unescape(kv[1]); 
			}
		}
	}
	return params;
}

export default self;
