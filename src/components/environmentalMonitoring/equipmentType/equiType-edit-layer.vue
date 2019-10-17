<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
        :fullscreen='dialogfullscreen' :close-on-press-escape="false">
        <article class="equitype_edit">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <!-- <el-scrollbar class="page-component__scroll"> -->
                <div class="discrible" style="position: relative;">
                    <el-form-item label="类型编码：" prop='code'>
                        <el-input v-model="ruleForm.code" placeholder="请输入类型编码"></el-input>
                    </el-form-item>
                    <el-form-item label="类型编号：" prop='typeNum'>
                        <el-input v-model="ruleForm.typeNum" placeholder="请输入类型编码"></el-input>
                    </el-form-item>
                    <el-form-item label="类型名称：" prop="typeName">
                        <el-input v-model="ruleForm.typeName" placeholder="请输入类型名称"></el-input>
                    </el-form-item>
                    <!-- 图片上传 -->
                    <el-form-item label=" 上传图片：">
                        <el-upload :action="uploadURL"  :show-file-list='false' :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess">
                            <el-button size="mini" type="primary" @click='' icon="el-icon-upload">上传图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label=" 状态：" prop="disabled">
                        <el-radio-group v-model="ruleForm.disabled">
                            <el-radio :label="0">可用</el-radio> 
                            <el-radio :label="1">禁用</el-radio>
                        </el-radio-group>
                        <br>
                    </el-form-item>
                    <el-form-item label=" ">
                        <div style="width: 210px;height: 120px; border: 1px solid #DCDFE6;" >
                            <img v-if="imgAddress" style="width: 100%;height:100%;" :src="imgAddress" />
                            <!-- <img v-else style="width: 100%;height:100%;border-radius: 6px;" src="../../../images/upload.png" alt="" /> -->
                            <span v-else style="display: block;font-size: 80px;margin-top: 32px;" class="icon iconfont img_upload">&#xe6b5;</span>
                        </div>
                    </el-form-item>
                    <div style="position: absolute;top: 200px;">
                        <el-form-item label=" 添加：" prop="isCreate">
                            <el-radio-group v-model="ruleForm.isCreate">
                                <el-radio :label="1">允许</el-radio>
                                <el-radio :label="0">禁止</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <br>

                    <el-header>
                        <header-crumb :crumbs="crumbs1"></header-crumb>
                    </el-header>
                    <el-form-item style="float: right;text-align: right; ">
                        <el-button type="primary" size='mini' @click="addPresetsRow" icon='el-icon-plus' style="width: 90px;"> 新增</el-button>
                    </el-form-item>
                    <div style="margin-bottom: 10px" class='cmd_inp'>
                        <el-table :data="presetsTableData" stripe style="width: 96%;font-size: 14px;">
                            <el-table-column label='序号' type="index" width="70" align="center">
                            </el-table-column>
                            <el-table-column prop="parName" label="参数名字" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.parName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="parKey" label="参数关键字" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.parKey"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="defValue" label="默认值" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.defValue"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="parType" label="参数类型" align='center'>
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.parType" placeholder="请选择">
                                        <el-option label="string" value="string"></el-option>
                                        <el-option label="number" value="number"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="90" align='center'>
                                <template slot-scope="scope">
                                    <el-button @click="deletePresRow(scope.$index)" type="text" size="small" style="color: rgba(26,179,148,1);font-size:12px;">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-header>
                        <header-crumb :crumbs="crumbs2"></header-crumb>
                    </el-header>
                    <el-form-item style="float: right;text-align: right">
                        <el-button type="primary" size='mini' @click="addCmdsRow" icon='el-icon-plus' style="width: 90px;"> 新增</el-button>
                    </el-form-item>
                    <div class="switchBtn cmd_inp">
                        <el-table :data="cmdsTableData" stripe style="width: 96%;font-size: 14px;">
                            <el-table-column label='序号' type="index" width="70" align="center">
                            </el-table-column>
                            <el-table-column prop="cmdName" label="指令名字" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.cmdName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cmdMark" label="指令关键字" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.cmdMark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cmdType" label="指令类型" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.cmdType"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="指令参数" align='center'>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.cmdPar" @focus='handleCmdsPresEdit(scope.$index,scope.row)' readonly> </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="disabled" label="指令状态" align='center'>
                                <template slot-scope="scope">
                                   <el-switch 
                                     v-model="scope.row.disabled" 
                                     active-value="0"
                                     inactive-value="1" 
                                     active-text="开" 
                                     inactive-text="关">
                                    </el-switch>  
                                
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="70">
                                <template slot-scope="scope">
                                    <el-button @click="deleteCmdsRows(scope.$index)" type="text" size="small" style="color: rgba(26,179,148,1);font-size:12px;">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- </el-scrollbar> -->
                <!--弹出层按钮居中 buttonCenter-->
                <el-form-item class="buttonCenter">
                    <el-button @click="modalClose" size="small">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm',ruleForm)" size="small">保存</el-button>
                </el-form-item>
            </el-form>
        </article>
        <!-- 指令参数 -->
        <CommandPresEditModel v-if="CommandPresEditVisible" @handleCmdsPres='getCmdsPres' :visible.sync="CommandPresEditVisible"
            v-dialogDrag :modalObj='modalObj1'></CommandPresEditModel>

    </el-dialog>
