import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  baseurl:'http://192.168.2.60:8082/',
  imgurl: 'http://192.168.2.60:8083/',
  wsUri:'ws://127.0.0.1:7500/rfid',
  User: {},
  siderCollapsed: false,
  token: null,
  routers: [],
  keepAlive: [],
  currentTabValue:'',

  // 弹出框全屏显示
  dialogfullscreen: false,
  // 系统设置
  sys_arr:[] 
}

const mutations = {
  setToken(state, token) {
    state.token = token || '';
    sessionStorage.setItem('token', token);
  },
  initMenu(state, menu) {
    state.routers = menu;
  },
  updateAccount(state, data) {
    state.User = data;
  },
  updateSiderCollapse(state, isShow) {
    setTimeout(() => {
      G.trigger('page_resize');
    }, 600)
    state.siderCollapsed = isShow;
  },
  setKeepAlive: (state, keepAlive) => {
    state.keepAlive = keepAlive
  },
  // 弹出框全屏 
  DIALOGFULLSCREEN(state,data) {
    state.dialogfullscreen = data;
  },

  // 系统设置
  SYSTEMSETTINGS(state,data) {
    state.sys_arr = data;
  },
  // tab当前页面
  GETCURRENTTABVALUE(state,data){
    state.currentTabValue=data;
  } 
}
const actions = {
  setToken(context) {//这里的context和我们使用的$store拥有相同的对象和方法
    context.commit('setToken');
    //你还可以在这里触发其他的mutations方法
  },
  updateAccount(context, data) {
    context.commit('updateAccount', data);
  },
  updateSiderCollapse(context, data) {
    context.commit('updateSiderCollapse', data);
  },
  // 弹出框全屏
  dialogfullScreen(context,data) {
    context.commit('DIALOGFULLSCREEN',data)
  },

  // 系统设置
  systemsettings(context,data) {
    context.commit('SYSTEMSETTINGS',data)
  },
  // tab当前页面
  getcurrentTabValue(context,data){
    context.commit('GETCURRENTTABVALUE',data);
  } 
}
const getters = {
  account: state => {
    return state.User;
  },
  siderCollapsed: state => {
    return state.siderCollapsed;
  },
  keepAlive: state => {
    return state.keepAlive;
  },
// 弹出框全屏
  dialogfullScreen:state=>{
    return state.dialogfullScreen;
  },
  // 系统设置
  sys_arr:state=>{
    return state.sys_arr;
  },

  // tab当前页面
  currentTabValue:state=>{
    return state.currentTabValue;
  } 
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});