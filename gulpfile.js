var gulp = require('gulp');

gulp.task('lint', function() {
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  return gulp.src(['index.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jscs());
});

gulp.task('test', function() {
  var mocha = require('gulp-mocha');
  return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
