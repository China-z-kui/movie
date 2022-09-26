// 放映厅的相关接口
const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

//删除放映厅接口
router.post('/cinema-room/del',(req,resp)=>{
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
      let sql = 'delete from movie_cinema_room where id = ?'
      pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            // 将结果封装，返回给客户端
            resp.send(Response.ok())
          
      })
}) 

// 查询所有放映厅标签的接口
router.get('/cinema-room/types',(req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let sql="select * from movie_cinema_room_type"
    pool.query(sql,(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 添加放映厅接口
router.post('/cinema-room/add',(req,resp)=>{
    let {movie_cinema_id,room_name,room_type}=req.body  //post请求在req.body中
    // 表单验证
    let schema=Joi.object({
        movie_cinema_id:Joi.string().required(),
        room_name:Joi.string().required(),
        room_type:Joi.string().required()
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql=`insert into movie_cinema_room (movie_cinema_id,room_name,room_type) values(?,?,?)`
    pool.query(sql,[movie_cinema_id,room_name,room_type],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
    })

})
 
// 查询当前电影院放映厅的接口
router.get('/cinema-rooms/cinemaid',(req,resp)=>{
    let {cinema_id}= req.query
    // 表单验证
    let schema=Joi.object({
        cinema_id:Joi.string().required(),//必填
    })
    let {error,value}= schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
          return 
      }
    // 获得请求参数 get 请求封装在req.query中
    let sql="select * from movie_cinema_room where movie_cinema_id=?"
    pool.query(sql,[cinema_id],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
    })
})

// 添加放映厅接口
router.post('/cinema-room/edit-seat-template',(req,resp)=>{
    let {id,seat_template,room_size}=req.body  //post请求在req.body中
    // 表单验证
    let schema=Joi.object({
       id:Joi.string().required(),
       seat_template:Joi.string().required(),
       room_size:Joi.string().required()
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql=`update movie_cinema_room set seat_template=?,room_size=? where id=? `
    pool.query(sql,[seat_template,room_size,id],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
    })

})

// 通过ID查询放映厅接口
router.get('/cinema_room/query',(req,resp)=>{
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
let sql='select mcr.room_name cinema_room_name,mcr.room_size cinema_room_size,mcr.movie_cinema_id cinema_id,mcr.room_type cinema_room_type,mc.cinema_name cinema_name from movie_cinema_room mcr join movie_cinema mc on mcr.movie_cinema_id=mc.id where mcr.id=?'
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

// 将router对象导出
module.exports=router
