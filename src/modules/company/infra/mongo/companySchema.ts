import mongo from '../../../../shared/database/database';

const companySchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    website: {
      type: String
    },
    documentType: {
      type: String
    },
    documentNumber: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    zipCode: {
      type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    lastUpdated: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
);

export const companyModel = mongo.model('Company', companySchema);