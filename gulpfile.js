const gulp = require('gulp');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(rename(function(path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('dist'));
});