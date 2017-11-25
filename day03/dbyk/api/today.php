<?php

        //后台发送请求
        //https://moment.douban.com/api/stream/date/2016-08-20?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6

        $date=$_GET['date'];
        //注意需要在phh.ini中配置把extension=php_openssl.dll前面的;删掉
         //2017-11-24 客户端需要给一个这样的格式.
        $data=file_get_contents("https://moment.douban.com/api/stream/date/".$date."?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6");

        echo $data;

?>