import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import Index from '@/view/Index'
 
// import ArchiveDetailsLayer from '@/components/archive/archive-details-layer'
// 管理员个人中心
import PersonalCenter from '@/view/PersonalCenter'
 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
      //   {
      //   path: '/ArchiveDetails',
      //   name: 'ArchiveDetails',
      //   component: AddArchive
      // },
      {
        path: '/PersonalCenter',
        component: PersonalCenter
      },
 
    ]
    },{
      path: '/',
      component: Login
    }
  ]
})

