<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
        :fullscreen='dialogfullscreen' :close-on-press-escape="false">
        <article class="role_add">
            sss
        </article>
    </el-dialog>
</template>

<script>
    import store from '@/store';
    import { mapState } from 'vuex';
    export default {
        name: 'equipment-edit-layer',
        data() {
            return {
             
            };
        },
        computed: {
            ...mapState(['dialogfullscreen'])
        },
        props: {
            visible: { type: Boolean, default: false },
            modalObj: { type: Object, default: false } 
        },
        mounted() {
            if (this.modalObj.notice_id) {
                this.ruleForm = this.modalObj.notice_id;
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // let _this = this;
                        // if (this.modalObj.notice_id) {
             
                        // } else {
                   
                        // }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性
                store.dispatch('dialogfullScreen', false);
            }
        }
    };
</script>