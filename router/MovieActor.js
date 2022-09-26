// 演员的相关接口

const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

//删除演员接口
router.post('/movie-actor/del',(req,resp)=>{
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
      let sql = 'delete from movie_actor where id = ?'
      pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            // 将结果封装，返回给客户端
            resp.send(Response.ok())
          
      })
}) 

// 模糊查询演员
router.post('/movie-actors/name',(req,resp)=>{
    let {name}= req.body
    // 表单验证
    let schema=Joi.object({
        name:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
          return 
      }
    //执行模糊查询
    let sql="select * from movie_actor where actor_name like ?"
    pool.query(sql,[`%${name}%`],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})



// 查询所有演员的接口
router.get('/movie-actors',(req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let {page,pagesize}=req.query
    // TODO 服务器表单验证 如果通过继续后续验证 不通过返回参数异常  
    let schema=Joi.object({
        page:Joi.number().required(),  //必填数字
        pagesize:Joi.number().integer().required(),//必填数字，
    })
    let {error,value}= schema.validate(req.query)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //查询数据库 movie-actors
    let startIndex=(page-1)*10
    let size= parseInt(pagesize)
    let sql="select * from movie_actor limit ?,?"
    pool.query(sql,[startIndex,size],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 添加演员接口
router.post('/movie-actors/add',(req,resp)=>{
    let {actorName,actorAvatar}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        actorName :Joi.string().required(),  //必填
        actorAvatar:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql='insert into movie_actor (actor_name,actor_avatar) values(?,?)'
    pool.query(sql,[actorName, actorAvatar],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})
 
// 通过MOVIEID查演员
router.get('/movie-actors/movieid',(req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let {movie_id}=req.query
    // TODO 服务器表单验证 如果通过继续后续验证 不通过返回参数异常
   
    let schema=Joi.object({
        movie_id:Joi.number().integer().required(),//必填数字，
    })
    let {error,value}= schema.validate(req.query)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //查询数据库 movie-actors
    let sql=`select ma.id actor_id,ma.actor_avatar actor_avatar,ma.actor_name actor_name,mima.movie_id movie_id  from movie_actor ma join movie_info_map_actor mima on ma.id= mima.actor_id  where  mima.movie_id = ?`
    pool.query(sql,[movie_id],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})


// 将router对象导出
module.exports=router
