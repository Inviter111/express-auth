import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import { NextFunction, Request, Response } from 'express';

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

passport.serializeUser((user: UserModel, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user.permissions) // Saving only user permissions in req.user
  })
})

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.status(401).send()
}
