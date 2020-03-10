import Axios from "axios";

Axios.defaults = Object.assign(Axios.defaults, {
  baseURL: "http://localhost:8030",
  // baseURL: "http://39.104.181.213:8666/",        // new地址
  //baseURL:'http://test.admin.psychic.zhineng.talkingcake.cn',//测试
  //baseURL:'http://admin.psychic.zhineng.talkingcake.cn',//正式
  timeout: 0,
  // responseType: "json",
  withCredentials: true,
});

// 添加请求拦截器
Axios.interceptors.request.use(
  function(config) {
    if (config.axiosLoading) {
      // Indicator.open();
    }
    config.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token':window.localStorage.getItem('token'),
        'permValue':window.sessionStorage.getItem('currentRoute')
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function(response) {
    console.log('response',response)
    return response
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default Axios;
