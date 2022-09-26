// 演员的相关接口
const express = require('express');
const router=express.Router()
const Joi = require('joi');
const Response=require('../db/Response')
// 通过router 对象定义接口实现业务

// 引入连接池
const pool=require('../db/pool')

const jwt = require('jsonwebtoken')
const SECRET_KEY = 'JWT_SECRET_KEY'


// 用户登录接口
router.post("/user/login", (req, resp)=>{
    let{loginname, password} = req.body
    // 表单验证
    let schema = Joi.object({
      loginname: Joi.string().required().pattern(new RegExp('^\\w{3,15}$')), // 必填
      password: Joi.string().required().pattern(new RegExp('^\\w{6,15}$')), // 必填
    });
    let { error, value } = schema.validate(req.body);
    if (error) {
      resp.send(Response.error(400, error));
      return; // 结束
    }
    // 查询数据库，账号密码是否填写正确
    let sql = "select * from user where loginname=? and password=?"
    pool.query(sql, [loginname, password], (error, result)=>{
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      if(result.length==0){
        resp.send(Response.error(1001, '账号密码输入错误'));
      }else{
        // 获取登录用户对象
        let user = result[0]
        // 为该用户颁发一个token字符串，未来该客户端若做发送其他请求，则需要在请求Header中携带token，完成状态管理。
        let payload = {id: user.id, nickname: user.nickname}
        let token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'})
        // 返回user对象与token字符串
        user.password = undefined
        resp.send(Response.ok({user, token}));
      
      }
    })
  });
 
// 将router对象导出
module.exports=router
