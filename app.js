const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const mailer = require('./src/services/mailer')

const CONSTANTS = require('./src/utils/constants')
const connection = require('./src/database/connection')
const cors = require('cors')
const { authHandler, errorHandler, notFoundHandler } = require('./src/utils/middlewares')

const usersRouter = require('./src/api/users/router')
const authRouter = require('./src/api/auth/router')
const entriesRouter = require('./src/api/entries/router')

const app = express();

connection().then(() => {

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(cors({
    origin: CONSTANTS.ORIGIN,
    credentials: true
  }))

  cron.schedule('00 00 18 * * *', () => {
    mailer.sendEntrySummaryEmail()
  }, {
    timezone: 'Europe/Bucharest'
  })


  app.use('/auth', authRouter)
  // app.use(authHandler)
  app.use('/entries', entriesRouter)
  app.use('/users', usersRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)


  app.listen(CONSTANTS.PORT)
  console.log(`Listening to port ${CONSTANTS.PORT} and connected to database`)

}).catch(err => {
  console.log('Cannot connect to database', err)
})


module.exports = app
