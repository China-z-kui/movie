import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const directorApi={
    // 查询导演列表接口
   list(params){
   return myAxios.get(BASEURL+'/movie-directors',params)
    },
    //模糊查询
    listByname(params){
        return myAxios.post(BASEURL+'/movie-directors/name',params)
         },
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/movie-directors/add',params)
       },
    //删除接口
    delete(params){
        return myAxios.post(BASEURL+'/movie-director/del',params)
         },
        
}

export default directorApi