// import gulp
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var bl = require("beautylog")("os");

gulp.task('compileTS', function() {
	var stream = gulp.src('../index.ts')
	  .pipe(gulpTypescript({
	  	out: "index.js"
	  }))
	  .pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('compileTestTS', function() {
	var stream = gulp.src('../test.ts')
			.pipe(gulpTypescript({
				out: "test.js"
			}))
			.pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('compileTestBrowserTS', function() {
	var stream = gulp.src('../testbrowser.ts')
			.pipe(gulpTypescript({
				out: "testbrowser.js"
			}))
			.pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('default',['compileTS','compileTestTS','compileTestBrowserTS'], function() {
	bl.success('Typescript compiled');
});

gulp.start.apply(gulp, ['default']);