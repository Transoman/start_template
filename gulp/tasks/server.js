module.exports = function() {
    $.gulp.task('server', function() {
        $.browserSync.init({
            server: './build'
        });
    });
};