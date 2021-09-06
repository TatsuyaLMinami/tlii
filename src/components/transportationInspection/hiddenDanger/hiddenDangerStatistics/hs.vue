<template>
  <el-dialog
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    class="loadImage"
  >
    <el-form
      :model="form"
      :rules="fieldRules"
      ref="form"
      style="
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                width: 100%;
            "
    >
      <el-form-item
        style="width: 50%"
        label="所属线路:"
        :label-width="formLabelWidth"
        prop="lineName"
        size="small"
      >
        <el-input
          placeholder="请选择所属线路"
          readonly
          @focus="showLineTable"
          suffix-icon="el-icon-search"
          v-model="form.lineName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="所属杆塔:"
        :label-width="formLabelWidth"
        prop="towerName"
        size="small"
      >
        <el-input
          placeholder="请选择所属杆塔"
          readonly
          @focus="showTowerTable('t')"
          suffix-icon="el-icon-search"
          v-model="form.towerName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="起始杆塔:"
        :label-width="formLabelWidth"
        prop="startTowername"
        size="small"
      >
        <el-input
          placeholder="请选择起始杆塔"
          readonly
          @focus="showTowerTable('s')"
          suffix-icon="el-icon-search"
          v-model="form.startTowername"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="终止杆塔:"
        :label-width="formLabelWidth"
        prop="endTowername"
        size="small"
      >
        <el-input
          placeholder="请选择终止杆塔"
          readonly
          @focus="showTowerTable('e')"
          suffix-icon="el-icon-search"
          v-model="form.endTowername"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="隐患类型:"
        :label-width="formLabelWidth"
        prop="troubleType"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.troubleType"
          placeholder="请选择隐患类型"
        >
          <el-option
            v-for="(item, index) in dropDown.troubleType"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="隐患级别:"
        :label-width="formLabelWidth"
        prop="troubleLevel"
        size="small"
      >
        <el-select
          style="width: 100%"
          v-model="form.troubleLevel"
          placeholder="请选择隐患级别"
        >
          <el-option
            v-for="(item, index) in dropDown.troubleLevel"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="发现人员:"
        :label-width="formLabelWidth"
        prop="discovStaffName"
        size="small"
      >
        <el-input
          placeholder="请选择发现人员"
          readonly
          @focus="showPersonTable"
          suffix-icon="el-icon-search"
          v-model="form.discovStaffName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="发现部门:"
        :label-width="formLabelWidth"
        prop="discovDeptName"
        size="small"
      >
        <el-input
          placeholder="请选择发现部门"
          readonly
          @focus="showDepartmentTable"
          suffix-icon="el-icon-search"
          v-model="form.discovDeptName"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="发现时间:"
        :label-width="formLabelWidth"
        prop="discovDate"
        size="small"
      >
        <el-date-picker
          :picker-options="pickerDisOptions"
          style="width: 100%"
          v-model="form.discovDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择发现时间"
          format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="排序号:"
        :label-width="formLabelWidth"
        prop="orderNo"
        size="small"
      >
        <el-input v-model="form.orderNo" placeholder="请填写排序号" />
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="经度:"
        :label-width="formLabelWidth"
        prop="longitude"
        size="small"
      >
        <el-input v-model="form.longitude" placeholder="请填写经度" />
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="纬度:"
        :label-width="formLabelWidth"
        prop="latitude"
        size="small"
      >
        <el-input v-model="form.latitude" placeholder="请填写纬度" />
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="巡视任务:"
        :label-width="formLabelWidth"
        prop="sourceTable"
        size="small"
      >
        <el-select
          clearable
          @change="setTask"
          style="width: 100%"
          v-model="form.sourceTable"
          placeholder="请选择巡视任务"
        >
          <el-option
            v-for="(item, index) in dropDown.ispTask"
            :key="index"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 50%"
        label="隐患位置:"
        :label-width="formLabelWidth"
        prop="troubleLocation"
        size="small"
      >
        <el-input v-model="form.troubleLocation" placeholder="请填写隐患位置" />
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="隐患描述:"
        :label-width="formLabelWidth"
        prop="troubleCom"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.troubleCom"
          placeholder="请填写隐患描述"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="可能导致的后果:"
        :label-width="formLabelWidth"
        prop="consequence"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.consequence"
          placeholder="请填写可能导致的后果"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="拟采取措施:"
        :label-width="formLabelWidth"
        prop="measure"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.measure"
          placeholder="请填写拟采取措施"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="拟处理措施:"
        :label-width="formLabelWidth"
        prop="measureCom"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.measureCom"
          placeholder="请填写拟处理措施"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="备注:"
        :label-width="formLabelWidth"
        prop="remark"
        size="small"
      >
        <el-input
          type="textarea"
          rows="2"
          maxlength="200"
          show-word-limit
          v-model="form.remark"
        />
      </el-form-item>
      <el-form-item
        style="width: 100%; margin-bottom: 0px"
        label="隐患图片:"
        size="small"
        :label-width="formLabelWidth"
      >
        <el-upload
          multiple
          style="display: flex; flex-wrap: wrap"
          class="uploadResource"
          ref="upload"
          action=""
          :data="{}"
          :name="'files'"
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          accept=".jpg,.png,.JPG,.PNG,.jpeg,.JPEG"
          :on-exceed="onExceed"
          :limit="5"
          list-type="picture-card"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
          <div
            slot="tip"
            style="width: 100%; line-height: 20px; margin-top: 0px"
            class="el-upload__tip"
          >
            只能上传jpg/png/jpeg文件，且每张不超过5mb,一次最多上传5张
          </div>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native.prevent="handleClose">取 消</el-button>
      <el-button type="primary" @click.native.prevent="handleTransfer"
        >确 定</el-button
      >
    </div>
    <publicDialog ref="line" @callBackFn="update"> </publicDialog>
    <publicDialog ref="tower" @callBackFn="update"> </publicDialog>
    <publicDialog ref="person" @callBackFn="update"> </publicDialog>
    <publicDialog @callBackFn="update" ref="department"> </publicDialog>
  </el-dialog>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
