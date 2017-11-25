//获取今日一刻的数据
yike.controller('todayController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){
    //这里会产生跨域问题
    //处理方式访问后台php，再通过php访问豆瓣api就不会产生跨域

  

    //需要控制一下全局的loading图片
    $rootScope.loaded = false;
    //给页面一个标题
    $rootScope.title="今日一刻";

    //请求需要一个时间
    var date = new Date();
    date = $filter('date')(date,'yyyy-MM-dd')
    //当前日期
    $scope.date = date  
    $http({
        method:'get',
        url:'./api/today.php',
        //需要一个日期格式
        params:{
            date:date
        }
    }).success(function(data){
        // console.log(data)

        //加载成功让loading图片隐藏
        $rootScope.loaded = true;
        $scope.data = data;
    })
}])