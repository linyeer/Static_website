window.onload=function()//网页加载完毕后立刻执行
        {
            document.getElementById("form").onsubmit=function()
            {
                return checkUsername() && checkPassword();
            };
            document.getElementById("username").onblur=checkUsername;
            document.getElementById("password").onblur=checkPassword;
        };
        function checkUsername()//验证用户名
        {
            var username=document.getElementById("username").value;
            var reg_username=/^\w{6,12}$/;/*正则表达式，表示6-12个英文字符*/
            var flag=reg_username.test(username);
            var s_username=document.getElementById("s_username");
            if(flag)
            {
                s_username.innerHTML="<img width='35' height='25' src='#'>";
            }
            else
            {
                s_username.innerHTML="用户名格式有误";
            }
            return flag;
        }  
        function checkPassword()//验证密码
        {
            var password=document.getElementById("password").value;
            var reg_password=/^\w{6,12}$/;
            var flag=reg_password.test(password);
            var s_password=document.getElementById("s_password");
            if(flag)
            {
                s_password.innerHTML="<img width='35' height='25' src='#'>";
            }
            else
            {
                s_password.innerHTML="密码格式有误";
            }
            return flag;
        }