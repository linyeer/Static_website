var date = null;
        date = setTimeout(time, 500); //开始运行
        function time()
        {
            clearTimeout(date); //清除定时器
            dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth()+1;
            var day = dt.getDate();
            var h = dt.getHours(); 
            var m = dt.getMinutes(); 
            var s = dt.getSeconds(); 
            document.querySelector(".time").innerHTML=y +"年" +mt + "月" +day +"日"+ "-" +h +"时" +m +"分" +s +"秒";
            t = setTimeout(time, 1000); //定时器，循环运行
        }

        var index = 1;
        function lunbo()
        {
            index ++ ;
                if(index > 3)
                {
                    index = 1;
                }
            var img = document.getElementsByClassName("banner_left")[0];//获取img对象
            img.style.background = "url(images/"+index+".png)";
            img.style.backgroundSize="100% 100%";   
        }         
        setInterval(lunbo,3000); //定义定时器