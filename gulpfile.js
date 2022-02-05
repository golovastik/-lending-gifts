var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync')


gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
})
gulp.task('sass', function(){
    return gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
})


gulp.task("build", gulp.series('html', 'sass', function(){
    browserSync.init({
        server: "build"
    });
    gulp.watch("scss/**/*.scss", gulp.parallel("sass"))
    gulp.watch("*.html", gulp.parallel('html'))
}))
