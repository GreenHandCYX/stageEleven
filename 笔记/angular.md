# Angular是Google开发的MVC框架，以数据和逻辑为核心





angular是模块化的,vue是组件化的

angular的单向数据绑定基于中间的控制层controller即mvc设计模式，也可实现mvvm的双向绑定

vue的双向数据绑定是基于MVVM设计模式的





# mvc和mvvm的区别:

mvc只能实现model的数据流向到视图,单向的数据传递

mvvm能够实现model的数据流向到视图,也能实现视图的数据流向model,双向的数据绑定







# angular与jquery的区别:

angular是以数据与逻辑为核心的 jquery 是以dom 操作为核心







# angular 的优点:

模块化， 双向数据绑定 ，指令 ，过滤器， 依赖注入， 服务， spa(单页面应用)

> 1:模块化 angluar 里面以模块化的方式组织代码  angular.module()
> 2: 使用mvc 的思想去对页面编写的代码进行分层





# angular的初始应用:

```vue
<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="libs/angular.min.js"></script>
    <script>
        //mvc:数据流向控制层再流向视图层
        
        //标签内的ng-app用于限制angular应用的边界
        //ng-controller用于将视图与控制器进行关联


        //angular的module指angular以模块的方式组织代码

        //第一个参数为作用模块，第二个参数为依赖模块
        var App = angular.module('app',[])
        //初始化控制器同时与模型层$scope进行关联
        App.controller('appController',['$scope',function($scope){
            $scope.msg = 'haha'
        }])
    </script>
</head>
<body ng-controller="appController">
    {{msg}}
</body>
</html>
```









# angular的指令: 

每个指令对应到angular 里面都会编译成一个方法. 也是angular 的api，只不过api 的形式以指令的方式给我们提供

## 1.内置指令:

1)ng-repeat遍历数组

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./libs/angular.min.js"></script>
    <script>
        var App = angular.module('app',[]);
        App.controller('appcontroller',['$scope',function($scope){
            $scope.lists = [
            {
                username:"小梅",
                age:40
            },
            {
                username:"小旋风",
                age:18
            }
             ]
        }])
    </script>
</head>
<body>
    <div ng-app="app" ng-controller="appcontroller">
       <table>
            <tr>
                <td>序号</td>
                <td>姓名</td>
                <td>年龄</td>
            </tr>
            <tr ng-repeat="item in lists">
                <!-- angular内置隐士变量$index代指每一项的索引 -->
                <td>{{$index}}</td>
                <td>{{item.username}}</td>
                <td>{{item.age}}</td>
            </tr>
       </table>      
    </div>  
</body>
</html>
```



2)ng-bind,ng-bind-template,ng-cloak解决数据渲染闪烁问题

数据渲染闪烁问题：一般渲染时会先出现{{username}}然后才会渲染对应的数据

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./libs/angular.min.js"></script>
    <script>
        var App = angular.module('app',[]);
        App.controller('appcontroller',['$scope',function($scope){
          $scope.username = 'cyx'
          $scope.age =22;
        }])
    </script>
</head>
<body ng-app="app" ng-controller="appcontroller">
        <!-- {{username}} -->
      <!--
            原则上来说，原始的插值表达式会出现闪烁问题
            页面先出现{{username}} 然后被解析之后再出现宝马老赵
        -->

        <!-- 解决方式: -->
        <!-- 绑定单个变量 -->
        <p ng-bind="username"></p>
        <!-- 绑定多个不太多的变量 -->
        <p ng-bind-template="{{username}}===>{{age}}"></p>
        <!--如果数据非常之复杂，不能把要获取的属性都写ng-bind-template="{{username}}===>{{age}}" -->
        <!-- ng-cloak 指令 解决这个闪烁问题 这是一个无值指令
        但是这个指令angular 经过测试数据较多时并不能解决闪烁问题，所以就是angular 的bug
        -->
        <p ng-cloak>{{username}}{{username}}{{username}}{{username}}{{username}}{{username}}{{username}}{{username}}</p>
</body>
</html>
```



3)ng-show,ng-hide,ng-if

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
        /*
        * angular 给我们提供了双向数据绑定，不用解析数据，不用自己从页面上面获取数据.
        * 操作dom ，angular 内部去进行操作了
        * */
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){

        }]);

    </script>
</head>
<body ng-app="app" ng-controller="appController">
        <!--
        这个指令底层肯定是对应一个方法，这个方法用来控制这个元素是否显示.
        对应底层是angular 的方法，然后它里面对应的是dom 操作
        -->
        <p ng-show="false">我是老赵</p>
        <!--用来控制元素是否隐藏-->
        <p ng-hide="true">我是鱼儿</p>
        <!--这个也是用来控制元素是否显示以及隐藏-->
        <p ng-if="false">我是花无缺</p>
        <!--他们的区别
        ng-show   ng-hide 底层是修改当前元素的display 属性样式
        ng-if 使用用来是否删除当前元素
        -->
</body>
</html>
```



4)ng-src,ng-href解决两次请求

```vue
<!DOCTYPE html>
<html lang="en" ng-app="app" ng-controller="appController">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <link rel="stylesheet" ng-href="{{href}}">
    <script>
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){
                $scope.src="images/author.jpg";
                $scope.href="css/main.css";
        }]);
    </script>
