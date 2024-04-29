import mongo from '../../../../../shared/database/database'
import { ZPerson } from '../../../interfaces-validation/ZPerson'

const personSchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  email: {
    type: String,
    required: false,
  },
  company: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  },
  target: {
    type: String,
    required: false,
  },
  minLandArea: {
    type: Number,
    required: false,
  },
  maxLandArea: {
    type: Number,
    required: false,
  },
  minVgv: {
    type: Number,
    required: false,
  },
  maxVgv: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

personSchema.index({ '$**': 'text' })

export const personModel = mongo.model('person', personSchema, 'people')
export interface ZPersonModel extends mongo.Document, ZPerson {}
