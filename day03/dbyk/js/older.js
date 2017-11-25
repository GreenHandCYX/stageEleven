yike.controller('olderController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){

      //需要控制一下全局的loading图片
      $rootScope.loaded = false;
      //给页面一个标题
      $rootScope.title="往期内容";
  
     
      //当前日期
      $scope.date = '2016-11-25' 

    $http({
        method:'get',
        url:'./api/older.php',
        params:{
            date:'2016-11-25'
        }
    }).success(function(data){
        $rootScope.loaded = true;
        $scope.data = data
    })
}])