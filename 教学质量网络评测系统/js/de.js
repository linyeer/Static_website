        function check(thisform)
        {
            var name=document.getElementById("name").value;
            var pass=document.getElementById("pass").value;
            var num = document.getElementById("people").value 
            if ((name=="ye" && pass=="123" )&& (num==1))
            {
                alert("学生登录成功！");
                window.document.f.action="index_stu.html";  //此处设置登录后跳转页面
                window.document.f.submit();
            }
            else if ((name=="ywb" && pass=="123" )&& (num==2))
            {
                alert("管理员登录成功！");
                window.document.f.action="index_adm.html";  //此处设置登录后跳转页面
                window.document.f.submit();
            }
            else
            {
                alert("用户名或密码错误！或者权限越界！！");
            }
        }