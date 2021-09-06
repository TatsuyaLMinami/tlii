<template>
  <div v-loading="infoLoadingBool">
    <div :style="treeStyle">
      <!-- <div v-if="physicalTower.length">运行杆塔</div> -->
      <div class="info-item" v-for="(item, i) in formData" :key="i">
        <label class="info-item-left">{{ item.name }}：</label>
        <span class="info-item-right">{{ item.val }}</span>
      </div>
      <div v-if="physicalTower.length">
        <!-- <div>物理杆塔</div> -->
        <div class="line"></div>
        <div
          class="info-item"
          v-for="(item, i) in physicalTower"
          :key="i + item.val"
        >
          <label class="info-item-left">{{ item.name }}：</label>
          <span class="info-item-right">{{ item.val }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/pages/common/eventBus";
export default {
  name: "lineBasicInfo",
  data() {
    return {
      infoLoadingBool: false,
      dictUrl: {
        line: "line/getLine",
        tower: "line/getTower",
        insulator: "line/getInsulator",
        wire: "line/getWire",
        earthWire: "line/getEarthWire",
        span: "span/getSpan",
        passageway: "passageway/getPassageway",
      },
      formDataDict: {
        line: {
          lineName: "线路名称",
          volLevelName: "电压等级",
          frameMode: "架设方式",
          lineNature: "线路性质",
          cityName: "所属地市名称",
          maintainUnitname: "运维单位名称",
          ownerName: "设备主人名称",
          deviceState: "设备状态",
          runDate: "投运日期",
          startStname: "起点电站名称",
          endStname: "终点电站名称",
          startType: "起点类型",
          endType: "终点类型",
          startPositionname: "起点位置名称",
          endPositionname: "终点位置名称",
          dispatchLevel: "所属调度级别",
          dispatchUnitname: "调度单位名称",
          assetsFlag: "资产性质",
          assetsUnitname: "资产单位名称",
          totalLen: "线路总长度(km)",
          overheadLen: "架空线路长度(km)",
          groundLen: "电缆线路长度(km)",
          overheadConnect: "架空接线方式",
          groundConnect: "电缆接线方式",
          // lineColor: "线路色标",
          lineDegree: "重要程度",
          acrossType: "跨区域类型",
          maxCurrent: "最大允许电流(A)",
          efficientCurrent: "经济电流(A)",
          maxLoad: "运行负荷限额(kW)",
          ratedLoad: "额定输送功率",
          shorttimeCurrent: "短时载流量",
          regionFeature: "地区特征",
          isFibre: "是否有光纤",
          isTerminate: "是否终端线",
          isRailway: "是否给电铁供电线",
          isShare: "是否是同杆并架线",
        },
        tower: {
          objOrder: "设备名称",
          objModel: "型号",
          manuName: "生产厂家",
          manuDate: "出厂日期",
          volLevelName: "电压等级(kV)",
          runDate: "投运日期",
          fixType: "固定方式",
          terrain: "地形",
          landNature: "地质",
          corMate: "横担材质",
          corAngle: "避雷线保护角",
          alHeight: "海拔高度(m)",
          regionNature: "地区特征",
          groundStyle: "接地型式",
          groundNo: "接地型号",
          designGroundResistor: "设计接地电阻(Ω)",
          towerWeight: "铁塔重量(t)",
          towerNum: "单/双/三杆",
          towerDepth: "主杆埋深(m)",
          towerMate: "杆塔材质",
          towerHeight: "杆塔高(m)",
          baseNature: "基础形式",
          groundResistor: "接地电阻(Ω)",
          ratedwindSpeed: "设计风速",
          ratediceThickness: "设计覆冰厚度",
          longitude: "纬度",
          latitude: "经度",
          // pLine: "所属线路",
          pName: "主线名称",
          pSublinename: "所属分段线路",
          cityName: "所属地市名称",
          maintainUnitname: "运维单位名称",
          maintainTeamname: "维护班组名称",
          ownerName: "设备主人名称",
          towerNature: "杆塔性质",
          deviceState: "设备状态",
          corSpan: "档距(m)",
          isCor: "是否转角",
          corDirection: "转角方向",
          corDegree: "转角度数",
          corHeight: "呼称高(m)",
          isEnd: "是否终端",
          isComm: "是否换相",
          phase: "相序/极别",
        },
        towerPhy: {
          objOrder: "设备名称",
          objModel: "型号",
          manuName: "生产厂家",
          manuDate: "出厂日期",
          volLevelName: "电压等级(kV)",
          runDate: "投运日期",
          fixType: "固定方式",
          terrain: "地形",
          landNature: "地质",
          corMate: "横担材质",
          corAngle: "避雷线保护角",
          alHeight: "海拔高度(m)",
          regionNature: "地区特征",
          groundStyle: "接地型式",
          groundNo: "接地型号",
          designGroundResistor: "设计接地电阻(Ω)",
          towerWeight: "铁塔重量(t)",
          towerNum: "单/双/三杆",
          towerDepth: "主杆埋深(m)",
          towerMate: "杆塔材质",
          towerHeight: "杆塔高(m)",
          baseNature: "基础形式",
          groundResistor: "接地电阻(Ω)",
          ratedwindSpeed: "设计风速",
          ratediceThickness: "设计覆冰厚度",
          // longitude: "纬度",
          // latitude: "经度",
          // pLine: "所属线路",
          pName: "主线名称",
          pSublinename: "所属分段线路",
          cityName: "所属地市名称",
          maintainUnitname: "运维单位名称",
          maintainTeamname: "维护班组名称",
          ownerName: "设备主人名称",
          towerNature: "杆塔性质",
          deviceState: "设备状态",
          corSpan: "档距(m)",
          isCor: "是否转角",
          corDirection: "转角方向",
          corDegree: "转角度数",
          corHeight: "呼称高(m)",
          isEnd: "是否终端",
          isComm: "是否换相",
          phase: "相序/极别",
        },
        wire: {
          deviceName: "设备名称",
          // pLine: "所属线路",
          pName: "主线名称",
          pSublinename: "所属分段线路",
          cityName: "所属地市名称",
          maintainUnitname: "运维单位名称",
          maintainTeamname: "运维班组名称",
          ownerName: "设备主人名称",
          assetsCode: "资产编号",
          startTower: "起始杆塔",
          endTower: "终止杆塔",
          deviceStatus: "设备状态",
          isAgent: "是否代维",
          rotatedDirection: "旋转方向",
          length: "长度(m)",
          model: "型号",
          manuName: "生产厂家",
          startDate: "投运日期",
          wireType: "导线类型",
          wireArray: "导线排列方式",
          wireSection: "导线截面(mm2)",
          currentRating: "额定载流量(A)",
          detailedWiretype: "导线类型细分",
          wireSpecifications: "导线股数及规格",
          splitNum: "分裂根数",
          maxCurrent: "导线最大允许电流",
          breakForce: "破坏拉断力(N)",
          maxDesignStress: "最大设计应力(MPa)",
          allowCarryCapacity: "短时允许载流量",
          safetyFactor: "安全系数",
          regDate: "登记时间",
          dataState: "发布状态",
        },
        earthWire: {
          // pLine: "所属线路",
          pName: "主线名称",
          pSublinename: "所属分段线路",
          cityName: "所属地市名称",
          maintainUnitname: "运维单位名称",
          maintainTeamname: "维护班组名称",
          ownerName: "设备主人名称",
          earthwireNum: "地线根数",
          earthwireSpecifications: "地线股数及规格",
          isDielectric: "是否绝缘",
          dischargeInterval: "放电间隙(mm)",
          maxDesignStress: "最大设计应力",
          assetsCode: "资产编号",
          startTower: "起始杆塔",
          endTower: "终止杆塔",
          length: "长度(m)",
          installLocation: "安装位置",
          model: "型号",
          manuName: "生产厂家",
          startDate: "投运日期",
          earthwireType: "地线类型",
          regDate: "登记时间",
          dataState: "发布状态",
        },
        insulator: {
          // towerId: " 所属杆塔",
          towerOrder: " 杆塔编号",
          // pLine: " 所属线路",
          pName: " 主线名称",
          // pSubline: " 所属分段线路",
          pSublinename: " 所属分段线路名称",
          deviceCode: " 设备编码",
          deviceName: " 设备名称",
          maintainUnitname: " 运维单位名称",
          cityName: " 所属地市名称",
          model: " 型号",
          // manufacturer: " 生产厂家",
          manuName: " 生产厂家名称",
          manuDate: " 出厂日期",
          startDate: " 投运日期",
          material: " 绝缘子材料",
          importance: " 重要程度",
          type: " 类型",
          decimal: " 数量",
          installType: " 安装类型",
          installLocation: " 安装位置",
          installSide: " 安装侧",
          insStringType: " 绝缘子串型",
          insHangingMode: " 绝缘子挂线方式",
          installPhase: " 安装相别/极别",
          stringDecimal: " 数量(串或支)",
          pieces: " 每串片数",
          isOrdinary: " 普通或防污",
          specificCreepageDistance: " 爬电比距",
          structHeight: " 结构高度(mm)",
          umbDiameter: " 盘(伞)径(mm)",
          pullingForce: " 单片(串)拉力(N)",
          connectForm: " 连接形式",
          hangingForm: " 挂点形式",
          diameter: " 芯棒直径(mm)",
          endStructure: " 端部结构",
          dataState: " 发布状态",
          creepageDistance: " 爬电距离(mm)",
          regDate: " 登记时间",
        },
        span: {
          lineName: "线路名称",
          volLevelName: "电压等级",
          // startTower: "起始杆塔",
          // endTower: "终止杆塔",
          startTowername: "起始杆塔号",
          endTowername: "终止杆塔号",
          crossStyle: "被跨越物类型",
          crossName: "被跨越物名称",
          crossLineid: "被跨越（线路 ID）",
          crossVollevel: "被跨越线路电压等级",
          // crossCityid: "被跨越线路所属地市",
          crossCityname: "被跨越线路地市名称",
          // crossPhoto: "被跨越照片",
          measDate: "测量日期",
          isMaincross: "是否三跨",
          crossLand: "跨越点地形",
          crossPlanlen: "交跨要求距离（m）",
          crossActlen: "交跨实际距离（m）",
          crossAngle: "交跨角度",
          pullTower: "耐张段杆塔号",
          crossSpace: "交跨档档距（m）",
          stDecimal: "小号侧杆塔型号",
          stNature: "小号侧杆塔性质",
          stLen: "离小号侧距离（m）",
          btDecimal: "大号侧杆塔型号",
          btNature: "大号侧杆塔性质",
          btLen: "离大号侧距离（m）",
          // cityId: "所属地市",
          cityName: "所属地市名称",
          // maintainTeam: "运维班组",
          maintainTeamname: "运维班组名称",
        },
        passageway: {
          passagewayName: "重要通道名称",
          passagewayLevel: "重要通道等级条件",
          pLine: "所属线路",
          maintainUnitname: "运维单位",
          cityName: "所属地市",
        },
      },
      formData: [],
      physicalTower: [],
    };
  },
  computed: {
    treeStyle() {
      return { height: document.body.clientHeight - 250 + "px" };
    },
  },
  created() {
    eventBus.$on("linesNodeFn", (params) => {
      this.loadDictFn(params);
    });
  },
  methods: {
    loadDictFn(params) {
      this.infoLoadingBool = true;
      let oneDict = this.formDataDict[params.type];
      $axios({
        url: "/tpiim/" + this.dictUrl[params.type],
        type: "get",
        data: {
          objId: params.id,
        },
      })
        .then((data) => {
          this.infoLoadingBool = false;
          this.formData = [];
          this.physicalTower = [];
          for (let keyB in oneDict) {
            for (let keyA in data.resultValue) {
              if (keyA === keyB) {
                let val = data.resultValue[keyA];
                if (typeof val === "number" && val.toString().length > 12) {
                  val = this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
                }
                this.formData.push({
                  name: oneDict[keyB],
                  val: val,
                });
              }
            }
          }
          if (params.type === "tower") {
            let oneDict = this.formDataDict.towerPhy;
            for (let keyB in oneDict) {
              for (let keyC in data.resultValue.pgrPhysicalTower) {
                if (keyC === keyB) {
                  let val = data.resultValue.pgrPhysicalTower[keyC];
                  if (typeof val === "number" && val.toString().length > 12) {
                    val = this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
                  }
                  this.physicalTower.push({
                    name: oneDict[keyB],
                    val: val,
                  });
                }
              }
            }
          }
        })
        .catch((error) => {
          this.infoLoadingBool = false;
        });
    },
  },
};
</script>
<style scoped>
.info-item {
  float: left;
  width: 50%;
  line-height: 40px;
  color: #555;
}
.info-item-left,
.info-item-right {
  display: inline-block;
  width: 49%;
}
.info-item-left {
  text-align: right;
  font-weight: bold;
}
.line {
  width: 98%;
  border-top: 1px solid #eee;
  display: inline-block;
}
</style>
