<!-- 调用组件 isAll：false不存在全部，true存在全部选项
             handleNodeClick：点击事件
<archive-model :isAll="false" :handleNodeClick="selectArchive"></archive-model>-->
<template>
  <div class="myTree">
    <el-scrollbar class="page-component__scroll">
      <el-tree v-if="treeData.length>0" :data="treeData" :props="defaultProps" node-key="key" ref="tree" :filter-node-method="filterNode"
        :current-node-key="isSelect?treeData[0].key:''" accordion @node-click="handleNodeClick"
               :render-content="isEdit?renderContent:null">
      </el-tree>
    </el-scrollbar>
    <!--删除-->
    <DeletedLayer v-if="deletedVisible" :visible.sync="deletedVisible"
                  v-dialogDrag :modalObj='modalObj' :clickDelete="nodeDelClick"></DeletedLayer>
    <!--新增修改-->
    <!-- <archives-model-edit-layer v-if="archivesModelEditVisible" :visible.sync="archivesModelEditVisible"
                  v-dialogDrag :modalObj='modalObj' :refresh="init"></archives-model-edit-layer> -->
  </div>

</template>
<script>
  import DeletedLayer from '@/components/common/DeletedLayer.vue';
  // import ArchivesModelEditLayer from '@/components/archive/archivesModel-edit-layer.vue';
  export default {
    name: "ArchiveModel",
    components: {
      DeletedLayer,
      // ArchivesModelEditLayer
    },
    props: {
      handleNodeClick: { type: Function, required: true },//下拉框的点击事件
      isAll: { type: Boolean, required: true }, //是否存在全部选项
      isSelect: { type: Boolean, required: true }, //是否默认选中第一项
      isEdit:{type: Boolean, required: true }//编辑工具是否显示
    },
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // 公共dialog
        deletedVisible: false,
        archivesModelEditVisible:false,
        modalObj: {}
      };
    },
    mounted() {
      // 如果无后台数据，将此处屏蔽
      this.init();
    },
    methods: {
      init() {
        this.$api.archiveInterface.selectArchiveModel().then(res => {
          if (res.state) {
            if (res.rows.length > 0) {
              let dicts = res.rows;
              let menus = [];
              let result = dicts.reduce(function (prev, item) {
                let ss = {
                  label: item.typeName,
                  key: item.id,
                };
                prev[item.fkParentId] ? prev[item.fkParentId].push(ss) : (prev[item.fkParentId] = [ss]);
                return prev;
              }, {});
              for (let prop in result) {
                result[prop].forEach(function (item, i) {
                  result[item.key] ? (item.children = result[item.key]) : "";
                });
              }
              if (this.isAll) {
                result[0].unshift({ label: "全部", key: "", })
              }
              this.treeData = result[0];
//              console.log(result[0])
              if(this.isSelect){
                this.handleNodeClick(result[0][0]);
              }

            }
          } else {
            layer.msg(res.msg);
          }
        });
      },
      //节点过滤
      searchModel(val) {
        // console.log(val);
        this.$refs.tree.filter(val);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //加载节点
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label}</span>
        <span class="tree-btn" style='position: absolute;top: 0;'>
          <i class="el-icon-plus" on-click={ () => this.nodeAdd(data) }></i>
          <i class="el-icon-edit" on-click={ () => this.nodeEdit(node, data) }></i>
          <i class="el-icon-delete" on-click={ () => this.nodeDel(node, data) }></i>
          </span>
        </span>);
      },
      nodeAdd(data){
        this.archivesModelEditVisible = true;
        this.modalObj = {title:'新增节点', width:'600px', notice_id:data};
      },
      nodeEdit(node, data){
        this.archivesModelEditVisible = true;
        this.modalObj = {title:'编辑节点', width:'600px', notice_id:{modify:true,data:data}};
      },
      nodeDel(node, data){
        this.deletedVisible = true;
        this.modalObj = {title:'删除', width:'300px',modal: false, notice_id: {node:node,data:data},content:'是否确定删除？'};
      },
      nodeDelClick(val){
        this.$api.archiveInterface.deleteArchivesModel({
          id:val.data.key
        }).then(res => {
          console.log(res);
          if (res.state) {
            const parent = val.node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === val.data.key);
            children.splice(index, 1);
          }
          layer.msg(res.msg);
        });
      }
      //          handleNodeClick(data) {
      //            // console.log(data);
      //            this.bus.$emit("getArchiveModeldetail",data);
      //          }
    }
  };
</script>
<style scoped>
  @import "../../css/formbutton.css";
  .el-scrollbar>>>.el-scrollbar__view,
  .el-tree {
    height: 100%;
  }

  .el-scrollbar>>>.el-tree .el-tree-node .el-tree-node__content:hover,
  .el-scrollbar>>>.el-tree .el-tree-node.is-current>.el-tree-node__content {
    color: var(--activecolor);
  }

  .el-scrollbar>>>.el-tree .el-tree-node>.el-tree-node__content {
    background: #fff;
  }

  /*!*tree滚动条*!*/

  div.myTree {
    height: calc(100% - 62px);
    font-size:0.9em;
  }

  .page-component__scroll {
    height: 100%;
    /*width: 80%;*/
  }

  .page-component__scroll>>>.el-scrollbar__wrap {
    overflow-x: auto;
    margin-bottom: 0 !important;
  }

  .el-scrollbar>>>.el-scrollbar__thumb {
    background-color: var(--activecolor);
  }
  .el-scrollbar >>>.custom-tree-node{
    position: relative;
  }
  .el-scrollbar >>>.tree-btn{
    margin-left: 5px;
    display: none;
  }
  .el-scrollbar >>>.tree-btn i{
    margin-left: 5px;
    color: #606266;
    font-size:0.9em;
  }
  .el-scrollbar >>>.tree-btn i:hover{
   color: var(--activecolor);
  }
  .el-scrollbar>>>.el-tree .el-tree-node .el-tree-node__content:hover .tree-btn{
    display: inline-block;
    overflow: auto
  }
</style>
