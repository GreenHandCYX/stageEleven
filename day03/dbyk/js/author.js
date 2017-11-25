yike.controller('authorController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
    
          //需要控制一下全局的loading图片
          $rootScope.loaded = false;

    
        $http({
            method:'get',
            url:'./api/author.php'
        }).success(function(data){
            console.log(data)
            $rootScope.loaded = true;
            $scope.data = data
        })
    }])