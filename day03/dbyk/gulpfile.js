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