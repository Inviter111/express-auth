import { Request, Response } from 'express'
import * as passport from 'passport'
import { IVerifyOptions } from 'passport-local'

import { UserMongoModel } from '../models'
import '../utils/passport'

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', (error: Error, user: UserMongoModel, info: IVerifyOptions) => {
    if (error || !user) return res.send({ status: 'error' })
    if (user) {
      req.logIn(user, (err) => {
        if (err) return res.send({ status: 'error' })
        return res.send({ status: 'success' })
      })
    }
  })(req, res)
}

export const logout = (req: Request, res: Response) => {
  req.logOut()
  return res.send({ status: 'success' })
}
