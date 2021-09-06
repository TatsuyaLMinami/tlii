var monitorData = [ 
    {
        id:"breezeId",
        deviceType:"003_004",
        title:"微风振动监测数据",
        legend:["弯曲振幅", "微风振动频率"],
        model:"dmAeolianVibrationMonitor",
        table:"dmAeoVlist",
        listweek:"listWeeAeoV",
        monitorType:["listBendingAmplitude","listVibrationFrequency"],
        style:{},
        realTime:[
            {
                name:"弯曲振幅",
                value:"bendingAmplitude",
                data:"",
                unit:"mm"
            },
            {
                name:"微风振动频率",
                value:"vibrationFrequency",
                data:"",
                unit:"Hz"
            },
        ],
    },
    {
        id:"wireGallopId",
        deviceType:"003_002",
        title:"导线舞动监测数据",
        legend:["舞动综合幅值","垂直舞动幅值","水平舞动幅值","舞动频率"],
        model:"dmConductorGallopMonitor",
        table:"dmCGMlist",
        listweek:"listWeekCGM",
        monitorType:["listUgallopAmplitude","listUverticalAmplitude","listUhorizontalAmplitude","listUgallopFrequency"],
        style:{},
        realTime:[
            {
                name:"舞动综合幅值",
                value:"ugallopAmplitude",
                data:"",
                unit:"m",
            },
            {
                name:"垂直舞动幅值",
                value:"uverticalAmplitude",
                data:"",
                unit:"N",
            },
            {
                name:"水平舞动幅值",
                value:"uhorizontalAmplitude",
                data:"",
                unit:"m",
            },
            {
                name:"舞动频率",
                value:"ugallopFrequency",
                data:"",
                unit:"m",
            }
        ],
    },
    {
        id:"wireSagId",
        deviceType:"003_005",
        title:"导线弧垂监测数据",
        legend:["弧垂"],
        model:"dmConductorSagMonitor",
        table:"dmCSagMlist",
        listweek:"listWeeSagM",
        monitorType:["listConductorSag"],
        style:{},
        realTime:[
            {
                name:"弧垂",
                value:"conductorSag",
                data:"",
                unit:"m",
            },
        ],
    },
    {
        id:'wireId',
        deviceType:"003_001",
        title:"导线温度监测数据",
        legend:["温度"],
        model:"dmConductorTemperatureMonitor",
        table:"dTemperaturelist",
        listweek:"listWeekDT",
        monitorType:["listTemperature"],
        style:{},
        realTime:[
            {
                name:"温度",
                value:"temperature",
                data:"",
                unit:"℃",
            },
        ],
    },
    {
        id:"icingEchart",
        deviceType:"003_003",
        title:"等值覆冰厚度监测数据",
        legend:["等值覆冰厚度", "综合载荷", "不均衡张力差"],
        model:"dmEquIcingThicknessMonitor",
        table:"deithlist",
        listweek:"listWeekDEIT",
        monitorType:["listEqualiceThickness","listTension","listTensionDifference"],
        style:{},
        realTime:[
            {
                name:"等值覆冰厚度",
                value:"equaliceThickness",
                data:"",
                unit:"mm",
            },
            {
                name:"综合载荷",
                value:"tension",
                data:"",
                unit:"N",
            },
            {
                name:"不均衡张力差",
                value:"tensionDifference",
                data:"",
                unit:"N",
            }
        ],
    },
    {
        id:"meteorologicalId",
        deviceType:"003_007",
        title:"微气象数据",
        legend:["温度","湿度","气压","光辐射强度","降水强度"],
        model:"dmMicrometeorology",
        table:"dmlist",
        listweek:"listWeekDMic",
        monitorType:["listMicTemperature","listHumidity","listAirPressure","listRdiationintensity","listPrecipitationintensity"],
        style:{},
        realTime:[
            {
                name:"温度",
                value:"temperature",
                data:"",
                unit:"℃",
            },
            {
                name:"湿度",
                value:"humidity",
                data:"",
                unit:"%",
            },
            {
                name:"气压",
                value:"airPressure",
                data:"",
                unit:"hPa",
            },
            {
                name:"光辐射强度",
                value:"rdiationintensity",
                data:"",
                unit:"W/m²",
            },
            {
                name:"降水强度",
                value:"precipitationintensity",
                data:"",
                unit:"mm/min",
            },
        ],
    },
    {
        id:"filthId",
        deviceType:"003_008",
        title:"污秽度监测数据",
        legend:["等值附盐密度","不溶物密度","日最高温度","日最低温度","日最大湿度","日最小湿度"],
        model:"dmPollutionMonitor",
        table:"dmpolluMlist",
        listweek:"listWeekPoll",
        monitorType:["listEquivalentSalinityDepositDen","listNonSolubleDepositDensity","listDailyMaxTemperature","listDailyMintemperature","listDailyMaxHumidity","listDailyMinHumidity"],
        style:{},
        realTime:[
            {
                name:"等值附盐密度",
                value:"equivalentSalinityDepositDen",
                data:"",
                unit:"mg/cm²",
            },
            {
                name:"不溶物密度",
                value:"nonSolubleDepositDensity",
                data:"",
                unit:"mg/cm²",
            },
            {
                name:"日最高温度",
                value:"dailyMaxTemperature",
                data:"",
                unit:"℃",
            },
            {
                name:"日最低温度",
                value:"dailyMintemperature",
                data:"",
                unit:"℃",
            },
            {
                name:"日最大湿度",
                value:"dailyMaxHumidity",
                data:"",
                unit:"%",
            },
            {
                name:"日最小湿度",
                value:"dailyMinHumidity",
                data:"",
                unit:"%",
            },
        ],
    },
    {
        id:"tiltId",
        deviceType:"003_009",
        title:"杆塔倾斜监测数据",
        legend:["倾斜度", "顺线倾斜度", "横向倾斜度"],
        model:"dmTowerTiltMonitor",
        table:"dmtowerTlist",
        listweek:"listWeekTowerT",
        monitorType:["listInclination","listInclinationX","listInclinationY"],
        style:{},
        realTime:[
            {
                name:"倾斜度",
                value:"inclination",
                data:"",
                unit:"mm/m",
            },
            {
                name:"顺线倾斜度",
                value:"inclinationX",
                data:"",
                unit:"mm/m"
            },
            {
                name:"横向倾斜度",
                value:"inclinationY",
                data:"",
                unit:"mm/m"
            },
        ],
    },
    {
        id:"wireWindId",
        deviceType:"003_010",
        title:"导线风偏监测数据",
        legend:["最小电气间隙距离","风偏采集时刻的瞬时风速","风偏采集时刻的气温","风偏采集时刻的湿度"],
        model:"dmWindDeviationMonitor",
        table:"dmWindlist",
        listweek:"listWeekWind",
        monitorType:["listLeastClearance","listInstantaneousWindSpeed","listTemperature","listHumidity"],
        style:{},
        realTime:[
            {
                name:"最小电气间隙距离",
                value:"leastClearance",
                data:"",
                unit:"m",
            },
            {
                name:"风偏采集时刻的瞬时风速",
                value:"instantaneousWindSpeed",
                data:"",
                unit:"m/s"
            },
            {
                name:"风偏采集时刻的气温",
                value:"temperature",
                data:"",
                unit:"℃"
            },
            {
                name:"风偏采集时刻的湿度",
                value:"humidity",
                data:"",
                unit:"%"
            },
        ],
    },
];
export default monitorData;
// onLineData: {
//     dmAeolianVibrationMonitor: {
//         //弯曲振幅测量，单位：mm
//         bendingAmplitude: 0,
//         //动弯应变，单位：με
//         strainAmplitude: 0,
//         //微风振动波形，单位：με
//         strainData: 0,
//         //微风振动频率测量，单位：Hz
//         vibrationFrequency: 0,
//     },
//     dmConductorGallopMonitor: {
//         displacement: 0,
//         //X 轴正方向为面向大号侧杆塔顺线方向，单位：m
//         displicementX: 0,
//         //Y 轴正方向为面向大号侧杆塔左边的方向，单位：m
//         displicementY: 0,
//         //Z 轴正方向为铅锤方向指向天空，单位：m
//         displicementZ: 0,
//         //舞动椭圆倾斜角，单位：°（度）
//         uangleToVerical: 0,
//         //舞动综合幅值，单位：m
//         ugallopAmplitude: "",
//         //舞动频率，单位：Hz
//         ugallopFrequency: 0,
//         //水平舞动幅值，单位：m
//         uhorizontalAmplitude: 0,
//         //垂直舞动幅值，单位：m
//         uverticalAmplitude: 0,
//     },
//     dmConductorSagMonitor: {
//         //弧垂，单位：m
//         conductorSag: 0,
//         //对地距离或对交叉跨越物距离，单位：m
//         togroundDistance: 0,
//     },
//     dmConductorTemperatureMonitor: {
//         temperature: 0,
//     },
//     dmDistributedFaultMonitor: {
//         //故障电流波形数据
//         faultCurrentWaveFormFileName: 0,
//         //故障电流波形数据起点的时间
//         faultCurrentWaveFormStartTime: 0,
//         //行波电流波形数据
//         travellingWaveFileName: 0,
//         //行波电流波形数据起点的时间
//         travellingWaveStartingTime: 0,
//     },
//     dmEquIcingThicknessMonitor: {
//         //绝缘子串横向倾斜角
//         crosswiseAngle: 0,
//         //等值覆冰厚度测量，单位：mm
//         equaliceThickness: 0,
//         //绝缘子串顺向倾斜角
//         forwardTiltAngle: 0,
//         //综合载荷测量，单位：N
//         tension: 0,
//         //不均衡张力差计算，单位：N
//         tensionDifference: 0,
//         //拉力传感器拉力值数组
//         tensionValue: 0,
//         //拉力传感器个数
//         tsensorNum: 0,
//     },
//     dmMicrometeorology: {
//         //气压，单位 hPa
//         airPressure: 0,
//         //监测装置安装点处10min 平均风速，单位 m/s
//         averageWindSpeedTenMin: 0,
//         //监测装置安装点处极大风速，单位 m/s
//         extremeWindSpeed: 0,
//         //湿度测量，单位：%
//         humidity: 0,
//         //监测装置安装点处最大风速，单位 m/s
//         maxWindSpeed: 0,
//         //10 分钟降雨量，单位：mm
//         precipitation: 0,
//         //降水强度，单位 mm/min
//         precipitationintensity: 0,
//         //光辐射强度，单位 W/m2
//         rdiationintensity: 0,
//         //离地面 10m 高度处标准风速，单位 m/s
//         standardWindSpeed: 0,
//         //温度测量，单位：℃
//         temperature: 0,
//     },
//     dmPollutionMonitor: {
//         //日最大湿度，单位：%
//         dailyMaxHumidity: 0,
//         //日最高温度，单位：℃
//         dailyMaxTemperature: 0,
//         //日最小湿度，单位：%
//         dailyMinHumidity: 0,
//         //日最低温度，单位：℃
//         dailyMintemperature: 0,
//         //等值附盐密度，单位：mg/cm2
//         equivalentSalinityDepositDen: 0,
//         //不溶物密度，即灰密，单位：mg/cm2
//         nonSolubleDepositDensity: 0,
//     },
//     dmTowerTiltMonitor: {
//         //顺线倾斜角，单位：°（度）
//         angleX: 0,
//         //横向倾斜角，单位：°（度）
//         angleY: 0,
//         //倾斜度，单位：mm/m
//         inclination: 0,
//         //顺线倾斜度，单位：mm/m
//         inclinationX: 0,
//         //横向倾斜度，单位：mm/m
//         inclinationY: 0,
//         //顶部位移值，单位：°（度）
//         topDisplacement: 0,
//     },
//     dmWindDeviationMonitor: {
//         //偏斜角监测，单位：°（度）
//         deflectionAngle: 0,
//         //风偏采集时刻的湿度，单位：%
//         humidity: 0,
//         //风偏采集时刻的瞬时风速，单位m/s
//         instantaneousWindSpeed: 0,
//         //最小电气间隙距离监测，单位：m
//         leastClearance: 0,
//         //风偏采集时刻的气温，单位：℃
//         temperature: 0,
//         //风偏角监测，单位：°（度）
//         windageYawAngle: 0,
//     },
// },
// //微风振动监测数据模型
// dmAeolianVibrationMonitor: {
//     //弯曲振幅测量，单位：mm
//     bendingAmplitude: 0,
//     //动弯应变，单位：με
//     strainAmplitude: 0,
//     //微风振动波形，单位：με
//     strainData: 0,
//     //微风振动频率测量，单位：Hz
//     vibrationFrequency: 0,
// },
// //导线舞动监测数据模型
// dmConductorGallopMonitor: {
//     displacement: 0,
//     //X 轴正方向为面向大号侧杆塔顺线方向，单位：m
//     displicementX: 0,
//     //Y 轴正方向为面向大号侧杆塔左边的方向，单位：m
//     displicementY: 0,
//     //Z 轴正方向为铅锤方向指向天空，单位：m
//     displicementZ: 0,
//     //舞动椭圆倾斜角，单位：°（度）
//     uangleToVerical: 0,
//     //舞动综合幅值，单位：m
//     ugallopAmplitude: "",
//     //舞动频率，单位：Hz
//     ugallopFrequency: 0,
//     //水平舞动幅值，单位：m
//     uhorizontalAmplitude: 0,
//     //垂直舞动幅值，单位：m
//     uverticalAmplitude: 0,
// },
// //导线弧垂监测数据模型
// dmConductorSagMonitor: {
//     //弧垂，单位：m
//     conductorSag: 0,
//     //对地距离或对交叉跨越物距离，单位：m
//     togroundDistance: 0,
// },
// //导线温度监测数据模型
// dmConductorTemperatureMonitor: {
//     temperature: 0,
// },
// //分布式故障监测数据模型
// dmDistributedFaultMonitor: {
//     //故障电流波形数据
//     faultCurrentWaveFormFileName: 0,
//     //故障电流波形数据起点的时间
//     faultCurrentWaveFormStartTime: 0,
//     //行波电流波形数据
//     travellingWaveFileName: 0,
//     //行波电流波形数据起点的时间
//     travellingWaveStartingTime: 0,
// },
// //等值覆冰厚度监测数据模型
// dmEquIcingThicknessMonitor: {
//     //绝缘子串横向倾斜角
//     crosswiseAngle: 0,
//     //等值覆冰厚度测量，单位：mm
//     equaliceThickness: 0,
//     //绝缘子串顺向倾斜角
//     forwardTiltAngle: 0,
//     //综合载荷测量，单位：N
//     tension: 0,
//     //不均衡张力差计算，单位：N
//     tensionDifference: 0,
//     //拉力传感器拉力值数组
//     tensionValue: 0,
//     //拉力传感器个数
//     tsensorNum: 0,
// },
// //微气象数据模型
// dmMicrometeorology: {
//     //气压，单位 hPa
//     airPressure: 0,
//     //监测装置安装点处10min 平均风速，单位 m/s
//     averageWindSpeedTenMin: 0,
//     //监测装置安装点处极大风速，单位 m/s
//     extremeWindSpeed: 0,
//     //湿度测量，单位：%
//     humidity: 0,
//     //监测装置安装点处最大风速，单位 m/s
//     maxWindSpeed: 0,
//     //10 分钟降雨量，单位：mm
//     precipitation: 0,
//     //降水强度，单位 mm/min
//     precipitationintensity: 0,
//     //光辐射强度，单位 W/m2
//     rdiationintensity: 0,
//     //离地面 10m 高度处标准风速，单位 m/s
//     standardWindSpeed: 0,
//     //温度测量，单位：℃
//     temperature: 0,
// },
// //污秽度监测数据模型
// dmPollutionMonitor: {
//     //日最大湿度，单位：%
//     dailyMaxHumidity: 0,
//     //日最高温度，单位：℃
//     dailyMaxTemperature: 0,
//     //日最小湿度，单位：%
//     dailyMinHumidity: 0,
//     //日最低温度，单位：℃
//     dailyMintemperature: 0,
//     //等值附盐密度，单位：mg/cm2
//     equivalentSalinityDepositDen: 0,
//     //不溶物密度，即灰密，单位：mg/cm2
//     nonSolubleDepositDensity: 0,
// },
// //杆塔倾斜监测数据模型
// dmTowerTiltMonitor: {
//     //顺线倾斜角，单位：°（度）
//     angleX: 0,
//     //横向倾斜角，单位：°（度）
//     angleY: 0,
//     //倾斜度，单位：mm/m
//     inclination: 0,
//     //顺线倾斜度，单位：mm/m
//     inclinationX: 0,
//     //横向倾斜度，单位：mm/m
//     inclinationY: 0,
//     //顶部位移值，单位：°（度）
//     topDisplacement: 0,
// },
// //导线风偏监测数据模型
// dmWindDeviationMonitor: {
//     //偏斜角监测，单位：°（度）
//     deflectionAngle: 0,
//     //风偏采集时刻的湿度，单位：%
//     humidity: 0,
//     //风偏采集时刻的瞬时风速，单位m/s
//     instantaneousWindSpeed: 0,
//     //最小电气间隙距离监测，单位：m
//     leastClearance: 0,
//     //风偏采集时刻的气温，单位：℃
//     temperature: 0,
//     //风偏角监测，单位：°（度）
//     windageYawAngle: 0,
// },