</head>
<body  >
        <!-- 默认情况,会请求两次-->
        <!-- <img src="{{src}}" alt=""> -->
        <!--
                因为浏览器先解析   <img src="{{src}}" alt=""> 把{{src}} 当成一个普通的字符串处理
                src="{{src}}" 会发送两次请求.
                最后angular 进行解析
                我们就需要使用 ng-src 去 获取数据
                ng-href 指令 引入样式文件
                ng-href 指令 与 ng-src 都是用来解决发送两次请求的问题的

        -->
        <img ng-src="{{src}}"   alt="">

        <li>hello world !</li>
</body>
</html>
```



5)ng-class

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <style>
            .active{
                  width: 200px;
                  height: 200px;
                  background-color: pink;
            }
    </style>

    <script>
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){
        }]);
    </script>
</head>
<body ng-app="app" ng-controller="appController">
      <!--
           ng-class用来控制是否添加某个类
           有两种传值方式:
           1.字符串,需要传入的active是一个字符串
           2.对象
      -->
      <div ng-class="'active'"></div>
      <br>
      <div ng-class="{active:true}"></div>
      </div>
</body>
</html>
```



6)ng-include

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){

        }]);
    </script>
</head>
<body ng-app="app" ng-controller="appController">
        <!--
               ng-include以ajax的方式加载其他页面，
               注意：1.可能引起跨域问题
                    2.传入的值要求是一个字符串
        -->
        <div ng-include="'./template/demo.html'"></div>
</body>
</html>
```





7)ng-disabled,ng-selected,ng-checked,ng-readonly

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){

        }]);


    </script>
</head>
<body ng-app="app" ng-controller="appController">
        <!--
          指令用来控制表单的无值属性
          disabled
          selected
          readonly
          checked
        -->
        <input type="text" ng-disabled="true">
        <input type="text" ng-readonly="true">
        <input type="checkbox" ng-checked="true">
        <select name="" id="">
            <option value="">小旋风</option>
            <option value="">没嗯好</option>
            <option value="" ng-selected="true">孙杰</option>
        </select>
</body>
</html>
```



8)ng-事件

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>angular 模板</title>
            <script src="libs/angular.min.js"></script>
            <script>
                var App=angular.module("app",[]);
                App.controller("appController",["$scope",function($scope){
                    $scope.active=true;
                    $scope.change=function(active){
                        console.log(123)
                    }
                }]);
        
        
            </script>
        </head>
        <body ng-app="app" ng-controller="appController">
             <!--
                    我们为元素添加事件，我们可以使用自带的onclick  onblur onfocus
                 我们也可以使用angular 帮助我们封装的约束去编写事件
                    ng-click 为当前元素添加点击
                    ng-submit 提交
                    ng-keyup
                  
                  注意: 1.假设使用ng- 添加的 事件，事件对应的函数必须绑定在当前视图关联的控制器
               对应的模型上面
                       2.即使不传值，调用时也必须加括号,这点不同于vue
                   我可以在change 里面去添加一些参数
             -->
             <input type="button" value="按钮" ng-click="change()">
        </body>
        </html>
</body>
</html>
```





## 2.自定义指令

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
        var App=angular.module("app",[]);
        App.controller('appController',['$scope',function($scope){

        }])
        //angular模块化时返回的对象提供了一个自定义指令的方法direactive
        //第一个参数指指令的名称,第二个是一个匿名函数返回对指令的设置
        App.directive('myMark',function(){
            return {
                replace:true,//是否替换原有的标签
                restrict:'ECMA',//规定指令的使用方式ECMA
                //(E:element元素,C:class类,M:mark注释,A:attribute属性)
                template:'<h1>now</h1>'//替换内容
            }
        })
        
    </script>
</head>
<body ng-app="app" ng-controller="appController">
     <!-- 1.在中元素使用 -->
     <!-- 注意：驼峰命名时应用-隔开 -->
     <my-mark></my-mark>

     <!-- 2.在类中使用 -->
     <div class="my-mark"></div>

     <!-- 3.在注释中使用  注意:必须加directive:并且后面必须有空格-->
     <!-- directive:my-mark  -->

     <!-- 4.在属性中使用 -->
     <div my-mark></div>
</body>
</html>
```







# angular的作用域

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
        var App=angular.module("app",[]);
        App.controller("appController",["$scope",function($scope){
                $scope.username="老赵的女朋友还在娘家养着";
        }]);
        App.controller("appController1",["$scope",function($scope){
                //$scope.username="老赵的鱼儿去世了";
        }]);
        App.controller("appController2",["$scope",function($scope){
                $scope.username="老赵的宝马";
        }]);


    </script>
</head>
<body ng-app="app" ng-controller="appController">
        <!--
                通常AngularJS中应用（App）是由若干个视图（View）组合成而成的 ，
                而视图（View）又都是HTML元素，并且HTML元素是可以互相嵌套的
                另一方面视图都隶属于某个控制器（Controller），进而控制器之间也必然会产生嵌套关系。


                $scope  上面是绑定了数据的，限制了数据的访问范围

                我们把最顶层ng-controller 关联的$scope 叫做根作用域
                根作用域的数据在应用的所有范围内都会被共享，以后全局的数据就绑定在根作用域上面.
        -->
        {{username}}
        <div ng-controller="appController1">
                <p>{{username}}</p>
                <div ng-controller="appController2">
                    <p>{{username}}</p>
                </div>
        </div>
</body>
</html>
```



# 顶级作用域设置共享数据

```vue
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>angular 模板</title>
        <script src="libs/angular.min.js"></script>
        <script>
            var App=angular.module("app",[]);
            App.controller("appController",["$scope",function($scope){
    
            }]);
    
    
        </script>
    </head>
    <!--
        ng-init rootScope 上面绑定公有数据
        注意：数据的格式必须是key=value;key2=val2
    每个指令的值具体传递什么样的参数，跟他内部的解析有关系.
    -->
    <body ng-app="app" ng-controller="appController" ng-init="username='cyx';age=22">
            {{username}}
            {{age}}
    </body>
    </html>
