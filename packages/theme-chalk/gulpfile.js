'use strict';

const {series, src, dest} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const cssBase64 = require('gulp-css-base64');
const map = require('map-stream');
const dateFormat = require('./time');
const vuiVersion = require('./package').version;
let versionCon = 'Vui-pc Version: ' + vuiVersion + ' - ' + dateFormat(new Date());

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(cssBase64())
    .pipe(map(function(file, cb) {
      var fileContents = file.contents.toString();
      // --- do any string manipulation here ---
      fileContents = fileContents.replace(/foo/, 'bar');
      fileContents = '/**' + versionCon + '*/\n' + fileContents;
      // ---------------------------------------
      file.contents = new Buffer(fileContents);
      cb(null, file);
    }))
    .pipe(dest('./lib'));
}

exports.build = series(compile);
