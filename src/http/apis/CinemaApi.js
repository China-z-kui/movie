import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const CinemaApi={
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/cinema/add',params)
       },   
    //查询所有影院标签
    queryAllTags(){
    return myAxios.get(BASEURL+'/cinema/tags')
       },
    //查询所有影院
    list(){
      return myAxios.get(BASEURL+'/cinemas')
       },
  //删除影院
   delete(params){
    return myAxios.post(BASEURL+'/cinema/del',params)
       },
   // 通过id查询电影院
     queryById(params){
     return myAxios.get(BASEURL+'/cinema/query',params)
},
// 修改影院信息
update(params){
  return myAxios.post(BASEURL+'/cinema/update',params)
},


}

export default CinemaApi