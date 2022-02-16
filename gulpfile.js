
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress')


gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));
})
gulp.task('sass', function () {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
})
gulp.task('allimg', function () {
    return gulp.src('img/*.{png, svg, jpg}')
        .pipe(gulp.dest('build/img'))
})

gulp.task('images', function () {
    return gulp.src('img/*')
        .pipe(imagemin([
            // gulp.imagemin.jpegtran({ progressive: true }),
            // gulp.imageminJpegRecompress({
            //     loops: 5,
            //     min: 65,
            //     max: 70,
            //     quality: 'medium'
            // }),
            // gulp.imagemin.optipng({ optimizationLevel: 3 }),
            // gulp.pngquant({ quality: [0.6, 0.7], speed: 5 }),
            // gulp.imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));
})

gulp.task('svg', function(){
    return gulp.src('img/*.svg')
    .pipe(gulp.dest('build/img'))
})


gulp.task('serve', function () {
    browserSync.init({
        server: "build"
    });
    gulp.watch("sass/**/*.scss", gulp.parallel("sass"))
    gulp.watch("*.html", gulp.parallel('html'))
})



gulp.task('build', gulp.series('html', 'sass', 'images', 'svg', 'allimg'))

