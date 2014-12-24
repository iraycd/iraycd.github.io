
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var progeny = require('gulp-progeny');

var nib = require('nib');


gulp.task("css", function () {
    gulp
    .src("./styl/main.styl")
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function(){
  gulp.watch('./styl/**/*.styl', ['css']);
});

gulp.task('default',['css','watch'])
