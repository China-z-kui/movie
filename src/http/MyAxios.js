import  axios  from "axios"
axios.defaults.baseURL='http://localhost:3000/'
const instance =axios.create()
import qs from 'qs'
import store from '../store'

// 添加响应拦截器
instance.interceptors.response.use(response=>{
 if(response.data.code==401){
    window.location='/user/login'
 }else{
    return response
 }
})

// 添加请求拦截器
instance.interceptors.request.use(config=>{
    //从vuex中获取token
     let token=  store.state.token
     if(token){
       config.headers.authorization=token
     }
     return config
   })
   

const myAxios={
    // 用于发get请求
get(url,params){
 return instance({
    method:'get',
    url:url,
    params:params
 })

},
    // 用于发post请求
post(url,params){
    return instance({
    method:'post',
    url:url,
    data:qs.stringify(params)
})
}

}
export default myAxios