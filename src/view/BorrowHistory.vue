<template>
  <el-container> 
    <el-container>
      <el-main ref="mainheight" style="padding: 0 20px;">
        历史
        <table-thead :tables="tables" :showRadioRow="showRadioRow" :handleSelectionChange='handleSelectionChange'></table-thead>
        <pagination :page="page" :queryOperate="tableQuery"></pagination>
      </el-main>
    </el-container> 
  </el-container>
</template>
<script>
  import ArchiveModel from "@/components/common/ArchiveModel";
  import TableThead from "@/components/common/TableThead";
  import Pagination from "@/components/common/Pagination"; 
  import DateRange from "@/components/common/DateRange";
  import store from '@/store';
  export default {
    name: "BorrowHistory",
    components: {
      ArchiveModel,
      TableThead,
      Pagination ,
      DateRange  
    },
    data() {
      return {
        ruleForm: {
          fkTypeName:'',
          fkTypeId:'',
          search: '',
          state:''
        },
        isadvanced: false,
        dateRange:{
          startDate:'',
          endDate:''
        },
        nowstates:[{value: '', label: '全部'}, {value: 'cance', label: '已取消'}
          , {value: 'back', label: '已归还'}, {value: 'refuse', label: '驳回'}],
        tables:{
          tableData: [],
          pageCode:"borrow-run",
          height: "",
          templet:function (val,msg) {
            let _this = this;
            if (val === "fkFileName"){
              return [{name:msg.fkFileName,tableType:"1",tableClick:function (res) {
                _this.$router.push({name: 'ArchiveDetailsLayer',
                  params: {id: msg.id,tableName:msg.fkTypeId,crumbs:[{name:"借阅历史",path:"/index/BorrowHistory"},{name:"档案详情"}]}},);
              }}]
            }
            if (val === "state"){
              return mystate(msg);
            }
            if (val === "isBox"){
              if (msg.isBox === 0) {
                return [{name:"否",tableType:"1",class:"gray"}];
              } else {
                return [{name:"是",tableType:"1",class:"gray"}];
              }
            }
          }.bind(this),
          toolbar: {
            judge:function (msg) {
              let _this=this;
              return [{name: "详情",tableClick:function (res) {
                // _this.desDetailVisible = true;
                _this.modalObj = { title: '审核详情', compname:'BorrowHistory', width: '700px', notice_id: res,Borrows:true};
              }}];
            }.bind(this)
          }
        },
        //分页
        page:{
          total:0,
          currentPage:1,
          pageSize:10
        },
        crumbs:[{name:"借阅历史"}],
        // 公共dialog
        // desDetailVisible: false,
        modalObj: {},
      };
    },
    mounted() {
      this.common.adaptiveHeight(this);
      this.tableQuery();
    },
    methods: {
     
      // 导出
      fileExport(command) {
        // let _this = this;
        // let _href = window.location.href;
        // window.location.href = _this.$store.state.baseurl + 'archivesmodule/arcTbBorrowHistory/export?map[startTime]=' + this.dateRange.startDate + '&map[endTime]=' +
        //   this.dateRange.endDate + '&map[state]'+this.ruleForm.state+'&map[fkTypeId]=' + this.ruleForm.fkTypeId + '&map[parameter-like]=' +
        //   this.ruleForm.search + '&currentPage=' + this.page.currentPage +'&pageSize=' + this.page.pageSize +'&map[flag]=' + command;
        // setTimeout(function () {
        //   window.location.href = _href;
        // }, 200)
      },
      handleSelectionChange(){},
      showRadioRow(){}
    }
  };
</script>
<style scoped>
  @import "../css/formbutton.css";
  @import "../css/archiveModel.css";
</style>
