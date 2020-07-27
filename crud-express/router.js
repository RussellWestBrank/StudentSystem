/**
 *  router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法请求路径设置具体的请求处理函数 
 */
// 方法一
// module.exports = function (app) {
//     app.get('/', function (req, res) {
//         //readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf8编码转换成我们认识的字符串
//         //也可以用data.toString()的方式
//         fs.readFile('./db.json', 'utf8', function (err, data) {
//             if (err) {
//                 return res.status(500).send('Server error')
//             }
//             res.render('./index.html', {
//                 fruits:[
//                     '苹果',
//                     '香蕉',
//                     '火龙果',
//                     '枇杷'
//                 ],
//                 //data一开始是二进制数据，添加utf8后变成字符串
//                 students: JSON.parse(data).students
//             })
//         })
    
//     })
//     app.get('/students/new', function (req, res){
    
//     })
//     app.get('/students/new', function (req, res){
        
//     })
//     app.get('/students/new', function (req, res){
        
//     })
// }


//方法二
var express = require('express')
var fs = require('fs')
var Student = require('./students')

//1.创建一个路由器
var router = express.Router()

//2.把路由器都挂载到 router 路由容器中

router.get('/students', function (req, res) {
    //readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf8编码转换成我们认识的字符串
    //也可以用data.toString()的方式
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('Server error')
    //     }
    //     res.render('./index.html', {
    //         fruits:[
    //             '苹果',
    //             '香蕉',
    //             '火龙果',
    //             '枇杷'
    //         ],
    //         //data一开始是二进制数据，添加utf8后变成字符串
    //         students: JSON.parse(data).students
    //     })
    // })
    Student.find(function (err, students){
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
            students: students
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
    //先读取数据，转成对象， 取出数组
    //然后往数组中 push 数据
    //然后把数组数据转换成字符串
    //然后把字符串写入文件
    Student.save(req.body, function (err){
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.redirect('/students')
    })
})
    
   
/*
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    // 
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面
  
    Student.findById(parseInt(req.query.id), function (err, student) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('edit.html', {
        student: student
      })
    })
  })
/**
 *处理编辑学生  
 */  
router.post('/students/edit', function (req, res){
  // 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Student.updateById()
  // 3. 发送响应
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', function (req, res){
    
})
//3.把 router 导出
module.exports = router