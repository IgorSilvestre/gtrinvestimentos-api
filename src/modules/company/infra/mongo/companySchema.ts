import mongo from '../../../../shared/database/database'
import { Document } from 'mongoose'
import { ZCompany } from '../../interfaces-validation/ZCompany'

const companySchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
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
        default: Date.now(),
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

export const companyModel = mongo.model('Company', companySchema)
export interface ZCompanyModel extends Document, ZCompany {}
