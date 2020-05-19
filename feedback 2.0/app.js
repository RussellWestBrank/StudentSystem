// app application 应用程序
// 把当前模块所有的依赖项都声明再文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// / index.html
// /public 整个 public 目录中的资源都允许被访问

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/', express.static('./public/'))

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然外面这里不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get('/', function (req, res) {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', function (req, res) {
  res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', function(req, res) {
  // 1. 获取表单 POST 请求体数据
  // 2. 处理
  // 3. 发送响应

  // req.query 只能拿 get 请求参数
  // console.log(req.query)

  var comment = req.body
  comment.dateTime = '2017-11-5 10:58:51'
  comments.unshift(comment)

  // res.send
  // res.redirect
  // 这些方法 Express 会自动结束响应
  res.redirect('/')
  // res.statusCode = 302
  // res.setHeader('Location', '/') 
})

app.listen(8080, function () {
  console.log('running...')
})



