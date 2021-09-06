<template>
  <div>
    <el-dialog
      :title="title"
      :before-close="handleClose"
      :visible.sync="visible"
    >
      <el-form
        :model="form"
        :rules="fieldRules"
        ref="form"
        style=" display:flex;
                            flex-wrap:wrap;
                            flex-direction:row;
                            align-content:flex-start;
                            width:100%"
      >
        <el-form-item
          style="width: 50%"
          label="所属线路:"
          :label-width="formLabelWidth"
          prop="lineName"
          size="small"
        >
          <el-input
            readonly
            placeholder="请选择所属线路"
            @focus="showLineTable"
            suffix-icon="el-icon-search"
            v-model="form.lineName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="所属地市:"
          :label-width="formLabelWidth"
          prop="cityName"
          size="small"
        >
          <el-input readonly placeholder="所属地市" v-model="form.cityName">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="运维班组:"
          :label-width="formLabelWidth"
          prop="maintainTeamname"
          size="small"
        >
          <el-input
            readonly
            placeholder="运维班组"
            v-model="form.maintainTeamname"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="电压等级:"
          :label-width="formLabelWidth"
          prop="volLevelName"
          size="small"
        >
          <el-input readonly placeholder="电压等级" v-model="form.volLevelName">
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
          style="width:50%"
          label="被跨越物名称:"
          :label-width="formLabelWidth"
          prop="crossName"
          size="small"
        >
          <el-input v-model="form.crossName" placeholder="请填写被跨越物名称">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="被跨越物类型:"
          :label-width="formLabelWidth"
          prop="crossStyle"
          size="small"
        >
          <el-input v-model="form.crossStyle" placeholder="请填写被跨越物类型">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="是否三跨:"
          :label-width="formLabelWidth"
          prop="isMaincross"
          size="small"
        >
          <el-select
            style="width:100%"
            v-model="form.isMaincross"
            placeholder="请选择是否三跨"
          >
            <el-option label="是" value="1">是</el-option>
            <el-option label="否" value="2">否</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="跨越点地形:"
          :label-width="formLabelWidth"
          prop="crossLand"
          size="small"
        >
          <el-input v-model="form.crossLand" placeholder="请填写跨越点地形">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="测量时间:"
          :label-width="formLabelWidth"
          prop="measDate"
          size="small"
        >
          <el-date-picker
            :picker-options="pickerDisOptions"
            style="width: 100%"
            v-model="form.measDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择测量时间"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
          <!-- <el-date-picker
            :picker-options="pickerDisOptions"
            style="width:100%"
            v-model="form.measDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择测量日期"
            format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker> -->
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="被跨越线路:"
          :label-width="formLabelWidth"
          prop="crossLineName"
          size="small"
        >
          <el-input
            readonly
            placeholder="请选择被跨越线路"
            @focus="showLineTable2"
            suffix-icon="el-icon-search"
            v-model="form.crossLineName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="被跨越线路所属地市:"
          :label-width="formLabelWidth"
          prop="crossCityname"
          size="small"
        >
          <el-input
            readonly
            placeholder="被跨越线路所属地市"
            v-model="form.crossCityname"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 50%"
          label="被跨越线路电压等级:"
          :label-width="formLabelWidth"
          prop="crossVollevelName"
          size="small"
        >
          <el-input
            readonly
            placeholder="被跨越线路电压等级"
            v-model="form.crossVollevelName"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="耐张段杆塔号:"
          :label-width="formLabelWidth"
          prop="pullTower"
          size="small"
        >
          <el-input placeholder="请填写耐张段杆塔号" v-model="form.pullTower">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="交跨角度:"
          :label-width="formLabelWidth"
          prop="crossAngle"
          size="small"
        >
          <el-input v-model="form.crossAngle" placeholder="请填写交跨角度">
            <template slot="append">°</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="交跨档档距:"
          :label-width="formLabelWidth"
          prop="crossSpace"
          size="small"
        >
          <el-input v-model="form.crossSpace" placeholder="请填写交跨档档距">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="交跨要求距离:"
          :label-width="formLabelWidth"
          prop="crossPlanlen"
          size="small"
        >
          <el-input
            v-model="form.crossPlanlen"
            placeholder="请填写交跨要求距离"
          >
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="交跨实际距离:"
          :label-width="formLabelWidth"
          prop="crossActlen"
          size="small"
        >
          <el-input v-model="form.crossActlen" placeholder="请填写交跨实际距离">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="小号侧杆塔型号:"
          :label-width="formLabelWidth"
          prop="stDecimal"
          size="small"
        >
          <el-input placeholder="请填写小号侧杆塔型号" v-model="form.stDecimal">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="小号侧杆塔性质:"
          :label-width="formLabelWidth"
          prop="stNature"
          size="small"
        >
          <el-input placeholder="请填写小号侧杆塔性质" v-model="form.stNature">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="离小号侧距离:"
          :label-width="formLabelWidth"
          prop="stLen"
          size="small"
        >
          <el-input v-model="form.stLen" placeholder="请填写离小号侧距离">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="大号侧杆塔型号:"
          :label-width="formLabelWidth"
          prop="btDecimal"
          size="small"
        >
          <el-input placeholder="请填写大号侧杆塔型号" v-model="form.btDecimal">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="大号侧杆塔性质:"
          :label-width="formLabelWidth"
          prop="btNature"
          size="small"
        >
          <el-input placeholder="请填写大号侧杆塔性质" v-model="form.btNature">
          </el-input>
        </el-form-item>
        <el-form-item
          style="width:50%"
          label="离大号侧距离:"
          :label-width="formLabelWidth"
          prop="btLen"
          size="small"
        >
          <el-input v-model="form.btLen" placeholder="请填写离大号侧距离">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="width: 100%"
          label="被跨越物图片:"
          :label-width="formLabelWidth"
          prop=""
          size="small"
        >
          <el-upload
            style="display: flex; flex-wrap: wrap"
            ref="uploadPic"
            action=""
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :auto-upload="false"
            accept=".jpg,.png,.JPG,.PNG,.jpeg,.JPEG"
            list-type="picture-card"
            :on-exceed="onExceed"
            :limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
            <div
              slot="tip"
              style="width: 100%; line-height: 20px; margin-top: 0px"
              class="el-upload__tip"
            >
              只能上传jpg/png/jpeg文件,大小不能超过2mb,一次最多上传1张
            </div>
          </el-upload>
          <el-dialog append-to-body :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleClose">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleCreate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <publicDialog @callBackFn="update" ref="line"> </publicDialog>
    <publicDialog @callBackFn="update" ref="tower"> </publicDialog>
  </div>