</template>

<script>
    import store from '@/store';
    import { mapState } from 'vuex';
    import HeaderCrumb from "@/components/common/HeaderCrumb";
    import CommandPresEditModel from '@/components/environmentalMonitoring/equipmentType/commandPres-edit-layer.vue';
    export default {
        name: 'equiType-add-layer',
        components: {
            HeaderCrumb,
            CommandPresEditModel
        },
        data() {
            return {
                ruleForm: {
                    code: '',
                    typeNum: '',
                    typeName: '',
                    disabled: 0,
                    isCreate: 1,
                    imgAddress: ''
                },
                crumbs1: [{ name: "参数设置" }],
                crumbs2: [{ name: "命令设置" }],
                // 图片上传
                uploadURL: this.$store.state.imgurl + 'filemodule/file/uploadEquTypeImg',
                imgAddress: '',
                // 参数设置
                presetsTableData: [],
                // 命令设置
                cmdsTableData: [],
                // 当前editable row
                currentRowindex: '',
                currentRow: {},
                rules: {
                    typeName: [
                        { required: true, message: '请输入类型名称', trigger: 'blur' },
                        { min: 2, message: '类型名称长度至少2位！', trigger: 'blur' }
                    ]
                },
                // 公共dialog
                CommandPresEditVisible: false,
                modalObj1: {},
            };
        },
        computed: {
            ...mapState(['dialogfullscreen'])
        },
        props: {
            visible: { type: Boolean, default: false },
            modalObj: { type: Object, default: false },
            refresh: { type: Function, required: true }
        },
        mounted() {
            this.ruleForm = this.modalObj.notice_id;
            // 初始参数设置列表
            this.initPresetSettingsTb();
            // 初始命令设置列表
            this.initCmdSettingtsTb();
            if (this.modalObj.notice_id.imgAddress) {
                this.imgAddress = this.$store.state.imgurl + this.modalObj.notice_id.imgAddress;
            }
        },
        methods: {
            // 验证上传图片的格式
            handleBeforeUpload(file) {
                var FileExt = file.name.replace(/.+\./, "").toLowerCase();
                if (['bmp', 'gif', 'jpg', 'jpeg', 'png'].indexOf(FileExt) === -1) {
                    this.$message({ type: 'warning', message: '请上传后缀名为[bmp,gif,jpg,jpeg,png]的附件！' });
                    return false;
                }
            },

            // 上传成功
            handleUploadSuccess(res, file) {
                var _this = this;
                if (res.state) {
                    this.imgAddress = this.$store.state.imgurl + res.row;
                    this.ruleForm.imgAddress = res.row;
                }
                layer.msg(res.msg);
            },
            // 获取子传父的指令参数值
            getCmdsPres(msg) {
                this.cmdsTableData[this.currentRowindex].cmdPar = msg;
            },
            submitForm(formName) {
                var copy = JSON.parse(JSON.stringify(this.cmdsTableData));
                for (var item of copy) {
                    if (item.cmdPar) {
                        item.cmdPar = JSON.parse(item.cmdPar);
                    }
                    continue;
                }
                let tableL = {
                    cmdList: copy,
                    presetList: this.presetsTableData
                }
                let data = Object.assign(this.ruleForm, tableL);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        _this.$api.enMonitoringInterface.updateEquiType(data).then(res => {
                            if (res.state) {
                                this.refresh();
                                this.modalClose();
                            }
                            layer.msg(res.msg);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //根据id查询参数设置
            initPresetSettingsTb() {
                let typeId = this.modalObj.notice_id.id;
                // console.log({ typeId })
                this.$api.enMonitoringInterface.initPresetSettingsTb({ typeId }).then(res => {
                    if (res.state) {
                        this.presetsTableData = res.rows;
                    }
                });
            },
            //根据id查询命令设置
            initCmdSettingtsTb() {
                let typeId = this.modalObj.notice_id.id;
                this.$api.enMonitoringInterface.initCmdSettingtsTb({ typeId }).then(res => {
                    if (res.state) {
                        for (var item of res.rows) {
                            item.disabled=item.disabled+'';
                            if (item.cmdPar) {
                                item.cmdPar = JSON.stringify(item.cmdPar);
                            }
                            continue;
                        }
                        this.cmdsTableData = res.rows;
                    }
                });
            },
            // 添加参数设置
            addPresetsRow() {
                let data = { parName: '', parKey: '', defValue: '', parType: '' };
                this.presetsTableData.push(data);
            },
            // 删除参数设置
            deletePresRow(index) {
                this.presetsTableData.splice(index, 1);
            },

            // 添加指令设置
            addCmdsRow() {
                let data = { cmdName: '', cmdMark: '', cmdType: '', cmdPar: '', disabled: 0 };
                this.cmdsTableData.push(data);
            },
            // 删除指令设置
            deleteCmdsRows(index) {
                this.cmdsTableData.splice(index, 1);
            },
            // 命令参数设置dialog
            handleCmdsPresEdit(index, row) {
                this.currentRowindex = index;
                this.CommandPresEditVisible = true;
                if (row.cmdPar) {

                    this.modalObj1 = { title: '指令参数', width: '440px', modal: false, notice_id: row.cmdPar };
                    return;
                }
                this.modalObj1 = { title: '指令参数', width: '440px', modal: false, notice_id: '' };
            },
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性
                store.dispatch('dialogfullScreen', false);
            }
        }
    };
</script>

<style scoped>
    /*表格大小 */

    .equitype_edit>>>.el-table td,
    .equitype_edit>>>.el-table th {
        padding: 0px;
        font-size: 14px;
    }
    /* 修改switch开关 */

    .switchBtn>>>.el-switch__label--left {
        position: relative;
        left: 46px;
        color: #fff;
        z-index: -1111;
    }

    .switchBtn>>>.el-switch__label--right {
        position: relative;
        right: 46px;
        color: #fff;
        z-index: -1111;
    }

    .switchBtn>>>.el-switch__label.is-active {
        z-index: 1111;
        color: #fff;
    }

    .switchBtn>>>.el-switch__label--left {
        position: relative;
        left: 46px;
        color: #fff;
        z-index: -1111;
    }

    .switchBtn>>>.el-switch__label--right {
        position: relative;
        right: 46px;
        color: #fff;
        z-index: -1111;
    }

    .switchBtn>>>.el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }

    .switchBtn>>>.el-switch__label--left.is-active {
        z-index: 1111;
        color: #9c9c9c !important;
    }

    .el-dialog__wrapper>>>.el-form .el-form-item__content {
        width: 200px;
    }

    .el-dialog__wrapper>>>.el-form .buttonCenter .el-form-item__content {
        width: 630px;
    }

    /* 滚动条 */

    .discrible {
        height: 440px;
        overflow: scroll;
        overflow-wrap: break-word;
    }

    .discrible::-webkit-scrollbar {
        width: 6px;
        height: 0px;
    }

    .discrible:hover::-webkit-scrollbar {
        width: 6px;
        height: 0px;
        background: var(--activecolor);
        border-radius: 6px;
    }

    /* 表格表单样式 */
    .equitype_edit .cmd_inp>>>.el-input__inner{
        border: none;
    }
</style>