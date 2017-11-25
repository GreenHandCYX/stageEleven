

//引入angular模块和angular路由
var yike = angular.module('app',['ngRoute'])


//1.获取导航数据
yike.controller('navsController',['$scope','$http',function($scope,$http){
    //此处是模拟数据
    //将模拟数据渲染到页面上形成导航
    $scope.navs=[
        {"text":"今日一刻","link":"/today","icon":"icon-home"},
        {"icon":"icon-file-empty","text":"往期内容","link":"/older"},
        {"icon":"icon-pencil","text":"热门作者","link":"/author"},
        {"icon":"icon-menu","text":"栏目浏览","link":"/category"},
        {"icon":"icon-heart","text":"我的喜欢","link":"/favourite"},
        {"icon":"icon-cog","text":"设置","link":"/setting"}
    ]
}])



//2.导航点击动画,因为是所有页面共享的，所以需要将相关操作挂载到根作用域上$rootScope
yike.run(['$rootScope',function($rootScope){
    $rootScope.collapsed = false;
    $rootScope.toggle = function(){
        $rootScope.collapsed = !$rootScope.collapsed


        //左侧导航的渐次推入与隐藏动画
        var navs = document.querySelectorAll('.navs dd');
        if($rootScope.collapsed){
            //从上到下渐次出现
            for(var i=0;i<navs.length;i++){
                navs[i].style.transform = 'translate(0)'
                //动画运行时间
                navs[i].style.transitionDuration = '0.6s';
                //动画延时时间
                navs[i].style.transitionDelay = 0.22 * (i+1) +'s';
                
            }
        }else{
              //从下到上渐次隐藏
              for(var i=0;i<navs.length;i++){
                navs[i].style.transform = 'translate(-100%)'
                //动画运行时间
                navs[i].style.transitionDuration = '0.6s';
                //动画延时时间
                navs[navs.length-i-1].style.transitionDelay = 0.22 * (i+1) +'s';
                
                }
        }
        
    }
}])



//3.配置路由
yike.config(['$routeProvider',function($routeProvider){
    $routeProvider.when("/today",{
            templateUrl:"tmp/today.html",
            //需要获取请求数据渲染至页面
            //先将控制器与视图相绑定,然后关联到$scope上，请求数据后就可在对应视图中使用数据了
            controller:"todayController"
    }).when("/older",{
        templateUrl:'tmp/older.html',
        controller:'olderController'
    }).when("/author",{
        templateUrl:'tmp/author.html',
        controller:'authorController'
    }).when("/category",{

    }).when("/favourite",{

    }).when("/setting",{

    }).otherwise({
            redirectTo:"/today"
    })
}])

