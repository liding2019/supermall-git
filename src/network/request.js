import axios from  'axios'

//方案3最终封装
export function request(config) {
  //1.创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  //2.1请求拦截
  instance.interceptors.request.use(config =>{
    return config;
  },error => {
  });

  //响应拦截
  instance.interceptors.response.use(res =>{
    return res.data;
  },error => {
  });
  return instance(config);
}


//方案3最终封装
export function requestLocal(config) {
  //1.创建axios实例
  const instance=axios.create({
    baseURL:'http://192.168.1.100:9090/interface',
    timeout:5000
  })
  //2.1请求拦截
  instance.interceptors.request.use(config =>{
    return config;
  },error => {
  });

  //响应拦截
  instance.interceptors.response.use(res =>{
    return res.data;
  },error => {
  });
  return instance(config);
}
