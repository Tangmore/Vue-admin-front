<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-box">
        <div class="login-title">请登录~</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号/身份证号码/工号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item v-if='is_identify' style="margin-left: 0;">
            <el-input type="identifyingCode" v-model="ruleForm.identifyingCode" auto-complete="off" placeholder="验证码" style="width: 38%;position: absolute;left: 0;"></el-input>
            <img :src="identifyingCode_img" alt="" class="identifyingCode_img">
            <span class="identifyingCode_text" @click='changeCodeImg'>看不清，换一张？</span>
          </el-form-item>

          <span class="forget_password" @click='deletedVisible=true;is_identify=false;'>忘记密码？</span>
          <el-form-item style="width:100%;">
            <span class="sub_btn" @click="submitForm('ruleForm')">登&nbsp;&nbsp;&nbsp;录</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 联系管理员 -->
    <el-dialog title="提示" :visible.sync="deletedVisible" width="260px" v-dialogDrag center>
      <span>请联系管理员！</span>
      <span slot="footer" class="dialog-footer">
        <el-button style="background: #1AB394;color: #fff;" @click="deletedVisible = false" size='medium'>确&nbsp;定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "Login",
    data() {
      return {
        ruleForm: {
          account: 'admin',
          password: 'cc123456',
          identifyingCode: ''
        },
        is_identify: false,
        identifyingCode_img: '../images/login/bbb.png',
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        deletedVisible: false,
      };
    },
    mounted() {
      // 回车键操作登录
      let _this = this;
      $("body").keydown((event) => {
        if (event.keyCode == "13") {
          _this.submitForm('ruleForm');
        }
      });
    },
    methods: {
 
      // 登录
      submitForm(formName) {
        let _this = this;
        // _this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     _this.$api.loginInterface.login(this.ruleForm).then(res => {
        //       if (res.state) {
        //         _this.$store.commit('setToken', res.row);
        //         //加载路由
        //         _this.initRouter(_this.$router, _this.$store);
        //         //跳转到首页
        //         _this.$router.push('/index');
        //       } else {
        //         layer.msg(res.msg);
        //       }
        //     });
        //   }
        // })
        _this.$router.push('/index');
      },
 
    }
  };
</script>
<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-container .login-content {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: relative;
  }

  .login-container .login-box {  
    width: 420px;
    height: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(255, 255, 255, 0.75);
  }

  .login-container .login-title {
    font-size: 24px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgb(208, 231, 169);
    margin-bottom: 24px;
  }

  .login-container>>>.el-input__inner {
    outline: none !important;
    border: none !important;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #d3d3d3 !important;
  }
 
  .login-container .forget_password {
    margin: 0px 0px 15px;
    display: block;
    position: absolute;
    right: 18px;
    top: 250px;
    margin-right: 0;
    font-size: 12px;
    color: rgb(208, 231, 169);
  }

  .login-container .identifyingCode_img {
    width: 100px;
    height: 30px;
    position: absolute;
    right: 100px;
    top: 0;
  }

  .login-container .identifyingCode_text {
    position: absolute;
    top: 4px;
    right: 0;
    font-size: 12px;
    color: rgb(208, 231, 169);
  }

  .login-container .sub_btn {
    display: block;
    position: absolute;
    top: 80px;
    width: 100%;
    background: rgb(208, 231, 169);
    border-radius: 27px;
    color: #fff;
    font-size: 14px;
  }

  /* 弹出框样式 */
  .login-container>>>div.el-dialog {
    border-radius: 10px;
  }

  .login-container>>>div.el-dialog__header {
    border-radius: 10px 10px 0 0;
    padding-top: 6px;
    background: #1AB394;
    color: #fff;
  }

  .login-container>>>.el-dialog .el-dialog__title {
    color: #fff;
    font-size: 16px;
  }

  .login-container>>>.el-dialog .el-dialog__headerbtn {
    top: 13px;
  }

  .login-container>>>.el-dialog .el-icon-close:before {
    color: #fff;
  }
</style>