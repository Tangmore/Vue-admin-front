<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
        :fullscreen='dialogfullscreen' :close-on-press-escape="false">
        <article class="qrcode_down">
            <el-form ref="ruleForm">
                <el-scrollbar class="page-component__scroll">
                    <div style="height: 540px;">
                        <div class="code_item" style="text-align: center;">
                            yyy
                        </div>
                    </div>
                </el-scrollbar>
                <!--弹出层按钮居中 buttonCenter-->
                <el-form-item class="buttonCenter">
                    <el-button @click="modalClose" size="small">关闭</el-button>
                </el-form-item>
            </el-form>
        </article>
    </el-dialog>
</template>

<script>
    import store from '@/store';
    import { mapState } from 'vuex';
    import '../../../../js/common/jquery.jqprint-0.3.js';
    import '../../../../js/common/jquery-migrate-1.2.1.js';
    export default {
        name: 'qrcode-download-layer',
        data() {

            return {
                ruleForm: {},
           
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
        
        },
        methods: {
            
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性
                store.dispatch('dialogfullScreen', false);
            }
        }
    };
</script>
<style scoped>
  
</style>