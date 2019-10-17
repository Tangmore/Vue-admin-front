
/**
  * 接口域名的管理
  */
import store from '@/store';
  const base = {
    url: store.state.baseurl,
    imgurl: store.state.imgurl,
    wsurl:store.state.wsUri
}

export default base;
