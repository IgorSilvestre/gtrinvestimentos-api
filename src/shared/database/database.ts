import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_MONGO_STRING || 'NO DATABASE STRING!';
let retryCount = 1; // Counter to track the number of retries
const maxRetries = 5; // Maximum number of retries

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout for initial server selection
  socketTimeoutMS: 45000, // Timeout for socket inactivity
  connectTimeoutMS: 10000, // Timeout for initial connection
  // Removed unsupported options
};

const connectWithRetry = async () => {
  try {
    await mongoose.connect(url, options);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);

    if (retryCount < maxRetries) {
      retryCount++; // Increment the retry counter
      console.log(
        `Retrying in 5 seconds... (Attempt ${retryCount} of ${maxRetries})`,
      );
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log('Max retries reached. Connection failed.');
    }
  }
};

connectWithRetry();

mongoose.connection.on('connected', () => {
  console.log('mongoDB: connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('mongoDB: connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB: disconnected from the database');
});

export default mongoose;
