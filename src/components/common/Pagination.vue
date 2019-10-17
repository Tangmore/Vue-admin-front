<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="page.currentPage"
    :page-sizes="[10, 20, 30, 50,100]"
    :page-size="page.pageSize"
    background :small="small"
    layout=" prev, pager, next,total,jumper,sizes"
    :total="page.total">
  </el-pagination>
</template>
<script>
    export default {
        name: "Pagination",
        props:{
          page:{type:Object,required:true},
          queryOperate:{type:Function,required:true},
          isSmall:{type:Boolean }
        },
        data() {
            return {
              // 采用小型分页
              small:this.isSmall?this.isSmall:false
            };
        },
        methods: {
          handleSizeChange: function(val) { // 每页条数切换
            this.page.currentPage = 1;
            this.page.pageSize = val;
            this.queryOperate();
          },
          handleCurrentChange: function(val) {//页码切换
            this.page.currentPage = val;
            this.queryOperate();
          },
        }
    };
</script>
<style scoped>
  @import "../../css/pagination.css";
</style>
