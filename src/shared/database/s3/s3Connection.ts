import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

export const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export const connectToS3 = async (retryCount = 1, maxRetries = 5) => {
  try {
    console.log('AWS: S3 bucket connection established!');
  } catch (err) {
    console.error('AWS: Error connecting to S3:', err);
    if (retryCount < maxRetries) {
      console.log(
        `AWS: Retrying in 5 seconds... (Attempt ${
          retryCount + 1
        } of ${maxRetries})`,
      );
      setTimeout(() => connectToS3(retryCount + 1), 5000); // Retry after 5 seconds
    } else {
      console.log('AWS: Max retries reached. Connection failed.');
    }
  }
};
