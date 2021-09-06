import $store from "../store/data";
import { Message,MessageBox, Notification } from "element-ui";
let $confirm = MessageBox.confirm, $prompt = MessageBox.prompt;
import axios from "axios";
const common = {
  //地市
  getCity() {
    const url = "tpiim/baseData/getCityList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setCity", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //电压
  getVolLevel() {
    const url = "tpiim/baseData/getVotageLevelList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setVolLevel", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //缺陷类别
  getDefectType() {
    const url = "tpiim/baseData/getDefectTypeList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDefectType", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //缺陷大类(告警信息)
  getDefectTypeOne() {
    const url = "tpiim/baseData/getDefectOneList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDefectTypeOne", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //装置类型
  getDeviceType() {
    const url = "tpiim/baseData/getDeviceTypeList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDeviceType", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //缺陷部位
  getDefectPart() {
    const url = "tpiim/baseData/getDefectLocationList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDefectPart", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //隐患类型
  getTroubleType() {
    const url = "tpiim/baseData/getDangerTypeList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setTroubleType", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //故障部位
  getFaultLocation() {
    const url = "tpiim/baseData/getFaultLocationList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setFaultLocation", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //生产厂家
  getManufacturer() {
    const url = "tpiim/baseData/getManufacturerList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setManufacturer", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //单位
  getUnit() {
    const url = "tpiim/sysOrg/getOrgNameList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setUnit", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //施工单位
  getConstructionUnit() {
    const url = "tpiim/baseData/getManufacturerList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setConstructionUnit", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //班组
  getTeamList() {
    const url = "yangkai/team/getTeamNameList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setMaintainTeam", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //巡视方式
  getIspMode() {
    const url = "tpiim/ptmiInsTask/getInsTaskModeDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setIspMode", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //巡视类型
  getIspType() {
    const url = "tpiim/ptmiInsTask/getInsTaskTypeDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setIspType", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //巡视任务
  getIspTask() {
    const url = "tpiim/ptmiInsTask/getInsTaskDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setIspTask", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //巡视班组
  getIspTeam() {
    const url = "tpiim/team/getTeamListForTask";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setIspTeam", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //任务状态
  getIspState() {
    const url = "tpiim/ptmiInsTask/getInsTaskStatusDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setIspState", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //监控装置
  getMonitorDevice() {
    const url = "yangkai/selfVideoTask/getVideoTypeList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setMonitorDevice", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //风险等级
  getRiskLevel() {
    const url = "tpiim/baseData/getRiskLevelList";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setRiskLevel", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //工器具类型
  getToolType() {
    const url = "tpiim/tools/getToolType";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setToolType", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //值守任务级别
  getDutyLevel() {
    const url = "tpiim/ptmiDutyTask/getDutyLevelDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDutyLevel", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //值守任务状态
  getDutyStatus() {
    const url = "tpiim/ptmiDutyTask/getDutyStatusDict";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDutyStatus", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  getUserData() {
    const url = "tpiim/user/forkUser";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setUserData", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  getDepts() {
    const url = "yangkai/sysOrg/getOrgListForTask";
    $axios({
      url: url,
      type: "get"
    }).then(data => {
      if (data.successful) {
        $store.commit("setDepts", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //工器具仓库
  getToolsWarehouse() {
    const url = "tpiim/toolsWarehouse/getToolsWarehouseListDict";
    $axios({
      url: url,
      type: "post",
      data: {
        toolsWarehouseName: ""
      }
    }).then(data => {
      if (data.successful) {
        $store.commit("setToolsWarehouse", data.resultValue);
      } else {
        console.error(data.resultHint);
      }
    });
  },
  //系统告警
  getSysLogList() {
    common.clearTimer();
    var timer = setInterval(alarm, 10000);
  },
  clearTimer() {
    var timer = clearInterval(timer);
  }
};
const alarm = function() {
  $axios({
    url: "yangkai/sysLoginLog/getSysLogListBy",
    type: "post",
    data: {}
  }).then(data => {
    if (data.successful) {
      if (data.resultValue.length > 0) {
        for (let key in data.resultValue) {
          Notification({
            title: data.resultValue[key]["exceptionName"],
            dangerouslyUseHTMLString: true,
            position: "bottom-right",
            duration: 60000,
            message: `<div style='display:inline-block'><strong>登录账号:</strong>${data.resultValue[key]["loginId"]}</div></br>
                <div style='display:inline-block'><strong>员工姓名:</strong>${data.resultValue[key]["userName"]}</div></br>
                <div style='display:inline-block'><strong>操作类型:</strong>${data.resultValue[key]["loginType"]}</div></br>
                <div style='display:inline-block'><strong>登陆状态:</strong>${data.resultValue[key]["loginState"]}</div></br>
                <div style='display:inline-block'><strong>MAC地址:</strong>${data.resultValue[key]["addMac"]}</div></br>
                <div style='display:inline-block'><strong>IP地址:</strong>${data.resultValue[key]["addIp"]}</div></br>
                <div style='display:inline-block'><strong>操作时间:</strong>${data.resultValue[key]["loginTime"]}</div>`
          });
        }
      }
    } else {
      console.error(data.resultHint);
    }
  });
};
const getUserData = function() {
  return new Promise(function(resolve, reject) {
    const url = "tpiim/user/forkUser";
    $axios({
      url: url,
      type: "post"
    })
      .then(data => {
        if (data.successful) {
          resolve({
            res: true,
            data: data
          });
        } else {
          resolve({
            res: false,
            data: data
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};
const submitFormData = function(title, url, data) {
  return new Promise(function(resolve, reject) {
    $confirm(title, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let fd = new FormData();
        for (let key in data) {
          fd.append(key, data[key] || "");
        }
        handle(url, fd).then(res => {
          resolve(res);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
};
const examineFormData = function(title, url, data) {
  return new Promise(function(resolve, reject) {
    $confirm(title, "提示", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确定",
      cancelButtonText: "退回",
      type: "warning"
    })
      .then(() => {
        let fd = new FormData();
        for (let key in data) {
          fd.append(key, data[key] || "");
        }
        handle(url, fd).then(res => {
          resolve(res);
        });
      })
      .catch(action => {
        action === "close"
          ? ""
          : $prompt("请输入退回原因", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern: /^.{1,200}$/,
              inputErrorMessage: "不能为空,且最多200个字符"
            })
              .then(({ value }) => {
                let fd = new FormData();
                if (data.defectState) {
                  fd.append("defectState", "1");
                } else {
                  fd.append("troubleState", "1");
                }
                fd.append("objId", data.objId);
                fd.append("isCompleted", "0");

                fd.append("checkRemark", value);
                handle(url, fd).then(res => {
                  resolve(res);
                });
              })
              .catch(error => {
                console.error(error);
              });
      });
  });
};
const checkFormData = function(title, params) {
  return new Promise(function(resolve, reject) {
    $confirm(title, "提示", {
      confirmButtonText: "合格",
      cancelButtonText: "不合格",
      type: "warning"
    })
      .then(() => {
        $axios(params).then(data => {
          if (data.successful) {
            resolve({
              res: true,
              msg: data.resultHint
            });
          } else {
            resolve({
              res: false,
              msg: data.resultHint
            });
          }
        });
      })
      .catch(action => {
        action === "close"
          ? ""
          : $prompt("请输入不合格原因", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern: /^.{1,200}$/,
              inputErrorMessage: "不能为空,且最多200个字符"
            }).then(({ value }) => {
              params.data.acceptRemark = value;
              params.data.isCompleted = "0";
              $axios(params)
                .then(data => {
                  if (data.successful) {
                    resolve({
                      res: true,
                      msg: data.resultHint
                    });
                  } else {
                    resolve({
                      res: false,
                      msg: data.resultHint
                    });
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            });
      });
  });
};
const handleSomething = function(url, fd) {
  return new Promise(function(resolve, reject) {
    axios({
      method: "post",
      url: url,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: sessionStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.data.successful) {
          resolve({
            res: true,
            msg: res.data.resultHint
          });
        } else {
          resolve({
            res: false,
            msg: res.data.resultHint
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};

const exportMethod = function(data) {
  $axios({
    //url: `${data.url}${data.params ? '?' + data.params : ''}`,
    url: data.url,
    type: data.method,
    responseType: "blob",
    data: data.data
  })
    .then(res => {
      const link = document.createElement("a");
      let blob = new Blob([res.data], {
        type: "application/vnd.ms-excel"
      });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = data.fileName; //下载的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      Message.error(error);
    });
};
export {
  common,
  handleSomething,
  submitFormData,
  examineFormData,
  checkFormData,
  exportMethod,
  getUserData
};
