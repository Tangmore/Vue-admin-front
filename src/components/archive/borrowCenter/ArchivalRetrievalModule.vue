<template>
    <!-- 检索 -->
    <el-container>
        <el-main ref="mainheight" style="padding: 0 20px;">
            <el-form ref="formheight" :inline="true" :model="formInline" class="demo-form-inline">
               A
            </el-form>
            <pagination :page="page" :queryOperate="tableQuery"></pagination>
        </el-main>
       
    </el-container>
</template>
<script>
    import Pagination from "@/components/common/Pagination";
    import { mystate } from '../../../js/common/state.js';
    export default {
        name: "ArchivalRetrievalModule",
        components: {
            Pagination,
        },
        data() {
            return {
                formInline: {
                    keyword: ''

                },
            }
        },
        mounted() {
         
        },
        methods: {
            // 添加到待借阅操作Websql
            // insertWebsql(data) {
            //     //连接websql数据库
            //     // console.log(data)
            //     for (let i = 0; i < data.length; i++) {
            //         this.$db("borrow", 'INSERT INTO borrow (id,fileNum,fileName,fondsId,fkSecretName,fkTypeId,fkTypeName,boxName,locationName,integrity,state,allowBorrow) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            //          [data[i].id, data[i].fileNum, data[i].fileName, data[i].fondsId, data[i].fkSecretName,data[i].fkTypeId, data[i].fkTypeName, data[i].boxName, data[i].locationName, data[i].integrity, data[i].state, data[i].allowBorrow], function (tx, re) {
            //             if (tx) {
            //                 layer.msg('添加数据成功！');
            //             } else {
            //                 layer.msg('添加数据失败: ' + "不能重复添加！");
            //             }
            //         });
            //     }
            // },

               // 移除待借阅Websql
            // deleteWebsql(value) {
            //     let _this = this;
            //     for (var i = 0; i < value.length; i++) {
            //         _this.$db("borrow", "delete from borrow where id= ?", [value[i].id], function (tx, re) {
            //             if (tx) {
            //                 _this.tableQuery();
            //                 layer.msg('移除成功！');
            //             } else {
            //                 layer.msg('移除失败！');
            //             }
            //         });
            //     }
            // },
 
            // // 表格多选
            // handleSelectionChange(val) {
            //     this.table_arr = val;
            // },
            // // 表格单选
            // showRadioRow() { },

        }
    }
</script>
<style scoped>
    @import "../../../css/formbutton.css";
</style>
