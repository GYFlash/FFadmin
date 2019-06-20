// FileName: App.ts
// ProjectName: FFAdmin
// 作者：区区电脑
// createTime: 2019/6/17

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var tokenMiddleware = require('./common/TokenMiddleware');

var indexRouter = require('./index');
var adminRouter = require('./views/AdminViews');
var api = require('./apis/Index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../templates'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, '../public')));
app.use('/static', express.static(path.join(__dirname, '../static')));

// 自定义中间件
app.use(tokenMiddleware);

// 路由
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
    next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
    res.locals.status = err.status;
    // set locals, only providing error in development
    res.locals.message = err.status == 404 ? '页面未找到' : err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

