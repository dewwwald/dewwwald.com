var gulp        = require('gulp');
var browserSync = global.browserSync;

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});