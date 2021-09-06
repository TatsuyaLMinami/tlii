/**
 * 提供一个 REST 风格服务的客户端工具类。
 * 
 * @example
 * <code language="JavaScript">
 * define(["RESTClient"], function(RestClient) {
 * 		var restClient = new RestClient();
 *      restClient.get("~/component/getList",{name:"123"},function(data) {
        	var ruleItems = data.resultValue 
        })
 * })
 * </code>
 */
import axios from 'axios'

function RESTClient() {
		var me = this;

		/**
		 * 获取 RESTClient 的基URL。
		 * 如果设置了基 URL，则所有方法中传递的 path 都会以该 URL 为相对路径。
		 */
		me.baseUrl = null;

		/**
		 * 获取或设置一个数字，表示超时时间，以毫秒为单位。
		 * 
		 * @default 60000
		 */
		me.timeout = 60000;

		/**
		 * 请求微服务后台时的授权码，也可通过在baseUrl属性后拼接“?authorization=授权码”设置。
		 * 
		 * @default null
		 */
		me.authorization = null;

		/**
		 * 设置 {@link baseUrl} 字段的值。
		 * 
		 * @param p_baseUrl
		 *            提供 RESTClient 的根 URL。
		 */
		me.setBaseUrl = function(p_baseUrl) {
			me.baseUrl = p_baseUrl;
		};

		/**
		 * 以异步或同步方式进行 REST 服务调用。当确定使用 HTTP 方法时，建议直接使用 {@link get} 和
		 * {@link post} 等方法。 如根路径是“~/rest/service/”，如果调用 {@link send}
		 * 方法时使用“app/create”为 p_path
		 * 参数，则最终路径会被自动拼合为“~/rest/service/app/create”。
		 * 
		 * @param p_path
		 *            指定的 REST
		 *            服务路径，可以是以“~/”开头的绝对路径，如“~/rest/service/appsuites”；也可以是相对于
		 *            {@link baseUrl} 的相对路径，如 baseUrl
		 *            字段的值是“~/rest/service/”，这时 p_path
		 *            参数可被简写为“/appsuites”或“appsuites”。
		 * @param p_method
		 *            指定 HTTP 方法的名称。如“GET”、“POST”等。
		 * @param [p_data]
		 *            指定传入的参数信息。通常是一个 JSON 对象。如 { id: 1984, name: "中文" }
		 *            会被转换成“id=1984&name=%E4%B8%AD%E6%96%87”作为参数拼入 URL（使用
		 *            HTTP POST 方法时，是作为内容传递），其中中文部分会使用 UTF-8 进行编码。
		 * @param [p_callback]
		 *            一个 Function 对象，表示回调方法。方法的原型为 function(p_context)，其中
		 *            p_context 是一个 JSON 对象，其中 successful 表示调用是否成功，如果成功则返回
		 *            true，并且可通过 result 字段获取返回值；如果失败则返回 false，并且可通过 error
		 *            字段获取失败的异常对象。
		 */
		me.send = function(p_path, p_method, p_data, p_callback) {
			var url = me._makeUrl(p_path);

			var method = p_method != null ? p_method.toUpperCase() : "GET";

			var secretKey = null;
			var customHeaders = me.customHeaders;
			if (cube.encryptData) {
				p_data = cube.encryptData(p_data, url, method);
				if (p_data && p_data.customHeaders) {
					customHeaders = p_data.customHeaders;
				}

				if (p_data && p_data.secretKey) {
					secretKey = p_data.secretKey;
				}

				if (p_data && (p_data.data || p_data.secretKey || p_data.customHeaders)) {
					p_data = p_data.data;
				}
			}

			var ajaxSetting = {
				url : url,
				timeout : me.timeout,
				method : method,
				headers: {
					"Content-Type": "application/json"
				}
			};
			
			if (method == "GET") {
				ajaxSetting.params = p_data;
			} else {
				ajaxSetting.data = p_data
			}
			
			if (cube.notEmpty(sessionStorage.getItem('Authorization'))) {
				ajaxSetting.headers = {
					"Authorization": sessionStorage.getItem('Authorization'),
				};
			} else if (cube.notEmpty(cube.Authorization)){
				ajaxSetting.headers = {
					"Authorization": cube.Authorization
				};
			}
			
			var token = sessionStorage .getItem('token');
			if (cube.notEmpty(token)) {
				if (ajaxSetting.headers) {
					Object.assign(ajaxSetting.headers, {
						"token": token
					});
				} else {
					ajaxSetting.headers = {
						"token": token
					};
				}
			}
			
			if (cube.isEmpty(customHeaders)) {
				customHeaders = cube.customHeaders;
			}
			
			if (cube.notEmpty(customHeaders)) {
				if (ajaxSetting.headers) {
					Object.assign(ajaxSetting.headers, customHeaders);
				} else {
					ajaxSetting.headers = customHeaders;
				}
			}
			
			var req = axios(ajaxSetting).then(function(response){
				var request = response.request;
				var p_resultValue = response.data;
				var textStatus = response.status;
				
				var sessionstate = request.getResponseHeader("sessionstate");
                
                if ((sessionstate != null && sessionstate == 'timeout') || request.responseText == "timeout") {
                	cube.indicate("info", cube.msg("SESSION_TIMEOUT"));
                	sessionStorage .removeItem("token");
                	top.window.location.reload();
                } else if (request.responseText == "authorizeFail") {
                	cube.indicate("warning", cube.msg("OPERATION_NOT_ALLOWED"));
                }
                
				if (cube.isFunction(p_callback)) {
					if (cube.isFunction(cube.decryptData)) {
						p_resultValue = cube.decryptData(response.config, p_resultValue, textStatus, request, secretKey);
					}

					if (p_resultValue) {
						p_resultValue.parentId = p_path;
					}
					
					p_callback(p_resultValue);
				}
			}).catch(function(error) {
				console.error(error);
				if (cube.isFunction(p_callback)) {
					var error = _resolveError(error);
					var context = {
						successful : false,
						error : error
					};
					p_callback(context);
				}
			});
			return req;
		};

		/**
		 * 使用 HTTP GET 方法，以异步方式进行 REST 服务调用。
		 * 
		 * @param p_path
		 *            指定的 REST
		 *            服务路径，可以是以“~/”开头的绝对路径，如“~/rest/is/appsuites”；也可以是相对于
		 *            {@link baseUrl} 的相对路径，如 baseUrl 字段的值是“~/rest/is/”，这时
		 *            p_path 参数可被简写为“/appsuites”或“appsuites”。
		 * @param [p_data]
		 *            指定传入的参数信息。通常是一个 JSON 对象。如 { id: 1984, name: "中文" }
		 *            会被转换成“id=1984&name=%E4%B8%AD%E6%96%87”作为参数拼入
		 *            URL，其中中文部分会使用 UTF-8 进行编码。
		 * @param [p_callback]
		 *            一个 Function 对象，表示回调方法。方法的原型为 function(p_context)，其中
		 *            p_context 是一个 JSON 对象，其中 successful 表示调用是否成功，如果成功则返回
		 *            true，并且可通过 result 字段获取返回值；如果失败则返回 false，并且可通过 error
		 *            字段获取失败的异常对象。
		 */
		me.get = function(p_path, p_data, p_callback) {
			if (cube.isFunction(p_data)) {
				p_callback = p_data;
				p_data = null;
			}
			var req = me.send(p_path, "GET", p_data, p_callback);
			return req;
		};

		/**
		 * 使用 HTTP POST 方法，以异步方式进行 REST 服务调用。
		 * 
		 * @param p_path
		 *            指定的 REST
		 *            服务路径，可以是以“~/”开头的绝对路径，如“~/rest/is/appsuites”；也可以是相对于
		 *            {@link baseUrl} 的相对路径，如 baseUrl 字段的值是“~/rest/is/”，这时
		 *            p_path 参数可被简写为“/appsuites”或“appsuites”。
		 * @param [p_data]
		 *            指定传入的参数信息。通常是一个 JSON 对象。如 { id: 1984, name: "中文" }
		 *            会被转换成“id=1984&name=%E4%B8%AD%E6%96%87”作为 POST
		 *            内容传递，其中中文部分会使用 UTF-8 进行编码。
		 * @param [p_callback]
		 *            一个 Function 对象，表示回调方法。方法的原型为 function(p_context)，其中
		 *            p_context 是一个 JSON 对象，其中 successful 表示调用是否成功，如果成功则返回
		 *            true，并且可通过 result 字段获取返回值；如果失败则返回 false，并且可通过 error
		 *            字段获取失败的异常对象。
		 */
		me.post = function(p_path, p_data, p_callback) {
			if (cube.isFunction(p_data)) {
				p_callback = p_data;
				p_data = null;
			}
			var req = me.send(p_path, "POST", p_data, p_callback);
			return req;
		};

		/**
		 * @ignore
		 */
		me._makeUrl = function(p_path) {
			var result = null;
			
			if (cube.notEmpty(p_path) && cube.isString(p_path) && p_path.substring(0, 4) == "http") {
				result = p_path;
			} else {
				if (cube.isNumber(p_path)) {
					p_path = "" + p_path;
				}
				if (cube.isEmpty(p_path)) {
					result = me.baseUrl;
				}
		
				else if (p_path.substring(0, 2) == "~/" || me.baseUrl == null) {
					result = p_path;
				} else {
					if (cube.notEmpty(me.baseUrl) && me.baseUrl.substring(me.baseUrl.length - 1) != "/" && p_path.substring(0, 1) != "/") {
						result = me.baseUrl + "/" + p_path;
					} else {
						result = me.baseUrl + p_path;
					}
				}
		
				if (result.substring(0, 2) == "~/" || result.substring(0, 5) == "~/../") {
					result = cube.mappath(result);
				}
			}
			
			var res = _getQueryString(result, "authorization");
			if (cube.notEmpty(res[1])) {
				me.authorization = res[1];
			}
			
			result = res[0];
			result += (result.indexOf("?") > 0 ? "&" : "?") + "rnd=" + cube.random();

			return result;
		};

		function _resolveError(error) {
			if (error == null || error == "") {
				error = new Error("error");
			}
			return error;
		}
		
		function _getQueryString(url, name) {
			var result = [];
			if (url.indexOf("?") != -1) {
				var arr_url = url.split('?');
				var base = arr_url[0];
				var str = arr_url[1];
				if (str.toLowerCase().indexOf(name) != -1) {
					var index = -1;
					var strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						var param = strs[i].split("=");
						if (cube.trim(param[0]).toLowerCase() == name) {
							result[1] = cube.trim(param[1]);
							index = i;
							break;
						}
					}
					
					if (index != -1) {
						strs.splice(index, 1);
					}
					
					if (strs.length > 0) {
						result[0] = base + "?" + strs.join('&');
					} else {
						result[0] = base;
					}
					
				} else {
					result[0] = url;
				}
			} else {
				result[0] = url;
			}
			
			return result;
		}

		return me;
	}

export default RESTClient;