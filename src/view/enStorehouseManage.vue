<template>
  <el-container class="store_admin"> 
    <el-container>
      <el-aside width="230px">  
        <el-form class="quick_search" ref="form" label-width="120px">
          <el-form-item label="管理系统">
            <a href="javascript:void(0)" class="add_menu" >添加</a>
          </el-form-item>
        </el-form>
        <!-- 库房列表 -->
        <div v-for='(item,index) in storeroom_arr' :key='index' class="store_item_box" >
          <div class="store_item" :class="item.id==active_item?'bg':''"   >
            <span :class="item.id==active_item?'item_point_active':'item_point'"></span>{{item.storeName}}
          </div>
          <div class="cop_btn" :class="item.id==active_item?'item_show':'item_hide'">
            <i class="el-icon-plus"  ></i>
            <i class="el-icon-edit" ></i>
            <i class="el-icon-delete" ></i>
          </div>
        </div>
      </el-aside>
      <el-main ref="mainheight" style="padding: 0 20px;min-width: 850px;">
        <el-scrollbar class="page-component__scroll" v-if='region_arr.length!=0'>
          <div class="store_region" v-for='(itemR,index) in region_arr' :key='index'>
            <!-- 区名称-->
            <div class="bg" style="display: flex;justify-content: space-between;margin-bottom: 2px;">
              <div id="header-crumb">
                <span style="margin-right: 2px;">{{itemR.regionName}}</span>
                <span v-if='itemR.bindId!=0'>(绑定:{{itemR.bindName}})</span>
              </div>
              <div>
                <span >a</span>
                <span>b</span>
                <span v-if='itemR.bindId == 0' >c</span>
                <span v-else  >d</span>
              </div>
            </div>
            <!-- 区详情 -->
            <div style="clear: both;height:320px;margin-left:10px;margin-bottom: 10px;">
              <el-row :gutter='4'>
                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                  <div :id="'item'+'-'+itemR.id+'-'+index" style='height:290px'>

                  </div>
                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                  <div :id="'item'+'-'+index+'-'+itemR.id" style='height:290px'>

                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
    
  </el-container>
</template>
<script> 
  export default {
    name: "enStorehouseManage",
    components: {
 
   
    },
    data() {
      return {
        ruleForm: {
          fkStoreId: '',
          fkRegionId: ''
        },
        currentColor: sessionStorage.getItem('theme'),
        deleteStoreORregion: '',
        storeroom_arr: [],
        crumbs: [{ name: "管理" }],
        active_item: '',
        region_arr: [],
      }
    },
    mounted() {
      window.addEventListener("resize", () => {
        this.resize();
      });
    },
    methods: {
    
    }
  };
</script>
<style scoped>
  @import "../css/formbutton.css";
  @import "../css/enStorehouseManage.css";
</style>