import entityContainerClass from './EntityContainer';

/**
 * 提供了一些模型对象扩展方法。
 */
function DataHandle() {
	var me = this;
	
	/**
	 * 对应的viewModel对象
	 */
	me.model = null;
	
	/**
	 * 字段信息
	 */
	me.fields = null;
	
	/**
	 * 主键key
	 */
	me.primaryKey = "id";
	
	/**
	 * 查询框数据
	 */
	me.filter = null;
	
	/**
	 * 记录条数
	 */
	me.itemCount = 0;
	
	/**
	 * 页码
	 */
	me.pageIndex = 1;
	
	/**
	 * 每页显示条数
	 */
	me.pageSize = 10;
	
	/**
	 * 是否自动加载数据
	 */
	me.autoLoad = true;
	
	/**
	 * 数据解析对象
	 */
	me.entityContainer = null;
	
	/**
	 * 请求参数
	 */
	me.args = null;
	
	var dataOption
	
	var _localFields = [];
	
	/**
	 * 初始化
	 */
	me.init = function(model, p_dataOption) {
		me.model = model;
		
		if (!me.model.submit) {
			me.model.submit = me.submit;
		}
		
		if (!me.model.currentChange) {
			me.model.currentChange = me.currentChange;
		}
		
		if (!me.model.search) {
			me.model.search = me.search;
		}
		
		if (!me.model.remove) {
			me.model.remove = me.remove;
		}
		
		if (!me.model.reload) {
			me.model.reload = me.load;
		}
		
		if (!me.model.showDialog) {
			me.model.showDialog = me.showDialog;
		}
		
		if (!me.model.hideDialog) {
			me.model.hideDialog = me.hideDialog;
		}
		
		if (!me.model.addTab) {
			me.model.addTab = me.addTab;
		}
		
		if (!me.model.msg) {
			me.model.msg = me.msg;
		}
		
		if (cube.isEmpty(p_dataOption)) {
			dataOption = model.dataOption;
		} else {
			dataOption = p_dataOption;
		}
		
		if (cube.isEmpty(dataOption)) {
			return;
		}
		
		dataOption.id = model.id;
		cube.subscribe(model, "id", function() {
			dataOption.id = model.id;
			me.load();
		});
	
		dataOption.params = model.params;
		cube.subscribe(model, "params", function() {
			dataOption.params = model.params;
			me.load();
		});
		
		if (cube.notEmpty(dataOption.primaryKey)) {
			me.primaryKey = dataOption.primaryKey;
		} else {
			dataOption.primaryKey = me.primaryKey;
		}
		
		if (cube.notEmpty(dataOption.pageSize)) {
			me.pageSize = dataOption.pageSize;
		} else {
			me.model.$set(me.model.dataOption, "pageSize", me.pageSize);
		}
		
		if (cube.notEmpty(dataOption.pageIndex)) {
			me.pageIndex = dataOption.pageIndex;
		} else {
			me.model.$set(me.model.dataOption, "pageIndex", me.pageIndex);
		}
		
		if (cube.notEmpty(dataOption.itemCount)) {
			me.itemCount = dataOption.itemCount;
		} else {
			me.model.$set(me.model.dataOption, "itemCount", me.itemCount);
		}
		
		if (cube.notEmpty(dataOption.autoLoad)) {
			me.autoLoad = dataOption.autoLoad;
		}
		
		me.args = dataOption.params;
		
		me.filter = model[dataOption.searchName];
		
		var obj = model[dataOption.name];
		me.fields = obj;
		
		_localFields = cube.clone(obj);
		
		if (me.autoLoad) {
			me.load();
		}
	}
	
	/**
	 * 加载数据
	 */
	me.load = function() {
		
		var args = {
				cancel: false
		}
		
		if (me.model.onLoading != null && cube.isFunction(me.model.onLoading)) {
			me.model.onLoading(args);
		}
		
		if (args.cancel != true) {
			if (dataOption.type == "form") {
				me.loadForm(dataOption);
			} else {
				me.loadGrid(dataOption, cube.clone(me.filter));
			}
		}
	}
	
	/**
	 * 加载表单数据
	 */
	me.loadForm = function(dataOption){
		me.entityContainer = new entityContainerClass();
		me.entityContainer.primaryKey = dataOption.primaryKey;
		me.entityContainer.baseUrl = dataOption.url;
		me.entityContainer.actions = dataOption.actions || {};
		me.entityContainer.meta = me.fields;
		me.entityContainer.loadMeta = dataOption.loadMeta;
		me.entityContainer.timeout = dataOption.timeout;
		me.entityContainer.onload = me.model.onload || me.onload;
		me.entityContainer.onsaved = me.model.onsaved || me.onsaved;
		me.entityContainer.onerror = me.model.error || me.error;
		me.entityContainer.data = dataOption.data;
		me.entityContainer.dicts = dataOption.dicts;
		me.entityContainer.customHeaders = dataOption.customHeaders;
		me.entityContainer.loadByPost = dataOption.loadByPost;
		me.entityContainer.type = dataOption.type || "form";
		me.entityContainer._viewModel = me.model;
		me.entityContainer.init();

		me.entityContainer.load(dataOption.id, dataOption.params);
	}
	
	/**
	 * 加载表格数据
	 */
	me.loadGrid = function(dataOption, p_data) {
		
		me.entityContainer = new entityContainerClass();
		me.entityContainer.primaryKey = dataOption.primaryKey;
		me.entityContainer.baseUrl = dataOption.url;
		me.entityContainer.actions = dataOption.actions || {};
		me.entityContainer.meta = me.fields;
		me.entityContainer.loadMeta = dataOption.loadMeta;
		me.entityContainer.timeout = dataOption.timeout;
		me.entityContainer.onload = me.model.onload || me.onload;
		me.entityContainer.onsaved = me.model.onsaved || me.onsaved;
		me.entityContainer.ondeleted = me.model.ondeleted || me.ondeleted;
		me.entityContainer.onerror = me.model.error || me.error;
		me.entityContainer.data = dataOption.data;
		me.entityContainer.dicts = dataOption.dicts;
		me.entityContainer.customHeaders = dataOption.customHeaders;
		me.entityContainer.loadByPost = dataOption.loadByPost;
		me.entityContainer.type = dataOption.type || "grid";
		me.entityContainer._viewModel = me.model;
		me.entityContainer.init();
		
		var data = null;
		
		if (cube.notEmpty(p_data) && cube.isObject(p_data)) {
			data =  p_data;
		}
		
		var args = {metaParams:null, dataParams:null};
		if (cube.notEmpty(data)) {
			if (cube.isEmpty(data.metaParams) && cube.isEmpty(data.dataParams)) {
				//args.dataParams = data;
			} else {
				args = Object.assign(args, data);
			}
		}
		
		var filterParam = _getFilterParam(p_data);
		if (cube.notEmpty(filterParam)) {
			var filter = { filter: filterParam};
			args.dataParams = Object.assign(filter, args.dataParams);
		}
		
		var page = {pageIndex:parseInt(me.pageIndex), pageSize:parseInt(me.pageSize)};
		
		args.dataParams = Object.assign(page, args.dataParams);
		
		me.entityContainer.load(args);
	}
	
	/**
	 * 获取查询参数。
	 * @ignore
	 */
	function _getFilterParam(p_data)
	{
		
		var filterParam = "";
		if (cube.notEmpty(p_data) && cube.notEmpty(p_data.filter)) {
			filterParam = p_data.filter;
		} else {
			filterParam = cube.clone(p_data);
			if (filterParam) {
				delete filterParam.pageIndex;
				delete filterParam.pageSize;
			}
		}
		
		var filterParamString = "";
		if (cube.isObject(filterParam)) {
			for ( var key in filterParam) {
				var value = filterParam[key];
				if (cube.notEmpty(value)) {
					filterParamString = filterParamString + "&" + key + "=" + value;
				}
			}
			filterParam = filterParamString;
		}
		
		if (cube.notEmpty(filterParam)) {
			filterParam = filterParam.substring(1, filterParam.length);
		}
		
		return filterParam;
	}
	
	/**
	 *  数据加载回调函数
	 */
	me.onload = function(args) {
		var fields = args.columns;
		
		//表格
		if (cube.isArray(me.fields)) {
			me.model.dataOption.itemCount = args.itemCount;
			me.model[me.model.dataOption.name] = [];
			
			for (var i = 0; i < args.items.length; i++) {
				me.model[me.model.dataOption.name].push(args.items[i]);
			}
			
		} else {//表单
			var value = {};
			if (cube.isEmpty(args.items)) {
				value = {};
			} else if (cube.isArray(args.items)) {
				value = args.items[0];
			} else {
				value = args.items;
			}
			
			if (cube.isEmpty(value)){
				value = {};
			}
			
			var dicts = args.dicts;
			
			if (cube.isArray(dicts)) {
				for (var i = 0; i < dicts.length; i++) {
					me.model.$set( me.model.dataOption.dicts, dicts[i].name, dicts[i].values);
				}
			}
			
			
			for (var key in me.fields) {
				me.fields[key] = value[key];
			}
			
			me.entityContainer.data = me.fields;
		}
		
		
		
		if (me.model.onLoad != null && cube.isFunction(me.model.onLoad)) {
			me.model.onLoad(value);
		}
	}
	
	/**
	 * 加载错误回调
	 */
	me.error = function(args) {
		if (me.model.onLoadError != null && cube.isFunction(me.model.onLoadError)) {
			me.model.onLoadError(args);
		}
	}
	
	/**
	 * 保存成功回调
	 */
	me.onsaved = function(args) {
		if (me.model.onSaved != null && cube.isFunction(me.model.onSaved)) {
			me.model.onSaved(args);
		}
	}
	
	/**
	 * 删除成功回调
	 */
	me.ondeleted = function(args, p_result) {
		if (p_result.successful) {
			cube.indicate("success", cube.msg("DELETE_SUCCESS"));
			
			if (args && args.IDs && args.IDs.length == me.entityContainer.data.length && me.pageIndex > 1) {
				me.currentChange(me.pageIndex - 1);
			} else {
				me.load();
			}
		}
	}
	
	/**
	 * 提交表单信息
	 */
	me.submit = function() {
		var args = {
				cancel: false
		}
		
		if (me.model.onSubmitting != null && cube.isFunction(me.model.onSubmitting)) {
			me.model.onSubmitting(args);
		}
		
		if (args.cancel != true) {
			me.entityContainer.save(true);
		}
		
	}
	
	/**
	 * 删除请求
	 */
	me.remove = function(items) {
		var ids = [];
		if (cube.isArray(items)) {
			for (var i = 0; i < items.length; i++) {
				if (cube.isString(items[i])) {
					ids.push(items[i]);
				} else if (cube.notEmpty(items[i])) {
					ids.push(items[i][me.primaryKey]);
				}
			}
		} else if (cube.isString(items)) {
			ids = items;
		} else if (cube.notEmpty(items)) {
			ids = items[me.primaryKey];
		}
		
		if (ids.length == 0) {
			  cube.indicate("warning", cube.msg("SELECT_ONE_DELETE"));
			  return;
	    }
		
		me.entityContainer.remove(ids);
	}
	
	/**
	 * 分页跳转
	 */
	me.currentChange = function(val) {
		me.pageIndex = val;
		me.loadGrid(me.model.dataOption);
	}
	
	/**
	 * 查询请求
	 */
	me.search = function() {
		me.pageIndex = 1;
		me.model.dataOption.pageIndex = 1;
		
		me.loadGrid(me.model.dataOption, cube.clone(me.filter));
	}
	
	/**
	 * 显示模态弹出框
	 */
	me.showDialog = function(p_url, p_params, p_width) {
		if (cube.isEmpty(p_params)) {
			p_params = {};
		}
		p_params.parent = me.model;
		
		import(/* webpackChunkName: "[request]" */ '@/components/' + p_url.substring(1)).then(function(component) {
			 me.model.$store.commit('showDialog', {
					component: component.default,
					params: p_params,
					width: p_width
			 });
		})
	}
	
	/**
	 * 隐藏模态弹出框
	 */
	me.hideDialog = function() {
		me.model.$store.commit('hideDialog');
	}
	
	/**
	 * 添加选项卡
	 */
	me.addTab = function(p_name, p_route, p_params) {
		 me.model.$store.commit('addTab', {
			 name: p_name,
			 route: p_route,
			 params: p_params
		 });
		 
		 me.model.$store.commit('setActiveTab', {
			 route: p_route, 
			 hasToute: false
		 });
	}
	
	/**
	 * 返回表示国际化信息
	 */
	me.msg = function(p_key, p_args) {
		return cube.msg(p_key, p_args);
	}
}

export default DataHandle;
