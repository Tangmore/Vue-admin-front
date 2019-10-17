<template>
  <el-container> 
    <el-container>
      <el-aside width="220px">
        <el-form class="quick_search" ref="form"  label-width="80px">
          <el-form-item label="快速搜索:">
            <el-input v-model="filterText" placeholder="请输入关键字"></el-input>
          </el-form-item>
        </el-form>
        <archive-model :isAll="false" :isSelect="false" :isEdit="true" ref="myTree" :handleNodeClick="selectModel"></archive-model>
      </el-aside>
      <el-main ref="mainheight" style="padding: 0 20px;">
        <iframe src="../../../static/CustomLayoutEditor/index.html" id="myIframe" :colorVal="colorVal" class="iframe" style="height:calc(100% - 15px);
    width: 100%;"></iframe>
      </el-main>
    </el-container>

  </el-container>
</template>
<script>
  import ArchiveModel from "@/components/common/ArchiveModel"; 
  export default {
    name: "ArchivesModel",
    components: {
      ArchiveModel 
    },
    data() {
      return {
        filterText: '',//节点过滤值
        crumbs:[{name:"档案模型"}],
        colorVal:window.themeColor,
      };
    },
    watch: {
      //节点过滤
      filterText(val) {
        this.$refs.myTree.searchModel(val);
      }
    },
    methods: {
      selectModel: function(treedate,iframe){
        window.uploadId = treedate.key;
        window.page = "archiveModel";
        window.$api=this.$api;
        this.$api.archiveInterface.initArchivesModel({
          id:treedate.key,
        }).then(res => {
          let iframe = this.getIframe('myIframe').getElementsByClassName('demo'); // 父页面获取iframe里面的dom元素
          if(iframe) iframe[0].innerHTML ="";
          if (res.state && iframe &&  res.row !== null) {
            iframe[0].innerHTML = res.row.htmlTpl;
//            document.getElementById('myIframe').contentWindow.layui.form.render();
            document.getElementById('myIframe').contentWindow.initDrag();
          }
        });
      },
      getIframe(id) {
        return document.getElementById(id).contentWindow.document;
      }
    },
  };
</script>
<style scoped>
  @import "../css/formbutton.css";
  .el-container >>> .el-aside{
    border: 1px solid #DFDFDF;
    border-radius:6px 6px 6px 6px;
    height: calc(100% - 10px);
    margin-left: 20px;
  }
  .el-container >>> .el-form.quick_search{
    background-color: var(--activecolor);
  }
  .el-container >>> .el-form.quick_search label{
    color: #fff;
  }
  .el-container >>> .el-form.quick_search .el-input {
    right: 6px;
  }
  .el-container >>> .el-form.quick_search input{
    height: 24px;
    line-height: 24px;
    width: 130px;
  }

</style>

