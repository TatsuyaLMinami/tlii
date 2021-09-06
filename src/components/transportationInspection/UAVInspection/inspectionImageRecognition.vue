<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="巡视日期:">
        <el-date-picker
          style="width: 203px"
          :picker-options="pickerOptions"
          @change="getInspectionImageList(1)"
          value-format="timestamp"
          v-model="filter.inspectionDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item size="small" label="巡视日期:">
                <el-date-picker
                    style="width: 203px"
                    :picker-options="pickerOptions"
                    @change="getTaskList"
                    value-format="timestamp"
                    v-model="filter.inspectionDate"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item> -->
      <!-- <el-form-item size="small" label="巡视任务:">
                <el-select
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
      <el-form-item size="small" label="线路名称:">
        <el-input
          :label-width="formLabelWidth"
          @change="getInspectionImageList(1)"
          minlength="0"
          maxlength="10"
          clearable
          v-model="filter.lineName"
          placeholder="请填写内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item size="small" label="识别状态:">
        <el-select
          @change="getInspectionImageList(1)"
          clearable
          v-model="filter.identificationStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in identificationStatus"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        size="small"
        style="float: right"
        @click="loadImage"
        >导入巡视图像</el-button
      >
    </el-form>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      border
      max-height="500"
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
        prop="task"
        label="所属巡视任务"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lineName"
        label="巡视线路"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="towerNO"
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
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stateMessage"
        label="识别状态"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="240">
        <template slot-scope="scope">
          <el-button @click="display(scope.row)" type="text" size="small"
            >查看原图</el-button
          >
          <el-button
            v-show="scope.row.stateMessage !== '已识别'"
            @click="distinguish(scope.row)"
            type="text"
            size="small"
            >识别</el-button
          >
          <el-button
            v-show="scope.row.stateMessage === '已识别'"
            @click="displayDistinguish(scope.row)"
            type="text"
            size="small"
            >查看识别结果</el-button
          >
          <el-button @click="deleteImage(scope.row)" type="text" size="small"
            >删除</el-button
          >
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
    <loadImage
      @updateData="updateLoadData"
      @handleClose="handleLoadClose"
      :inspectionTask="inspectionTask"
      :dialogTitle="dialogLoadTitle"
      :dialogFormVisible="dialogFormLoadVisible"
    >
    </loadImage>

    <imageDialog
      @handleClose="handleImageClose"
      :dialogTitle="dialogImageTitle"
      :dialogFormVisible="dialogFormImageVisible"
      :imageUrl="imageUrl"
    >
    </imageDialog>
  </div>
</template>

<script>
import $store from "@/store/data.js";
import loadImage from "./inspectionImageRecognition/loadImage";

import imageDialog from "./inspectionImageRecognition/imageDialog";
import { common, handleSomething } from "@/tools/common";
export default {
  name: "inspectionImageRecognition",
  components: {
    loadImage,
    imageDialog
  },
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
      identificationStatus: [],
      //向子件传递的数据
      imagUrl: "",
      dialogImageTitle: "",
      dialogLoadTitle: "",

      dialogFormImageVisible: false,
      dialogFormLoadVisible: false,

      //筛选条件数据
      filter: {
        inspectionDate: "",
        lineName: "",
        //inspectionTask: "",
        identificationStatus: ""
      },
      //分页数据
      currentPage: 1,
      totalPages: 0,
      pageSize: 10
    };
  },
  methods: {
    updateLoadData() {
      this.getInspectionImageList(this.currentPage);
      this.handleLoadClose();
    },
    handleLoadClose() {
      this.dialogFormLoadVisible = false;
    },
    handleImageClose() {
      this.dialogFormImageVisible = false;
    },
    disabledDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    getTaskList(date) {
      var dateData = this.$moment(date)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      let data = {
        ispDate: dateData
      };
      const baseUrl = "/yangkai/taskPicInfo/getTaskList";
      const url = `${baseUrl}`;
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(res => {
          //if (res.successful) {
          let list = res || [],
            inspectionTask = [];
          for (let i = 0; i < list.length; i++) {
            list.push({
              code: list[i].objId,
              name: list[i].task
            });
          }
          this.inspectionTask = inspectionTask;
          //} else {
          //this.$message.error(res.resultHint);
          //}
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getInspectionImageList(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        lineName: this.filter.lineName || "",
        //task: this.filter.inspectionTask || "",
        stateCode: this.filter.identificationStatus || "",
        ispDate: this.filter.inspectionDate || ""
      };
      const baseUrl = "/yangkai/taskPicInfo/getTaskDefectPicList";
      const url = `${baseUrl}`;
      $axios({
        url: url,
        type: "post",
        data: data
      })
        .then(data => {
          if (data.successful) {
            this.loading = false;
            this.totalPages = data.resultValue.total;
            this.tableData = data.resultValue.data;
            if (this.tableData.length === 0) {
            } else {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].createTime = this.$moment(
                  this.tableData[i].createTime
                )
                  .utcOffset(8)
                  .format("YYYY-MM-DD HH:mm:ss");
              }
            }
          } else {
            this.loading = false;
            this.tableData = [];
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
          this.loading = false;
        });
    },

    loadImage() {
      this.dialogLoadTitle = "导入巡视图像";
      this.dialogFormLoadVisible = true;
    },
    display(row) {
      const baseUrl = "/yangkai/taskPicInfo/getTaskPic";
      const url = `${baseUrl}`;
      let imageUrl = "";
      $axios({
        url: url,
        type: "get",
        data: {
          taskId: row.objId
        }
      })
        .then(res => {
          if (res.successful) {
            this.imageUrl = this.url + res.resultValue.picPath || "";
            this.dialogImageTitle = "原图";
            this.dialogFormImageVisible = true;
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    distinguish(row) {
      let that = this;
      const baseUrl = "/yangkai/taskPicInfo/aiDiscern";
      let taskId = row.objId;
      const url = `${baseUrl}?taskId=${taskId}`;
      handleSomething("确定要识别该缺陷图像?", {
        url: url,
        type: "get"
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getInspectionImageList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
      });
    },
    displayDistinguish(row) {
      const baseUrl = "/yangkai/taskPicInfo/getTaskPic";
      const url = `${baseUrl}`;
      $axios({
        url: url,
        type: "get",
        data: {
          taskId: row.objId
        }
      })
        .then(res => {
          if (res.successful) {
            this.imageUrl = this.url + res.resultValue.regPicPath || "";
            this.dialogImageTitle = "识别结果";
            this.dialogFormImageVisible = true;
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    deleteImage(row) {
      let that = this;
      const baseUrl = "/yangkai/taskPicInfo/deleteTask";
      let taskId = row.objId;
      const url = `${baseUrl}?taskId=${taskId}`;
      handleSomething("确定要删除该缺陷图像?", {
        url: url,
        type: "get"
      }).then(function(result) {
        if (result.res) {
          that.$message.success(result.msg);
          that.getInspectionImageList(that.currentPage);
        } else {
          that.$message.error(result.msg);
        }
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
    if ($store.getters.identificationStatus) {
      this.identificationStatus = $store.getters.identificationStatus;
    }
    if ($store.getters.ispTask) {
      this.inspectionTask = $store.getters.ispTask;
    }
    this.getInspectionImageList(1);
  }
};
</script>
