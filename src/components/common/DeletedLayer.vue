<template>
  <el-dialog
    :title="modalObj.title" :visible.sync="visible"  center
    :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
    :fullscreen='dialogfullscreen' :close-on-press-escape="false" :modal='modalObj.modal'>
      <span style="text-align: center">{{modalObj.content}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="modalClose" size="small">取消</el-button>
          <el-button type="primary" @click="submitForm" size="small">确认</el-button>
      </span>
  </el-dialog>
</template>
<script>
  import store from '@/store';
  import {mapState} from 'vuex';
    export default {
        name: "DeletedLayer",
        data() {
            return {
              modal:this.modalObj.modal || true
              // width:'300px',
              // title:'删除'
            };
        },
      computed:{
        ...mapState([ 'dialogfullscreen' ])
      },
      props: {
        visible: {type: Boolean, default: false},
        modalObj: {type: Object, default: false},
        clickDelete:{type:Function,required:true}
      },
      methods: {
        submitForm() {
          //删除事件
          this.clickDelete(this.modalObj.notice_id);
          this.modalClose();
        },
        modalClose() {
          this.$emit('update:visible', false); // 直接修改父组件的属性
          store.dispatch('dialogfullScreen',false);
        }
      }
    };
</script>
<style scoped>
  .el-dialog__wrapper >>>.el-dialog__body{
    text-align: center;
    font-size:16px;
    color:rgba(135,135,135,1);
  }
</style>
