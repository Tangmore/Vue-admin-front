<template>
  <div id="index">
    <el-container>
      <el-aside width="">
        <el-menu :default-active="isId" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-row class="logo" v-for="(item,index) in sysSettings_arr" :key='index'>
            <img :src="item.iconAddress?logourl+item.iconAddress:'@/images/logo.png'"
            style="vertical-align:middle" />
            <span style="vertical-align:middle"
            :style="{fontSize:item.fontSize,fontSpacing:item.fontSpacing}">{{item.systemName}}</span>
          </el-row>
          <el-row>
            <index-menu :left-menu="leftMenu" :parent="active" :jump="jump"></index-menu>
          </el-row>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="65px" style="position: relative;">
          <div style="float:left">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;position: absolute;display:block">
                    <div :class="isActive?'hide':'show'"  class="icon iconfont menu-expand"   @click="siderCollapsed()">&#xe62c;</div>
                     <div :class="isActive?'show':'hide'" class="icon iconfont menu-expand"   @click="siderCollapsed()">&#xe712;</div>
              <el-radio-button id="open" :label="false" style="display:none"></el-radio-button>
              <el-radio-button id="close" :label="true" style="display:none"></el-radio-button>
            </el-radio-group>
            <index-header :topMenu="topMenu" :active="active" :handle-click="initDict" style="margin-left: 105px;"></index-header>
          </div>
          <div style="line-height: 65px;position: absolute;right: 0;background-color: #fff">
            <el-dropdown @command='menuChange'>
              <span class="el-dropdown-link">
                <span @mouseover='isadvanced=true' @mouseleave='isadvanced=false'>{{User.name}}</span>
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
        <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
          <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
            {{item.content}}
          </el-tab-pane>
        </el-tabs>
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
           // topMenu: [{ disabled: 0, fkParentId: 0, herf: "menu", id: 1, menuName: "文档" },
                // { disabled: 0, fkParentId: 0, herf: "menu", id: 2, menuName: "备案" },
                // { disabled: 0, fkParentId: 0, herf: "menu", id: 3, menuName: "控制台" }],
        // leftMenu: [{
        //             disabled: 0,
        //             fkParentId: 1,
        //             herf: "home-page.html",
        //             id: 20,
        //             menuName: "首页",
        //             routerComponent: "Home",
        //             routerName: "Home",
        //             routerPath: "/index/Home"
        //         }, {
        //             disabled: 0,
        //             fkParentId: 1,
        //             herf: "",
        //             id: 21,
        //             menuName: "档案中心",
        //             routerComponent: null,
        //             routerName: null,
        //             routerPath: null
        //         },
        //         {
        //             disabled: 0,
        //             fkParentId: 21,
        //             herf: "html/archive/archives-admin.html",
        //             id: 28,
        //             menuName: "档案管理",
        //             routerComponent: "archive/archivecenter/ArchiveManage",
        //             routerName: "ArchiveManage",
        //             routerPath: "/index/ArchiveManage"
        //         },
        //         {
        //             disabled: 0,
        //             fkParentId: 354,
        //             herf: "html/storehouse/remote-control-new.html",
        //             id: 404,
        //             menuName: "全景监控",
        //             routerComponent: "storehouse/RemoteControl",
        //             routerName: "RemoteControl",
        //             routerPath: "/index/RemoteControl",
        //         }, {
        //             disabled: 0,
        //             fkParentId: 5,
        //             herf: "html/administration/user-admin.html",
        //             id: 33,
        //             menuName: "用户管理",
        //             routerComponent: "authorization/userAdmin",
        //             routerName: "userAdmin",
        //             routerPath: "/index/userAdmin"
        //         }
        //         ],
        active: {},
        isId: "",
        isCollapse: false,
        isActive: false,
        editableTabsValue2: "",
        editableTabs2: [],
        tabIndex: "",

        // 菜单样式切换
        isadvanced: false,

        // 系统设置
        sysSettings_arr: [],
        logourl:this.$store.state.imgurl,
        // 主题色
        themeColor:'',
      };
    },
    mounted() {
      // 如果无后台数据，将此处屏蔽
      this.init(); 
    },
    computed: {
      ...mapState(["User"]),
      ...mapState(["token"]),
      ...mapState(["keepAlive"]),
      systemSet() {
        return this.$store.state.sys_arr;　 
      },

    },
    watch: {
      // 系统设置是否更改
      systemSet(newVal, oldVal) {
        this.sysSettings_arr=newVal;
      },
      editableTabsValue2(newVal,oldVal){
        this.$store.state.currentTabValue=newVal;
      },
    }, 
    methods: {
      getTheme(){
        this.$api.authInterface.queryCurrentTheme().then(res => { })
      },
      // 管理员下拉菜单切换
      menuChange(command) {
        this.$router.push('/PersonalCenter?ind=' + command);
      },
      init() {
        var index = layer.load(1, {
          shade: [0.1, "#fff"] //0.1透明度的白色背景
        });
        this.$api.loginInterface.userName().then(res => {
          layer.close(index);
          if (res.state) {
            let userjson = {};
            userjson.name = res.row;
            store.dispatch("updateAccount", userjson);
            this.primaryColor = "#1AB394";
            this.initMenu();
          } else {
            layer.msg("没有用户重新登录！");
            this.$router.replace("/");
          }
        });
      },
      initMenu() {
        this.$api.initialize.menuTop().then(res => {
          if (res.state && res.rows.length > 0) {
            let dicts = res.rows;
            let initNow = res.rows[0].id;
            this.topMenu = dicts;
            this.active.value = initNow.toString();
            this.initDict(initNow.toString());
          }
        });
      },
      initDict(initNow) {
        this.active.value = initNow;
        this.$api.initialize.menuSide(initNow).then(res => {
          if (res.state && res.rows.length > 0) {
            this.isId = res.rows[0].menuName;
            let dicts = res.rows;
            this.jump(res.rows[0]);
            this.leftMenu = res.rows;
          }
        });
      },
      jump: function (menu) {
        console.log("跳转:" + menu.routerName);
        if (menu.routerName != null) {
          this.addTab(menu.menuName, menu.routerName);
        }
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
      addTab(targetName, routerName) {
        let newTabName = ++this.tabIndex + "";
        let istrue = false;
        for (const value of this.editableTabs2) {
          if (value.title == targetName) {
            istrue = true;
            newTabName = value.name;
          }
        }
        if (istrue) {
          this.$router.push({ name: routerName });
          this.editableTabsValue2 = routerName;
        } else {
          this.editableTabs2.push({
            title: targetName,
            name: routerName,
            content: this.$router.push({ name: routerName })
          });
          this.editableTabsValue2 = routerName;
          this.$store.state.keepAlive.push(routerName);
        }
      },
      clickTab(tab, event) {
        this.$router.push({ name: tab.name });
        this.editableTabsValue2 = tab.name;
      },
      removeTab(targetName) {
        this.$store.state.keepAlive.splice(store.state.keepAlive.indexOf(targetName), 1);
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.$router.push({ name: activeName });
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
 
      //退出
      closewindow: function (event) {
        this.$router.push("/");
        this.$store.state.currentTabValue='Login';
      }
    },

  };
</script>
<style>
  @import "../css/index.css";
  @import "../css/dialog.css";
</style>
