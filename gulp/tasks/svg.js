let gp = require('gulp-load-plugins')(),
    svgPath = {
        "input": "./app/static/images/svg/*.svg",
        "output": "./build/static/images/svg/"
    };

module.exports = function () {
    $.gulp.task('svg', () => {
        return $.gulp.src(svgPath.input)
            .pipe(gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe(gp.cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
            }))
            .pipe(gp.replace('&gt;', '>'))
            .pipe(gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe($.gulp.dest(svgPath.output));
    });
};