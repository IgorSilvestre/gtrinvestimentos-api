import mongo from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DATABASE_MONGO_STRING || ''

mongo.connect(url)
mongo.Promise = global.Promise

console.log('MongoDB Connected!')
export default mongo
