import { Types } from 'mongoose'

interface IDocument {
  _id: Types.ObjectId
  name: string
  tags: Types.ObjectId[]
  employees: Types.ObjectId[]
  createdAt: Date
  lastUpdated: Date
  description?: string
  target?: string
}

export interface ICompanyDocument
  extends Omit<IDocument, 'description' | 'target'> {}
