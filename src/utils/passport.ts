import * as passport from 'passport'
import * as passportLocal from 'passport-local'

import { Users, UserModel } from '../models'

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
  Users.findOne({ login }, (err, user?: UserModel) => {
    if (err) return done(err)
    if (!user) {
      return done(null, false, { message: 'Invalid login/password' })
    }
    user.verifyPassword(password, (err, valid) => {
      if (valid) {
        return done(null, user)
      }
      return done(err || null, false, { message: 'Invalid login/password' })
    })
  })
}))
