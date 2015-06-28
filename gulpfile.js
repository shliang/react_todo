var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('public/javascripts/components/**')
    .pipe(react())
    .pipe(concat('reactComponent.js'))
    .pipe(gulp.dest('./public/'));
});