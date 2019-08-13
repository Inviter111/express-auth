import { Request, Response } from 'express'

import { Contracts, ContractModel } from '../models'

export const createContract = (req: Request, res: Response) => {
  const { name, address } = req.body
  if (!name || !address) return res.status(400).send()

  new Contracts({
    name,
    address
  }).save((err, contract) => {
    if (err) return res.send({ 'status': 'error' })
    return res.send({
      status: 'success',
      result: contract,
    })
  })
}

export const getContracts = (req: Request, res: Response) => {
  Contracts.find().exec((err, contracts) => {
    if (err) return res.send({ status: 'error' })
    return res.send({
      status: 'success',
      result: contracts
    })
  })
}

export const deteleContract = (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).send()

  Contracts.findByIdAndDelete(id, (err, contract) => {
    if (err) return res.send({ status: 'error' })
    return res.send({ status: 'success' })
  })
}

export const updateContract = (req: Request, res: Response) => {
  const { id } = req.params
  const { name, address } = req.body

  Contracts.findByIdAndUpdate(id, { name, address }, { new: true }, (err, contract) => {
    if (err) return res.send({ status: 'error' })
    return res.send({
      status: 'success',
      result: contract
    })
  })
}
