var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// compile sass
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: [
                'last 2 versions',
                'ie >= 9',
                'and_chr >= 2.3'
            ]
        }))
        .pipe(gulp.dest('build/css'));

    //todo: lint scss?
});

// compile templates
gulp.task('handlebars', ['sass'], function () {
    gulp.src('src/templates/**/*.hbs')
        .pipe($.handlebars())
        .pipe(gulp.dest('build'))
        .pipe($.juice())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['handlebars']);