import axios from "axios";
export default {
  name: "hs",
  components: {
    publicDialog
  },
  data() {
    let validateLineName = (rule, value, callback) => {
      if (!this.form.lineName) {
        callback(new Error("请选择所属线路"));
      } else {
        callback();
      }
    };
    let validateTowerName = (rule, value, callback) => {
      if (!this.form.towerName) {
        callback(new Error("请选择所属杆塔"));
      } else {
        callback();
      }
    };
    let validateStartTowerName = (rule, value, callback) => {
      if (!this.form.startTowername) {
        callback(new Error("请选择起始杆塔"));
      } else {
        callback();
      }
    };
    let validateEndTowerName = (rule, value, callback) => {
      if (!this.form.endTowername) {
        callback(new Error("请选择终止杆塔"));
      } else {
        callback();
      }
    };
    let validateDiscovStaffName = (rule, value, callback) => {
      if (!this.form.discovStaffName) {
        callback(new Error("请选择发现人员"));
      } else {
        callback();
      }
    };
    let validateDiscovDeptName = (rule, value, callback) => {
      if (!this.form.discovDeptName) {
        callback(new Error("请选择发现部门"));
      } else {
        callback();
      }
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      visible: false,
      title: "",
      idList: "",
      pickerDisOptions: {
        disabledDate: this.disabledDisDate
      },
      token: sessionStorage.getItem("token"),
      form: {
        lineName: "",
        towerName: "",
        startTowername: "",
        endTowername: "",
        discovStaffName: "",
        discovDeptName: ""
      },
      dropDown: {
        ispTask: [],
        troubleType: [],
        troubleLevel: []
      },
      formLabelWidth: "120px",
      fileList: [],
      upload: true,
      fieldRules: {
        lineName: [
          {
            required: true,
            validator: validateLineName,
            trigger: "change"
          }
        ],
        towerName: [
          {
            required: true,
            validator: validateTowerName,
            trigger: "change"
          }
        ],
        startTowername: [
          {
            required: true,
            validator: validateStartTowerName,
            trigger: "change"
          }
        ],
        endTowername: [
          {
            required: true,
            validator: validateEndTowerName,
            trigger: "change"
          }
        ],
        troubleType: [
          {
            required: true,
            message: "请选择隐患类型",
            trigger: "change"
          }
        ],
        troubleLevel: [
          {
            required: true,
            message: "请选择隐患部位",
            trigger: "change"
          }
        ],
        discovStaffName: [
          {
            required: true,
            validator: validateDiscovStaffName,
            trigger: "change"
          }
        ],
        discovDeptName: [
          {
            required: true,
            validator: validateDiscovDeptName,
            trigger: "change"
          }
        ],
        discovDate: [
          {
            required: true,
            message: "请选择发现日期",
            trigger: "change"
          }
        ],
        orderNo: [
          {
            required: true,
            message: "请填写排序号",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "请填写经度",
            trigger: "blur"
          },
          {
            pattern: /^-?((0|1?[0-7]?[0-9]?)\.[0-9]{6,10}?)|180\.[0-9]{6,10}?$/,
            message: "经度整数部分为0-180,小数部分6-10位！",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "请填写纬度",
            trigger: "blur"
          },
          {
            pattern: /^-?((0|[1-8]?[0-9]?)\.[0-9]{6,10}?)|90\.[0-9]{6,10}?$/,
            message: "纬度整数部分为0-90,小数部分6-10位！",
            trigger: "blur"
          }
        ],
        consequence: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        troubleCom: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        measure: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        measureCom: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ],
        remark: [
          {
            pattern: /^.{1,200}$/,
            message: "只能填写1-200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setData(title, form, dropDown) {
      this.idList = "";
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));
      this.dropDown = dropDown;
      if (form.objId) {
        this.fileList = form.imgUrl;
        this.$nextTick(function() {
          var list = document.getElementsByClassName(
            "el-upload--picture-card"
          )[0];
          if (this.fileList.length < 5) {
            list.style.display = "block";
          } else {
            list.style.display = "none";
          }
        });
      } else {
        this.fileList = [];
        this.$nextTick(function() {
          var list = document.getElementsByClassName(
            "el-upload--picture-card"
          )[0];
          list.style.display = "block";
        });
      }
      this.visible = true;
    },
    setTask(val) {
      this.form.sourceTable = val.name;
      this.form.sourceId = val.code;
    },
    update(val, row) {
      if (val === "line") {
        this.form.lineId = row.pmsId;
        this.form.lineName = row.lineName;
        this.form.volLevel = row.volLevel;
        this.form.volLevelName = row.volLevelName;
        this.form.ineOperationGroupId = row.maintainTeam;
        this.form.lineOperationGroupName = row.maintainTeamname;
      }
      if (val === "tower") {
        this.form.towerId = row.pmsId;
        this.form.towerName = row.objOrder;
      }
      if (val === "startTower") {
        this.form.startTower = row.pmsId;
        this.form.startTowername = row.objOrder;
      }
      if (val === "endTower") {
        this.form.endTower = row.pmsId;
        this.form.endTowername = row.objOrder;
      }
      if (val === "department") {
        this.form.discovDept = row.objId;
        this.form.discovDeptName = row.deptName;
      }
      if (val === "person") {
        this.form.discovStaffId = row.objId;
        this.form.discovStaffName = row.staffName;
      }
    },
    showTowerTable(val) {
      if (val === "s") {
        this.$refs.tower.setDialogType("startTower");
      }
      if (val === "e") {
        this.$refs.tower.setDialogType("endTower");
      }
      if (val === "t") {
        this.$refs.tower.setDialogType("tower");
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    showPersonTable() {
      this.$refs.person.setDialogType("person");
    },
    showDepartmentTable() {
      this.$refs.department.setDialogType("department");
    },
    disabledDisDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    handleClose() {
      this.idList = "";
      this.$refs.form.resetFields();
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.form = {
        lineName: "",
        towerName: "",
        startTowername: "",
        endTowername: "",
        discovStaffName: "",
        discovDeptName: ""
      };
      this.visible = false;
    },
    handleTransfer() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let fd = new FormData(),
            url = "";
          if (this.form.regDate < this.form.discovDate) {
            this.$message.error("登记时间不得早于发现时间");
            return false;
          }
          if (this.fileList.length > 0) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].size / 1024 / 1024 > 5) {
                this.$message.error("图片大小不能超过5mb!");
                return false;
              }
            }
          } else {
            this.$message.error("请添加图片");
            return false;
          }
          this.form.discovDate = this.form.discovDate.getTime();
          for (let key in this.form) {
            fd.append(key, this.form[key] || "");
          }
          fd.delete("updateDate");
          fd.delete("regDate");
          fd.delete("checkDate");
          fd.delete("handleDate");
          if (this.form.objId) {
            for (let i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].raw) {
                fd.append("multipartFile", this.fileList[i].raw);
              }
            }
            fd.append("multipartUrl", this.idList);
            if (this.form.chId && !this.form.objId) {
              url = "/yangkai/ptmihdrecord/add";
            } else {
              url = "/yangkai/ptmihdrecord/update";
            }
            this.handle(url, fd);
          } else {
            for (let i = 0; i < this.fileList.length; i++) {
              fd.append("multipartFile", this.fileList[i].raw);
            }
            const url = "/yangkai/ptmihdrecord/add";
            this.handle(url, fd);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, fd) {
      axios({
        method: "post",
        url: url,
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.successful) {
            this.$message.success(res.data.resultHint);
            this.$emit("updateData");
            this.handleClose();
          } else {
            this.$message.error(res.data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //上传触发
    handleChange(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      if (fileList.length > 4) {
        list.style.display = "none";
      } else {
        list.style.display = "block";
      }
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.idList = this.idList + file.objId + ",";
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      list.style.display = "block";
      this.fileList = fileList;
    },
    //一次上传超出
    onExceed(file, fileList) {
      this.$message.warning("一次最多上传5张图片");
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
