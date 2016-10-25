// import gulp
var gulp = require("gulp"),
	gulpTypescript = require("gulp-typescript");

gulp.task('compileTS', function() {
	var stream = gulp.src('../index.ts')
	  .pipe(gulpTypescript({
	  	out: "index.js"
	  }))
	  .pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('compileTSTest', function() {
	var stream = gulp.src('../test.ts')
			.pipe(gulpTypescript({
				out: "test.js"
			}))
			.pipe(gulp.dest("../../"));
	return stream;
});

gulp.task('default',['compileTS','compileTSTest'], function() {
	console.log('Typescript compiled');
});