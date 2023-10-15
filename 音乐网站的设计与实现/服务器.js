var express = require("express");
var app = express();

var path = require("path");

var cors = require("cors");
app.use(cors());


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var moment = require('moment'); //时间格式化,转换数据库时间格式

var mysql = require("mysql");
var client = mysql.createConnection({
  host: 'localhost',
  port: "3306",
  user: 'root',
  password: 'Ys_666.',
  database: 'mylibrary'
});

client.connect(function (err) {
  if (err) throw err;
  console.log("连接数据库成功");
});

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 用户注册路由
app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "view", "denglu.html"));
});

// 用户注册路由
app.post("/register", function (req, res) {
  var username = req.body.userName;
  var password = req.body.userPass;

  // 检查数据库中是否已存在相同的用户名
  client.query("SELECT * FROM user WHERE userName = ?", [username], function (err, results) {
    if (err) throw err;
    if (results.length > 0) {
      // 用户名已存在，提示已注册
      res.send({ success: false, message: "该用户名已注册" });
    } else {
      // 用户名不存在，向数据库添加新的记录
      client.query("INSERT INTO user (userName, userPass) VALUES (?, ?)", [username, password], function (err, results) {
        if (err) throw err;
        res.send({ success: true, message: "注册成功" });
      });
    }
  });
});

// 用户登录路由
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "view", "denglu.html"));
});

// 用户登录路由
app.post("/login", function (req, res) {
  var username = req.body.userName;
  var password = req.body.userPass;
  var userRole = req.body.userRole;

  if (!userRole) {
    // 如果没有选择登录类型，则返回错误提示
    res.send({ success: false, message: "请选择登录类型！" });
    return;
  }

  if (userRole === "user") {
    // 查询用户表
    client.query("SELECT * FROM user WHERE userName = ? AND userPass = ?", [username, password], function (err, userResults) {
      if (err) throw err;
      if (userResults.length > 0) {
        // 用户登录成功
        console.log("用户登录成功，用户信息：", userResults[0]);
        res.send({ success: true, message: "登录成功", role: "user" });
      } else {
        // 登录失败，用户名或密码错误
        res.send({ success: false, message: "用户名或密码错误" });
      }
    });
  } else if (userRole === "admin") {
    // 查询管理员表
    client.query("SELECT * FROM admin WHERE adminName = ? AND adminPass = ?", [username, password], function (err, adminResults) {
      if (err) throw err;
      if (adminResults.length > 0) {
        // 管理员登录成功
        console.log("管理员登录成功，管理员信息：", adminResults[0]);
        res.send({ success: true, message: "登录成功", role: "admin" });
      } else {
        // 登录失败，用户名或密码错误
        res.send({ success: false, message: "用户名或密码错误" });
      }
    });
  } else {
    // 选择了非法的登录类型
    res.send({ success: false, message: "请选择正确的登录类型！" });
  }
});

//用户首页路由
app.get('/user/index', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "view", "index.html"));
});

//管理员后台路由
app.get('/admin/index', function (req, res) {
  res.sendFile(path.join(__dirname, "public", "view", "houtai.html"));
});

// 获取用户信息路由
app.get('/admin/index/user', function (req, res) {
  client.query('SELECT * FROM user', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

//删除用户信息路由
app.get('/admin/index/user/delete/:userId', function (req, res) {
  var id = req.params.userId;
  console.log(`删除的ID为: ${id}`);
  client.query('DELETE FROM user WHERE userId = ?', [id], function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.send({ success: true, message: "删除成功" });
    }
  });
});

//修改用户信息路由
app.post('/admin/index/user/edit', function (req, res) {
  var user = req.body;
  var userBirth = moment(user.userBirth).format('YYYY-MM-DD'); // 转换为正确的日期格式
  client.query('UPDATE user SET userName=?,userPass=?,userAge=?,userSex=?,userBirth=?,userCity=?,userHobby=? WHERE userId = ?',
    [user.userName, user.userPass, user.userAge, user.userSex, userBirth, user.userCity, user.userHobby, user.userId,], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.send({ success: true, message: "修改成功" });
      }
    });
});

// 获取当前登录用户信息路由
app.get('/admin/index/user/current', function (req, res) {
  client.query('SELECT * FROM user', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results[0]);
    }
  });
});

