var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanDest = require('gulp-clean-dest');
var notify = require('gulp-notify');

//server
    gulp.task('serv', function(){
        gulp.src('./app')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
    });
    //styles
gulp.task('styles', function(){
    return gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(uncss({
        html: ['./app/*.html', './app/**/*.html']
    }))
    .pipe(gulp.dest('./app/css'));
});
    //build
gtlp.task('build', function(){
    return gulp.src('./app/index.html')
    .pipe(cleanDest('dist'))
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', csso()))
    .pipe(gulp.dest('dist'))
})
//watchers
    gulp.task('watch', function () {
        gulp.watch('./app/sass/**/*.sass', ['styles']);
    })
    