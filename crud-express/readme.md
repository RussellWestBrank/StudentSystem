# EXPRESS - crud

## 起步

-初始化

-模块处理

## 路由设计

| 请求方法 | 请求路径          | GET参数 | POST参数                       | 备注                 |
| -------- | ----------------- | ------- | ------------------------------ | -------------------- |
| GET      | /students         |         |                                | 渲染首页             |
| GET      | /students/new     |         |                                | 渲染添加学生页面信息 |
| POST     | /studengts/new    |         | name、age、gender、hobbies     | 处理添加学生请求     |
| GET      | /students/edit    | id      |                                | 渲染编辑页面         |
| POST     | /students/edit    |         | id、name、age、gender、hobbies | 处理编辑请求         |
| GET      | /studengts/delete | id      |                                | 处理删除请求         |

## 提取路由模块

```javascript
//router.js
/**
 *  router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法请求路径设置具体的请求处理函数 
 */
var express = require('express')
var fs = require('fs') 

//1.创建一个路由器
var router = express.Router()

//2.把路由器都挂载到 router 路由容器中

router.get('/students', function (req, res) {
    //readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf8编码转换成我们认识的字符串
    //也可以用data.toString()的方式
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('./index.html', {
            fruits:[
                '苹果',
                '香蕉',
                '火龙果',
                '枇杷'
            ],
            //data一开始是二进制数据，添加utf8后变成字符串
            students: JSON.parse(data).students
        })
    })

})
router.get('/students/new', function (req, res){
    res.render('./new.html')

})
/*
 * 处理添加学生
 */
router.post('/students/new', function (req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    console.log(req.body)
  })
router.get('/students/edit', function (req, res){
    
})
router.post('/students/edit', function (req, res){
    
})
router.get('/students/delete', function (req, res){
    
})
//3.把 router 导出
module.exports = router
```



```javascript
//app.js
var router = require('./router')

//挂载路由
app.use(router)
```

## 设计操作数据的API文件模块

```javascript
/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */


 /**
  * 获取所有学生的列表
  */
 exports.find = function {

 }


/**
 * 添加保存学生
 */
 exports.save = function {
     
 }

/**
 * 更新学生
 */
 exports.update = function {
     
 }

/**
 * 删除学生
 */
exports.delete = function {
     
}
```

