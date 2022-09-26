 const express = require('express');
 const app=express()
//  配置跨域
 const cors = require('cors');
 const Response=require('./db/Response')
 const jwt=require('jsonwebtoken')
 const JWT_SECRET_KEY='JWT_SECRET_KEY'
app.use(cors({
    origin: "*"
}))
// 自定义token全局验证中间件

const tokenTools=function(req,res,next){
    //若请求路径为 /user/login 则不拦截 直接向后执行 
   if(req.path=='/user/login'){
    next();
    return
   }

    //执行token验证
     let token= req.headers['authorization']
     console.log(token);
     try {
         let payload= jwt.verify(token,JWT_SECRET_KEY)
        //  console.log(payload);
         req.tokenPayload=payload //将token中的存储数据 复制给 req 
     } catch (error) {
      res.send(Response.error(401,'用户验证失败,请重新登录'))
        
     }
    // console.log('处理token中间件');
    next()
}
app.use(tokenTools)

// 解析post请求参数
app.use(express.urlencoded())
// 引入外部路由
app.use(require('./router/MovieActor'))
app.use(require('./router/MovieDirector'))
app.use(require('./router/MovieInfo'))
app.use(require('./router/MovieThumb'))
app.use(require('./router/Cinema'))
app.use(require('./router/CinemaRoom'))
app.use(require('./router/ShowingonPlan'))
app.use(require('./router/Admin'))



    app.listen(3000,()=>{
    console.log('服务器已开启')
})
