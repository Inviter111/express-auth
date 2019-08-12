import { Users, UserModel } from '../models'

async function createUsers() {
  const users = [
    {
      login: 'admin',
      password: 'admin',
      permissions: ['admin'],
    } as UserModel,
    {
      login: 'contract_viewer',
      password: 'contract_viewer',
      permissions: ['contract_viewer'],
    } as UserModel,
    {
      login: 'contract_editor',
      password: 'contract_editor',
      permissions: ['contract_editor'],
    } as UserModel,
  ]
  users.forEach(async (user) => {
    await new Users(user).save(() => {})
  })
}

export default createUsers