```







# 过滤器:处理数据

1.内置过滤器(9个)

filter,orderBy,number,date,currency,uppercase,lowercase,json,limitTo

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./libs/angular.min.js"></script>
    <script>
        var App = angular.module('app',[])
        App.controller('appController',['$scope',function($scope){
            $scope.price = 11.111
            $scope.birth = new Date
            $scope.name = 'cyx'
            $scope.list=[{username:"柴益新",age:21},{username:"老段",age:39},{"username":"汪磊",age:21}]
            $scope.numbers=[11,22,44,21,31];
        }])
    </script>
</head>
<body ng-app="app" ng-controller="appController">
    <!-- 1.处理货币 -->
    <!-- 有两个参数：第一个参数指货币格式，第二个参数指小数的精确度，不足补0 -->
    {{price | currency:'&yen;':4}}
    <br>
    <!-- 2.处理时间 参数为时间格式(较为随意)-->
    {{birth | date:'yyyy-MM-dd HH小时mm分钟ss秒'}}
    <br>
    <!-- 3.截取字符串 -->
    <!-- 
        第一个参数，截取几位
        第二个参数，从第几个索引值开始
     -->
    {{name | limitTo:1:0}}
     <br>
     <!-- 4.在给定数组中选择满足条件的一个子集组成一个新数组，
        其条件可以是一个字符串、对象、函数 
        注:若是一个对象则后面必须添加一个空格 
    -->
    {{list | filter:{age:21} }}
    <br>
    <!-- 5.排序 -->
    <!-- -默认是升序
    orderBy 方法接收两个参数
            1:第一个参数排序依据的关键字段
            2: true（降序）/false(升序) -->
    {{numbers | orderBy:'':true}}
</body>
</html>
```



2.在js中使用内置过滤器

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
          var App=angular.module("app",[]);
          App.controller("appController",["$scope",'$filter',function($scope,$filter){
            $scope.list=[{username:"柴益新",age:21},{username:"老段",age:39},{"username":"汪磊",age:21}]
            $scope.deal = function(){
                //在js中使用过滤器需要
                //1.先依赖注入angular提供的$filter方法,这个方法在传入指定过滤器名时会返回其对应函数体
                var fun = $filter('filter');//引入filter过滤器
                //2.执行过滤器函数，参数第一个为需要过滤的数据,第二个为过滤器的条件
                //返回处理结果
                var res = fun($scope.list,{
                    age:21
                })
                $scope.list = res
            }
           
          }]);


    </script>
</head>
<body ng-app="app" ng-controller="appController">
    {{list}}
    <br>
    调用过滤器处理 <button ng-click="deal()">按钮</button>
    <br>
    
</body>
</html>
```

3.自定义过滤器

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
          var App=angular.module("app",[]);
          App.controller("appController",["$scope",function($scope){
         
          }]);

          //通过App实例的filter方法自定义过滤器
          //第一个参数是过滤器名，第二个参数是过滤器的处理函数
          App.filter('myFilter',function(){
              return function(arg,arg1){
                  //第一个参数是要处理的值，第二个参数开始才是过滤器中传的值
                return arg.split("").reverse().join("")+arg1
              }
          })

    </script>
</head>
<body ng-app="app" ng-controller="appController">
 
    {{'I am cyx' | myFilter:'hello world'}}
</body>
</html>
```





# 依赖注入（借助后台的一些概念）

> ## 概念:
>
> 一种设计思想。angular 的每个模块之间是相互独立的（高度解耦），最大的好处就是代码的重用。而我们在做实际的业务开发的时候，我们往往是需要调用angular 的这些模块的功能进行开发。而要使用angular 的模块，就必须注入angular 的模块，我们把这种思想叫做依赖注入
>
> ## 分类:
>
> ### 1.行内式注入(常用):
>
> controller方法的第二个参数是一个数组（可同时注入并设置对应的回调函数中的形参，这个形参只要顺序正确即可）
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //angular中使用某个功能模块则必须注入
>           //行内式注入:
>           //controller第二个参数为一个数组,并且注入的模块的形参只需保证顺序即可
>           App.controller("appController",["$scope",function($s){
>             $s.msg = 'ss'
>           }]);
>
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>     {{msg}}
> </body>
> </html>
> ```
>
> ### 2.推断式注入:
>
> controller的第二个参数是一个函数,以函数的形参注入对应模块，而且这个形参必须与anglar所需模块的名称一致
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //angular中使用某个功能模块则必须注入
>           //推断式注入:
>           //controller第二个参数为一个函数,模块以函数的参数注入，所以必须与所用的模块名一致
>
>
>           // 如果我使用webpack，它可以把这些js 代码进行压缩处理 形参就会变成简写形式
>           // 推断式注入，angular 就找不到对应的模块，就会报错.
>           App.controller("appController",function($scope){
>             $scope.msg = 'ss'
>           });
>
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>     {{msg}}
> </body>
> </html>
> ```
>
> 
>
> ### 注:如果使用webpack对js进行压缩，形参会被压缩（形参名会更改），所以推断式就会报错，所以一般用行内式
>
> 





# 服务：

## 概念:

就是对外提供功能，使用这些功能(服务)就是将对应模块进行注入

指除angular提供的 双向数据绑定,指令(操作dom),过滤器(处理数据) 其它的一些开发需求就都是以服务的形式对外提供

