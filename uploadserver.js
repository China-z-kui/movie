const express = require('express');
const app = express()
const Response = require('./db/Response');

//  配置跨域
const cors = require('cors');
app.use(cors({
    origin: "*"
}))

//配置multer中间件 处理文件上传
const multer=require('multer');
const uuid = require('uuid');
const uploadTools=multer({
    storage:multer.diskStorage({
        destination:(req,file,callback)=>{
            callback(null,'static')
        },
        filename:(req,file,callback)=>{
            let name=file.originalname
            
          let ext = name.substr(name.lastIndexOf('.'))
        
          let newName=uuid.v4() + ext
          callback(null,newName)
        }
    })

})

// 配置static目录为静态资源托管文件夹 
app.use(express.static('static'))

app.post('/upload',uploadTools.single('file'),(req,resp)=>{
    let url="http://localhost:9000/"+req.file.filename
    resp.send(Response.ok(url))
})


app.listen(9000,()=>{
    console.log('上传文件服务开启...');
})