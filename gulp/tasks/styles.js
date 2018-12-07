let gp = require('gulp-load-plugins')(),
    // plumber = require('gulp-plumber'),
    // scss = require('gulp-sass'),
    autoprefixer = require('autoprefixer')
    // csso = require('gulp-csso'),
    // csscomb = require('gulp-csscomb'),
    // sourcemaps = require('gulp-sourcemaps'),
    // rename = require('gulp-rename'),
    stylesPATH = {
        "input": "./app/static/sass/",
        "ouput": "./build/static/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'style.sass')
            .pipe(gp.plumber())
            .pipe(gp.sourcemaps.init())
            .pipe(gp.sass({outputStyle: 'nested'}).on('error', gp.notify.onError()))
            .pipe(gp.postcss([
                autoprefixer({
                    browsers: ['last 5 versions'],
                    cascade: false
                })
            ]))
            .pipe(gp.sourcemaps.write())
            .pipe(gp.rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(gp.sass())
            .pipe(gp.postcss([
                autoprefixer({
                    browsers: ['last 5 versions'],
                    cascade: false
                })
            ]))
            .pipe(gp.csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(gp.sass())
            .pipe(gp.postcss([
                autoprefixer({
                    browsers: ['last 5 versions'],
                    cascade: false
                })
            ]))
            .pipe(gp.csscomb())
            .pipe(gp.csso())
            .pipe(gp.rename('style.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};