var gulp = require('gulp'),
    uglify = require('gulp-uglyfly'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin');
    autoprefix = require('gulp-autoprefixer'),
    refresh = require('gulp-refresh'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat');


// scripts task
// Uglifies
gulp.task('scripts', function(){
    // 1.gulp.src('js.*js')source area of file needing uglify
        // in /js folder targeting all file ending in *.js
    // 2.plumber continues to run gulp on error
    // 3.uglify minimizes all src files
    // 4.run this to concat all js files to one (all.min.js)
    // 5. all work save in this folder .pipe(gulp.dest('dist'))
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Styles task
gulp.task('styles', function(){
    //1.source area of file needing sass to css
        // search for all sass files ending in'scss/**/*.scss'
    //2.use sass function
    //3.auto prefix makes capable css work on all broswers
    //4.send to destination dest('css/')
        sass('scss/*.scss')
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload());
});
// Image task
gulp.task('images',function(){
    //1.enters this folder and looks for all Images 'images/*'
    //2.use imagein function
    //3.add all optimized images back to the folder 
        // replacing previous ver.
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
        .pipe(livereload());
});

// Watch task
// WAtches JS and Sass for changes 
// gulp.task('watch', function(){
//     //1. in /js folder watch all file ending in *.js
//         // after run the scriptss task
//     //2. watch all files ending in .scss in sass fodler
//         //after run the styles task
//         refresh.listen()
//         gulp.watch('index.html', ['images']);
//         gulp.watch('js/*.js', ['scripts']);
//         gulp.watch('scss/**/*.scss',['styles']);
// });

// livereload task


// Uglify in Default 
// cmd gulp || gulp defaultd
// Gulp build
gulp.task('build',['scripts','images', 'styles'] );
// array runs through all made task above
gulp.task('default', ['build'], function(){
        livereload.listen();
        gulp.watch('index.html', ['images']);
        gulp.watch('js/*.js', ['scripts']);
        gulp.watch('scss/**/*.scss',['styles']);
});
