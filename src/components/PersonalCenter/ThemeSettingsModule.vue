<template>

  <el-main ref="mainheight" style="padding:60px;">
    <article class="role_add user_edit" style="width: 56%;margin: auto;">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-form-item label="主题色：" style="text-align: center">
          <el-radio-group v-model="ruleForm.theme">
            <el-radio v-for="(theme,index) in themes" :key='index' :class="theme.themeName" :label="theme"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!--弹出层按钮居中 buttonCenter-->
        <el-form-item style="text-align: center;margin-top: 25px">
          <el-button size='small' style="width:80px;" >取消</el-button>
          <el-button type="primary" size='small' style="width:80px;" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </article>
    <!-- 更改主题 -->
    <DeletedLayer v-if="deletedVisible" :visible.sync="deletedVisible" v-dialogDrag :modalObj='modalObj' :clickDelete="changeTheme"></DeletedLayer>
  </el-main>
</template>
<script>
  import DeletedLayer from '@/components/common/DeletedLayer.vue';
  export default {
    name: 'ThemeSettingsModule',
    components: {
      DeletedLayer
    },
    data() {
      return {
        ruleForm: {
          theme: '',
        },
        themes: [],
        // 公共dialog
        deletedVisible: false,
        modalObj: {},
      }
    },
    mounted() {
     
    },
    methods: {
      // 取消
      resetForm() {
        this.initCurrentInfo();
      },
      // 主题更换
      changeTheme() {
        // var _this = this;
        // _this.$api.authInterface.editUserTheme({ fkThemeId: _this.ruleForm.theme.id }).then(res => {
        //   console.log(res);
        //   if (res.state) {
        //     document.getElementsByTagName('body')[0].className = _this.ruleForm.theme.themeName; //设置为新的
        //     window.themeColor = _this.ruleForm.theme.themeColor;
        //     sessionStorage.setItem('theme', _this.ruleForm.theme.themeColor);
        //     location.reload();
        //   }
        // })
      },
      submitForm() {
        this.deletedVisible = true;
        this.modalObj = { title: '提示', width: '300px', notice_id: this.selected_list, content: '更换主题需进行页面刷新，是否确定更改？' };
      }
    }
  }
</script>
<style scoped>
  @import "../../css/formbutton.css";
  .menu_admin .menu_icon span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(135, 135, 135, 1);
  }

  .el-radio>>>.el-radio__label {
    display: none;
  }

  .el-radio>>>.el-radio__inner {
    width: 30px;
    height: 30px;
    border-radius: 6px;
  }

  .el-radio.theme1>>>.el-radio__inner,
  .el-form>>>.theme1 .el-radio__input.is-checked .el-radio__inner {
    background-color: #1AB394;
    border-color: #1AB394;
  }

  .el-radio.theme2>>>.el-radio__inner,
  .el-form>>>.theme2 .el-radio__input.is-checked .el-radio__inner {
    background-color: #0BCFE1;
    border-color: #0BCFE1;
  }

  .el-radio.theme3>>>.el-radio__inner,
  .el-form>>>.theme3 .el-radio__input.is-checked .el-radio__inner {
    background-color: #5293FF;
    border-color: #5293FF;
  }

  .el-radio.theme4>>>.el-radio__inner,
  .el-form>>>.theme4 .el-radio__input.is-checked .el-radio__inner {
    background-color: #8762FF;
    border-color: #8762FF;
  }

  .el-radio.is-checked>>>.el-radio__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    z-index: 1;
  }

  .el-radio.is-checked>>>.el-radio__inner:after {
    transform: rotate(45deg) scaleY(1);
  }

  .el-radio>>>.el-radio__inner::after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 15px;
    left: 10px;
    position: absolute;
    top: 2px;
    transform: rotate(45deg) scaleY(0);
    width: 8px;
    transition: transform .15s ease-in .05s;
    transform-origin: center;

    border-radius: 0;
    background-color: transparent;
  }

  .el-form>>>.el-form-item__label {
    float: none;
    margin-left: -200px;
  }

  .el-form>>>.el-form-item__content {
    margin-left: 0 !important;
    margin-top: 25px;
  }
</style>