</template>
<script>
import publicDialog from "@/pages/public/publicDialog.vue";
import axios from "axios";
export default {
  name: "tc",
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
    return {
      form: {
        lineName: "",
        startTowername: "",
        endTowername: "",
        crossLineName: ""
      },
      pickerDisOptions: {
        disabledDate: this.disabledDisDate
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      visible: false,
      title: "",
      token: sessionStorage.getItem("token"),
      fileList: [],
      uploadPic: true,
      fieldRules: {
        lineName: [
          {
            required: true,
            validator: validateLineName,
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
        crossName: [
          {
            required: true,
            message: "请填写被跨越物名称",
            trigger: "blur"
          }
        ],
        crossStyle: [
          {
            required: true,
            message: "请填写被跨越物类型",
            trigger: "blur"
          }
        ],
        isMaincross: [
          {
            required: true,
            message: "请选择是否三跨",
            trigger: "change"
          }
        ],
        crossLand: [
          {
            required: true,
            message: "请填写跨越点地形",
            trigger: "blur"
          }
        ],
        measDate: [
          {
            required: true,
            message: "请选择测量日期",
            trigger: "change"
          }
        ],
        crossLineName: [
          {
            required: false,
            message: "请选择被跨越线路",
            trigger: "change"
          }
        ],
        pullTower: [
          {
            required: false,
            message: "请填写耐张段杆塔号",
            trigger: "blur"
          }
        ],
        crossAngle: [
          {
            required: false,
            message: "请填写交跨角度",
            trigger: "blur"
          }
        ],
        crossSpace: [
          {
            required: false,
            message: "请填写交跨档档距",
            trigger: "blur"
          }
        ],
        crossPlanlen: [
          {
            required: false,
            message: "请填写交跨要求距离",
            trigger: "blur"
          }
        ],
        crossActlen: [
          {
            required: false,
            message: "请填写交跨实际距离",
            trigger: "blur"
          }
        ],
        stDecimal: [
          {
            required: false,
            message: "请填写小号侧杆塔型号",
            trigger: "blur"
          }
        ],
        stNature: [
          {
            required: false,
            message: "请填写小号侧杆塔性质",
            trigger: "blur"
          }
        ],
        stLen: [
          {
            required: false,
            message: "请填写离小号侧距离",
            trigger: "blur"
          }
        ],
        btDecimal: [
          {
            required: false,
            message: "请填写大号侧杆塔型号",
            trigger: "blur"
          }
        ],
        btNature: [
          {
            required: false,
            message: "请填写大号侧杆塔性质",
            trigger: "blur"
          }
        ],
        btLen: [
          {
            required: false,
            message: "请填写离大号侧距离",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    disabledDisDate(time) {
      if (time.getTime() > Date.now()) {
        return true;
      } else {
        return false;
      }
    },
    update(val, row) {
      if (val === "line") {
        this.form.lineId = row.pmsId;
        this.form.lineName = row.lineName;
        this.form.volLevel = row.volLevel;
        this.form.volLevelName = row.volLevelName;
        this.form.maintainTeam = row.maintainTeam;
        this.form.maintainTeamname = row.maintainTeamname;
        this.form.cityId = row.cityId;
        this.form.cityName = row.cityName;
      }
      if (val === "line2") {
        this.form.crossLineid = row.pmsId;
        this.form.crossLineName = row.lineName;
        this.form.crossVollevel = row.volLevel;
        this.form.crossVollevelName = row.volLevelName;
        this.form.crossCityid = row.cityId;
        this.form.crossCityname = row.cityName;
      }
      if (val === "startTower") {
        this.form.startTower = row.pmsId;
        this.form.startTowername = row.objOrder;
      }
      if (val === "endTower") {
        this.form.endTower = row.pmsId;
        this.form.endTowername = row.objOrder;
      }
    },
    showTowerTable(val) {
      if (val === "s") {
        this.$refs.tower.setDialogType("startTower");
      }
      if (val === "e") {
        this.$refs.tower.setDialogType("endTower");
      }
    },
    showLineTable() {
      this.$refs.line.setDialogType("line");
    },
    showLineTable2() {
      this.$refs.line.setDialogType("line2");
    },
    setData(title, form) {
      this.title = title;
      this.form = JSON.parse(JSON.stringify({ ...this.form, ...form }));

      if (form.objId) {
        this.fileList = form.imgUrl;
        this.$nextTick(function() {
          var list = document.getElementsByClassName(
            "el-upload--picture-card"
          )[0];
          list.style.display = "none";
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
    handleClose() {
      this.$refs.form.resetFields();
      this.$refs.uploadPic.clearFiles();
      this.fileList = [];
      this.form = {
        lineName: "",
        startTowername: "",
        endTowername: "",
        crossLineName: ""
      };
      this.visible = false;
    },
    handleChange(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      this.fileList = fileList;
      if (fileList.length > 0) {
        list.style.display = "none";
      } else {
        list.style.display = "block";
      }
    },
    handleRemove(file, fileList) {
      var list = document.getElementsByClassName("el-upload--picture-card")[0];
      list.style.display = "block";
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed(file, fileList) {
      this.$message.warning("一次最多上传1张图片");
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.fileList.length > 0) {
            if (this.fileList[0].size / 1024 / 1024 > 2) {
              this.$message.error("图片大小不能超过2mb!");
              return false;
            }
          } else {
            this.$message.error("请上传被跨越物图片");
            return false;
          }
          let fd = new FormData();
          for (let key in this.form) {
            fd.append(key, this.form[key] || "");
          }
          if (this.form.objId) {
            if (this.fileList[0].raw) {
              fd.append("crossPhotoFile", this.fileList[0].raw);
            } else {
              fd.append("crossPhotoFileUrl", this.form.crossPhoto);
            }
            const url = "yangkai/span/updateSpan";
            this.handle(url, fd);
          } else {
            fd.append("crossPhotoFile", this.fileList[0].raw);
            const url = "yangkai/span/createSpan";
            this.handle(url, fd);
          }
        } else {
          return false;
        }
      });
    },
    handle(url, data) {
      axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.successful) {
            this.handleClose();
            this.$message.success(res.data.resultHint);
            this.$emit("updateData");
          } else {
            this.$message.error(res.data.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
