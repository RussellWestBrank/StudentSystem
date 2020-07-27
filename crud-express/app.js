/* 
    app.js 入口
    职责：
       创建服务
       做一些服务相关配置
         模板引擎
         body-parse 解析表单 post 请求
         提供静态资源服务
       挂载路由
       监听端口启动服务
*/
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
app.engine('html', require('express-art-template'))

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置模板引擎和 body-parser 一定要 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到 app 服务中
app.use(router)


app.listen(3000, function () {
  console.log('running 3000...')
});
