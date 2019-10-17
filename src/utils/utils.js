import initialize from '@/js/api/interface/initialize'
/**
 * 添加路由
 * @param router
 */
function initRouter(router,store) {
  if(store.state.routers.length<=0){
  //   console.log("加载路由 ")
  //   initialize.selectMenuAll().then(res=>{
  //     let menuList=res.rows;
  //     // console.log(menuList)
  //     for(let i=0;i<menuList.length;i++){
  //       let menu=menuList[i];
  //       if(menu.routerName!=null&&menu.routerName!=''){
  //         router.options.routes[0].children.push({
  //           name: menu.routerName,
  //           path: menu.routerPath,
  //           component:() => import ('@/view/'+ menu.routerComponent)
  //           // resolve => require(['../components' + menu.routerComponent], resolve)//路由懒加载
  //         })
  //       }

  //     }
  //     router.addRoutes(router.options.routes);
  //     store.commit('initMenu',menuList)
  //     // console.log(router)
  //   })
  }

}
export  {initRouter}
