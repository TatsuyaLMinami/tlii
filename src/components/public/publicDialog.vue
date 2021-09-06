<template>
  <div>
    <el-dialog
      center
      :title="title"
      :visible.sync="visible"
      append-to-body
      :show-close="false"
    >
      <el-table
        ref="filtertable"
        :data="tableData"
        max-height="400"
        border
        v-loading="tableLoading"
        @select="tableSelectFn"
        @selection-change="handleSelectionChange"
        @current-change="chooseMcaterialChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>

        <el-table-column
          v-for="(item, i) in tableItems"
          :key="i"
          align="center"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="item.time">{{
              scope.row[item.prop] 
            }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-style">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageData.currentPage"
          :page-size="pageData.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageData.total"
        ></el-pagination>
      </div>
      <span slot="footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="submitFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "publicDialog",
  data() {
    return {
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      visible: false,
      tableLoading: false,
      tableData: [],
      selection: [],
      tableItems: [],
      urlParams: {},
      title: "",
      type: ""
    };
  },
  methods: {
    setDialogType(type) {
      if (type === "line" || type === "line2") {
        this.title = "选择一条线路";
        this.urlParams = {
          url: "tpiim/line/getLineList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "lineName",
            label: "线路名称"
          },
          {
            prop: "lineNature",
            label: "线路性质"
          },
          {
            prop: "cityName",
            label: "所属城市"
          },
          {
            prop: "maintainTeamname",
            label: "运维班组"
          },
          {
            prop: "volLevelName",
            label: "电压等级"
          },
          {
            prop: "deviceState",
            label: "在运情况"
          }
        ];
      }
      if (type === "tower" || type === "startTower" || type === "endTower") {
        this.title = "选择一个杆塔";
        this.urlParams = {
          url: "tpiim/towers/getPgrTowerList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "objOrder",
            label: "杆塔名称"
          },
          {
            prop: "towerNature",
            label: "杆塔性质"
          },
          {
            prop: "pName",
            label: "所属线路"
          },
          {
            prop: "cityName",
            label: "所属城市"
          },
          {
            prop: "maintainTeamname",
            label: "运维班组"
          },
          {
            prop: "volLevel",
            label: "电压等级"
          },
          {
            prop: "deviceState",
            label: "在运情况"
          }
        ];
      }
      if (type === "department") {
        this.title = "选择一个部门";
        this.urlParams = {
          url: "/tpiim/sysOrg/getOrgList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "deptName",
            label: "部门名称"
          },
          {
            prop: "countyName",
            label: "所属单位"
          },
          {
            prop: "cityName",
            label: "所属城市"
          },
          {
            prop: "provinceName",
            label: "所属省份"
          }
        ];
      }
      if (type === "team") {
        this.title = "选择一个班组";
        this.urlParams = {
          url: "/tpiim/team/getTeamList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "teamName",
            label: "班组名称"
          }
        ];
      }
      if (type === "person") {
        this.title = "选择一名人员";
        this.urlParams = {
          url: "/tpiim/sysUser/getUserList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "staffName",
            label: "姓名"
          },
          {
            prop: "staffSex",
            label: "性别"
          },
          {
            prop: "deptName",
            label: "所在部门"
          }
        ];
      }
      if (type === "WPT") {
        this.title = "选择一个护线队";
        this.urlParams = {
          url: "/tpiim/wireProtectionTeam/getWireProtectionTeamList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "wireProtectionTeamName",
            label: "护线队名称"
          },
          {
            prop: "constructionUnit",
            label: "所属单位"
          },
          {
            prop: "wireProtectionTeamCertificate",
            label: "资质证书"
          },
          {
            prop: "cityName",
            label: "所在城市"
          },
          {
            prop: "remark",
            label: "备注"
          }
        ];
      }
      if (type === "task") {
        this.title = "选择一个巡视任务";
        this.urlParams = {
          url: "/yangkai/ptmiInsTask/getInsTaskList",
          type: "post",
          dataStatus: "2"
        };
        this.tableItems = [
          {
            prop: "taskName",
            label: "任务名称"
          },
          {
            prop: "ispTypeName",
            label: "巡视类型名称"
          }
        ];
      }
      if (type === "role") {
        this.title = "选择一个角色";
        this.urlParams = {
          url: "/yangkai/sysRole/getSysRoleList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "roleName",
            label: "角色名称"
          },
          {
            prop: "roleLevel",
            label: "角色级别"
          }
        ];
      }
      if (type === "hiddenDanger") {
        this.title = "选择一个隐患";
        this.urlParams = {
          url: "/tpiim/ptmihdrecord/findPage",
          type: "post",
          lineName: ""
        };
        this.tableItems = [
          {
            prop: "troubleTypeName",
            label: "隐患类型"
          },
          {
            prop: "troubleLevelName",
            label: "隐患级别"
          },
          {
            prop: "troubleState",
            label: "隐患状态"
          },
          {
            prop: "isCompleted",
            label: "治理状态"
          },
          {
            prop: "lineName",
            label: "所属线路"
          },
          {
            prop: "lineOperationGroupName",
            label: "治理状态"
          },
          {
            prop: "isCompleted",
            label: "运维班组"
          },
          {
            prop: "discovDate",
            label: "发现时间",
            time: "time"
          }
        ];
      }
      this.type = type;
      this.loadDataFn(1);
    },
    handleClose() {
      this.$refs.filtertable.clearSelection();
      this.visible = false;
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.loadDataFn(val);
    },
    // 加载数据
    loadDataFn(pageNum) {
      this.tableLoading = true;
      this.selection = [];
      if (this.urlParams.dataStatus) {
        $axios({
          url: this.urlParams.url,
          type: this.urlParams.type,
          data: {
            pageNum: pageNum,
            pageSize: this.pageData.pageSize,
            dataStatus: this.urlParams.dataStatus
          }
        })
          .then(res => {
            this.tableLoading = false;
            if (res) {
              this.pageData.total = res.resultValue.total;
              this.tableData = res.resultValue.data;

              if (this.tableData.length === 0) {
              }
            }
          })
          .catch(error => {
            console.log(error);
            this.tableLoading = false;
          });
      } else {
        $axios({
          url: this.urlParams.url,
          type: this.urlParams.type,
          data: {
            pageNum: pageNum,
            pageSize: this.pageData.pageSize
          }
        })
          .then(res => {
            this.tableLoading = false;
            if (res) {
              this.pageData.total = res.resultValue.total;
              this.tableData = res.resultValue.data;
            }
          })
          .catch(error => {
            console.log(error);
            this.tableLoading = false;
          });
      }
      this.visible = true;
    },
    tableSelectFn(selection) {
      this.selection = selection;
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.selection = [val[val.length - 1]];
        this.$refs.filtertable.clearSelection();
        this.$refs.filtertable.toggleRowSelection(val.pop());
      } else {
        this.selection = val;
      }
    },
    chooseMcaterialChange(val) {
      this.$refs.filtertable.toggleRowSelection(val);
    },
    submitFn() {
      if (this.selection.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据！"
        });
        return;
      }
      this.$emit("callBackFn", this.type, this.selection[0]);
      this.visible = false;
      this.$refs.filtertable.clearSelection();
    }
  }
};
</script>
<style lang="less" scoped>
.page-style {
  text-align: center;
}
</style>
