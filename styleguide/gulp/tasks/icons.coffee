gulp       = require 'gulp'
svgSymbols = require 'gulp-svg-symbols'

gulp.task 'sprites', () ->
  return gulp.src('icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('../public_html/assets/icons'))
