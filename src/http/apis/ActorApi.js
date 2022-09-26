import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const actorApi={
    // 查询演员列表接口
   list(params){
   return myAxios.get(BASEURL+'/movie-actors',params)
    },
    //模糊查询
    listByname(params){
        return myAxios.post(BASEURL+'/movie-actors/name',params)
         },
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/movie-actors/add',params)
       },
    //删除接口
    delete(params){
        return myAxios.post(BASEURL+'/movie-actor/del',params)
         },
    // 通过movie_id查询演员列表
    listByMovieId(params){
        return myAxios.get(BASEURL+'/movie-actors/movieid',params)
      } 
        
}

export default actorApi