import * as Express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'

import * as userController from './controllers/userController'

import config from '../config'

import createUsers from './utils/createUsers'

const app = Express()

const HOST = config.SERVER.HOST
const PORT = config.SERVER.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use()

app.use((req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.send({ 'status': 'error' })
  }
  next()
})

app.post('/login', userController.login)

async function start() {
  await mongoose.connect(`${config.DB}`, {
    useNewUrlParser: true
  }, (err) => {
    console.log(err ? err : 'Connected to MongoDB.')
  })

  await createUsers()


  app.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}.`)
  })
}

start()
