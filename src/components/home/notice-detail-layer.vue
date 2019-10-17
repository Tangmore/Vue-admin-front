<template>
    <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
        :fullscreen='dialogfullscreen' :close-on-press-escape="false">
        <el-form label-width="90px" class="notice_detail_layer">
         GGG
        </el-form>
    </el-dialog>
</template>

<script>
 
    import store from '@/store' 
    import { mapState } from 'vuex';
    export default {
        name: 'notice-detail-layer',
 
        data() {
            return {
                notice_content: {},
                options: {
                    // 隐藏富文本工具栏
                    toolbarHidden: true
                }
            };
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            modalObj: {
                type: Object,
                default: false
            }
        },
        mounted() {
            if (this.modalObj.notice_id) {
                this.notice_content = this.modalObj.notice_id;
            }
        },
        computed: {
            ...mapState(['dialogfullscreen'])
        },
        methods: {
            changeContent(val) { },
            modalClose() {
                this.$emit('update:visible', false); // 直接修改父组件的属性
                store.dispatch('dialogfullScreen');
            }

        }

    };
</script>

<style scoped>
    @import "../../css/formbutton.css";
    @import "../../css/table.css";

    .notice_detail_layer>>>.simditor .simditor-body {
        /*开启滚动条*/
        overflow-y: scroll !important;
        /*设置高度*/
        min-height: 130px !important;
        max-height: 130px !important;
        padding: 0 !important;
    }

    .notice_detail_layer>>>.simditor {
        border: none !important;
    }

    /*表格滚动条*/

    .notice_detail_layer>>>.simditor-body::-webkit-scrollbar {
        width: 4px;
        height: 10px;
    }

    .notice_detail_layer>>>.simditor-body::-webkit-scrollbar-thumb {
        background-color: var(--activecolor);
        border-radius: 6px;
    }
</style>