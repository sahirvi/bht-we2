var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const database = require('./database/db')
var bodyParser = require('body-parser')
var allRoutes = require('./endpoints/allRoutes')
const { attachCookies } = require('superagent')

const cors = require('cors')
const config = require('config')
const User = require('./endpoints/user/UserModel')
const admin = config.admin

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use("*", cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Expose-Headers', 'Authorization')
  next()
})
app.use(cors({
  exposedHeaders: ['Authorization'],
}))


app.use('/', allRoutes.indexRoute)
app.use('/user', allRoutes.userRoute)
app.use('/publicUser', allRoutes.publicUserRoute)
app.use('/forum', allRoutes.forumRoute)
app.use('/forumMessage', allRoutes.forumMessage)
app.use('/authenticate', allRoutes.authenticationRoute)


database.initDB(function (err, db) {
  if (db) {
    let newUser = new User(admin)
    newUser.save(function (err) {
      if (err) {
        console.log('error: ' + err)
        console.log('admin already exists')
      }
      else {
        console.log('user added: ' + newUser)
      }
    })
    console.log('database connection successful')
  }
  else {
    console.log('database connection failed')
  }
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app