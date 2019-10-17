<template>

    <el-main ref="mainheight" style="padding:30px;">
        <article class="role_add user_edit" style="width: 56%;margin: auto;">
            <div class="opt_btn">
                <!-- 按钮组 -->
                <el-button-group>
                    <el-button size="mini" :class="operateType==2?'operation-btn-color':''" @click='changeLoginPwd'>登录密码</el-button>
                    <el-button size="mini" :class="operateType==1?'operation-btn-color':''" @click='changeOperatePwd'>操作密码</el-button>
                </el-button-group>
            </div>
         
            <div v-if='operateType == 2'>
            2
            </div>
      
            <div v-if='operateType == 1'>
               1
            </div>
        </article>
    </el-main>
</template>
<script>  
    export default {
        name:'SafeCenterModule',
        data() {
            return {
                operateType: 2 
            }
        },
        mounted() {
            
        },
        methods: {
            changeLoginPwd(){
                this.operateType = 2;
              
            },
            changeOperatePwd(){
                this.operateType = 1;
             
            } 
        }
    }
</script>
<style scoped>
    
</style>