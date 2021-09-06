/* jshint esversion:6*/
import dictionariesApi from '@/api/dictionaries/dictionaries';
export default {
	namespaced: true,
	// 缺陷/隐患：
	// NOTSUBMITTED(1,"待提交"),
	// NOTREVIEWED(2,"待审核"),
	// APPROVED(3,"审核通过");
	// 缺陷：
	// NOTUNTREATED(0, "未消缺"),
	// PROCESSED(1, "已消缺"),
	// UNTREATEDING(2, "消缺中");
	// 缺陷：
	// PENDING(0,"不合格"),
	// PROCESSED(1,"验收合格");
	// 隐患：
	// PENDING(0,"待治理"),
	// PROCESSED(1,"已治理");
	// 故障：
	// PENDING(0,"待处理"),
	// PROCESSED(1,"已处理");
	state: {

	},
	getters: {

	},
	mutations: {

	},
	actions: {
		//地市
		getCity() {
			dictionariesApi.getCity()
				.then(res => {
					$store.commit('setCity', res.resultValue);
				}).catch(() => {
					console.log('获取地市字典项失败');
				});
		},
		//电压
		getVolLevel() {
			dictionariesApi.getVolLevel()
				.then(res => {
					$store.commit('setVolLevel', res.resultValue);
				}).catch(() => {
					console.log('获取电压字典项失败');
				});
		},
		//缺陷类别
		getDefectType() {
			dictionariesApi.getDefectType()
				.then(res => {
					$store.commit('setDefectType', res.resultValue);
				}).catch(() => {
					console.log('获取缺陷类别字典项失败');
				});
		},
		//缺陷大类(告警信息)
		getDefectTypeOne() {
			dictionariesApi.getDefectTypeOne()
				.then(res => {
					$store.commit('setDefectTypeOne', res.resultValue);
				}).catch(() => {
					console.log('获取缺陷大类(告警信息)字典项失败');
				});
		},
		//装置类型
		getDeviceType() {
			dictionariesApi.getDeviceType()
				.then(res => {
					$store.commit('setDeviceType', res.resultValue);
				}).catch(() => {
					console.log('获取装置类型字典项失败');
				});
		},
		//缺陷部位
		getDefectPart() {
			dictionariesApi.getDefectPart()
				.then(res => {
					$store.commit('setDefectPart', res.resultValue);
				}).catch(() => {
					console.log('获取缺陷部位字典项失败');
				});
		},
		//隐患类型
		getTroubleType() {
			dictionariesApi.getTroubleType()
				.then(res => {
					$store.commit('setTroubleType', res.resultValue);
				}).catch(() => {
					console.log('获取隐患类型字典项失败');
				});
		},
		//故障部位
		getFaultLocation() {
			dictionariesApi.getFaultLocation()
				.then(res => {
					$store.commit('setFaultLocation', res.resultValue);
				}).catch(() => {
					console.log('获取故障部位字典项失败');
				});
		},
		//生产厂家
		getManufacturer() {
			dictionariesApi.getManufacturer()
				.then(res => {
					$store.commit('setManufacturer', res.resultValue);
				}).catch(() => {
					console.log('获取生产厂家字典项失败');
				});
		},
		//单位
		getUnit() {
			dictionariesApi.getUnit()
				.then(res => {
					$store.commit('setUnit', res.resultValue);
				}).catch(() => {
					console.log('获取单位字典项失败');
				});
		},
		//施工单位
		getConstructionUnit() {
			dictionariesApi.getConstructionUnit()
				.then(res => {
					$store.commit('setConstructionUnit', res.resultValue);
				}).catch(() => {
					console.log('获取施工单位字典项失败');
				});
		},
		//班组
		getTeamList() {
			dictionariesApi.getTeamList()
				.then(res => {
					$store.commit('setMaintainTeam', res.resultValue);
				}).catch(() => {
					console.log('获取班组字典项失败');
				});
		},
		//巡视方式
		getIspMode() {
			dictionariesApi.getIspMode()
				.then(res => {
					$store.commit('setIspMode', res.resultValue);
				}).catch(() => {
					console.log('获取巡视方式字典项失败');
				});
		},
		//巡视类型
		getIspType() {
			dictionariesApi.getIspType()
				.then(res => {
					$store.commit('setIspType', res.resultValue);
				}).catch(() => {
					console.log('获取巡视类型字典项失败');
				});
		},
		//巡视任务
		getIspTask() {
			dictionariesApi.getIspTask()
				.then(res => {
					$store.commit('setIspTask', res.resultValue);
				}).catch(() => {
					console.log('获取巡视任务字典项失败');
				});
		},
		//巡视班组
		getIspTeam() {
			dictionariesApi.getIspTeam()
				.then(res => {
					$store.commit('setIspTeam', res.resultValue);
				}).catch(() => {
					console.log('获取巡视班组字典项失败');
				});
		},
		//任务状态
		getIspState() {
			dictionariesApi.getIspState()
				.then(res => {
					$store.commit('setIspState', res.resultValue);
				}).catch(() => {
					console.log('获取任务状态字典项失败');
				});
		},
		//监控装置
		getMonitorDevice() {
			dictionariesApi.getMonitorDevice()
				.then(res => {
					$store.commit('setMonitorDevice', res.resultValue);
				}).catch(() => {
					console.log('获取监控装置字典项失败');
				});
		},
		//风险等级
		getRiskLevel() {
			dictionariesApi.getRiskLevel()
				.then(res => {
					$store.commit('setRiskLevel', res.resultValue);
				}).catch(() => {
					console.log('获取风险等级字典项失败');
				});
		},
		//工器具类型
		getToolType() {
			dictionariesApi.getToolType()
				.then(res => {
					$store.commit('setToolType', res.resultValue);
				}).catch(() => {
					console.log('获取工器具类型字典项失败');
				});
		},
		//值守任务级别
		getDutyLevel() {
			dictionariesApi.getDutyLevel()
				.then(res => {
					$store.commit('setDutyLevel', res.resultValue);
				}).catch(() => {
					console.log('获取值守任务级别字典项失败');
				});
		},
		//值守任务状态
		getDutyStatus() {
			dictionariesApi.getDutyStatus()
				.then(res => {
					$store.commit('setDutyStatus', res.resultValue);
				}).catch(() => {
					console.log('获取值守任务状态字典项失败');
				});
		},
		//用户信息
		getUserData() {
			dictionariesApi.getUserData()
				.then(res => {
					$store.commit('setUserData', res.resultValue);
				}).catch(() => {
					console.log('获取用户信息失败');
				});
		},
		//部门
		getDepts() {
			dictionariesApi.getDepts()
				.then(res => {
					$store.commit('setDepts', res.resultValue);
				}).catch(() => {
					console.log('获取部门字典项失败');
				});
		},
		//工器具仓库
		getToolsWarehouse() {
			dictionariesApi.getToolsWarehouse()
				.then(res => {
					$store.commit('setToolsWarehouse', res.resultValue);
				}).catch(() => {
					console.log('获取工器具仓库字典项失败');
				});
		},
		//巡视任务
		getInsTaskDict() {
			dictionariesApi.getInsTaskDict()
				.then(res => {
					$store.commit('setIspTask', res.resultValue);
				}).catch(() => {
					console.log('获取巡视任务字典项失败');
				});
		},
	}
}