## 内置服务:

> ### 1.$location封装了浏览器的bom对象
>
> 用来进行浏览器地址栏的相关操作,可用来处理单页应用的路由参数
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //使用某个服务也需要注入该模块
>           App.controller("appController",["$scope",'$location',function($scope,$location){
>             //$location的api
>             //获取浏览器地址的相关信息的: 协议，主机地址，端口，绝对地址，请求参数，锚点值
>             console.log($location);
>             console.log($location.protocol());//返回地址栏的协议 
>             console.log($location.port()); //返回端口
>             console.log($location.search())//返回地址栏?后的请求参数，第一个# 号后面的参数.
>             console.log($location.absUrl());//返回绝对地址
>             console.log($location.hash());//返回锚点值，获取的是第二个# 后面的内容.
>
>           
>           }]);
>
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> ### 2.$http用来发送ajax请求，封装了XMLHttpRequest的方法
>
> - get请求（使用params传递参数）
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //使用某个服务也需要注入该模块
>           App.controller("appController",["$scope",'$http',function($scope,$http){
>                 $http({
>                     method:'get',
>                     url:'./api/angularget.php',
>                     params:{
>                         user:'cyx'
>                     }
>                 }).success(function(data,status,info,request){
>                     //data指请求的服务端发来的消息
>                     console.log(data)
>                     //status指服务器响应回来的状态码200
>                     console.log(status)
>                     //info返回一个function,调用得到响应的相关信息
>                     console.log(info())
>                     //request返回一个function。调用得到请求的相关信息
>                     console.log(request)
>                 }).error(function(){
>                     //出错的时候调用
>                 })
>           
>           }]);
>
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> 
>
> - post请求（使用data传递参数并需要设置请求头,(要求参数传递的格式必须是key=val&key1=val1)）
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //使用某个服务也需要注入该模块
>           App.controller("appController",["$scope",'$http',function($scope,$http){
>                 $http({
>                     method:'post',
>                     url:'./api/angularpost.php',
>                     //参数需要通过data传递(要求参数传递的格式必须是key=val&key1=val1)，
>                     data:"username=cyx&age=20",
>                     //并且需要设置请求头
>                     headers:{
>                         'Content-Type':'application/x-www-form-urlencoded'
>                     }
>                 }).success(function(data,status,info,request){
>                    console.log(data)
>                 }).error(function(){
>                     //出错的时候调用
>                 })    
>           }])
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> 
>
> - jsonp请求（需要在params设置callback:'JSON_CALLBACK'）
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //使用某个服务也需要注入该模块
>           App.controller("appController",["$scope",'$http',function($scope,$http){
>                 $http({
>                     method:'jsonp',
>                     url:'https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&fields=word&word=1',
>                     //需要发送一个请求参数callback以返回该函数的执行
>                     params:{
>                         callback:'JSON_CALLBACK'
>                     }
>                 }).success(function(data,status,info,request){
>                    console.log(data)
>                 }).error(function(){
>                     //出错的时候调用
>                 })  
>           }]);
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> 
>
> - cors请求，服务器设置响应头(Access-Control-Allow-Origin :*)
>
>
>
> ### 
>
> ### 3.$log处理客户端日志,封装的是console，比console.log()的兼容性更好
>
> 日志处理. 日志记录项目在运行时的一些信息（通过日志记录用户的一些行为）记录用户的行为之后，通过分析用户的行为，判断用户的一些爱好，然后给推荐
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>           var App=angular.module("app",[]);
>           //使用某个服务也需要注入该模块
>           App.controller("appController",["$scope",'$log',function($scope,$log){
>             //日志级别
>                 $log.log("打印的");
>                 $log.info("消息");
>                 $log.warn("警告");
>                 $log.error("错误");
>                 $log.debug("调试");//chrome浏览器有兼容问题，一般不显示
>           }]);
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> 
>
> ### 4.$interval (定时器)
>
> ### 5.$timeout(延时器)
>
> ### 6.$filter(可以在模板中调用，也可以服务的形式注入后在controller方法中调用)



## 自定义服务

扩展angular的功能，angular 自带的服务满足不了需求：也可以把jquery插件等封装在服务里

### 自定义服务的三种方式:

#### 1.service(内部可以利用apply,call将this指向为当前服务)

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
          var App=angular.module("app",[]);
          //使用App.service来定义一个服务
          //第一个参数为服务名,第二个参数为服务的功能，
          //通过this绑定该服务的一些方法,本来这里this应该指向window,但是service内部调用call和applay将this指向当前服务
        App.service('myService',function(){
            this.getCurrentTime=function(){
                     console.log("cyx");
            }
            this.getCurrentTimeByStyle=function(arg1){
                console.log(arg1);
            }
        })

        //同样使用该服务需要注入
          App.controller("appController",["$scope","myService",function($scope,myService){
                myService.getCurrentTime()
                myService.getCurrentTimeByStyle(111)
          }]);
    </script>
</head>
<body ng-app="app" ng-controller="appController">
    
</body>
</html>
```



#### 2.factory

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
          var App=angular.module("app",[]);
          //使用App.factory来定义一个服务
          //第一个参数为服务名,第二个参数为服务的功能，
          //以工厂模式返回该服务的方法所组成的对象
        App.service('myService',function(){
            return {
                reverseStr:function(str){
                        return str;
                }
            }
        })

        //同样使用该服务需要注入
          App.controller("appController",["$scope","myService",function($scope,myService){
              $scope.str = myService.reverseStr('cyx')
          }]);
    </script>
</head>
<body ng-app="app" ng-controller="appController">
    {{str}}
</body>
</html>
```



