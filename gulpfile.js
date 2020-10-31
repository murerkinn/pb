const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

// const outputWrapper = `(function(global){%output%\nconst pb = this.$jscompDefaultExport$$module$index;if(typeof define=='function'&&define.amd){define(function(){return pb})}else if(typeof module=='object'&&typeof exports=='object'){module.exports=pb}else{window.pb=pb}}).call(null, {});`;

function cssMinify() {
    return gulp.src(['example/css/common.css', 'example/css/*.css'])
        .pipe(concatCss('pedalboard.css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'))
}

gulp.task('css:min', cssMinify);

gulp.task('watch', () => {
    watch('./src/**/*.css', cssMinify);
});

gulp.task('default', gulp.parallel('css:min'));