import mongo from '../../../../shared/database/database'

const assetSchema = new mongo.Schema({
  imgURL: {
    type: String,
    required: false,
  },
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
  priceInReais: {
    type: Number,
    required: false,
  },
  isForSale: {
    type: Boolean,
    required: false,
  },
  partnershipPercentage: {
    type: Number,
    required: false,
  },
  downPaymentInReais: {
    type: Number,
    required: false,
  },
  privateDebtInReais: {
    type: Number,
    required: false,
  },
  laborDebtInReais: {
    type: Number,
    required: false,
  },
  publicDebtInReais: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  capRatePercentage: {
    type: Number,
    required: false,
  },
  kmFromSP: {
    type: Number,
    required: false,
  },
  totalAreaM2: {
    type: Number,
    required: false,
  },
  constructedAreaM2: {
    type: Number,
    required: false,
  },
  vgvInReais: {
    type: Number,
    required: false,
  },
  environmentalAreaPercentage: {
    type: Number,
    required: false,
  },
  hasValuation: {
    type: Boolean,
    required: false,
  },
  marginEBITDA: {
    type: Number,
    required: false,
  },
  anualRevenueInReais: {
    type: Number,
    required: false,
  },
  numberOfEmployees: {
    type: Number,
    required: false,
  },
  cashOrEquivalentInReais: {
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
  street: {
    type: String,
    required: false,
  },
  addressNumber: {
    type: String,
    required: false,
  },
  addressComplement: {
    type: String,
    required: false,
  },
  partner: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'person',
    required: false,
  },
  zoning: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'zoning',
    required: false,
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

assetSchema.index({ '$**': 'text' })

export const assetModel = mongo.model('asset', assetSchema, 'assets')
