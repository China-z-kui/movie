import myAxios from "../MyAxios";
import BASEURL from '../BaseUrl';

const AdminApi={
    // 查询演员列表接口
  login(params){
   return myAxios.post(BASEURL+'/user/login',params)
    },    
}

export default AdminApi