#### 3.value(定义常量)









# 模块加载(angular的解析顺序)

## angular的解析顺序：

![Snipaste_2017-11-23_21-51-08](D:\myProjectRoot\github\stageEleven\笔记\img\Snipaste_2017-11-23_21-51-08.png)

```
1: 浏览器去解析dom 树直至解析完毕
2: 遇到angular.js ,执行angularjs 里面的代码 ，这个里面有一个事件 DOMContentLoaded 事件
3：这个事件等待页面上面所有的dom 绘制完毕才执行之后的代码
4: 启动angular 应用，angular 的执行开始
5: angular 开始解析dom 树
6: 执行（配置和运行） 一个软件都有配置，执行配置文件。但是我这里有配置没有配置文件。angular提供一些api 给我们配置
7：angular 它里面有一些组件（模块），对这些模块进行初始化
8: 开始寻找ng-app 指令，寻找应用边界，angular 需要管理页面上面那些东西
9: 查找模块之间的依赖 angular.module("app",[""]) 查找这个模块的依赖关系
10:遍历dom 树，搜集指令  通过选择器 去搜集指令 document.querySelecotrAll("")因此也就不支持ie678 ng- 开头
11:执行每个指令对应的函数(指令就是函数)
12:处理dom 转换，编译模板 （将dom 上面的模板转换成视图显示）
13:双向数据绑定（监听$scope 上面的改变，如果发生改变，更新视图）
```

​	



### 1.配置（配置angular模块对应的功能即服务，就需要将这个服务的服务提供者注入config方法中来配置）

> ​	如:http(服务)--->$httpProvider(服务提供者)$，log (服务) ------> 服务提供者 ($logProvider)$ filter (服务)----> 服务提供者(filterProvider)
>
> ​	通过config 去配置(参数必须是一个数组)
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>         var App=angular.module("app",[]);
>
>         //通过config 去配置(参数必须是一个数组)，注入对应服务的服务提供者
>         //配置$log服务，关闭$log.debug()功能
>
>         App.config(['$logProvider',function($logProvider){
>             $logProvider.debugEnabled(false);
>         }])
>    
>         //现在有一个$log 的服务,现在我要配置$log 的服务的功能.
>         App.controller("appController",["$scope","$log",function($scope,$log){
>                  $log.debug("我是这个方法");
>         }]);
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>
> </body>
> </html>
> ```
>
> 
>
> #### 通过配置将自定义的过滤器挂载到$filter上
>
> ```vue
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <title>angular 模板</title>
>     <script src="libs/angular.min.js"></script>
>     <script>
>         var App=angular.module("app",[]);
>
>         //通过config 去配置(参数必须是一个数组)，注入对应服务的服务提供者
>        
>
>         App.config(['$filterProvider',function($filterProvider){
>             $filterProvider.register('myFilter',function(){
>                 //将新增的过滤器挂载到内置$filter上
>                 return function (arg,arg1) {
>                         //arg指传入的值
>                         return arg+arg1;
>                     }
>                 
>             })
>         }])
>    
>        
>         App.controller("appController",["$scope","$filter",function($scope,$filter){
>                 $scope.num = 12;
>                 $scope.res = $filter('myFilter')($scope.num,'cyx');
>         }]);
>
>     </script>
> </head>
> <body ng-app="app" ng-controller="appController">
>     {{res}}
> </body>
> </html>
> ```
>
> 

### 2.运行（设置某个功能的运行方式）

- #### 通常使用某个功能需要注入到对应的controller上,捆绑在一起

```
App.controller("appController",["$scope","$http",function($scope,$http){
}])
```

- #### 单独运行某个angular模块需要App.run来设置运行方式

  ​如:单独运行angular 的$http 模块，检测用户名是否已经登录，如果没有登录，跳转

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <script>
          var App=angular.module("app",[]);
        //通过App.run单独运行一个模块(也就是不需要挂载到controller方法上)
        //注意参数为一个数组，指模块的注入
          App.run(['$http',"$rootScope",function($http,$rootScope){
            $http({
                methods:'get',
                url:'./api/angularget.php',
                params:{
                    user:'cyx'
                }
            }).success(function(data){
                //因为没有controller所以没办法挂载到其对应的$scope上
                //angular应用提供了一个顶级作用域$rootScope可以提供数据共享,相当于在页面内使用ng-init="username='cyx';age=22"
                $rootScope.res = data
            })
          }])
    </script>
</head>
<body ng-app="app" >
    {{res}}
</body>
</html>
```



#  rootScope

>  rootScope根作用域可以不绑定到controller上，直接通过这个rootScope就可以将数据设置到视图上
>
>  angular应用提供了一个顶级作用域$rootScope可以提供数据共享,相当于在页面内使用ng-init="username='cyx';age=22"





# angular功能

