let url = 'baseData/getList';
//配置的字典项

export default {
  //地市
  getCity() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //电压
  getVolLevel() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //缺陷类别
  getDefectType() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //缺陷大类(告警信息)
  getDefectTypeOne() {
    return $axios({
      url: url,
      method: 'get'
    });

  },
  //装置类型
  getDeviceType() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //缺陷部位
  getDefectPart() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //隐患类型
  getTroubleType() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //故障部位
  getFaultLocation() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //生产厂家
  getManufacturer() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //单位
  getUnit() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //施工单位
  getConstructionUnit() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //班组
  getTeamList() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //巡视方式
  getIspMode() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //巡视类型
  getIspType() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  getIspTask() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //巡视任务
  getInsTaskDict() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //巡视班组
  getIspTeam() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //任务状态
  getIspState() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //监控装置
  getMonitorDevice() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //风险等级
  getRiskLevel() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //工器具类型
  getToolType() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //值守任务级别
  getDutyLevel() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //值守任务状态
  getDutyStatus() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  getUserData() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  getDepts() {
    return $axios({
      url: url,
      method: 'get'
    });
  },
  //工器具仓库
  getToolsWarehouse() {
    return $axios({
      url: 'baseData/getToolsWarehouseListDict',
      method: 'post',
      data: {
        toolsWarehouseName: ""
      }
    });
  },
}