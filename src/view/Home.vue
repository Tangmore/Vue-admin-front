<template>
  <el-container>
    <el-main ref="mainheight" style="padding:10px;">
      <div class="home-page">
        主页 
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import store from '@/store';
  export default {
    name: 'Home',
    components: {
 
    },
    data() {
      return {
        currentColor:sessionStorage.getItem('theme'),
        // 公共dialog
        noticeDetailVisible: false,
        modalObj: {}
      }
    },
 
    methods: {
    
    },

  }
</script>
<style scoped>
  @import "../css/Home.css";
</style>
<style>
  #archive-borrow-count {
    height: 100%;
    margin-top: 20px;
  }

</style>