var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
// var lost = require('lost');



gulp.task('sass', function() {
    var processors = [
            lost,
            autoprefixer({browsers:'last 2 version'})
    ];
    return gulp.src('package/src/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('package/src/css'))
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('package/src/scss/**/*.scss', ['sass']);
    gulp.watch('package/src/*.html', browserSync.reload);
    gulp.watch('package/src/js/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'package/src'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('package/src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('package/dist'))
});
/* Step here */
