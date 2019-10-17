<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
        :fullscreen='dialogfullscreen' :close-on-press-escape="false">

        <article class="role_add user_edit">
            <!-- 头像上传 -->
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-scrollbar class="page-component__scroll">
                    <div style="height: 420px;">
                      
                        <el-form-item label="性别：" prop="sex">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                       
                        <el-form-item label="部门：" prop="fkDepartmentName">
                            <el-select v-model="ruleForm.fkDepartmentName" style="width: 200px;" @click.native="addMarker">
                            </el-select>
                            <div class="isdisabled">
                                <DepartmentModel :isAll="false" @nodeClick='selectMarker'></DepartmentModel>
                            </div>
                        </el-form-item>
                        <el-form-item label="岗位：" prop="fkPostName">
                            <el-select v-model="ruleForm.fkPostId">
                                <el-option v-for='(item,index) in post_arr' :key='index' :label="item.sname" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="角色：">
                            <div style="width: 550px !important">
                                <el-checkbox v-for='(item,index) in  userroles_arr' v-model='item.selectFlag' :key='index' :label="item.roleName" @change='handleRoleChange(item.id)'></el-checkbox>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item label="账号状态：" prop="isLock">
                            <el-radio-group v-model="ruleForm.isLock">
                                <el-radio :label="0">可用</el-radio>
                                <el-radio :label="1">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-scrollbar>
                <!--弹出层按钮居中 buttonCenter-->
                <el-form-item class="buttonCenter">
                    <el-button @click="modalClose" size="small">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm',ruleForm)" size="small">保存</el-button>
                </el-form-item>
            </el-form>
        </article>
    </el-dialog>
</template>

<script>
    import store from '@/store';
    import { mapState } from 'vuex'; 
    import DepartmentModel from "@/components/common/DepartmentModel";
    export default {
        name: 'userinfo-edit-layer',
        components: {
            DepartmentModel
        },
        data() {  
            return { 
                ruleForm: {},
                post_arr: [],
                userroles_arr: [],
                roleN: [],
                roleList: '',
                // 头像上传
                filetype: 'image',
                file_action: this.$store.state.imgurl + 'filemodule/file/uploadHeadImg',
                headImgAddress: '',
                rules: {
                   
                },
            };
        },
        computed: {
            ...mapState(['dialogfullscreen'])
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            modalObj: {
                type: Object,
                default: false
            },
            partment_arr: { type: Array, required: true },
            refresh: { type: Function, required: true }
        },
        mounted() {
            // 用户id
            if (this.modalObj.notice_id) {
                this.initUserInfo(this.modalObj.notice_id);
                this.initRolebyId(this.modalObj.notice_id);
            }
        },
     
        methods: {
            // 角色选择
            handleRoleChange(id) {
                let index = this.roleN.indexOf(id);
                let rid = id + '';
                if (index == -1) {
                    this.roleN.push(rid);
                } else {
                    this.roleN.splice(index, 1);
                }
                this.roleList = this.roleN.toString();
            },
            // 文件上传获取目标地址
            getdestImg(data) {
                // console.log(data);
                this.headImgAddress = data[1];
            },
            // 编辑提交
            submitForm(formName, formData) {
            
            },
            // 部门
            addMarker() {
                $(".el-select-dropdown").css("display", "none");
                $(".isdisabled").toggleClass("istrue")
            },
            selectMarker: function (data) {
                    $(".isdisabled").removeClass("istrue");  
                    this.ruleForm.fkPostId = ''; 
                    if(data){ 
                        this.ruleForm.fkDepartmentName = data.label; 
                        this.ruleForm.fkDepartmentId = data.id;
                        this.departmentChange(data.id);
                    }
            },
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性
                store.dispatch('dialogfullScreen', false);
            }
        }
    };
</script>
 