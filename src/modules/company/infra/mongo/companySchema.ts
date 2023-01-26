import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
  },
);

export const companyModel = mongoose.model('Company', companySchema);