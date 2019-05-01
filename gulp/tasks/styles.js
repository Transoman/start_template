let gp = require('gulp-load-plugins')(),
    autoprefixer = require('autoprefixer')
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
            .pipe(gp.groupCssMediaQueries())
            .pipe(gp.sourcemaps.write())
            .pipe(gp.rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'style.sass')
            .pipe(gp.sass())
            .pipe(gp.postcss([
                autoprefixer({
                    browsers: ['last 5 versions'],
                    cascade: false
                })
            ]))
            .pipe(gp.groupCssMediaQueries())
            .pipe(gp.csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'style.sass')
            .pipe(gp.sass())
            .pipe(gp.postcss([
                autoprefixer({
                    browsers: ['last 5 versions'],
                    cascade: false
                })
            ]))
            .pipe(gp.groupCssMediaQueries())
            .pipe(gp.csscomb())
            .pipe(gp.csso())
            .pipe(gp.rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};