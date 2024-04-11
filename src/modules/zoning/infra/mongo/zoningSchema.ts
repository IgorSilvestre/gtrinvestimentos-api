import mongo from '../../../../shared/database/database'

const zoningSchema = new mongo.Schema({
  label: {
    type: String,
    required: true,
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

export const zoningModel = mongo.model('zoning', zoningSchema, 'zonings')
