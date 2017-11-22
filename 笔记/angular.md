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







