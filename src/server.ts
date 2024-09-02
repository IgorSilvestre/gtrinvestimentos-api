import express from 'express'
import { router } from './http/router'
import { connectToS3 } from './shared/database/s3/s3Connection'

const app = express()

const allowedDomains = [
  'https://gtrinvestimentos-frontend.vercel.app',
  'http://localhost:5173'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  // @ts-ignore
  if (allowedDomains.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin); // Set the origin if it's allowed
  } else {
    res.header('Access-Control-Allow-Origin', '*'); // Alternatively, allow all (use with caution)
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())

app.get('/', (_, res) => res.status(200).send('UP'))

app.use('/api', router)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`GTRINVESTIMENTOS-API running on PORT=${PORT}`),
    connectToS3()
})

export { app }

