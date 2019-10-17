<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :modal='modalObj.modal'
        :close-on-click-modal="false" :fullscreen='dialogfullscreen' :close-on-press-escape="false">
        <article class="cmd_edit">
            <el-form :inline="true" ref="ruleForm" label-width="100px" class="demo-form-inline">
                <el-scrollbar class="page-component__scroll">
                    <div style="height: 300px;">
                        <!-- 命令参数设置-->
                        <el-form-item style="float: right;text-align: right">
                            <el-button type="primary" size='mini' @click="addCmdsRow"> +新增</el-button>
                        </el-form-item>
                        <div class="switchBtn">
                            <el-table :data="cmdsPresTableData" stripe style=" font-size: 14px;">
                                <el-table-column type="index" width="50">
                                </el-table-column>
                                <el-table-column prop="keyword" label="关键值" align='center'>
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-model="scope.row.keyword"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="value" label="值" align='center'>
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-model="scope.row.value"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="70">
                                    <template slot-scope="scope">
                                        <el-button @click="deleteCmdsRows(scope.$index)" type="text" size="small" style="color: '#0BCFE1';font-size:12px;">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-scrollbar>
                <!--弹出层按钮居中 buttonCenter-->
                <el-form-item class="buttonCenter">
                    <el-button @click="modalClose" size="small">取消</el-button>
                    <el-button type="primary" @click="submitForm" size="small">保存</el-button>
                </el-form-item>
            </el-form>
        </article>
    </el-dialog>
</template>


<script>
    import store from '@/store';
    import { mapState } from 'vuex';
    export default {
        name: 'equiType-add-layer',
        data() {
            return {
                presetsTableData: [],
                // 命令设置
                cmdsPresTableData: [],
            };
        },
        computed: {
            ...mapState(['dialogfullscreen'])
        },
        props: {
            visible: { type: Boolean, default: false },
            modalObj: { type: Object, default: false },
        },
        mounted() {
            if(this.modalObj.notice_id){
                var obj={};
                obj=JSON.parse(this.modalObj.notice_id);
                for(var item in obj){
                    this.cmdsPresTableData.push({keyword:item,value:obj[item]})
                }
                // console.log(this.cmdsPresTableData)
            }
        },
        methods: {
            //   保存命令参数设置
            submitForm() {
                let msg = this.cmdsPresTableData;
                let obj = {};
                // 格式化数据格式
                for (var i = 0; i < msg.length; i++) {
                    var dataItem = {}, name = msg[i]['keyword'];
                    dataItem[name] = msg[i]['value'];
                    obj = Object.assign(obj, dataItem)
                }
                obj=JSON.stringify(obj);
                this.$emit('handleCmdsPres', obj);
                this.modalClose();
            },
            // 添加指令设置
            addCmdsRow() {
                let data = { keyword: '', value: '' };
                this.cmdsPresTableData.push(data);
            },
            // 删除指令设置
            deleteCmdsRows(index) {
                this.cmdsPresTableData.splice(index, 1);
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
    .transf_add>>>.el-table td,
    .transf_add>>>.el-table th {
        padding: 0px;
        font-size: 14px;
    }
    .el-dialog__wrapper>>>.el-form .el-form-item__content {
        width: 200px;
    }

    .el-dialog__wrapper>>>.el-form .buttonCenter .el-form-item__content {
        width: 400px;
    }
</style>