// 导演的相关接口

const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

//删除导演接口
router.post('/movie-director/del',(req,resp)=>{
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
      let sql = 'delete from movie_director where id = ?'
      pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            // 将结果封装，返回给客户端
            resp.send(Response.ok())
          
      })
}) 

// 模糊查询导演
router.post('/movie-directors/name',(req,resp)=>{
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
    let sql="select * from movie_director where director_name like ?"
    pool.query(sql,[`%${name}%`],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 查询所有导演的接口
router.get('/movie-directors',(req,resp)=>{
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
    //查询数据库 movie-directors
    let startIndex=(page-1)*10
    let size= parseInt(pagesize)
    let sql="select * from movie_director limit ?,?"
    pool.query(sql,[startIndex,size],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 添加导演接口
router.post('/movie-directors/add',(req,resp)=>{
    let {directorName,directorAvatar}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        directorName :Joi.string().required(),  //必填
        directorAvatar:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql='insert into movie_director (director_name,director_avatar) values(?,?)'
    pool.query(sql,[directorName, directorAvatar],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})
 
// 



// 将router对象导出
module.exports=router
