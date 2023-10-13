        function check(thisform)
         {
            var name=document.getElementById("name").value;
            var pass=document.getElementById("pass").value;   
            if (name=="ye" && pass=="123" || name=="ywb" && pass=="123")
             {
                alert("登录成功！");
                window.document.f.action="index.html";  //此处设置登录后跳转页面
                window.document.f.submit();
            }
            else
            {
                alert("用户名或密码错误！");
            }
        }