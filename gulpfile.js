var gulp = require('gulp');

// Gulp Plugins
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;


gulp.task('default', ['start-mongo', 'nodemon', 'watch', 'reload-page']);

/* Run Mongodb */
function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

// http://stackoverflow.com/questions/28665395/using-gulp-to-manage-opening-and-closing-mongodb
gulp.task('start-mongo', runCommand('mongod --dbpath ./data/'));
/* Run Mongodb */


// Launch Nodemon to watch server changes
gulp.task('nodemon', function() {
  nodemon({
    script: 'launch.js'
  })
    .on('start', function() {
      console.log('server starting');
    })
    .on('restart', function() {
      console.log('server restarting');
    });
});

// Watch Public JS/CSS file changes and refresh
gulp.task('watch', function() {
	browserSync.init({
    proxy: "http://localhost:3000",
    browser: 'google chrome',
    reloadDelay: 2000,
    port: 3001
  });
  watch(['./public/javascripts/**/*.js', './public/stylesheets/**/*.scss', '!./public/stylesheets/style.scss'], function() {
    gulp.start(['browser-sync']);
  });
});

gulp.task('reload-page', function() {
  watch(['./public/templates/**/*.html'], function() {
    gulp.start(['bsreload']);
  });
});

// Import Sass partials into style.scss
gulp.task('stylesass', function() {
  var target = gulp.src('./public/stylesheets/style.scss');
  var sources = gulp.src(['./public/stylesheets/**/*.scss', '!./public/stylesheets/style.scss'], {
    read: false
  });

  return target.pipe(inject(sources, {
      ignorePath: 'public/stylesheets',
      addRootSlash: false
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});

// Compile Sass
gulp.task('compilesass', ['stylesass'], function() {
  return gulp.src('./public/stylesheets/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'));
});

// Lint Task
gulp.task('lint', ['compilesass'], function() {
  return gulp.src('./public/javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Inject all js & css files into index.ejs
gulp.task('indexejs', ['lint'], function() {
  var target = gulp.src('./views/index.ejs');
  var sources = gulp.src(['./public/javascripts/**/*.js', './public/stylesheets/**/*.css'], {
    read: false
  });

  return target.pipe(inject(sources, {
      ignorePath: 'public'
    }))
    .pipe(gulp.dest('./views'));
});

// Run BS
gulp.task('browser-sync', ['indexejs'], browserSync.reload);
gulp.task('bsreload', browserSync.reload);


























