import mongo from '../../../../shared/database/database'

const personSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    email: {
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

export const personModel = mongo.model('person', personSchema, 'people')
