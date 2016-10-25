/// <reference path="../ts/typings/main.d.ts" />
var gulpWaveThrough = require("../dist/index.js");

var plugins = {
    beautylog: require("beautylog"),
    gulp: require("gulp"),
    g:{
        function: require("gulp-function")
    }
}



describe("gulp-wavethrough",function(){
    it("should run through smoothly",function(done){
        plugins.gulp.src(["./test/test.md"])
            .pipe(gulpWaveThrough())
            .pipe(plugins.g.function(done));
    })
});
