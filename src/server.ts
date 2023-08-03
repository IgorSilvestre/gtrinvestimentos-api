import express from 'express'
import cors from 'cors'
import { router } from './http/router'

const app = express()

app.use(
  cors({
    origin: '*', // TODO alterar para receber apenas do front da empresa
  }),
)

app.use(express.json())

app.use('api/v1', router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`GTRINVESTIMENTOS-API running on http://localhost:${PORT}`),
)

export { app }
