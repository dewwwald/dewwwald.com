gulp         = require 'gulp'
watch        = require 'gulp-watch'

conf = require '../gulpconfig'

gulp.task 'watch', ['css', 'sprites'], () ->
  gulp.watch "#{conf.path.dev}/**/*.scss", ['css']
  gulp.watch "icons/*.svg", ['sprites']
