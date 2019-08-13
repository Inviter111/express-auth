import { Request, Response, NextFunction } from 'express'

import { permissions } from '../models'

type permissionsObject = {
  [action in actions]: Array<permissions>
}

export type actions = 'create' | 'update' | 'delete' | 'view'

/*
  Which permissions each role have
*/
export const actionPermissions: permissionsObject = {
  create: ['admin', 'contract_editor'],
  update: ['admin', 'contract_editor'],
  delete: ['admin', 'contract_editor'],
  view: ['admin', 'contract_viewer'],
}

export const permissionMiddleware = (action: actions) => (req: Request, res: Response, next: NextFunction) => {
  const userPermissions: Array<permissions> = req.user

  // Checking if user's role have permission to perform action
  if (actionPermissions[action].some(r => userPermissions.includes(r))) {
    return next()
  } else {
    return res.status(403).send()
  }
}