'use strict';

var gulp = require('gulp'),
  rework = require('gulp-rework'),
  inherit = require('rework-inherit'),
  vars = require('rework-vars'),
  imprt = require('rework-import'),
  autoprefixer = require('gulp-autoprefixer'),
  reworkNPM = require('rework-npm'),
  media = require('rework-custom-media');

gulp.task('buildcss', function () {
    var mediaOptions = {
      map: {
        '--small-screen': 'screen and (max-width:40em)',
        '--medium-screen': 'screen and (min-width: 40em)',
        '--large-screen': 'screen and (min-width: 60em)'
      }
    };
    return gulp.src('./css/style.css')
        .pipe(rework(reworkNPM({ 
            shim: { 
                'purecss': 'build/pure.css',
                'font-awesome' : 'css/font-awesome.css'
            }}),
            media(mediaOptions),
            vars(), 
            inherit(),
            imprt({
                path: './css/modules/'
            })
            )
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'));
});
gulp.task('default', ['buildcss']);