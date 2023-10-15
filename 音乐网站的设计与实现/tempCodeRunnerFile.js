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
  [user.userName,user.userPass,user.userAge,user.userSex,user.userBirth,user.userCity,user.userHobby,id,], function (err, results) {
    if (err) throw err;
    else {
      // 发送响应数据
      res.send({ success: true, message: "修改成功" });
    }
  });
});