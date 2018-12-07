let gp = require('gulp-load-plugins')(),
    // imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    // cache = require('gulp-cache'),
    imgPATH = {
        "input": ["./app/static/images/**/*.{png,jpg,gif,svg}",
            '!./app/static/images/svg/*'],
        "ouput": "./build/static/images/"
    };

module.exports = function () {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(imgPATH.input)
            .pipe($.gulp.dest(imgPATH.ouput));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(imgPATH.input)
            .pipe(gp.cache(imagemin([
                gp.imagemin.gifsicle({interlaced: true}),
                gp.imagemin.jpegtran({progressive: true}),
                imageminJpegRecompress({
                    loops: 5,
                    min: 70,
                    max: 75,
                    quality: 'medium'
                }),
                gp.imagemin.svgo(),
                gp.imagemin.optipng({optimizationLevel: 3}),
                pngquant({quality: '65-70', speed: 5})
            ], {
                verbose: true
            })))
            .pipe($.gulp.dest(imgPATH.ouput));
    });
};