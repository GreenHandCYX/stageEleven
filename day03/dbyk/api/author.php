<?php
    //本周推荐作者
    $recommend = file_get_contents("https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6");
    //所有作者
    $all = file_get_contents("https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6");
    
    //因为file_get_contents返回的是一个json格式的字符串,所以需要转为对象或数组
    $recommend = json_decode($recommend);
    $all = json_decode($all);
    //创建关联数组将数据合并在一起
    $data = array(
        "recommend"=>$recommend,
        "all"=>$all
    );
    //将数组转为json格式字符串发给请求页面
    echo json_encode($data);
?>