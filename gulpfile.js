const gulp = require('gulp');
const path = require('path');
const del = require('del');
const rename = require('gulp-rename');
const fixedTemplate = require('gulp-fixed-template');
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyjs, console);
const ultimateDependent = require('gulp-ultimate-dependent');

const WebpackStream = require('./build/WebpackStream');

const buildOutputDir = path.resolve(__dirname, './build/output');
const distDir = path.resolve(__dirname, './static');
const viewsDir = path.resolve(__dirname, './src/views');
const templatePath = path.join(__dirname, './build/pageTemplate.js');

gulp.task('cleanBuildOutput', () => { return del([buildOutputDir + '/*']); });
gulp.task('cleanDistAll', () => { return del([distDir + '/**/*']); });

const buildTemplate = () => {
  return fixedTemplate(require(templatePath), (file) => {
    const fileParts = file.path.split('/');
    const fileName = fileParts[fileParts.length - 1];
    return {
      moduleName: fileName.replace('.jsx', ''),
      modulePath: file.path
    };
  });
};

const firstRun = Date.now();
const incrementalBuild = () => {
  return gulp.src(['src/**/*.{js,jsx}'], { since: gulp.lastRun(incrementalBuild) || firstRun })
    .pipe(ultimateDependent({
      ultimateGlob: path.join(viewsDir + '/**/*Page.jsx'),
      ultimateMatch: (f) => { return f.endsWith('Page.jsx'); },
      matchRegex: [
        /require\('([.|..]+[\/]+.*)'\)/g,
        /from '([.|..]+[\/]+.*)'/g
      ],
      replaceMatched: (f) => {
        return (!f.endsWith('.js') && !f.endsWith('.jsx')) ? `${f}.js` : f;
      }
    }))
    .pipe(buildTemplate())
    .pipe(rename((path) => {
      path.dirname = '/';
      path.extname = '.js';
    }))
    .pipe(gulp.dest(buildOutputDir))
    .pipe(new WebpackStream({
      production: false,
      outputPath: path.join(distDir, '/js')
    }));
};

gulp.task('uglifyJs', () => {
  return gulp.src(distDir + '/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest(distDir + '/js'));
});

const buildAllPages = () => {
  return gulp.src(viewsDir + '/**/*Page.jsx')
    .pipe(buildTemplate())
    .pipe(rename((path) => {
      path.dirname = '/';
      path.extname = '.js';
    }))
    .pipe(gulp.dest(buildOutputDir));
};

gulp.task('buildJSProd', () => {
  return buildAllPages()
    .pipe(new WebpackStream({
      production: true,
      outputPath: path.join(distDir, '/js')
    }));
});
gulp.task('buildJSDev', () => {
  return buildAllPages()
    .pipe(new WebpackStream({
      production: false,
      outputPath: path.join(distDir, '/js')
    }));
});

gulp.task('default', gulp.series(
  gulp.parallel(
    'cleanDistAll',
    'cleanBuildOutput'
  ),
  gulp.series('buildJSProd', 'uglifyJs')
));

gulp.task('defaultDev', gulp.series(
  gulp.parallel(
    'cleanDistAll',
    'cleanBuildOutput'
  ),
  'buildJSDev'
));

gulp.task('watchJs', () => {
  gulp.watch(['src/**/*.{js,jsx}'], gulp.series(
    incrementalBuild
  ));
});

gulp.task('watch', gulp.series(
  'defaultDev',
  'watchJs'
));
