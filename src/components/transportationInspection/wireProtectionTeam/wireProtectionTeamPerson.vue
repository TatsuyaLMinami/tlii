<template>
<div class="baseStyle">
    <el-header height="45px;">
        <el-button type="primary" size="small" @click="add">新增</el-button>
    </el-header>
    <el-form :inline="true">
    </el-form>
    <el-table v-loading="loading" stripe :data="tableData" border max-height="500">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="personnelName" label="姓名">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="personnelIdcard" label="身份证号">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="teamName" label="所属护线队">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="cityName" label="所属城市">
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
                <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalPages">
    </el-pagination>
    <publicDetail ref="detail"> </publicDetail>
    <wp ref="wp" @updateData="updateData"></wp>
</div>
</template>

<script>
import formItems from "@/store/formItems/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson/wp.js";
import $store from "@/store/data.js";
import publicDetail from "@/pages/public/publicDetail";
import wp from "./wireProtectionTeamPerson/wp.vue";
import {handleSomething}from "@/tools/common";
export default {
    name: "wireProtectionTeamPerson",
    components: {
        publicDetail,
        wp
    },
    data() {
        return {
            url: $store.getters.url,
            //当前页面所用数据
            formLabelWidth: "120px",
            loading: false,
            tableData: [],
            //下拉菜单数据
            city: [],
            //筛选条件数据
            filter: {
                deviceType: "",
                deviceState: "",
            },
            //分页数据
            currentPage: 1,
            totalPages: 0,
            pageSize: 10,
        };
    },
    methods: {
        updateData() {
            this.getWPTperson(this.currentPage);
        },
        getWPTperson(pageNum) {
            this.loading = true;
            let data = {
                pageSize: this.pageSize,
                pageNum: pageNum,
            };
            const baseUrl = "/yangkai/personnel/getPersonnelList";
            const url = `${baseUrl}`;
            $axios({
                    url: url,
                    type: "post",
                    data: data
                })
                .then((res) => {
                    if (res.successful) {
                        this.loading = false;
                        this.totalPages = res.resultValue.total;
                        this.tableData = res.resultValue.data;
                    } else {
                        this.loading = false;
                        this.tableData = [];
                        this.$message.error(res.resultHint);
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                    this.loading = false;
                });
        },
        add() {
          this.$refs.wp.setData("新增人员",{},this.city);
        },
        edit(row) {
          row.imgPersonUrl = [{ url:this.url + row.personnelPhoto}];
          let arr = [],dateArr = [];
          for (let i = 0; i < row.personnelCertificateArrays.length; i++) {
              arr.push({ url: this.url + row.personnelCertificateArrays[i]});
          }
          row.imgUrl = arr;
          for (let i = 0; i < row.personnelCertificateExpirationArrays.length; i++) {
              dateArr.push({date:row.personnelCertificateExpirationArrays[i]});
          }
          row.expirationDate= dateArr;
          this.$refs.wp.setData("修改人员",row,this.city);
        },
        detail(row) {
          let label = Object.keys(row),
          value = Object.values(row),
          arr = [],
          imageUrl1 = [],
          imageUrl2 = [],
          dateArr = [];
          for (let key in formItems) {
            var obj = label.find(item => {
              return item === formItems[key].prop;
            });
            if (obj) {
              arr.push({
                ...formItems[key],
                value: value[label.indexOf(obj)]
              });
            }
          }
          if (row.personnelCertificateArrays) {
            for (let i = 0; i < row.personnelCertificateArrays.length; i++) {
              imageUrl2.push(this.url + row.personnelCertificateArrays[i]);
            }
          }
          if (row.personnelCertificateExpirationArrays) {
            for (let i = 0; i < row.personnelCertificateExpirationArrays.length; i++) {
              dateArr.push({date:row.personnelCertificateExpirationArrays[i]});
            }
          }
          imageUrl1.push({url:this.url+row.personnelPhoto});
          arr.push(
            {
            label: "人员照片",
            img: "img",
            value: imageUrl1,
            width:"100%"
          },
            {
            label: "资质图片",
            imgArr: imageUrl2
          },
          {
            label: "资质有效期",
            dateArr: dateArr
          });
          this.$refs.detail.setData("人员详情", { list: arr });
        },
        //分页功能
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getWPTperson(val);
        },
        //时间格式化
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (!date) {
                return "--";
            }
            return this.$moment(date)
                .utcOffset(8)
                .format("YYYY-MM-DD");
        },
    },
    mounted() {
        this.city = $store.getters.city;
        this.getWPTperson(1);
    },
};
</script>

<style scoped>
.el-header {
    text-align: right;
    line-height: 45px;
    margin-bottom: 10px;
}

.el-main {
    width: 100%;
    height: calc(100% - 45px);
}
</style>
