import * as mongoose from 'mongoose'

const ContractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
  },
})

type ContractModel = mongoose.Document & {
  name: string,
  address: string,
}

const Contracts = mongoose.model<ContractModel>('Contracts', ContractSchema)

export {
  Contracts,
  ContractModel,
}
