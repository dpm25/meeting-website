var gulp = require('gulp');
var jsFiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting....');
        });
});
