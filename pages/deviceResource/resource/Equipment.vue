<template>
  <div>
    <el-dialog title="设备详情" :visible.sync="dialogVisible" width="1200px">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClickFn">
        <el-tab-pane label="基本信息" name="infoA">
          <div class="main-style">
            <div class="info-item" v-for="(item, i) in formData" :key="i">
              <label class="info-item-left">{{ item.name }}：</label>
              <span class="info-item-right">{{ item.val }}</span>
            </div>
            <div v-if="physicalTower.length">
              <div class="line"></div>
              <div
                class="info-item"
                v-for="(item, i) in physicalTower"
                :key="i"
              >
                <label class="info-item-left">{{ item.name }}：</label>
                <span class="info-item-right">{{ item.val }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="缺陷信息" name="quexian">
          <bad-msg ref="quexian"></bad-msg>
        </el-tab-pane>
        <el-tab-pane label="隐患信息" name="yinhuan">
          <bad-msg ref="yinhuan"></bad-msg>
        </el-tab-pane>
        <el-tab-pane label="故障信息" name="guzhang">
          <bad-msg ref="guzhang"></bad-msg>
        </el-tab-pane>
        <el-tab-pane label="告警信息" name="gaojing">
          <bad-msg ref="gaojing"></bad-msg>
        </el-tab-pane>
        <el-tab-pane label="在线监测信息" name="infoF">
          <div class="main-style">
            <el-collapse v-model="onlineArr">
              <el-collapse-item title="微风振动监测数据模型" name="1">
                <div class="info-item">
                  <label class="info-item-left">动弯应变（με）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmAeolianVibrationMonitor.strainAmplitude
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">弯曲振幅测量（mm）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmAeolianVibrationMonitor.bendingAmplitude
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">微风振动频率测量（Hz）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmAeolianVibrationMonitor.vibrationFrequency
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">微风振动波形（με）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmAeolianVibrationMonitor.strainData
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">报警状态：</label>
                  <span class="info-item-right">{{
                    onLineData.dmAeolianVibrationMonitor.strainAmplitudeAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                     onLineData.dmAeolianVibrationMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="导线舞动监测数据模型" name="2">
                <div class="info-item">
                  <label class="info-item-left">舞动监测装置类型：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.sensorType
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动综合幅值（m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.ugallopAmplitude
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">垂直舞动幅值（mm）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.uverticalAmplitude
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">水平舞动幅值（mm）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.uhorizontalAmplitude
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动椭圆倾斜角（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.uangleToVerical
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动频率（Hz）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.ugallopFrequency
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动采集单元总数：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.unitSum
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动采集单元序号：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.unitSubNo
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >X轴正方向为面向大号侧杆塔顺线方向（m）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.displicementX
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >Y轴正方向为面向大号侧杆塔左边的方向（m）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.displicementY
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >Z轴正方向为铅锤方向指向天空（m）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.displicementZ
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.gallopAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">舞动轨迹数据：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.displacement
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorGallopMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="导线弧垂监测数据模型" name="3">
                <div class="info-item">
                  <label class="info-item-left">弧垂（m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.conductorSag
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >对地距离或对交叉跨越物距离（m）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.togroundDistance
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">是否有关联的微气象数据：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.assoicateMicroWeather
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">弧垂报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.conductorSagAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">对地距离报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.togroundDistanceAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorSagMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="导线温度监测数据模型" name="4">
                <div class="info-item">
                  <label class="info-item-left">温度监测装置类型：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorTemperatureMonitor.sensorType
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">温度（°C）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorTemperatureMonitor.temperature
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">告警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorTemperatureMonitor.temperatureAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                    onLineData.dmConductorTemperatureMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="分布式故障监测数据模型" name="5">
                <div class="info-item">
                  <label class="info-item-left"
                    >行波电流波形数据起点的时间：</label
                  >
                  <span class="info-item-right">{{
                     onLineData.dmDistributedFaultMonitor
                      .travellingWaveStartingTime
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">行波电流波形数据：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor.travellingWaveFileName
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >故障电流波形数据起点的时间：</label
                  >
                  <span class="info-item-right">{{
                     onLineData.dmDistributedFaultMonitor
                      .faultCurrentWaveFormStartTime
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">故障电流波形数据：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor
                      .faultCurrentWaveFormFileName
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">故障点位置（m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor.faultLocation
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">故障区段：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor.faultSection
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">故障告警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor.faultAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">故障类别：</label>
                  <span class="info-item-right">{{
                    onLineData.dmDistributedFaultMonitor.faultClassification
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="等值覆冰厚度监测数据模型" name="6">
                <div class="info-item">
                  <label class="info-item-left">等值覆冰厚度测量（mm）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.equaliceThickness
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">综合载荷测量（N）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.tension
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">不均衡张力差计算（N）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.tensionDifference
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">拉力传感器个数：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.tsensorNum
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">拉力传感器拉力值数组：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.tensionValue
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">绝缘子串横向倾斜角：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.crosswiseAngle
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">绝缘子串顺向倾斜角：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.forwardTiltAngle
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.equaliceThicknessAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                    onLineData.dmEquIcingThicknessMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="微气象数据模型" name="7">
                <div class="info-item">
                  <label class="info-item-left"
                    >监测装置安装点处10min平均风速（m/s）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.averageWindSpeedTenMin
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >监测装置安装点处最大风速（m/s）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.maxWindSpeed
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >监测装置安装点处极大风速（m/s）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.extremeWindSpeed
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >离地面10m高度处标准风速：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.standardWindSpeed
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">风向测量：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.windDirection
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">温度测量（℃）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.temperature
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">湿度测量（%）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.humidity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">10分钟降雨量（mm）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.precipitation
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">气压（hPa）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.airPressure
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">降水强度（mm/min）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.precipitationintensity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">光辐射强度（W/m2）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.rdiationintensity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                    onLineData.dmMicrometeorology.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="污秽度监测数据模型" name="8">
                <div class="info-item">
                  <label class="info-item-left">等值附盐密度（mg/cm2）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.equivalentSalinityDepositDen
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >不溶物密度，即灰密（mg/cm2）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.nonSolubleDepositDensity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">盐密报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor
                      .equivalentSalinityDepositDenAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">灰密报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.nonSolubleDepositDensityAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">日最高温度（℃）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.dailyMaxTemperature
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">日最低温度（℃）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.dailyMintemperature
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">日最大湿度（%）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.dailyMaxHumidity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">日最小湿度（%）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmPollutionMonitor.dailyMinHumidity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                     onLineData.dmPollutionMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="杆塔倾斜监测数据模型" name="9">
                <div class="info-item">
                  <label class="info-item-left">倾斜度（mm/m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.inclination
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">顺线倾斜度（mm/m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.inclinationX
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">横向倾斜度（mm/m）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.inclinationY
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">顺线倾斜角（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.angleX
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">横向倾斜角（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.angleY
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">顶部位移值（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.topDisplacement
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">倾斜度报警：</label>
                  <span class="info-item-right">{{
                    onLineData.dmTowerTiltMonitor.inclinationAlarm
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                   onLineData.dmTowerTiltMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>

              <el-collapse-item title="导线风偏监测数据模型" name="10">
                <div class="info-item">
                  <label class="info-item-left">风偏角监测（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.windageYawAngle
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">偏斜角监测（度）：</label>
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.deflectionAngle
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >最小电气间隙距离监测（m）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.leastClearance
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >风偏采集时刻的瞬时风速（m/s）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.instantaneousWindSpeed
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">风偏采集时刻的瞬时风向：</label>
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.instantaneousWindDirection
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >风偏采集时刻的气温（℃）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.temperature
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left"
                    >风偏采集时刻的湿度（%）：</label
                  >
                  <span class="info-item-right">{{
                    onLineData.dmWindDeviationMonitor.humidity
                  }}</span>
                </div>
                <div class="info-item">
                  <label class="info-item-left">采集时间：</label>
                  <span class="info-item-right">{{
                     onLineData.dmWindDeviationMonitor.timeStamp
                  }}</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import BadMsg from "./equipment/BadMsg";
export default {
  name: "",
  data() {
    return {
      activeName: "infoA",
      dialogVisible: false,
      onlineArr: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      formData: [],
      towerId: "",
      physicalTower: [],
      towerDic: {
        objOrder: "设备名称",
        monitorDeviceNum: "检测装置数量（个）",
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
        longitude: "纬度",
        latitude: "经度",
        ratediceThickness: "设计覆冰厚度",
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
        phase: "相序/极别"
      },
      phyTowerDic: {
        objOrder: "设备名称",
        monitorDeviceNum: "检测装置数量（个）",
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
        pLine: "所属线路",
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
        phase: "相序/极别"
      },
      onLineData: {
        dmAeolianVibrationMonitor: {},
        dmConductorGallopMonitor: {},
        dmConductorSagMonitor: {},
        dmConductorTemperatureMonitor: {},
        dmDistributedFaultMonitor: {},
        dmEquIcingThicknessMonitor: {},
        dmMicrometeorology: {},
        dmPollutionMonitor: {},
        dmTowerTiltMonitor: {},
        dmWindDeviationMonitor: {}
      }
    };
  },
  components: {
    BadMsg
  },
  methods: {
    initFn(id) {
      this.dialogVisible = true;
      this.activeName = "infoA";
      this.towerId = id;
      this.loadData(id);
      this.loadOnlineFn(id);
    },
    loadData(id) {
      $axios({
        url: "/tpiim/line/getTower",
        type: "get",
        data: {
          objId: id
        }
      })
        .then(res => {
          this.formData = [];
          this.physicalTower = [];
          for (let keyB in this.towerDic) {
            for (let keyA in res.resultValue) {
              if (keyA === keyB) {
                let val = res.resultValue[keyA];
                if (typeof val === "number" && val.toString().length > 12) {
                  val = this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
                }
                this.formData.push({
                  name: this.towerDic[keyB],
                  val: val
                });
              }
            }
          }
          for (let keyB in this.phyTowerDic) {
            for (let keyC in res.resultValue.pgrPhysicalTower) {
              if (keyC === keyB) {
                let val = res.resultValue.pgrPhysicalTower[keyC];
                if (typeof val === "number" && val.toString().length > 12) {
                  val = this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
                }
                this.physicalTower.push({
                  name: this.phyTowerDic[keyB],
                  val: val
                });
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadOnlineFn(id) {
      $axios({
        url: "/tpiim/realTimeMonitor/getRealTimeMonitorMsg",
        type: "get",
        data: {
          towerId: id
        }
      })
        .then(res => {
          for (let key in res.resultValue) {
            if (res.resultValue[key]) {
              this.onLineData[key] = res.resultValue[key];
            } else {
              this.onLineData[key] = {};
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabClickFn() {
      this.$refs[this.activeName] &&
        this.$refs[this.activeName].initFn({
          type: this.activeName,
          towerId: this.towerId
        });
    }
  }
};
</script>
<style scoped>
.main-style {
  height: 59vh;
  overflow: auto;
}
.info-item {
  float: left;
  width: 50%;
  line-height: 40px;
  color: #555;
}
.info-item-left {
  display: inline-block;
  width: 60%;
}
.info-item-right {
  display: inline-block;
  width: 30%;
}
.info-item-left {
  text-align: right;
  font-weight: bold;
}
.detail {
  width: 100%;
}
.detail label {
  float: left;
  width: 24%;
}
.basic-info {
  overflow: hidden;
}
.info-item-img {
  float: left;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 5px;
}
.info-item-img img {
  cursor: pointer;
  width: 80px;
  height: 80px;
}
.line {
  width: 98%;
  border-top: 1px solid #eee;
  display: inline-block;
}
</style>
