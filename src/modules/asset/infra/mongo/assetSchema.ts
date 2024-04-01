import mongo from '../../../../shared/database/database'

const assetSchema = new mongo.Schema({
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
  description: {
    type: String,
    required: false,
  },
  capRate: {
    type: Number,
    required: false,
  },
  kmFromSP: {
    type: Number,
    required: false,
  },
  totalArea: {
    type: Number,
    required: false,
  },
  constructedArea: {
    type: Number,
    required: false,
  },
  vgv: {
    type: Number,
    required: false,
  },
  docLink: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  neighborhood: {
    type: String,
    required: false,
  },
  partner: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: 'person',
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

assetSchema.index({ '$**': 'text' })

export const assetModel = mongo.model('asset', assetSchema, 'assets')
