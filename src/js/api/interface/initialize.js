import base from '@/js/api/base'; // 导入接口域名列表
import axios from '@/js/request/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const initialize = {
  // 当前用户顶级主菜单查询
  menuTop() {
    return axios.get(`${base.url}xxx`);
  },
  validateRegionNum(params) {
    return axios.get(`${base.url}xxx`, { params });
  },
  // post提交 
  login(params) {
    return axios.post(`${base.url}xxx`, params);
  }
}
export default initialize;