> 1.双向数据绑定(避免操作dom的，因为页面太大，操作dom 效率太低)
>
> 2.指令(操作当前元素，通过指令进行操作)
>
> 3.过滤器(数据处理直接可以在视图的模板上面,也减少开发步骤的)
>
> 4.依赖注入(设计思想，模块解耦,最大限度的代码重用)
>
> ​	代码重用
>
> ​		1)：相同的代码提炼方法
>
> ​		2)：有很多的方法被重用，我们将这些方法以对象方式去组织
>
> ​		3)：方法特别多，我们就对这些方法进行分类。
>
> ​		4)：模块化的方式对外提供. 最好是要接口，每个文件相互独立.
>
> 5.服务(其它的一些功能,以对象的方式封装为一个服务,使用时需要注入)
>
> 例:$http({}).success(function(){})
>
> function $http(obj){
>
> ​	return {
>
> ​		success:function(){
>
> ​		}
>
> ​	}
>
> }	
>
> 6.配置 配置angular 服务的功能 每个服务对应一个服务提供者 (它的这些概念，也是借鉴了其它的地方概念（操作系统）)
> 每个软件都可以配置
> 7.运行（angular 的模块我们需要单独运行，单独处理，我们就可以使用run 方法）
>
> ​	1：在页面加载完毕，检测用户名是否存在
>
> ​	2: 我们可以通过run 方法，往$rootScope 上面绑定一些全局的数据，页面多个地方被使用到的数据.







# DOMContentLoaded和onload

> DOMContentLoaded在页面的html和css加载完毕即可执行
>
> onload除html,css还必须等页面图片等加载完毕







# app类型:

> 原生app,混合app,webapp
>
> webapp功能上没有原生app好
>
> 1.原生开发 :工具类app（调用原机硬件(美图秀秀,杀毒软件,in)）
>
> 2.混合开发:内容性app或电商app，不是所有页面都是h5，css3,他还会使用原生(头条,网易,抖音,快手,没拍,西瓜,小火山,陌陌)
>
> 3.webapp：html5页面,微信公众号



# 单页应用spa

单页应用,再打包

> ​	特点:在一个页面完成所有交互
>
> ​		利用ajax实现页面交互
>
> ​	缺点:不利于seo优化
>
> ​		第一次加载性能较慢
>
> ​	优点:方便使用
>
> ​		前后端分离,方便代码的重用
>
> ​	原理:
>
> ​		监听锚点值的改变(onhashchange)，根据锚点值去匹配对应的路由(请求转发)，根据路由的匹配找到对应的路径,根据路径通过ajax加载对应的页面,
>
> ​	具体使用:搭建单页应用,配置路由，各种参数的传递。          
>
> ​	 		1：我们需要引入angular 的整个路由模块,路由模块跟angular.js 文件是分开的，           
>
> ​	 		2：angular的路由模块早期是跟angular.js在一起的，后来为了优化而分离开了，所以需要引入







# 一个单页应用的结构：

> 1.导航的位置 锚点
>
> 2.内容显示的区域ng-view
>
> 3.配置路由

ng-view在angular中指单页应用的视图层

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>angular 模板</title>
    <script src="libs/angular.min.js"></script>
    <!-- 引入路由模块 -->
    <script src="libs/angular-route.js"></script>
    <script>
       /*
         * 改造一个单页面应用
         *      1: 导航的位置 锚点
         *      2：内容显示的区域
         *      3：配置路由
         * */


          //1.注入该应用依赖的路由模块
          var App=angular.module("app",['ngRoute']);
          //2.通过App.config配置路由提供者$routeProvider从而配置路由
          App.config(["$routeProvider",function($routeProvider){
              //通过when处理路由,操作后返回$routeProvider,所以可以链式调用
              //通过otherwise处理when中没有的选项
            $routeProvider.when('/home',{
                //设置一个简单的模板,有这个会覆盖templateUrl
                // template:"<h1>home</h1>",
                //指定要调转的视图
                templateUrl:'./template/home.html'
            }).when('/category',{
                // template:"<h1>category</h1>",
                templateUrl:'./template/category.html',
                controller:'cateController'
            }).when('/cart',{
                // template:"<h1>cart</h1>",
                templateUrl:'./template/cart.html',
                //需要给跳转到的页面传递数据或调用方法，则需给跳转的页面设置controller
                //相当于在cart视图上设置ng-controller，让对应视图关联到对应控制器上
                controller:'cartController'
            }).when('/mine',{
                // template:"<h1>mine</h1>",
                templateUrl:'./template/mime.html'
            }).otherwise({
                //重定向某个路由
                redirectTo:'/home'
            })
          }])


          //将当前主页面的数据关联到指定控制器上，以将请求的数据或方法传给对应视图上
          App.controller('cartController',["$scope","$http",function($scope,$http){
                //这里只是模拟
                console.log("这个是购物车的");
                $scope.cartlist=[
                            "袜子",
                            "鞋子",
                            "帽子",
                            "衣服"
                ]
                $scope.delete=function(id){
                    console.log(id);
                }
          }])


          App.controller("cateController",["$scope","$http",function($scope,$http){
                console.log("这个是分类");
            }])



    </script>
</head>
<body ng-app="app" >
    <ul>
        <li><a href="#/home">首页</a></li>
        <li><a href="#/category">分类</a></li>
        <li><a href="#/cart">购物车</a></li>
        <li><a href="#/mine">我的</a></li>
    </ul>
    <!-- 显示路由切换的数据 -->
    <ng-view>

    </ng-view>
