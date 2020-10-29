const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const closureCompiler = require('google-closure-compiler').gulp();
const watch = require('gulp-watch');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

const outputWrapper = `(function(global){%output%\nconst pb = this.$jscompDefaultExport$$module$index;if(typeof define=='function'&&define.amd){define(function(){return pb})}else if(typeof module=='object'&&typeof exports=='object'){module.exports=pb}else{window.pb=pb}}).call(null, {});`;

function compile() {
    const options = {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        externs: './src/externs/externs.js',
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT_NEXT',
        // formatting: 'PRETTY_PRINT',
        assume_function_wrapper: true,
        language_out: 'ECMASCRIPT5',
        module_resolution: 'NODE',
        process_common_js_modules: true,
        js: [
            'node_modules/erste/package.json',
            'node_modules/erste/**.js',
            'lib/**.js'
        ],
        jscomp_error: '*',
        jscomp_off: ['lintChecks'],
        // entry_point: 'index.js',
        generate_exports: true,
        export_local_property_definitions: true,
        output_wrapper: outputWrapper,
        js_output_file: 'pedalboard.js'
    };

    return gulp.src(options.js)
        .pipe(sourcemaps.init())
        .pipe(closureCompiler(options))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
}

function cssMinify() {
    return gulp.src(['example/css/common.css', 'example/css/*.css'])
        .pipe(concatCss('pedalboard.css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'))
}

gulp.task('clean', () => del(['dist/*', '!src/externs/externs.js']));
gulp.task('compile', compile);
gulp.task('css:min', cssMinify);

gulp.task('watch', () => {
    watch('./src/**/*.js', compile);
    watch('./src/**/*.css', cssMinify);
});

gulp.task('default', gulp.parallel('clean', 'css:min', 'compile'));