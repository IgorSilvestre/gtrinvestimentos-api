import mongo from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DATABASE_MONGO_STRING || ''

try {
  await mongo.connect(url);
  console.log('MongoDB Connected!');
} catch (err) {
  console.error('Failed to connect to MongoDB', err);
}

export default mongo