</body>
</html>
```







# 路由传递和接收参数

## 传递参数， 在地址里面设置参数

 设置参数有两种形式


       /category?categoryId=11
       /category/11  

## 接收参数

   接收参数也有两种方式.

      $location.search 只能接收?形式的参数
      $routeParams
       既可以接收?形式的参数
       也可以接收 /category/11 需要在 when("/category/:categoryId/home"



```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="libs/angular.min.js"></script>
    <script src="libs/angular-route.js"></script>
    <script>
      
        var App=angular.module("app",["ngRoute"]);
      
        App.config(["$routeProvider",function($routeProvider){
         
            $routeProvider.when("/home",{
                   templateUrl:"template/home.html",
                   controller:"homeController"
            }).when("/category/:categoryId/:page/home",{
                  templateUrl:"template/category.html",
                  controller:"categoryController"
            }).when("/cart",{
                  templateUrl:"template/cart.html"
            }).when("/mime",{
                  templateUrl:"template/mime.html"
            }).otherwise({
                 redirectTo:"/home"
            })
        }]);

        //去接收数据
        App.controller("categoryController",["$scope","$routeParams",function($scope,$routeParams){
                 //通过$routeParams接收/11/1 对应/:categoryId/:page rest形式的路由参数
                 //,$routeParams也可以接收?后的参数
                console.log($routeParams);//{categoryId: "11", page: "1"}
        }])
        App.controller("homeController",["$scope","$location",function($scope,$location){
                 //通过$location.search()接收?后的参数
                console.log($location.search());//{num:1}
        }])

    </script>
</head>
<body ng-app="app">
<ul>
    <li><a href="#/home?num=1">首页</a></li>
    <!--查询分类 发送参数，参数名，参数值 -->
    <li><a href="#/category/11/1/home">护肤品</a></li>
    <li><a href="#/cart">购物车</a></li>
    <li><a href="#/mine">我的</a></li>
</ul>
<!--使用一个指令  -->
<div  ng-view>

</div>
</body>
</html>
```









# 接口设计:

 1.普通接口形式（传统方式）

​	概念:

​		发送请求参数时:通常是以get方式，参数在地址的后面

​	接口设计方式:

​		http://www.itcast.cn/user?username=zhagnsan&password=11111

2.rest接口形式:（目前很多接口这样设置）

​	概念:

​		发送请求参数时:参数伪装在地址栏中的某个字符串中

​	接口设计方式:

```
 //http://www.itcast.cn/user/?/?
          第一个问号代表的是
                  username
           第一个问号代表的是
                   password
客户端在调用的时候
     http://www.itcast.cn/user/zhangsan/1111
控制层处理时
 http://www.itcast.cn/user/:username/:password
```



​	优点：减少了数据的传输，为了安全设计

​		    尽量避免对外提供username,password字段（避免脱库）







# angular动画

angular基于mvvm,数据会自动流向,除了动画都可以通过angular自身实现

angular提供的jQueryLite可以把当前对象编译为一个jquery对象,这样就可以实现jquery对象的方法了

注意jQueryLite并不等于jquery，它只是jquery的一个简版(如jQLite无animate方法)

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="libs/jquery-1.12.4.js"></script>
    <script src="libs/angular.min.js"></script>
    <style>
        .box{
            width: 200px;
            height: 200px;
            background-color: pink;
        }
    </style>

</head>
<body >

<div class="box"></div>
<script>
    //这个是一个dom 对象
    var dom = document.querySelector('.box');
    //利用angular对象的element方法可以将一个dom对象转为JQLite对象
    var jQLite = angular.element(dom)
    //这样就具有jQLite对象的方法了
    jQLite.css("background","green");
    //但是因为jQLite只是一个简版的jquery，所以没有animate等方法
    //需要在引入angular.js前先行引入jquery，这时jQLite就变成了一个完成的jquery 对象
    jQLite.animate({"marginLeft":"200"},1000);
    //一般在pc 端才会这样结合去使用.


    //移动端通常按以下方式处理
    //angular+原生js 配合css3 去完成动画操作.
    //angular 里面执行动画  通过指令控制是否添加类名，通过类名去调用css3动画.
    
</script>
</body>
</html>
```





动画的实现: 1.pc端:angular+jquery（或jQLite）

​			2.移动端：angular + 原生js +css3动画 +ng-class







# bower(tweet的包管理工具,类似npm)

> 安装：
>
> ​	1.安装node.js环境
>
> ​	2.安装git 环境
>
> ​	3.npm install -g bower全局安装
>
> 命令：
>
> ​	1.bower search ang根据指定关键字在tweet服务器上搜索
>
> # ​	2.bower install  angular 默认是下载tweet上收集的最新的版本
>
> ​		 bower install angular#1.5.8选择具体版本进行下载
>
> ​	3.bower info angular查看服务器上有哪些具体的版本
>
> ​	4.bower uninstall angular 卸载本地的一些包
>
> 
>













# 正向开发,逆向开发



​	



# 代理跨域

服务器不存在跨域,所以访问服务器再由服务器访问跨域网站就可以很好的解决浏览器的跨域问题

在后台服务器php中设置file_get_contents('跨域地址')

##### 注：但是因为file_get_contents请求是https，所以我们必须要对服务器进行配置.

解决方案有3：

1.windows下的PHP，只需要到php.ini中把extension=php_openssl.dll前面的;删掉，重启服务就可以了。

2.linux下的PHP，就必须安装openssl模块，安装好了以后就可以访问了。

3.如果服务器你不能修改配置的话，那么就使用curl函数来替代file_get_contents函数，当然不是简单的替换啊。还有相应的参数配置才能正常使用curl函数。



# 防盗链

> 请求时有时会出现403错误,这是指没有权限访问,这是因为后台加了防盗链处理
>
> 防盗链的原理(Referer请求头,属于http协议的规定):
>
> 向目标网站发送请求时会自带一个Referer请求头(指当前访问的地址),在服务器端会获取到这个请求头自动判断referer中有没有本身的域名
>
> 没有就报403
>
> 
>
> 
>
> ### 解决防盗链:
>
> 1. 伪装请求头
>
>
>    2.不发送请求头,目标服务器也会默认通过
>
> 使用meta标签阻止浏览器已让其不发送请求头,这样目标网站就不会判断也不会报403了
>
>   	<meta name="referrer" content="never">
>
> 
>
> 
>
> ### Referer请求头,属于http协议的规定，市场应用:
>
> ​	1.防盗链
>
> ​	2.广告流量统计,查看广告效果









