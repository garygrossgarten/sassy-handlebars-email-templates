var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
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

    var templateData = {
        title: 'Test Tamplate',
        body: 'Real data would go here, but this is a test...'
    },
        options = {
            ignorePartials: true,
            batch: ['./src/templates/partials']
        }

    gulp.src('src/templates/**/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe($.rename('sample.html'))
        .pipe(gulp.dest('build'))
        .pipe($.juice())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['handlebars']);

