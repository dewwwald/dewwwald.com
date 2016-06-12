/*------------------------------------*\
#     $GULPFILE
\*------------------------------------*/

/**
 * All tasks are created in ./gulp/tasks
 *
 * Add new task there. It will be made available as a gulp
 * task.
 */
var gulp, requireDir, gutil, prefix, sass, browserSync, rename, reload, config;

gulp 		 = require('gulp');
gutil        = require("gulp-util");
browserSync  = require('browser-sync');

// global.conf        = require('./gulp/gulpconfig.js');
// global.scrt        = require('./gulp/secrets.js');
global.browserSync = browserSync;
requireDir   	   = require("require-dir");



global.browserSync = browserSync;

requireDir('./gulp/tasks', {recurse: false});

tasks = [
	'serve'
];

gulp.task('default', tasks);
