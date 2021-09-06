<template>
  <div class="baseStyle">
    <el-form :inline="true">
      <el-form-item size="small" label="时间范围:">
        <el-date-picker
          v-model="filter.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          @change="getMsgList(1)"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small" label="接收人:">
        <el-autocomplete
          v-model="filter.receiver"
          :fetch-suggestions="getReceiver"
          placeholder="请输入内容"
          @select="setPerson"
          @input="changePerson"
          clearable
          @clear="clearPerson"
        ></el-autocomplete>
      </el-form-item>
      <el-button
        type="primary"
        size="small"
        style="float: right"
        @click="sendMsg"
        >发送信息</el-button
      >
    </el-form>
    <el-table
      stripe
      max-height="500"
      :data="tableData"
      border
      v-loading="tableLoading"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        prop="subject"
        label="标题"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="messageType"
        label="消息类型"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="消息内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="sendTime"
        label="发送时间"
        :formatter="dateFormat"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="send"
        label="发送人"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="receiverNames"
        label="接收人"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.currentPage"
      :page-size="pageData.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageData.total"
    ></el-pagination>
    <m ref="m" @updateData="updateData"></m>
  </div>
</template>

<script>
import m from "./message/m.vue";
import $store from "@/store/data.js";
export default {
  name: "message",
  components: {
    m
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      msgType: [],
      filter: {
        receiver: "",
        date: "",
        receiverName: ""
      },
      pageData: {
        //分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    setPerson(val) {
      this.filter.receiverName = val.value;
      this.getMsgList(1);
    },
    clearPerson() {
      this.filter.receiverName = "";
      this.getMsgList(1);
    },
    changePerson() {
      this.filter.receiverName = this.filter.receiver;
      this.getMsgList(1);
    },
    getReceiver(name, callback) {
      $axios({
        url: "/yangkai/sysUser/getUserList",
        type: "post",
        data: {
          staffName: name
        }
      })
        .then(res => {
          if (res.successful) {
            let obj = [],
              persons = res.resultValue.data;
            if (persons.length > 0) {
              for (let i = 0; i < persons.length; i++) {
                obj.push({
                  value: persons[i].staffName
                });
              }
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback(obj);
              }, 1000 * Math.random());
            } else {
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                callback([]);
              }, 1000 * Math.random());
            }
          } else {
            this.$message.error(res.resultHint);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    sendMsg() {
      this.$refs.m.setData(this.msgType);
    },
    updateData() {
      this.getMsgList(this.pageData.currentPage);
    },
    // 加载数据
    getMsgList(pageNum) {
      this.tableData = [];
      this.tableLoading = true;
      $axios({
        url: "/yangkai/comm/message/getMsgInfoById",
        type: "post",
        data: {
          pageNum: pageNum,
          pageSize: this.pageData.pageSize,
          receivernames: this.filter.receiverName,
          startDate: this.filter.date ? this.filter.date[0] : "",
          endDate: this.filter.date ? this.filter.date[1] : ""
        }
      })
        .then(data => {
          this.tableLoading = false;
          if (data.successful) {
            this.tableData = data.resultValue.data;
            this.pageData.total = data.resultValue.total;
          } else {
            this.$message.error(data.resultHint);
          }
        })
        .catch(error => {
          this.tableLoading = false;
          this.$message.error(error);
        });
    },
    //分页功能
    handleCurrentChange(val) {
      this.pageData.currentPage = val;
      this.getMsgList(val);
    },
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
    this.msgType = $store.getters.msgType;
    this.getMsgList(1);
  }
};
</script>
