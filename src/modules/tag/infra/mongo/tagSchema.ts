import mongo from '../../../../shared/database/database'

const tagSchema = new mongo.Schema({
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

export const tagModel = mongo.model('tag', tagSchema, 'tags')