# 闪烁问题:

1.angular的解决方式

> angular是在有模板的元素上面加一个ng-cloak的指令:
>
> 内部通过angular查找到绑定ng-cloak的元素,然后display:none
>
> 模板解析完成,会自动把绑定ng-cloak的元素改为display:block
>
> 但是:因为浏览器解析要快于angular查找ng-clock的过程，所以还是有闪烁



2.实际用法

> 手动加一个[ng-cloak]{
>
> ​	display:none
>
> }

​	



# 缓存问题:

> ### 概念:
>
> 在改变静态资源时(如js文件)会因为有缓存而即使修改了也不会发生改变
>
> ### 解决方式:
>
> 1.清空缓存
>
> 2.在静态资源请求时在请求地址后加?date=new Date()参数就可以避免缓存
>
> ```vue
> <script>
>   var str = "<script type='text/javascript' src='js/index.js?time="+new Date()+"'><\/script>"+
>       "<script type='text/javascript' src='js/today.js?time="+new Date()+"'><\/script>"+
>       "<script type='text/javascript' src='js/older.js?time="+new Date()+"'><\/script>"+
>       "<script type='text/javascript' src='js/author.js?time="+new Date()+"'><\/script>";
>   document.write(str)
> </script>
> ```



​	



# Gulp

常见构建工具Grunt,Gulp,FIS,webpack

全局安装:(C:\Users\zhuwu\AppData\Roaming\npm 会有 gulp.cmd 命令)

    npm install -g gulp
构建步骤

        1：构建我们的项目
        2：进入我的项目下面的根目录下面
        3: 需要本地安装 实际上需要去下载一些文件
            npm install gulp --save-dev
            node_modules 目录
        4:去构建了，环境已经搭建好了
 利用gulp 的api 给gulp 的插件去分配任务.
        1:介绍gulp 的api 这里的语法就是js 的语法.
                gulp.task 创建一个任务，指令一个任务名称
                gulp.src 我需要构建那些资源，处理那些
                gulp.pipe 管道，我把我的资源通过管道输送给插件让插件进行一些处理
                gulp.dest 插件将我的资源处理了之后输出到那个目录下面去.
        2：gulp 的插件，怎么使用的它的插件（3000多个插件）
                3000多个.
    
        以我的yike 的项目为例进行构建
               1:我需要在我的项目的根目录下面创建一个gulpfile.js 文件 gulpfile 名字是固定的
               2:通过创建这个文件，在这文件里面进行任务的配置.
               3:gulp 命令，会在当前目录下面去寻找一个gulefile.js 的文件.
               4:我需要调用那个任务，传递过去.
        3:使用gulp 的插件来完成构建. 需要下载这个插件
```javascript
//引入局部gulp构建任务
var gulp = require('gulp');

//引入less插件
var less = require('gulp-less')

//引入css 压缩插件
var cssmin=require("gulp-cssmin");
//引入给css加私有前缀的插件
var fixcss=require("gulp-autoprefixer");
//引入压缩html的插件
var htmlmin=require("gulp-htmlmin");
//引入压缩图片的插件
var imagemin=require("gulp-imagemin");


//构建任务
//第一个参数为任务名 也就是在全局执行gulp命令时的任务名
//第二个参数为处理函数
gulp.task('lessmin',function(){
    //gulp.src用于指明要压缩的目标
    //pipe用于将上一处理结果转为下一处理程序
    //dest用于指明处理结果存放的目录
    gulp.src("less/*.less").pipe(less()).pipe(gulp.dest('./release/css'))
})
//一步到位.
gulp.task("fixmin",function(){
    //压缩我的css 代码
    //我要压缩的资源 构建任务失败.
    gulp.src("css/main.css").pipe(fixcss({
            browsers: ['last 2 versions'],
            cascade: false
    })).pipe(gulp.dest("./release"));
});

gulp.task("cssmin",function(){
    //压缩我的css 代码
    //我要压缩的资源
    gulp.src("less/*.css").pipe(cssmin()).pipe(gulp.dest("./release/css"));
});


gulp.task("htmlmin",function(){
   /*
   * 我们需要查看文档的.
   *htmlmin 方法需要去掉空格collapseWhitespace: true
   *removeComments 还需要去掉注释
   * */
   gulp.src("tmp/*.html").pipe(htmlmin({collapseWhitespace: true,removeComments:true})).pipe(gulp.dest("./release/html"))
});

/*图片压缩*/
gulp.task("imagemin",function(){
    gulp.src("images/*.gif").pipe(imagemin()).pipe(gulp.dest("./release/image"))
});
```







# webp

网站图片的性能优化,转为webp格式：https://www.zhihu.com/question/27201061

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。





# 移动端首屏性能优化

http://tgideas.qq.com/webplat/info/news_version3/804/808/811/m579/201412/293834.shtml





# select中使用ng-model的bug

在select标签上使用ng-model会默认创建一个<option value="undefinded">所以需要设置一个<option value="">请选择</option>









# ng-repeat的bug:

若遍历的数组中有重复的值则会报错

解决方式,通过索引遍历

ng-repeat="item in list track by $index"

















# $http  success会自动将请求成的json数据转为对应的数组或者对象