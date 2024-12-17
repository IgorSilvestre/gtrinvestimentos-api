import express from 'express'
import { router } from './http/router'
import { connectToS3 } from './shared/database/s3/s3Connection'
import CookieParser from 'cookie-parser'

const app = express()

const allowedDomains = [
  'https://gtrinvestimentos-frontend.vercel.app',
  'http://localhost:5173'
];

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
})

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // Set the origin
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())
app.use(CookieParser())

app.get('/', (_, res) => res.status(200).send('UP'))

app.use('/api', router)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`GTRINVESTIMENTOS-API running on PORT=${PORT}`),
    connectToS3()
})

export { app }