// 更新当前登录用户信息路由
app.post('/admin/index/user/current/edit', function (req, res) {
  var user = req.body;
  client.query('UPDATE user SET userName=?,userPass=?,userAge=?,userSex=?,userBirth=?,userCity=?,userHobby=? WHERE userId = ?',
    [user.userName, user.userPass, user.userAge, user.userSex, user.userBirth, user.userCity, user.userHobby, user.userId], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.send({ success: true, message: "修改成功" });
      }
    });
});

// 获取管理员信息路由
app.get('/admin/index/admin', function (req, res) {
  client.query('SELECT * FROM admin', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

//获取音乐信息路由
app.get('/admin/index/music', function (req, res) {
  client.query('SELECT * FROM music', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

// 修改音乐信息路由
app.post('/admin/index/music/edit', function (req, res) {
  var music = req.body;
  var musicDate = moment(music.mDate).format('YYYY-MM-DD'); // 转换为正确的日期格式
  client.query('UPDATE music SET mName=?, mCate=?, mAlbu=?, mSinger=?, mPopu=?, mDate=?, mText=?, mFile=? WHERE mId = ?',
    [music.mName, music.mCate, music.mAlbu, music.mSinger, music.mPopu, musicDate, music.mText, music.mFile, music.mId], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.send({ success: true, message: "修改成功" });
      }
    });
});

//添加音乐信息路由
app.post('/admin/index/music/add', function (req, res) {
  var music = req.body;
  client.query('INSERT INTO music (mName, mCate, mAlbu, mSinger, mPopu, mDate, mText, mFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [music.mName, music.mCate, music.mAlbu, music.mSinger, music.mPopu, music.mDate, music.mText, music.mFile], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.send({ success: true, message: "添加成功" });
      }
    });
});

//删除音乐信息路由
app.post('/admin/index/music/delete/:mId', function (req, res) {
  var mId = req.params.mId;
  client.query('DELETE FROM music WHERE mId = ?', [mId], function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.send({ success: true, message: "删除成功" });
    }
  });
});


//获取音乐信息发布路由
app.get('/admin/index/mSong', function (req, res) {
  client.query('SELECT * FROM msong', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

// 修改音乐信息发布路由
app.post('/admin/index/mSong/edit', function (req, res) {
  var { mSongid, mSongtitle, mSongartist, mSongalbum, mSongtime } = req.body;
  client.query('UPDATE msong SET mSongtitle=?, mSongartist=?, mSongalbum=?, mSongtime=? WHERE mSongid=?',
    [mSongtitle, mSongartist, mSongalbum, mSongtime, mSongid], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.json({ code: 0, message: '更新成功' });
      }
    });
});

// 添加音乐信息发布路由
app.post('/admin/index/mSong/add', function (req, res) {
  const { mSongtitle, mSongartist, mSongalbum, mSongtime } = req.body;
  client.query('INSERT INTO msong (mSongtitle, mSongartist, mSongalbum, mSongtime) VALUES (?, ?, ?, ?)',
    [mSongtitle, mSongartist, mSongalbum, mSongtime], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.json({ code: 0, message: '添加成功' });
      }
    });
});

// 删除音乐信息发布路由
app.post(`/admin/index/mSong/delete/:mSongid`, function (req, res) {
  var mSongid = req.params.mSongid;
  client.query('DELETE FROM msong WHERE mSongid = ?', [mSongid], function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json({ code: 0, message: '删除成功' });
    }
  });
});


//获取留言信息路由
app.get('/admin/index/message', function (req, res) {
  client.query('SELECT * FROM message', function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

//处理前台提交的留言信息
app.post('/admin/index/message', function (req, res) {
  var messageContent = req.body.messageContent;
  client.query('INSERT INTO message (messageContent) VALUES (?)', [messageContent], function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.json(results);
    }
  });
});

//后台回复留言
app.post(`/admin/index/message/reply`, function (req, res) {
  var message = req.body;
  client.query(`UPDATE message SET messageContent=?, messageRes=? WHERE messageId = ?`,
    [message.messageContent, message.messageRes, message.messageId], function (err, results) {
      if (err) throw err;
      else {
        // 发送响应数据
        res.json(results);
      }
    });
});

app.listen(3000, function () {
  console.log("启动成功，服务器地址 http://127.0.0.1:3000/login");
  console.log("前台 http://127.0.0.1:3000/user/index");
  console.log("后台 http://127.0.0.1:3000/admin/index");
});
