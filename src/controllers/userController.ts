import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { Users } from '../models'

export const login = (req: Request, res: Response) => {
  const login = req.body.login
  const password = req.body.password

  Users.findOne({ login }, (err, user) => {
    if (err || !user) {
      res.send({
        status: 'error',
        msg: 'Invalid login/password'
      })
    } else {
      user.verifyPassword(password, (err, valid) => {
        if (!valid || err) {
          res.send({
            status: 'error',
            msg: 'Invalid login/password'
          })
        } else {
          const token = jwt.sign({
            permissions: user.permissions
          }, 'very_secret_key', {
            expiresIn: '48h'
          })
          res.send({ 'status': 'success' })
        }
      })
    }
  })
}
