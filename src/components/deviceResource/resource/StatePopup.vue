<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px">
      <div class="table-style">
        <el-table :data="tableData" border v-loading="tableLoading">
          <el-table-column
            v-for="(item, i) in tableDicData"
            :key="i"
            align="center"
            show-overflow-tooltip
            :label="item.label"
            width="160"
          >
            <template slot-scope="scope">
              <span v-if="item.type === 'date'">{{
                scope.row[item.key] 
              }}</span>
              <span v-else>{{ scope.row[item.key] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-style">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageData.currentPage"
          :page-size="pageData.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageData.total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "linesTable",
  prop: ["tableDicData", "title", "url", "type"],
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      tableData: [],
      pageData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      towerId: "",
      tableDicData: [],
      url: "",
      title: ""
    };
  },
  methods: {
    initFn(params) {
      this.dialogVisible = true;
      this.pageData.currentPage = 1;
      this.towerId = params.towerId;
      this.tableDicData = this[params.type];
      if (params.type === "gaojing") {
        this.title = "告警详情";
        this.url = "/tpiim/indexStatus/getAlarmByTowerIdList";
        this.tableDicData = [
          // {
          //   label: "线路名称",
          //   key: "lineName",
          // },
          // {
          //   label: "杆塔名称",
          //   key: "towerName",
          // },
          // {
          //   label: "监测类型",
          //   key: "deviceTypeName",
          // },
          {
            label: "告警状态",
            key: "alarmStateName"
          },
          {
            label: "告警级别",
            key: "alarmLevelName"
          },
          {
            label: "告警类型",
            key: "alarmTypeName"
          },
          {
            label: "告警内容",
            key: "alarmData"
          },
          {
            label: "告警开始时间",
            key: "sAlarmTime",
            type: "date"
          },
          {
            label: "告警结束时间",
            key: "eAlarmTime",
            type: "date"
          },
          {
            label: "报警处理说明",
            key: "alarmCom"
          },
          {
            label: "处理时间",
            key: "dAlarmTime",
            type: "date"
          },
          {
            label: "处理人",
            key: "dStaffName"
          }
        ];
      } else if (params.type === "quexian") {
        this.title = "缺陷详情";
        this.url = "/tpiim/indexStatus/getDefectByTowerIdList";
        this.tableDicData = [
          {
            label: "线路名称",
            key: "lineName"
          },
          {
            label: "电压等级",
            key: "volLevelName"
          },
          {
            label: "严重程度",
            key: "defectNatureName"
          },
          {
            label: "缺陷类型",
            key: "defectTypeName"
          },
          {
            label: "缺陷部位",
            key: "defectPartName"
          },
          {
            label: "发现时间",
            key: "discovDate",
            type: "date"
          },
          // {
          //   label: "缺陷来源",
          //   key: "sourceType",
          // },
          {
            label: "运维班组",
            key: "maintainTeamName"
          },
          {
            label: "设备厂家",
            key: "manufacturerName"
          },
          {
            label: "是否处理完成",
            key: "isCompleted"
          },
          {
            label: "缺陷状态",
            key: "defectState"
          }
        ];
      } else if (params.type === "yinhuan") {
        this.title = "隐患详情";
        this.url = "/tpiim/indexStatus/getHdByTowerIdList";
        this.tableDicData = [
          {
            label: "线路名称",
            key: "lineName"
          },
          {
            label: "电压等级",
            key: "volLevelName"
          },
          // {
          //   label: "隐患影响范围",
          //   key: "troubleRange",
          // },
          {
            label: "起始杆塔",
            key: "startTowername"
          },
          {
            label: "终止杆塔",
            key: "endTowername"
          },
          {
            label: "所属地市",
            key: "cityName"
          },
          {
            label: "发现时间",
            key: "discovDate",
            type: "date"
          },
          {
            label: "隐患类型",
            key: "troubleTypeName"
          },
          {
            label: "隐患级别",
            key: "troubleLevelName"
          },
          {
            label: "隐患描述",
            key: "troubleCom"
          },
          // {
          //   label: "可能导致的后果",
          //   key: "consequence",
          // },
          // {
          //   label: "拟采取措施",
          //   key: "measure",
          // },
          {
            label: "隐患位置",
            key: "troubleLocation"
          },
          {
            label: "发现人员",
            key: "discovStaffName"
          },
          {
            label: "发现部门",
            key: "discovDeptName"
          },
          {
            label: "隐患状态",
            key: "troubleState"
          },
          {
            label: "是否治理完成",
            key: "isCompleted"
          }
        ];
      } else if (params.type === "guzhang") {
        this.title = "故障详情";
        this.url = "/tpiim/indexStatus/getFaultByTowerIdList";
        this.tableDicData = [
          {
            label: "线路名称",
            key: "lineName"
          },
          {
            label: "故障原因",
            key: "faultCause"
          },
          {
            label: "故障类别",
            key: "faultTypeName"
          },
          {
            label: "处理结果",
            key: "disposalResults"
          },
          {
            label: "可能导致的后果",
            key: "consequence"
          },
          // {
          //   label: "拟采取措施",
          //   key: "measure",
          // },
          // {
          //   label: "来源类型",
          //   key: "sourceType",
          // },
          {
            label: "发现人员",
            key: "discovStaffName"
          },
          // {
          //   label: "是否处理完成",
          //   key: "isCompleted",
          // },
          // {
          //   label: "最新治理日期",
          //   key: "handleDate",
          // },
          // {
          //   label: "处理措施",
          //   key: "measureCom",
          // },
          {
            label: "治理人",
            key: "handleStaffName"
          },
          {
            label: "治理班组",
            key: "handleTeamname"
          },
          {
            label: "处理状态",
            key: "handleState"
          },
          {
            label: "发现日期",
            key: "discovDate",
            type: "date"
          }
        ];
      }
      this.loadDataFn();
    },
    loadDataFn() {
      this.tableLoading = true;
      $axios({
        url: this.url, //"/tpiim/indexStatus/getHdByTowerIdList",
        type: "post",
        data: {
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSize,
          towerId: this.towerId
        }
      })
        .then(res => {
          this.tableLoading = false;
          this.pageData.total = res.resultValue.total;
          this.tableData = res.resultValue.data;
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.loadDataFn();
    }
  }
};
</script>
<style scoped>
.w150 {
  width: 150px;
}
.page-style {
  text-align: center;
}
.table-style {
  height: 60vh;
}
</style>
