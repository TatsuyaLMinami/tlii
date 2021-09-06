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
      <span slot="footer" class="dialog-footer">
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
  name: "publicDialogMulti",
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
      dialogType: ""
    };
  },
  methods: {
    setDialogType(dialogType, toolsId) {
      if (dialogType === "line") {
        this.title = "选择线路";
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
      if (
        dialogType === "tower" ||
        dialogType === "startTower" ||
        dialogType === "endTower"
      ) {
        this.title = "选择杆塔";
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
      if (dialogType === "department") {
        this.title = "选择部门";
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
            prop: "deptType",
            label: "部门类型"
          },
          {
            prop: "manageLevel",
            label: "管理级别"
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
      if (dialogType === "team") {
        this.title = "选择班组";
        this.urlParams = {
          url: "/tpiim/team/getTeamList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "teamName",
            label: "班组名称"
          },
          {
            prop: "cityName",
            label: "所属城市"
          },
          {
            prop: "createTime",
            label: "创建时间",
            time: "time"
          },
          {
            prop: "updateTime",
            label: "更新时间",
            time: "time"
          },
          {
            prop: "remark",
            label: "备注"
          }
        ];
      }
      if (dialogType === "person") {
        this.title = "选择人员";
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
      if (dialogType === "WPT") {
        this.title = "选择护线队";
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
      if (dialogType === "task") {
        this.title = "选择巡视任务";
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
      if (dialogType === "menu") {
        this.title = "选择菜单";
        this.urlParams = {
          url: "/yangkai/sysMenu/getSysMenuList",
          type: "post"
        };
        this.tableItems = [
          {
            prop: "resName",
            label: "菜单名称"
          }
        ];
      }
      if (dialogType === "role") {
        this.title = "选择角色";
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
      if (dialogType === "tool") {
        this.title = "选择工器具";
        this.urlParams = {
          url: "/tpiim/tools/getToolList",
          type: "post",
          toolsId: toolsId
        };
        this.tableItems = [
          {
            prop: "toolsName",
            label: "工器具名称"
          },
          {
            prop: "toolsClass",
            label: "工器具分类"
          },
          {
            prop: "toolsNum",
            label: "工器具编号"
          },
          {
            prop: "toolsModel",
            label: "规格型号"
          },
          {
            prop: "toolsWarehouseId",
            label: "所属工器具仓库"
          },
          {
            prop: "toolsManufacturer",
            label: "生产厂家"
          },
          {
            prop: "toolsDate",
            label: "出厂日期"
          },
          {
            prop: "userId",
            label: "保管人"
          },
          {
            prop: "unitId",
            label: "保管单位"
          },
          {
            prop: "cityName",
            label: "所属地市"
          }
        ];
      }
      this.dialogType = dialogType;
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
      if (this.urlParams.toolsId) {
        $axios({
          url: this.urlParams.url,
          type: this.urlParams.type,
          data: {
            pageNum: pageNum,
            pageSize: this.pageData.pageSize,
            toolsId: this.urlParams.toolsId
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
      this.selection = val;
    },
    chooseMcaterialChange(val) {},
    submitFn() {
      if (this.selection.length === 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据！"
        });
        return;
      }
      this.$emit("callBackFn", this.dialogType, this.selection);
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
