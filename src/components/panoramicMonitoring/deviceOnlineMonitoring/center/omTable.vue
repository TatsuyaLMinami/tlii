<template>
  <div class="omTable" v-show="visible">
    <div class="tableTitle">
      设备列表
      <el-button icon="el-icon-close" @click="handleClose"></el-button>
    </div>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      row-key="id"
      lazy
      :load="load"
      max-height="200"
      @cell-click="tableClick"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceName"
        label="设备名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceType"
        label="设备类型"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceCount"
        label="数量"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="deviceState"
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.deviceState === '停运'" style="color: red">
            {{ scope.row.deviceState }}
          </div>
          <div v-else>{{ scope.row.deviceState }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="totalPages"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "omTable",
  data() {
    return {
      visible:true,
      //当前页面所用数据
      formLabelWidth: "120px",
      loading: true,
      tableData: [],
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 5
    };
  },
  methods: {
    setData(){
      this.visible = true;
    },
    handleClose() {
      this.$emit("closeTable");
      this.visible = false;
    },
    tableClick(row, column, cell, event) {
      if (row.deviceType === "杆塔") {
        this.$emit("showTower", row.towerId, row.towerName);
      }
    },
    load(tree, treeNode, resolve) {
      if (tree.deviceType === "线路") {
        let PMSId = tree.PMSId;
        setTimeout(() => {
          const baseUrl = "/tpiim/realTimeMonitor/getTowerTreeList";
          const url = `${baseUrl}?PMSId=${PMSId}`;
          $axios({ url: url, type: "get" })
            .then(res => {
              if (res.successful) {
                let tableData = res.resultValue,
                  arr = [];
                if (tableData.length === 0) {
                  resolve([]);
                } else {
                  for (let i = 0; i < tableData.length; i++) {
                    arr.push({
                      id: tableData[i].objOrder,
                      towerId: tableData[i].pmsId,
                      towerName: tableData[i].objOrder,
                      objOrder: tableData[i].objOrder,
                      deviceName: tableData[i].objOrder,
                      deviceType: tableData[i].towerType,
                      deviceCount: tableData[i].deviceNumber,
                      deviceState: tableData[i].deviceState,
                      hasChildren: true
                    });
                  }
                  resolve(arr);
                }
              } else {
                resolve([]);
                this.$message.error(res.resultHint);
              }
            })
            .catch(error => {
              resolve([]);
              this.$message.error(error);
            });
        }, 1000);
      } else if (tree.deviceType === "杆塔") {
        let objOrder = tree.objOrder;
        setTimeout(() => {
          const baseUrl = "/tpiim/realTimeMonitor/getDeviceTreeList";
          const url = `${baseUrl}?objOrder=${objOrder}`;
          $axios({ url: url, type: "get" })
            .then(res => {
              if (res.successful) {
                let tableData = res.resultValue,
                  arr = [];
                if (tableData.length === 0) {
                  resolve([]);
                } else {
                  var id = this.randomNum();
                  for (let i = 0; i < tableData.length; i++) {
                    arr.push({
                      id: id,
                      deviceName: tableData[i].deviceName,
                      deviceType: tableData[i].deviceType,
                      deviceCount: tableData[i].deviceTypeNumber,
                      deviceState: tableData[i].deviceState,
                      hasChildren: false
                    });
                  }
                  resolve(arr);
                }
              } else {
                resolve([]);
                this.$message.error(res.resultHint);
              }
            })
            .catch(error => {
              resolve([]);
              this.$message.error(error);
            });
        }, 1000);
      }
    },
    getLineList(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      const baseUrl = "/tpiim/realTimeMonitor/getLineTreeList";
      const url = `${baseUrl}`;
      $axios({ url: url, type: "post", data: data })
        .then(res => {
          if (res.successful) {
            this.loading = false;
            this.totalPages = res.resultValue.total;
            let tableData = res.resultValue.data;
            let arr = [];
            if (tableData.length === 0) {
            } else {
              for (let i = 0; i < tableData.length; i++) {
                arr.push({
                  id: tableData[i].lineId,
                  PMSId: tableData[i].lineId,
                  deviceName: tableData[i].lineName,
                  deviceType: tableData[i].lineType,
                  deviceCount: tableData[i].towerNumber,
                  deviceState: tableData[i].towerDeviceState,
                  hasChildren: true
                });
              }
              this.tableData = arr;
            }
          } else {
            this.loading = false;
            this.tableData = [];
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
          this.loading = false;
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLineList(val);
    },
    //随机生成UUID
    randomNum() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    }
  },
  mounted() {
    this.getLineList(1);
  }
};
</script>
<style lang="less">
.omTable {
  background: white;
  box-shadow: 1px -1px 1px #f7f7f7;
  border: 1px solid #f7f7f7;
  bottom: 14px;
  position: absolute;
  .tableTitle {
    font-size: 14px;
    font-weight: bold;
    padding: 5px;
    background: #f7f7f7;
    color: black;
    .el-button {
      line-height: 22px;
      padding: 0;
      background: transparent;
      float: right;
      border: none;
    }
  }
  .el-table {
    margin-bottom: 31px;
    font-size: 13px;
    min-height: 118px;
  }
  .el-table td,
  .el-table th {
    padding: 0;
  }
  .el-pagination {
    position: absolute;
    bottom: 0px;
    left: 25%;
  }
}
</style>
