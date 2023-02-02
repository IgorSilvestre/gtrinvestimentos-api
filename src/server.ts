import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { routes } from './routes/routes'

const app = express()

app.use(
  cors({
    origin: '*', // TODO alterar para receber apenas do front da empresa
  }),
)

app.use(express.json())

app.use(routes)

const PORT = 3005

app.listen(PORT, () =>
  console.log(`GTRINVESTIMENTOS-API running on http://localhost:${PORT}`),
)
