'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const nodeStatic = require('node-static');
const http = require('http');
const exec = require('child_process').exec;
const replace = require('replace');
const bump = require('gulp-bump');
const fs = require('fs');

const root = './';
const libSrc = './projects/lib/src';
const libDest = './dist/lego';
const demoSrc = './projects/demo/src';
const demoDest = './docs';

gulp.task('lib-sass', () => {
  return gulp.src([libSrc, 'scss/**/*.scss'].join('/'))
    .pipe(sass())
    .pipe(concat('lego.css'))
    .pipe(gulp.dest([libDest, 'css'].join('/')));
});

gulp.task('lib-minify', () => {
  return gulp.src([libSrc, 'scss/**/*.scss'].join('/'))
    .pipe(sass())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('lego.min.css'))
    .pipe(gulp.dest([libDest, 'css'].join('/')));
});

gulp.task('lib-copy-assets', () => {
  return gulp.src([
    [libSrc, 'assets/**/*.*'].join('/'),
    [libSrc, 'scss/**/*.*'].join('/')
  ], { base: libSrc }).pipe(gulp.dest(libDest));
});

gulp.task('lib-copy-misc', () => {
  return gulp.src([
    [root, 'LICENSE'].join(''),
    [root, 'README.md'].join('')
  ], { base: root }).pipe(gulp.dest(libDest));
});

gulp.task('lib-copy', gulp.series('lib-copy-assets', 'lib-copy-misc'));
gulp.task('lib-package', gulp.series('lib-sass', 'lib-minify', 'lib-copy'));

gulp.task('demo-copy', () => {
  return gulp.src([
    [demoSrc, 'assets/**/*.*'].join('/'),
    [demoSrc, 'favicon.ico'].join('/')
  ], { base: demoSrc }).pipe(gulp.dest(demoDest));
});

gulp.task('demo-package', gulp.series('demo-copy'));

gulp.task('run', () => {
  const file = new nodeStatic.Server(demoDest);
  http.createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();
  }).listen(4200);
});
