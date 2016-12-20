var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars'); // not sure why but this doesn't seem to play nice with gulp-load-plugins
var rimraf = require('rimraf').sync;
var $ = require('gulp-load-plugins')();
var data = require('gulp-data');
var path = require('path');

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
        .pipe(gulp.dest('_build/css'));

    //todo: lint scss?
});

// compile templates
gulp.task('handlebars', ['sass'], function () {

    var templateData = {},   // setting template data is supposed to extend data found in template-data json files
        options = {
            ignorePartials: false,
            batch: ['./src/templates/partials']
        }

    gulp.src('src/templates/*.hbs')
        .pipe(data(function (file) {
            // get the json file equivalent for template data
            return require('./src/template-data/' + path.basename(file.path, '.hbs') + '.json');
        }))
        .pipe(handlebars(templateData, options))
        .pipe($.rename('sample.html'))
        .pipe(gulp.dest('./_build'))
        .pipe($.juice())
        .pipe(gulp.dest('./_build'))
});

// clean the build dir
gulp.task('clean', function () {
    rimraf('_build');
});

gulp.task('default', ['handlebars']);