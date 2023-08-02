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
        ref: 'tag',
    }],
    description: {
        type: String,
        required: false,
    },
    target: {
        type: String,
        required: false,
    },
    employees: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'person',
        required: false,
    }],
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

companySchema.index({'$**': 'text'})

export const companyModel = mongo.model('company', companySchema, 'companies')
export interface ZCompanyModel extends Document, ZCompany {}
