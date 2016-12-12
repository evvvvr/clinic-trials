/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import { exec } from 'child_process';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJS: 'src/**/*.js',
  buildDir: 'lib',
  serverBuildDir: 'lib/server',
  clientEntryPoint: 'src/client/app.js',
  publicJSDir: 'public/js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
};

gulp.task('clean', () => del([paths.buildDir, paths.publicJSDir]));

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJS,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJS)
    .pipe(babel())
    .pipe(gulp.dest(paths.buildDir))
);

gulp.task('buildClient', ['build'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.publicJSDir))
);

gulp.task('run', ['buildClient'], (callback) => {
  const server = exec(`node ${paths.serverBuildDir}`, error => callback(error));
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
});

gulp.task('default', ['run']);
