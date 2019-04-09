'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nodeStatic = require('node-static');
var http = require('http');
var exec = require('child_process').exec;
var replace = require('replace');
var bump = require('gulp-bump');
var fs = require('fs');

var root = './';
var libSrc = './packages/core';
var libDest = './dist/lego';
var demoSrc = './demo';
var demoDest = './dist/lego-showc';

gulp.task('lib-sass', function () {
  return gulp.src([libSrc, 'scss/**/*.scss'].join('/'))
    .pipe(sass())
    .pipe(concat('lego.css'))
    .pipe(gulp.dest([libDest, 'css'].join('/')));
});

gulp.task('lib-minify', function () {
  return gulp.src([libSrc, 'scss/**/*.scss'].join('/'))
    .pipe(sass())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('lego.min.css'))
    .pipe(gulp.dest([libDest, 'css'].join('/')));
});

gulp.task('lib-copy-assets', function () {
  return gulp.src([
    [libSrc, 'assets/**/*.*'].join('/'),
    [libSrc, 'scss/**/*.*'].join('/')
  ], { base: libSrc }).pipe(gulp.dest(libDest));
});

gulp.task('lib-copy-misc', function () {
  return gulp.src([
    [root, 'LICENSE'].join('/'),
    [root, 'README.md'].join('/')
  ], { base: root }).pipe(gulp.dest(libDest));
});

gulp.task('lib-copy', ['lib-copy-assets', 'lib-copy-misc']);
gulp.task('lib-package', ['lib-sass', 'lib-minify', 'lib-copy']);

gulp.task('lib-update-version', function (cb) {
  var packageJsonFilePath = [libDest, 'package.json'].join('/');
  var pkg = JSON.parse(fs.readFileSync(packageJsonFilePath, 'utf8'));

  return gulp.src(packageJsonFilePath)
    .pipe(bump({ version: pkg.version + '-build.' + process.env.BUILD_NUMBER }))
    .pipe(gulp.dest(libDest));
});

gulp.task('demo-copy', function () {
  return gulp.src([
    [demoSrc, 'package.json'].join('/'),
    [demoSrc, 'web.config'].join('/'),
    [demoSrc, 'data/**/*.*'].join('/'),
    [demoSrc, 'assets/**/*.*'].join('/'),
    [demoSrc, 'api_docs/**/*.*'].join('/'),
    [demoSrc, 'favicon.ico'].join('/')
  ], { base: demoSrc }).pipe(gulp.dest(demoDest));
});

gulp.task('demo-package', ['demo-copy']);

gulp.task('demo-postinstall', function () {
  replace({
    regex: /(<base href=")(.*?)(">)/,
    replacement: '<base href="/ui/lego/">',
    paths: [[demoDest, 'index.html'].join('/')],
    recursive: false,
    silent: true
  });
});

gulp.task('demo-update-version', function () {
  var packageJsonFilePath = [demoDest, 'package.json'].join('/');
  var pkg = JSON.parse(fs.readFileSync(packageJsonFilePath, 'utf8'));

  return gulp.src(packageJsonFilePath)
    .pipe(bump({ version: pkg.version + '-build.' + process.env.BUILD_NUMBER }))
    .pipe(gulp.dest(demoDest));
});

gulp.task('run', function () {
  var file = new nodeStatic.Server(demoDest);
  http.createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();
  }).listen(61678);
});
