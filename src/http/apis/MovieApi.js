import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const movieApi={
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/movie-info/add',params)
       },   
        // 查询电影类型列表接口
    listAllMovieTypes(){
    return myAxios.get(BASEURL+'/movie-types')
     },  
     
    // 查询所有的电影
    list (params){
      return myAxios.get(BASEURL+'/movie-infos',params)
    },
      // 删除电影
     delete (params){
      return myAxios.post(BASEURL+'/movie-info/del',params)
      },
          // 根据ID查电影
    queryById (params){
      return myAxios.get(BASEURL+'/movie-info/query',params)
      },
       // 更新电影
     update (params){
      return myAxios.post(BASEURL+'/movie-info/update',params)
      },
      // 为电影绑定演员列表
      bindActors(params){
        return myAxios.post(BASEURL+'/movie-info/bind-actors',params)
      },
    // 通过电影名称模糊查询所有的电影
    listByName(params){
      return myAxios.post(BASEURL+'/movie-infos/name',params)
    },

}

export default movieApi