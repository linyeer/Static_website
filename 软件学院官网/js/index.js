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
            document.querySelector(".time").innerHTML=y +"年" +mt + "月" +day + "-" +h +"时" +m +"分" +s +"秒";
            t = setTimeout(time, 1000); //定时器，循环运行
        }

var index = 0;// index：索引
        function slideShow()// 逻辑控制函数
        {
            index++;
            var a=document.getElementsByClassName("slide");// 类似获取一个元素数组
            if(index>=a.length) index=0;// 防止数组溢出
            for(var i=0; i<a.length; i++)
            {
                a[i].style.display='none';// 遍历每一个元素
            }
            a[index].style.display='block'; // 每次只有一张图片显示
        }
        setInterval(slideShow, 3000); // 定时器，间隔3s切换图片