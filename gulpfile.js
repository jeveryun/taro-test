// mock数据的一些命令
// gulp mock 可以启动mock服务

const path = require('path')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

const server = path.resolve(__dirname, 'mock')


gulp.task('nodemon', function (cb) {
  var started = false
  var stream = nodemon({
    script: './mock/server.js',
    extF: 'js',
    env: {
      NODE_ENV: 'development'
    },
    watch: [server]
  })
  stream
    .on('start', function () {
      if (!started) {
        cb()
        started = true
      }
    })
    .on('crash', function () {
      console.error("application has crashed! \n");
      stream.emit('restart', 10)
    })
})

// browser-sync 配置， 配置启动nodemon任务
gulp.task('browser-sync', gulp.series(['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:8080',
    port: 8081
  })
}))

// 延时刷新
gulp.task('bs-delay', function () {
  setTimeout(() => {
    browserSync.reload()
  }, 1000);
})
// browser-sync 监听文件
gulp.task('mock', gulp.series(['browser-sync'], function () {
  gulp.watch(["./mock/db.js", './mock/**'], ["bs-delay"])
}))

