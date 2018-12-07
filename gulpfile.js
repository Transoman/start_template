"use strict";

global.$ = {
    path: {
        task: require('./gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'styles:dev',
        'img:dev',
        'libsJS:dev',
        'js:dev',
        'svg'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'styles:build-min',
        'img:build',
        'libsJS:build',
        'js:build-min',
        'svg'
    )
));
$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'server'
    )
));

// var gulp         = require('gulp'),
//     gp           = require('gulp-load-plugins')(),
//     autoprefixer = require('autoprefixer'), // PostCss autoprefixer - автоматично формує вендорні префікси
//     gcmq         = require('gulp-group-css-media-queries'),
//     runSequence  = require('run-sequence'),
//     del          = require('del'), // Збирає всі медіа-запити в одному місці
//     browserSync  = require('browser-sync').create(); // Сервер

// // Static server
// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'build'
//     },
//     // tunnel: 'sedona',
//     notify: false
//   });
// });

// gulp.task('html', function() {
//   gulp.src('app/*.html')
//     .pipe(gp.rigger())
//     .pipe(gulp.dest('build'))
//     .pipe(browserSync.stream());
// });


// gulp.task('styles', function() {
//   return gulp.src('app/sass/style.sass')
//   .pipe(gp.plumber())
//   .pipe(gp.sourcemaps.init())
//   .pipe(gp.sass({outputStyle: 'nested'}).on('error', gp.notify.onError()))
//   .pipe(gp.sourcemaps.write())
//   .pipe(gp.postcss([
//       autoprefixer({
//         browsers: ['last 5 versions'],
//         cascade: false
//       })
//     ]))
//   .pipe(gcmq())
//   .pipe(gulp.dest('app/css'))
//   .pipe(gp.csso({
//     comments: false
//   }))
//   .pipe(gp.rename({suffix: '.min'}))
//   .pipe(gulp.dest('build/css'))
//   .pipe(browserSync.stream());
// });

// gulp.task('js', function() {
//   return gulp.src('app/js/common.js')
//   .pipe(gp.plumber())
//   // .pipe(gp.uglify())
//   .pipe(gp.rename({suffix: '.min'}))
//   .pipe(gulp.dest('build/js'))
//   .pipe(browserSync.stream());
// });

// gulp.task('script', function() {
//   return gulp.src([
//       'node_modules/jquery/dist/jquery.min.js',
//       'node_modules/jquery-popup-overlay/jquery.popupoverlay.js',
//       'node_modules/jquery-validation/dist/jquery.validate.min.js'
//     ])
//   .pipe(gp.concat('script.js'))
//   .pipe(gp.uglify())
//   .pipe(gulp.dest('build/js/'));
// });

// gulp.task('fonts', function() {
//   return gulp.src('app/fonts/**/*')
//   .pipe(gulp.dest('build/fonts'))
// });

// gulp.task('images', function() {
//   return gulp.src('app/img/**/*.*')
//     // .pipe(imagemin([
//     //  imagemin.optipng({optimizationLevel: 3}),
//     //  imagemin.jpegtran({progressive: true})
//     // ]))
//     .pipe(gulp.dest('build/img'))
// });

// gulp.task('clean', function() {
//   del.sync('build');
// });

// gulp.task('svg', function() {
//   return gulp.src('app/img/icon/*.svg')
//   .pipe(gp.svgmin({
//     js2svg: {
//       pretty: true
//     }
//   }))
//   .pipe(gp.cheerio({
//     run: function($) {
//       $('[fill]').removeAttr('fill');
//       $('[stroke]').removeAttr('stroke');
//       $('[style]').removeAttr('style');
//     },
//     parserOptions: {xmlMode: true}
//   }))
//   .pipe(gp.replace('&gt;', '>'))
//   .pipe(gp.svgSprite({
//     mode: {
//       symbol: {
//         sprite: "symbols.html"
//       }
//     }
//   }))
//   .pipe(gulp.dest('build/img'));
// });


// gulp.task('watch', function() {
//   gulp.watch('app/sass/**/*.sass', ['styles']);
//   gulp.watch('app/**/*.{html,php}', ['html']);
//   gulp.watch('app/fonts/**/*', ['fonts']);
//   gulp.watch('app/img/**/*.{png,jpg,svg}', ['images']);
//   gulp.watch('app/js/common.js', ['js']);
// });


// /* Project transfer to production */
// // gulp.task('clean', function() {
// //   return del.sync('dist');
// // });


// // gulp.task('build', ['clean', 'styles', 'svg'], function(){
// //   gulp.src(['app/css/style.min.css'])
// //     .pipe(gulp.dest('dist/css'));

// //   gulp.src(['app/fonts/**/*'])
// //     .pipe(gulp.dest('dist/fonts'));

// //   gulp.src(['app/js/**/*'])
// //     .pipe(gulp.dest('dist/js'));

// //   gulp.src(['app/img/symbols.html'])
// //     .pipe(gulp.dest('dist/img'));

// //   gulp.src(['app/*.html'])
// //     .pipe(gulp.dest('dist'));
// // });


// gulp.task('default', function() {
//   runSequence(
//     'clean',
//     ['html', 'styles', 'script', 'js', 'fonts', 'images', 'svg'],
//     'watch',
//     'browser-sync'
//   )
// });