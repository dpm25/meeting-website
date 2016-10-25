#!/usr/bin/env node

/// <reference path="../ts/typings/main.d.ts" />
var gulpWaveThrough = require("../dist/index.js");
var plugins = {
    beautylog: require("beautylog"),
    gulp: require("gulp"),
    g: {
        function: require("gulp-function")
    }
};
describe("gulp-wavethrough", function () {
    it("should run through smoothly", function (done) {
        plugins.gulp.src(["./test/test.md"])
            .pipe(gulpWaveThrough())
            .pipe(plugins.g.function(done));
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBQ2hELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWxELElBQUksT0FBTyxHQUFHO0lBQ1YsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDL0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQyxFQUFDO1FBQ0UsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7S0FDckM7Q0FDSixDQUFBO0FBSUQsUUFBUSxDQUFDLGtCQUFrQixFQUFDO0lBQ3hCLEVBQUUsQ0FBQyw2QkFBNkIsRUFBQyxVQUFTLElBQUk7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQy9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHMvdHlwaW5ncy9tYWluLmQudHNcIiAvPlxudmFyIGd1bHBXYXZlVGhyb3VnaCA9IHJlcXVpcmUoXCIuLi9kaXN0L2luZGV4LmpzXCIpO1xuXG52YXIgcGx1Z2lucyA9IHtcbiAgICBiZWF1dHlsb2c6IHJlcXVpcmUoXCJiZWF1dHlsb2dcIiksXG4gICAgZ3VscDogcmVxdWlyZShcImd1bHBcIiksXG4gICAgZzp7XG4gICAgICAgIGZ1bmN0aW9uOiByZXF1aXJlKFwiZ3VscC1mdW5jdGlvblwiKVxuICAgIH1cbn1cblxuXG5cbmRlc2NyaWJlKFwiZ3VscC13YXZldGhyb3VnaFwiLGZ1bmN0aW9uKCl7XG4gICAgaXQoXCJzaG91bGQgcnVuIHRocm91Z2ggc21vb3RobHlcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgcGx1Z2lucy5ndWxwLnNyYyhbXCIuL3Rlc3QvdGVzdC5tZFwiXSlcbiAgICAgICAgICAgIC5waXBlKGd1bHBXYXZlVGhyb3VnaCgpKVxuICAgICAgICAgICAgLnBpcGUocGx1Z2lucy5nLmZ1bmN0aW9uKGRvbmUpKTtcbiAgICB9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
