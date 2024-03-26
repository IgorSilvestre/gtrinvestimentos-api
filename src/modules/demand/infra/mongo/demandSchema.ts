import mongo from '../../../../shared/database/database'

const demandSchema = new mongo.Schema({
  tags: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  description: {
    type: String,
    required: true,
  },
  requester: {
      type: mongo.Schema.Types.ObjectId,
      ref: 'person',
    },
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

demandSchema.index({ '$**': 'text' })

export const demandModel = mongo.model('demand', demandSchema, 'demands')
