const response={
    // 返回一个正确的响应对象
    ok:(data)=>{
        return{
            code:200,
            msg:'ok',
            data:data
        }
    },
    // 返回错误消息
    error:(code,errmsg)=>{
        return{
            code:code,
            msg:errmsg
        }
    }
}

module.exports=response