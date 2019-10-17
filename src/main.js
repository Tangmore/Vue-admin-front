// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/font/iconfont.css';

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './js/api' // 导入api接口
// Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// echarts图表
import echarts from 'echarts'
import layer from 'layui-layer'
//引入utils
import {initRouter} from './utils/utils'
// 导入自定义指令
import './directives.js'
//公用js自适应高度
import {common} from './js/common/common.js'
// 导入websql
import Websql from './js/common/websql.js'

Vue.config.productionTip = false
Vue.prototype.$api = api // 将api挂载到vue的原型上
 
Vue.prototype.$echarts = echarts;// 将echarts挂载到vue的原型上
Vue.prototype.initRouter=initRouter;
Vue.prototype.common=common;
Vue.prototype.$db=Websql;//websql
Vue.prototype.bus = new Vue();//bus总线
Vue.use(ElementUI);
 
Vue.use(Websql);

//加载路由
initRouter(router,store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
