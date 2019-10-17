<template>
    <el-container class="menu_admin"> 
        <el-container>
            <el-aside width="180px">
                <ul>
                    <li v-for='(item,index) in tab_arr' class="tab-default" @click="$router.push('/PersonalCenter?ind='+index);tabIndex=index;"
                        :class="tabIndex==index?'tab-active':''">
                        {{item.title}}
                    </li>
                </ul>
            </el-aside>
            <PersonalCenterModule v-if='tabIndex==0' />
            <SafeCenterModule v-if='tabIndex==1' />
            <LoginRecodeModule v-if='tabIndex==2' />
            <ThemeSettingsModule v-if='tabIndex==3' />
            <SystemSettingsModule v-if='tabIndex==4' />
        </el-container>
    </el-container>
</template>
<script> 
    import PersonalCenterModule from '@/components/PersonalCenter/PersonalCenterModule.vue';
    import SafeCenterModule from '@/components/PersonalCenter/SafeCenterModule.vue';
    import LoginRecodeModule from '@/components/PersonalCenter/LoginRecodeModule.vue';
    import SystemSettingsModule from '@/components/PersonalCenter/SystemSettingsModule.vue';
    import ThemeSettingsModule from '@/components/PersonalCenter/ThemeSettingsModule.vue';

    export default {
        name: "PersonalCenter",
        components: { 
            PersonalCenterModule,
            SafeCenterModule,
            LoginRecodeModule,
            SystemSettingsModule,
          ThemeSettingsModule
        },
        data() {
            return {
                crumbs: [{ name: "个人中心" }],
                tab_arr: [
                { title: '个人资料' },
                { title: '安全中心' },
                { title: '登录记录' },
                { title: '主题设置' },
                { title: '系统设置' },
                ],
                tabIndex: 0
            }
        },
        // 监听路由 tab切换样式
        watch: {
            $route() {
                this.tabIndex = this.$route.query.ind;
            }
        },
        methods: {
        },
        mounted() {
            this.tabIndex = this.$route.query.ind;
        }
    };
</script>
<style scoped>
    /* 菜单列表 */
    .tab-default {
        font-size: 14px;
        text-align: left;
        padding: 8px;
        color: rgba(135, 135, 135, 1);
    }

    .tab-active {
        color: var(--activecolor);
    }
</style>
