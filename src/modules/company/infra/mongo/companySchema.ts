import mongo from '../../../../shared/database/database'
import { Document } from 'mongoose'
import { ZCompany } from '../../interfaces-validation/ZCompany'

const companySchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'tags',
    }],
    description: {
        type: String,
        required: false,
    },
    target: {
        type: String,
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
    }
})

export const companyModel = mongo.model('companies', companySchema)
export interface ZCompanyModel extends Document, ZCompany {}
