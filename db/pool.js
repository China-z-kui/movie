// 加载mysql数据库
const mysql = require('mysql');
const { error } = require('./Response');
const pool=mysql.createPool({
    connectionLimit:20,  //最大连接数
    host:'localhost',   //主机地址
    user:'root',        //用户名
    password:'',            //密码
    database:'bmdstudios'   //数据库名
})
// 为连接池新增一个方法
pool.querySync=(sql,params)=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql,params,(error,result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}
// 导出连接池
module.exports=pool