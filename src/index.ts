import * as Express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as mongo from 'connect-mongo'
import * as passport from 'passport'

import * as userController from './controllers/userController'
import * as contractController from './controllers/contractController'

import * as passportUtil from './utils/passport'
import { permissionMiddleware } from './middleware/permissions'

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
  secret: config.SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true,
  }),
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', userController.login)
app.post('/logout', userController.logout)
app.post('/contracts', passportUtil.isAuthenticated, permissionMiddleware('create'), contractController.createContract)
app.get('/contracts', passportUtil.isAuthenticated, permissionMiddleware('view'), contractController.getContracts)
app.delete('/contracts/:id', passportUtil.isAuthenticated, permissionMiddleware('delete'), contractController.deteleContract)
app.put('/contracts/:id', passportUtil.isAuthenticated, permissionMiddleware('update'), contractController.updateContract)

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
