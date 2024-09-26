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
  contractTerm: {
    type: String,
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
  tenant: {
    type: String,
    required: false,
  },
  capRatePercentage: {
    type: Number,
    required: false,
  },
  monthlyRentInReais: {
    type: Number,
    required: false,
  },
  kmFromSP: {
    type: Number,
    required: false,
  },
  landAreaM2: {
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
  isAtypicalContract: {
    type: Boolean,
    required: false,
  },
  valuationPriceInReais: {
    type: Number,
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
  address: {
    type: String,
    required: false,
  },
  addressComplement: {
    type: String,
    required: false,
  },
  contact: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'person',
    required: false,
  },
  zoning: [{
    type: mongo.Schema.Types.ObjectId,
    ref: 'zoning',
    required: false,
  }],
  energyOffTaker: {
    type: String,
    required: false,
  },
  energyInstalledCapacityInMWp: {
    type: String,
    required: false,
  },
  projectAproveDate: {
    type: Date,
    required: false,
  },
  constructionStartDate: {
    type: Date,
    required: false,
  },
  ppaInReaisToMWh: {
    type: Number,
    required: false,
  },
  capexInReais: {
    type: Number,
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
