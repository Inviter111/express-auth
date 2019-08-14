import { Users, UserModel } from '../models'

async function createUsers() {
  const users: Array<UserModel> = [
    {
      login: 'admin',
      password: 'admin',
      permissions: ['admin'],
    },
    {
      login: 'contract_viewer',
      password: 'contract_viewer',
      permissions: ['contract_viewer'],
    },
    {
      login: 'contract_editor',
      password: 'contract_editor',
      permissions: ['contract_editor'],
    },
  ]
  users.forEach(async (user) => {
    await new Users(user).save(() => {})
  })
}

export default createUsers
