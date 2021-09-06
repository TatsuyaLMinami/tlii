<template>
  <div class="specialStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="巡视时间:">
        <el-date-picker
          class="dateClass"
          :picker-options="pickerOptions"
          @change="getTaskList"
          v-model="filter.inspectionDate"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item size="small" label="巡视时间:">
                <el-date-picker
                    class="dateClass"
                    :picker-options="pickerOptions"
                    @change="getTaskList"
                    v-model="filter.inspectionDate"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item> -->
      <!-- <el-form-item size="small" label="巡视任务:">
                <el-select
                    class="selectClass"
                    @change="getInspectionImageList(1)"
                    clearable
                    v-model="filter.inspectionTask"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, index) in inspectionTask"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                    >
                    </el-option>
                </el-select>
            </el-form-item> -->
      <el-form-item size="small" label="处理状态:">
        <el-select
          class="selectClass"
          @change="getInspectionImageList(1)"
          clearable
          v-model="filter.handleStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in handleStatus"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      row-key="bId"
      @cell-click="tableClick"
      v-loading="loading"
      :data="tableData"
      border
      max-height="200"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="picName"
        label="图像名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="taskName"
        label="巡视任务"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="巡视线路"
      >
      </el-table-column>
      <!-- <el-table-column
                :show-overflow-tooltip="true"
                prop="lineName"
                label="所属线路"
            >
            </el-table-column> -->
      <el-table-column
        :show-overflow-tooltip="true"
        prop="towerNo"
        label="关联杆塔"
      >
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="planIspDate"
        label="巡视时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="isRepeated"
        label="是否重复"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.identicalDefectImage === ""
              ? "否"
              : scope.row.identicalDefectImage === null
              ? "否"
              : scope.row.identicalDefectImage
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="dataStatus"
        label="处理状态"
      >
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
import $store from "@/store/data.js";
import { common, handleSomething } from "@/tools/common";
export default {
  name: "irhTable",
  props: ["lineName"],
  data() {
    return {
      url: $store.getters.url,
      imageUrl: [],
      //当前页面所用数据
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [],
      //下拉菜单数据
      inspectionTask: [],
      handleStatus: [],
      //向子件传递的数据
      imagUrl: "",
      dialogTitle: "",
      dialogFormImageVisible: false,
      dialogFormLoadVisible: false,
      //筛选条件数据
      filter: {
        inspectionDate: "",
        inspectionTask: "",
        handleStatus: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 5
    };
  },
  watch: {
    lineName: {
      handler(newName, oldName) {
        this.getInspectionImageList(1);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    tableClick(row, column, cell, event) {
      this.getDetail(row);
    },
    getDetail(row) {
      let data = {
          taskId: row.objId || ""
        },
        tableData = [],
        form = {},
        points = [],
        imageUrl = "",
        imageWidth = "",
        imageHeight = "",
        image = {},
        objId = "",
        num = 0;
      const baseUrl1 = "/yangkai/picDefectInfo/getDefectType";
      const url1 = `${baseUrl1}`;
      $axios({
        url: url1,
        type: "get",
        data: data
      })
        .then(res => {
          if (res.successful) {
            tableData = res.resultValue || [];

            if (tableData.length > 0) {
              imageUrl = this.url + tableData[0].imagePath;
              imageWidth = tableData[0].picWidth;
              imageHeight = tableData[0].picHeight;
              image = {
                imageUrl: imageUrl,
                imageWidth: imageWidth,
                imageHeight: imageHeight
              };
              objId = tableData[0].objId;
              for (let i = 0; i < tableData.length; i++) {
                tableData[i].edit = false;
                if (tableData[i].state === "已确认") {
                  points.push({
                    edit: false,
                    point: [
                      {
                        x: tableData[i].leftBelowX,
                        y: tableData[i].leftBelowY
                      },
                      {
                        x: tableData[i].rightBelowX,
                        y: tableData[i].rightBelowY
                      },
                      {
                        x: tableData[i].rightX,
                        y: tableData[i].rightY
                      },
                      {
                        x: tableData[i].leftX,
                        y: tableData[i].leftY
                      }
                    ]
                  });
                } else {
                  points.push({
                    edit: true,
                    point: [
                      {
                        x: tableData[i].leftBelowX,
                        y: tableData[i].leftBelowY
                      },
                      {
                        x: tableData[i].rightBelowX,
                        y: tableData[i].rightBelowY
                      },
                      {
                        x: tableData[i].rightX,
                        y: tableData[i].rightY
                      },
                      {
                        x: tableData[i].leftX,
                        y: tableData[i].leftY
                      }
                    ]
                  });
                }
                tableData[i].points = points;
              }
            }
            const baseUrl2 = "/yangkai/picDefectInfo/getDefectDetail";
            const url2 = `${baseUrl2}`;
            $axios({
              url: url2,
              type: "get",
              data: data
            })
              .then(res => {
                if (res.successful) {
                  form = res.resultValue;
                  form.objId = objId;
                  this.$emit("showDetail", tableData, form, image, points);
                } else {
                  this.$emit("showDetail", tableData, form, image, points);
                  this.$message.error(res.resultHint);
                }
              })
              .catch(error => {
                this.$message.error(error);
              });
          } else {
            this.$emit("showDetail", tableData, form, image, points);
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    getTaskList(date) {
      this.filter.inspectionDate = date;
      //console.log(date);
      this.getInspectionImageList(1);
      // let data = {
      //     startTime: this.$moment(date[0]).utcOffset(8).format("YYYY-MM-DD"),
      //     endTime: this.$moment(date[1]).utcOffset(8).format("YYYY-MM-DD"),
      // };
      // const baseUrl = "/yangkai/picDefectInfo/getTaskNames";
      // const url = `${baseUrl}`;
      // $axios({ url: url, type: "post", data: data })
      //     .then((res) => {
      //         if (res.successful) {
      //             let list = res.resultValue || [],
      //                 inspectionTask = [];
      //             for (let i = 0; i < list.length; i++) {
      //                 list.push({
      //                     code: list[i].taskName,
      //                     name: list[i].taskName,
      //                 });
      //             }
      //             this.inspectionTask = inspectionTask;
      //         } else {
      //             this.$message.error(data.resultHint);
      //         }
      //     })
      //     .catch((error) => {
      //         this.$message.error(error);
      //     });
    },
    getInspectionImageList(pageNum) {
      this.loading = true;
      let data = {
        pageSize: this.pageSize,
        lineName: this.lineName || "",
        //taskName: this.filter.inspectionTask || "",
        stateCode: this.filter.handleStatus || "",
        startTime:
          this.filter.inspectionDate === null
            ? ""
            : this.filter.inspectionDate[0],
        endTime:
          this.filter.inspectionDate === null
            ? ""
            : this.filter.inspectionDate[1]
      };
      if (pageNum === "first") {
        data.pageNum = 1;
      } else {
        data.pageNum = pageNum;
      }
      const baseUrl = "/yangkai/picDefectInfo/getPicDefectList";
      const url = `${baseUrl}`;
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          if (res.successful) {
            this.loading = false;
            this.totalPages = res.resultValue.total;
            let tableData = res.resultValue.data;
            if (tableData.length === 0) {
              this.tableData = [];
            } else {
              this.tableData = tableData;
              if (pageNum === "first") {
                this.getDetail(tableData[0]);
              }
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
      this.getInspectionImageList(val);
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (!date) {
        return "--";
      }
      return this.$moment(date)
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    if ($store.getters.handleStatus) {
      this.handleStatus = $store.getters.handleStatus;
    }
    this.getInspectionImageList("first");
  }
};
</script>

<style lang="less">
.specialStyle {
  width: 100%;
  margin-top: 10px;

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }

  .dateClass {
    width: 330px;
  }

  .selectClass {
    width: 160px;
  }

  .el-table td,
  .el-table th {
    padding: 5px 0px;
  }

  .el-pagination {
    position: absolute;
    bottom: 0px;
    left: 42%;
  }
}
</style>
