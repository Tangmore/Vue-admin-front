<template>
  <div id="app-menu">
      <!-- <div v-for="(item,index) in leftMenu"> -->
          <!-- <el-submenu :key="item.menuName" :index="item.menuName"  v-if="item.fkParentId==parent.value&&item.routerName==null">
            <template slot="title">
              <div class="icon-line"></div>
              <i class="el-icon-location"></i>
              <span slot="title">{{item.menuName}}</span>
            </template>
            <el-menu-item v-for="(menu,index) in leftMenu" :index="menu.menuName" :key="menu.menuName" v-if="item.id==menu.fkParentId" @click="jump(menu)">
               <div class="icon-line"></div>
              <span class="innermenu">{{menu.menuName}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else-if="item.fkParentId==parent.value&&item.routerName!=null" :index="item.menuName" :key="item.menuName" @click="jump(item)">
             <div class="icon-line"></div>
             <i class="el-icon-location"></i>
             <span slot="title">{{item.menuName}}</span>
          </el-menu-item> -->
          <el-submenu index="1" >
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item index="2"  >
                <div class="icon-line"></div>
                <span class="innermenu">导航一二</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" >
              <div class="icon-line"></div>
            <i class="el-icon-location"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'app-menu',
  props:{
      leftMenu:{type:Array,required:true},
      parent:{type:Object,required:true},
      // jump:{type:Function,required:true}
    },
  data() {
    return {

    }
  }
 }
</script>

<style>
 .el-menu-vertical:not(.el-menu--collapse) li {
  text-align: left;
}
</style>
