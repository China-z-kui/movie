import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const CinemaApi={
   // 添加接口
    add(params){
      return myAxios.post(BASEURL+'/cinema-room/add',params)
       },   
    //查询所有放映厅类型
    queryAllTypes(){
    return myAxios.get(BASEURL+'/cinema-room/types')
       },
    //查询所有放映厅
    list(params){
      return myAxios.get(BASEURL+'/cinema-rooms/cinemaid',params)
       },
    //删除放映厅
   delete(params){
    return myAxios.post(BASEURL+'/cinema-room/del',params)
       },
          //修改座位模板
    updateSeatTemplate(params){
      return myAxios.post(BASEURL+'/cinema-room/edit-seat-template',params)
       },
       //通过ID查询放映厅
      queryById(params){
         return myAxios.get(BASEURL+'/cinema_room/query',params)
          },
}

export default CinemaApi