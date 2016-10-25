# gulp-inspect
makes it easy to inspect gulp pipelines. Can be easily turned on and off.

### Buildstatus/Dependencies
[![Build Status](https://travis-ci.org/pushrocks/gulp-inspect.svg?branch=master)](https://travis-ci.org/pushrocks/gulp-inspect)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-inspect.svg)](https://david-dm.org/pushrocks/gulp-inspect)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/gulp-inspect/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/gulp-inspect/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-inspect/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-inspect)
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/gulp-inspect/badge.svg?branch=master)](https://coveralls.io/github/pushrocks/gulp-inspect?branch=master)

### Usage

```javascript
gulp.task("inspection",function(){
    gulp.src("./test/test.md")
        .pipe(plugins.gulpInspect(true))
        .pipe(gulp.dest("./test/result/"));
});
```

The code above produces a console output like this:
![console.png](https://mediaserve.lossless.digital/github.com/pushrocks/gulp-inspect/console.png)

### About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.de/img/createdby_github.svg)](https://lossless.com/)

[![Support Us](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)