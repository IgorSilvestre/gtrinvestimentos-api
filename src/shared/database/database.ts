import mongo from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DATABASE_MONGO_STRING || 'NO DATABASE STRING!'
let retryCount = 1 // Counter to track the number of retries
const maxRetries = 2 // Maximum number of retries

const connectWithRetry = async () => {
  try {
    await mongo.connect(url)
    console.log('MongoDB Connected!')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)

    if (retryCount < maxRetries) {
      retryCount++ // Increment the retry counter
      console.log(
        `Retrying in 5 seconds... (Attempt ${retryCount} of ${maxRetries})`,
      )
      setTimeout(connectWithRetry, 5000) // Retry after 5 seconds
    } else {
      console.log('Max retries reached. Connection failed.')
    }
  }
}

connectWithRetry()

export default mongo
