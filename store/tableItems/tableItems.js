var tableItems = {
    "003_004": [
        {
            prop: "strainAmplitude",
            label: "动弯应变(με)",
        },
        {
            prop: "bendingAmplitude",
            label: "弯曲振幅测量(mm)",
        },
        {
            prop: "vibrationFrequency",
            label: "微风振动频率测量(με)",
        },
        {
            prop: "strainData",
            label: "微风振动波形(με)",
        },
        {
            prop: "strainAmplitudeAlarmName",
            label: "报警状态",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time: "time",
        },
    ],
    "003_002":[
        {
            prop: "sensorTypeName",
            label: "舞动监测装置类型",
        },
        {
            prop: "ugallopAmplitude",
            label: "舞动综合幅值(m)",
        },
        {
            prop: "uangleToVerical",
            label: "舞动椭圆倾斜角(m)",
        },
        {
            prop: "uverticalAmplitude",
            label: "垂直舞动幅值(m)",
        },
        {
            prop: "uhorizontalAmplitude",
            label: "水平舞动幅值(m)",
        },
        {
            prop: "uverticalAmplitude",
            label: "舞动椭圆倾斜角(°)",
        },
        {
            prop: "ugallopFrequency",
            label: "舞动频率(Hz)",
        },
        {
            prop: "unitSum",
            label: "舞动采集单元总数",
        },
        {
            prop: "unitSubNo",
            label: "舞动采集单元序号",
        },
        {
            prop: "displicementX",
            label: "X轴正方向为面向大号侧杆塔顺线方向(m)",
        },
        {
            prop: "displicementY",
            label: "Y轴正方向为面向大号侧杆塔左边的方向(m)",
        },
        {
            prop: "displicementZ",
            label: "Z轴正方向为铅锤方向指向天空(m)",
        },
        {
            prop: "gallopAlarmName",
            label: "舞动报警",
        },
        {
            prop: "displacement",
            label: "舞动轨迹数据",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_005":[
        {
            prop: "conductorSag",
            label: "弧垂(m)",
        },
        {
            prop: "togroundDistance",
            label: "对地距离或对交叉跨越物距离(m)",
        },
        {
            prop: "assoicateMicroWeatherName",
            label: "是否有关联的微气象数据",
        },
        {
            prop: "conductorSagAlarmName",
            label: "弧垂报警",
        },
        {
            prop: "togroundDistanceAlarmName",
            label: "对地距离报警",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_001":[
        {
            prop: "sensorTypeName",
            label: "温度监测装置类型",
        },
        {
            prop: "temperature",
            label: "温度(℃)",
        },
        {
            prop: "temperatureAlarmName",
            label: "告警",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_006":[
        {
            prop: "travellingWaveStartingTime",
            label: "行波电流波形数据起点的时间",
            time:"time"
        },
        {
            prop: "travellingWaveFileName",
            label: "行波电流波形数据",
        },
        {
            prop: "faultCurrentWaveFormStartTime",
            label: "故障电流波形数据起点的时间",
            time:"time"
        },
        {
            prop: "faultCurrentWaveFormFileName",
            label: "故障电流波形数据",
        },
        {
            prop: "faultLocation",
            label: "故障点位置(m)",
        },
        {
            prop: "faultSection",
            label: "故障区段",
        },
        {
            prop: "faultClassificationName",
            label: "故障类别",
        },
        {
            prop: "faultAlarmName",
            label: "故障告警",
        },
    ],
    "003_003":[
        {
            prop: "equaliceThickness",
            label: "等值覆冰厚度测量(m)",
        },
        {
            prop: "tension",
            label: "综合载荷测量(N)",
        },
        {
            prop: "tensionDifference",
            label: "不均衡张力差计算(N)",
        },
        {
            prop: "tsensorNum",
            label: "拉力传感器个数",
        },
        {
            prop: "tensionValue",
            label: "拉力传感器拉力值数组",
        },
        {
            prop: "crosswiseAngle",
            label: "绝缘子串横向倾斜角",
        },
        {
            prop: "forwardTiltAngle",
            label: "绝缘子串顺向倾斜角",
        },
        {
            prop: "equaliceThicknessAlarmName",
            label: "报警",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_007":[
        {
            prop: "averageWindSpeedTenMin",
            label: "监测装置安装点处10min平均风速(m/s)",
        },
        {
            prop: "maxWindSpeed",
            label: "监测装置安装点处最大风速(m/s)",
        },
        {
            prop: "extremeWindSpeed",
            label: "监测装置安装点处极大风速(m/s)",
        },
        {
            prop: "standardWindSpeed",
            label: "离地面10m高度处标准风速(m/s)",
        },
        {
            prop: "windDirectionName",
            label: "风向测量",
        },
        {
            prop: "temperature",
            label: "温度测量(℃)",
        },
        {
            prop: "humidity",
            label: "湿度测量(%)",
        },
        {
            prop: "precipitation",
            label: "10分钟降雨量(mm)",
        },
        {
            prop: "airPressure",
            label: "气压(hPa)",
        },
        {
            prop: "precipitationintensity",
            label: "降水强度(mm/min)",
        },
        {
            prop: "rdiationintensity",
            label: "光辐射强度(W/m2)",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_008":[
        {
            prop: "equivalentSalinityDepositDen",
            label: "等值附盐密度(mg/cm2)",
        },
        {
            prop: "nonSolubleDepositDensity",
            label: "不溶物密度(灰密)(mg/cm2)",
        },
        {
            prop: "equivalentSalinityDepositDenAlarmName",
            label: "盐密报警",
        },
        {
            prop: "nonSolubleDepositDensityAlarmName",
            label: "灰密报警",
        },
        {
            prop: "dailyMaxTemperature",
            label: "日最高温度(℃)",
        },
        {
            prop: "dailyMintemperature",
            label: "日最低温度(℃)",
        },
        {
            prop: "dailyMaxHumidity",
            label: "日最大湿度(%)",
        },
        {
            prop: "dailyMinHumidity",
            label: "日最小湿度(%)",
        },
        {
            prop: "dailyMinHumidity",
            label: "日最小湿度(%)",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_009":[
        {
            prop: "inclination",
            label: "倾斜度(mm/m)",
        },
        {
            prop: "inclinationX",
            label: "顺线倾斜度(mm/m)",
        },
        {
            prop: "inclinationY",
            label: "横向倾斜度(mm/m)",
        },
        {
            prop: "angleX",
            label: "顺线倾斜角(°)",
        },
        {
            prop: "angleY",
            label: "横向倾斜角(°)",
        },
        {
            prop: "topDisplacement",
            label: "顶部位移值(°)",
        },
        {
            prop: "inclinationAlarmName",
            label: "倾斜度报警",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ],
    "003_010":[
        {
            prop: "windageYawAngle",
            label: "风偏角监测(°)",
        },
        {
            prop: "deflectionAngle",
            label: "偏斜角监测(°)",
        },
        {
            prop: "leastClearance",
            label: "最小电气间隙距离监测(m)",
        },
        {
            prop: "instantaneousWindSpeed",
            label: "风偏采集时刻的瞬时风速(m/s)",
        },
        {
            prop: "instantaneousWindDirectionName",
            label: "风偏采集时刻的瞬时风向",
        },
        {
            prop: "temperature",
            label: "风偏采集时刻的气温(℃)",
        },
        {
            prop: "humidity",
            label: "风偏采集时刻的湿度(%)",
        },
        {
            prop: "timeStamp",
            label: "采集时间",
            time:"time"
        },
    ]
};
export default tableItems;