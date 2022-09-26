import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const movieThumbApi={
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/movie-thumb/add',params)
       },   
    // 查询所有的电影
    listByMovieId (params){
      return myAxios.get(BASEURL+'/movie-thumbs/movieid',params)
    },
      // 删除电影
     delete (params){
      return myAxios.post(BASEURL+'/movie-thumb/del',params)
      },
   
}

export default movieThumbApi