import * as Express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as mongo from 'connect-mongo'
import * as passport from 'passport'

import * as userController from './controllers/userController'

import config from '../config'

import createUsers from './utils/createUsers'

const app = Express()

const MongoStore = mongo(session)

const host = config.SERVER.HOST
const port = config.SERVER.PORT
const mongoUrl = config.DB

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'very_very_secret',
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true,
  }),
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.send({ 'status': 'error' })
  }
  next()
})

app.post('/login', userController.login)

async function start() {
  await mongoose.connect(`${mongoUrl}`, {
    useNewUrlParser: true
  }, (err) => {
    console.log(err ? err : 'Connected to MongoDB.')
  })

  await createUsers()


  app.listen(port, host, () => {
    console.log(`Server is listening on ${host}:${port}.`)
  })
}

start()
