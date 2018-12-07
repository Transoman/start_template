let gp = require('gulp-load-plugins')();
    // plumber = require('gulp-plumber'),
    // pug = require('gulp-pug'),
    // pugInheritance = require('gulp-pug-inheritance'),
    // changed = require('gulp-changed'),
    // cached = require('gulp-cached'),
    // gulpif = require('gulp-if'),
    // filter = require('gulp-filter');

module.exports = function () {
    $.gulp.task('pug', () => {
        return $.gulp.src('./app/pug/*.pug')
            .pipe(gp.changed('dist', {extension: '.html'}))
            .pipe(gp.if(global.isWatching, gp.cached('pug')))
            // .pipe(pugInheritance({basedir: './dev/pug/', skip: 'node_modules'}))
            .pipe(gp.filter(function (file) {
                return !/\/_/.test(file.path) && !/^_/.test(file.relative);
            }))
            .pipe(gp.plumber())
            .pipe(gp.pug({
                pretty: true
            }))
            .pipe($.gulp.dest('./build/'))
            .on('end', $.browserSync.reload);
    });
};