import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
    rounds: 6,
  },
  permissions: [{
    type: String,
    required: true,
    enum: ['admin', 'contract_viewer', 'contract_editor'],
  }],
})

type permissions = 'admin' | 'contract_viewer' | 'contract_editor'
type verifyPasswordFunc = (password: string, cb: (err: any, valid: any) => void) => void

interface UserModel {
  login: string
  password: string
  permissions: Array<permissions>

  verifyPassword?: verifyPasswordFunc
}

type UserMongoModel = mongoose.Document & UserModel

mongoose.plugin(require('mongoose-bcrypt'))

const Users = mongoose.model<UserMongoModel>('Users', UserSchema, 'users')

export {
  Users,
  UserModel,
  UserMongoModel,
  permissions,
}
