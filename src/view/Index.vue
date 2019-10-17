<template>
    <div id="index">
        <el-container>
            <el-aside width="">
                <el-menu :default-active="isId" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-row class='logo'>
                        <!-- <img  src=" @/images/logo.png"
                            style="vertical-align:middle" /> -->
                        <span style="vertical-align:middle"> 管理系统 </span>
                    </el-row>
                    <el-row>
                        <index-menu :left-menu="leftMenu" :parent="active" ></index-menu>
                    </el-row>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="65px" style="position: relative;">
                    <div style="float:left">
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;position: absolute;display:block">
                            <div :class="isActive?'hide':'show'" class="icon iconfont menu-expand" @click="siderCollapsed()">&#xe62c;</div>
                            <div :class="isActive?'show':'hide'" class="icon iconfont menu-expand" @click="siderCollapsed()">&#xe712;</div>
                            <el-radio-button id="open" :label="false" style="display:none"></el-radio-button>
                            <el-radio-button id="close" :label="true" style="display:none"></el-radio-button>
                        </el-radio-group>
                        <index-header :topMenu="topMenu" :active="active"  style="margin-left: 105px;"></index-header>
                    </div>
                    <div style="line-height: 65px;position: absolute;right: 0;background-color: #fff">
                        <el-dropdown @command='menuChange'>
                            <span class="el-dropdown-link">
                                <span @mouseover='isadvanced=true' @mouseleave='isadvanced=false'>管理员小爱</span>
                                <i v-if='isadvanced' class="el-icon-arrow-up el-icon--right"></i>
                                <i v-if='!isadvanced' class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='0'>个人中心</el-dropdown-item>
                                <el-dropdown-item command='1'>安全中心</el-dropdown-item>
                                <el-dropdown-item command='2'>登录记录</el-dropdown-item>
                                <el-dropdown-item divided command='3'>主题设置</el-dropdown-item>
                                <el-dropdown-item command='4'>系统设置</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span class="exit" @click="closewindow">
                            <i class="icon iconfont menu-exit" else @click="closewindow">&#xe64b;</i>
                            退出
                        </span>
                    </div>
                </el-header>
            
                <el-main class="mainback">
                    <transition name="fade">
                        <keep-alive :include="keepAlive">
                            <router-view style="background:#fff;"></router-view>
                        </keep-alive>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import IndexHeader from "@/components/app/IndexHeader";
    import IndexMenu from "@/components/app/IndexMenu";
    import store from "@/store";
    import { mapState } from "vuex";
    import { adaptiveHeight } from '../js/common/common.js';
    export default {
        name: "index",
        components: {
            IndexHeader,
            IndexMenu
        },
        data() {
            return {
                topMenu:[],
               leftMenu:[],
                active: {},
                isCollapse: false,
                isActive: false,
                tabIndex: "",
                isId:'导航一',
                // 菜单样式切换
                isadvanced: false,

                // 系统设置
                sysSettings_arr: [],
                logourl: this.$store.state.imgurl,
                // 主题色
                themeColor: '',
            };
        },
        mounted() {
    
        },
        computed: {
            ...mapState(["User"]),
            ...mapState(["token"]),
            ...mapState(["keepAlive"]),
        },
  
        methods: {
            // 管理员下拉菜单切换
            menuChange(command) {
                this.$router.push('/PersonalCenter?ind=' + command);
            },
            init() {
                var index = layer.load(1, {
                    shade: [0.1, "#fff"] //0.1透明度的白色背景
                });
                setTimeout(()=>{
                  layer.close(index);   
                })
            },
            siderCollapsed() {
                if (this.isActive) {
                    this.isActive = false;
                    $("#open").click();
                } else {
                    this.isActive = true;
                    $(".el-menu span").css("display", "none");
                    $("#close").click();
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //退出
            closewindow: function (event) {
                this.$router.push("/");
                this.$store.state.currentTabValue = 'Login';
            },

        },

    };
</script>
<style>
    @import "../css/index.css";
    @import "../css/dialog.css";
</style>