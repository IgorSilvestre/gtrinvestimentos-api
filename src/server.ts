import express from 'express'
import cors from 'cors'
import { router } from './http/router'
import { connectToS3 } from './shared/database/s3/s3Connection'

const app = express()

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}))

app.use(express.json())

app.get('/', (_, res) => res.status(200).send('UP'))

app.use('/api', router)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`GTRINVESTIMENTOS-API running on PORT=${PORT}`),
    connectToS3()
})

export { app }

