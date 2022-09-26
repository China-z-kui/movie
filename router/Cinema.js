// 演员的相关接口
const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

//删除电影院接口
router.post('/cinema/del',(req,resp)=>{
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
      let sql = 'delete from movie_cinema where id = ?'
      pool.query(sql,[id],(error,result)=>{
        if(error){  
            resp.send(Response.error(500,error))
             throw error;
            }
            // 将结果封装，返回给客户端
            resp.send(Response.ok())
          
      })
}) 

// 查询所有电影标签的接口
router.get('/cinema/tags',(req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let sql="select * from movie_cinema_tag"
    pool.query(sql,(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
      

    })
})

// 添加演员接口
router.post('/cinema/add',(req,resp)=>{
    let {cinema_name,address,province,city,district,longitude,latitude,tags}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        cinema_name:Joi.string().required() ,
        address:Joi.string().required(),
        province:Joi.string().required(),
        city:Joi.string().required(),
        district:Joi.string().required(),
        longitude:Joi.string().required(),
        latitude:Joi.string().required(),
        tags:Joi.string().required()
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql='insert into movie_cinema(cinema_name,address,province,city,district,longitude,latitude,tags) values(?,?,?,?,?,?,?,?)'
    pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})
 
// 查询所有电影院的接口
router.get('/cinemas',(req,resp)=>{
    // 获得请求参数 get 请求封装在req.query中
    let sql="select * from movie_cinema"
    pool.query(sql,(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok(result))
    })
})

// 通过ID查询电影院
router.get('/cinema/query',(req,resp)=>{
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
let sql='select * from movie_cinema where id=?'
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

// 修改演员接口
router.post('/cinema/update',(req,resp)=>{
    let {id,cinema_name,address,province,city,district,longitude,latitude,tags}=req.body  //post请求在req.body中

    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required() ,
        cinema_name:Joi.string().required() ,
        address:Joi.string().required(),
        province:Joi.string().required(),
        city:Joi.string().required(),
        district:Joi.string().required(),
        longitude:Joi.string().required(),
        latitude:Joi.string().required(),
        tags:Joi.string().required()
    })
    let {error,value}= schema.validate(req.body)
    if(error){
      resp.send(Response.error(400,error))
        return
    }
    //表单验证通过，执行添加操作
    let sql=`update movie_cinema set  cinema_name=?,address=?,province=?,city=?,district=?,longitude=?,latitude=?,tags=? where id=?`
    pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags,id],(err,result)=>{
        if(err){  
        resp.send(Response.error(500,error))
         throw err;
        }
        // 将结果封装，返回给客户端
        resp.send(Response.ok())
      

    })

})
// 将router对象导出
module.exports=router
