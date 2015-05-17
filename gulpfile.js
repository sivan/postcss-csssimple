var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src(['index.js', 'gulpfile.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jscs());
});

gulp.task('test', function() {
  return gulp.src('test/*.js', {read: false}).pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
