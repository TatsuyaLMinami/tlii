import Mock from 'mockjs'
import menus from '@/mock/menus.json'

if ($config.mock) {
	Mock.mock(RegExp($config.baseUrl + '/user/login'),  (options) =>{
		return Mock.mock({
            "successful":true,
            "resultValue":{
                "userName":"张三",
                "token":"111111"
            },
            "resultHint":"",
            "errorPage":"",
            "type":""
        });
	})
	
	Mock.mock(RegExp($config.baseUrl + '/user/logout'),  (options) =>{
		return Mock.mock({"successful":true,"resultValue":true,"resultHint":"","errorPage":"","type":""});
	})
	
	Mock.mock(RegExp($config.baseUrl + '/getResource'),  (options) =>{
		return Mock.mock(menus);
    })
    
	Mock.mock(RegExp($config.baseUrl + '/department/.*'),  (options) =>{
		var result = getResult();
		var lastUrl = getLastUrl(options.url);
		switch (lastUrl) {
		case "": //列表
			result.resultValue = {
				"itemCount": 8,
				"items|8": [
					{"id|+1": 1, "depname":"人资部", "depparentid":null, "depdesc":"人资部"}
				]
			}
			break;
		case "null": //新增
			break;
		case "save": //保存返回数据
			result.resultValue.items = [
				{"id": "1", "depname":"人资部", "depparentid":null, "depdesc":"人资部"}
			]
			break;
		case "remove": //删除返回
			break;
		default: //编辑返回
			let params = cube.getUrlParams(options.url);
			result.resultValue.items = [
				{"id": "1", "depname":"人资部", "depparentid":null, "depdesc":"人资部"}
			]
			break;
		}
		return Mock.mock(result);
	})
	
	Mock.mock(RegExp($config.baseUrl + '/employee/.*'),  (options) =>{
		var result = getResult();
		var lastUrl = getLastUrl(options.url);
		switch (lastUrl) {
		case "": //列表
			result.resultValue = {
				"itemCount": 8,
				"items|8": [
					{"id|+1": "1", "depid": "1", "name": "张三", "num": "050010", "age": 29,"sex": 1, "address": "甘肃省兰州市", "tel":"13235445678", "inductiontime":"2016-07-06"}
				]
			}
			break;
		case "null": //新增
			break;
		case "save": //保存返回数据
			result.resultValue.items = [
				{"id":"2c91a7ae722fb0460172305de1750000","depid":null,"name":"点点滴滴","num":null,"age":null,"sex":null,"address":null,"tel":null,"inductiontime":null}
			]
			break;
		case "remove": //删除
			break;
		default: //编辑
			let params = cube.getUrlParams(options.url);
			result.resultValue.items = [
				{"id":"2c91a7ae722fb0460172305de1750000","depid":null,"name":"点点滴滴","num":null,"age":null,"sex":null,"address":null,"tel":null,"inductiontime":null}
			]
			break;
		}
		return Mock.mock(result);
	})
}

function getLastUrl(p_url) {
	if (p_url) {
		var strs = p_url.split("?")[0].split("/");
		return strs[strs.length - 1];
	}
}

function getResult() {
	return  {
		"successful": true,
		"resultValue": {
			"itemCount": 0,
			"items":[],
			"dicts":[]
		},
		"resultHint":"",
		"errorPage":"",
		"type":""
	}
}

