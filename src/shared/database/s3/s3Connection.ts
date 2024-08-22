import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.Credentials(
    process.env.AWS_PUBLIC_KEY,
    process.env.AWS_SECRET_KEY,
  ),
})

export const s3 = new AWS.S3()

export const connectToS3 = (retryCount = 1, maxRetries = 5) => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.error('AWS: Error connecting to S3:', err)
      if (retryCount < maxRetries) {
        console.log(
          `AWS: Retrying in 5 seconds... (Attempt ${
            retryCount + 1
          } of ${maxRetries})`,
        )
        setTimeout(() => connectToS3(retryCount + 1), 5000) // Retry after 5 seconds
      } else {
        console.log('AWS: Max retries reached. Connection failed.')
      }
    } else {
      console.log('AWS: S3 bucket connection established!')
      console.log('AWS: S3 Available buckets:', data.Buckets)
    }
  })
}
