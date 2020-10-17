const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

sass.compiler = require('node-sass');

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        notify: false,
        // online: false, // Work offline without internet connection
        // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
    })
});

function bsReload(done) {
    browserSync.reload();
    done()
}

gulp.task('code', function () {
    return gulp.src('src/**/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('js', function () {
    return gulp.src([
        'src/js/**/*.js'
    ])
        .pipe(concat('scripts.min.js'))
        //.pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch('src/*.html', gulp.parallel('code'));
    gulp.watch(['src/js/**/*.js'], gulp.parallel('js'));
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));