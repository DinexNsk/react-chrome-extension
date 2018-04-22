import gulp from 'gulp';
import webpack from 'webpack';
import loadPlugins from 'gulp-load-plugins';
import PluginError from 'plugin-error';
import log from 'fancy-log';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if(err) throw new PluginError('webpack', err);

        log('[webpack]', stats.toString());

        cb();
    })
});

gulp.task('content-js', ['clean'], (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
        if(err) throw new PluginError('webpack', err);

        log('[webpack]', stats.toString());

        cb();
    })
});

gulp.task('event-js', ['clean'], (cb)=>{
    webpack(eventWebpackConfig, (err, stats) =>{
        if(err) throw new PluginError('webpack', err);

        log('[webpack]', stats.toString());

        cb();
    })
});

gulp.task('popup-html', ['clean'], () => {
    return gulp.src('popup/src/index.html')
      .pipe(plugins.rename('popup.html'))
      .pipe(gulp.dest('./build'))
  });

gulp.task('move-manifest', ['clean'], () => {
    return gulp.src('manifest.json')
      .pipe(gulp.dest('./build'))
});

gulp.task('move-img', ['clean'], () => {
    return gulp.src('assets/img/fav.png')
      .pipe(gulp.dest('./build/img'))
});

gulp.task('move-css', ['clean'], () => {
    return gulp.src('assets/css/content.css')
      .pipe(gulp.dest('./build/css'))
});

gulp.task('clean', (cb) =>{
    rimraf('./build', cb)
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('build', ['popup-html', 'popup-js', 'event-js', 'content-js', 'move-manifest',
    'move-img', 'move-css']);
    
gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
});

gulp.task('default', ['build']);
