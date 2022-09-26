// 电影的相关接口
const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

// 添加电影接口
router.post('/movie-info/add',(req,resp)=>{
    let {categoryId,cover,title,type,starActor,showingon,score,description,duration}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        categoryId:Joi.string().required(),  //必填
        cover:Joi.string().required(),//必填,
        title:Joi.string().required(),//必填,
        type:Joi.string().required(),//必填,
        starActor:Joi.string().required(),//必填,
        showingon:Joi.string().required(),//必填,
        score:Joi.string().required(),//必填,
        description:Joi.string().required(),//必填,
        duration:Joi.string().required(),//必填,
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql='insert into movie_info (category_id,cover,title,type,star_actor,showingon,score,description,duration) values (?,?,?,?,?,?,?,?,?)'
    pool.query(sql,[categoryId,cover,title,type,starActor,showingon,score,description,duration],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})
 
// 查询所有电影类型
router.get('/movie-types',(req,resp)=>{
    //查询数据库 movie-type
    let sql="select * from movie_type"
    pool.query(sql,(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 查询所有电影的接口
router.get('/movie-infos',async (req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let {page,pagesize}=req.query
    // TODO 服务器表单验证 如果通过继续后续验证 不通过返回参数异常
   
    let schema=Joi.object({
        page:Joi.number().required(),  //必填数字
        pagesize:Joi.number().integer().max(100).required(),//必填数字，最大不超过100
    })
    let {error,value}= schema.validate(req.query)
    if(error){
      resp.send(Response.error(400,error))
        return
    }

    try{
        //执行查询数组业务
    let startIndex=(page-1)*pagesize
    let size= parseInt(pagesize)
    let sql="select * from movie_info limit ?,?"
    let  result= await  pool.querySync(sql,[startIndex,size])
// 查询总条目数
  let sql2="select count(*) as count from movie_info"
  let  result2= await  pool.querySync(sql2,[startIndex,size])
  let total= result2[0].count


 // 将结果封装，返回给客户端
 resp.send(Response.ok({result,page:parseInt(page),pagesize:size,total})
 )
 }  catch(error){

     resq.send(Response.error(error))
   }
   
 
})

// 删除电影接口
router.post('/movie-info/del',(req,resp)=>{
    let {id}= req.body
    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
          return 
      }
      //删除业务
      let sql = 'delete from movie_info where id = ?'
      pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            // 将结果封装，返回给客户端
            resp.send(Response.ok())
          
      })
}) 
// 通过ID查询电影
router.get('/movie-info/query',(req,resp)=>{
    let {id}= req.query
    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
          return 
      }
      //   执行查询业务
let sql='select * from movie_info where id=?'
 pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            if(result.length==0 && result){
                // 说明没查到
                resp.send(Response.ok(null))
            }else{
                    // 将结果封装，返回给客户端
            resp.send(Response.ok(result[0]))
            }
        
          
})
})
  
 // 修改跟新电影信息接口
router.post('/movie-info/update',(req,resp)=>{
    let {category_id,cover,title,type,star_actor,showingon,score,description,duration,id}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(),  //必填
        category_id:Joi.string().required(),  //必填
        cover:Joi.string().required(),//必填,
        title:Joi.string().required(),//必填,
        type:Joi.string().required(),//必填,
        star_actor:Joi.string().required(),//必填,
        showingon:Joi.string().required(),//必填,
        score:Joi.string().required(),//必填,
        description:Joi.string().required(),//必填,
        duration:Joi.string().required(),//必填,
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql='update movie_info set category_id=?,cover=?,title=?,type=?,star_actor=?,showingon=?,score=?,description=?,duration=? where id=?'
    pool.query(sql,[category_id,cover,title,type,star_actor,showingon,score,description,duration,id],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})

 // 修改电影演员列表接口
 router.post('/movie-info/bind-actors',async (req,resp)=>{
    let {movie_id,actor_ids}=req.body  //post请求在req.body中
    // 表单验证
    let schema=Joi.object({
        movie_id:Joi.string().required(),  //必填    
        actor_ids:Joi.allow(),
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    // 执行sql，将当前movie_id 的数据全删除
    try{ 
    let sql1="delete from movie_info_map_actor where movie_id=?"
   await  pool.querySync(sql1,[movie_id])

   if(!actor_ids){
    resp.send(Response.ok());
    return;
  }
    let params=""
    let paramsArray = []
    let ids= actor_ids.split(',') //所有演员ID
    for(let i=0; i<ids.length;i++){
        params +="(?,?),"
        paramsArray.push(movie_id)
        paramsArray.push(ids[i])
    }
    let sql2='insert into movie_info_map_actor (movie_id,actor_id) values'+params
    sql2=sql2.substring(0,sql2.length-1)
    await pool.querySync(sql2,paramsArray)
    resp.send(Response.ok());

    } catch(error){
    resp.send(Response.error(500,error));
     }
    //表单验证通过，执行添加操作
    

})

// 通过电影名称模糊查询所有电影的接口
router.post('/movie-infos/name',async (req,resp)=>{
    // 获得请求参数 post 请求封装在req.body中
    let {name,page,pagesize}=req.body
    // TODO 服务器表单验证 如果通过继续后续验证 不通过返回参数异常
   
    let schema=Joi.object({
        name:Joi.string().required(),  //必填数字
        page:Joi.number().required(),  //必填数字
        pagesize:Joi.number().integer().max(100).required(),//必填数字，最大不超过100
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }

    try{
        //执行查询数组业务
    let startIndex=(page-1)*pagesize
    let size= parseInt(pagesize)
    let sql="select * from movie_info where title like ? limit ?,?"
    let  result= await  pool.querySync(sql,[`%${name}`,startIndex,size])
// 查询总条目数
  let sql2="select count(*) as count from movie_info"
  let  result2= await  pool.querySync(sql2,[`%${name}`])
  let total= result2[0].count

 // 将结果封装，返回给客户端
 resp.send(Response.ok({result,page:parseInt(page),pagesize:size,total})
 )
 }  catch(error){

     resq.send(Response.error(error))
   }
   
 
})

// 将router对象导出
module.exports=router
