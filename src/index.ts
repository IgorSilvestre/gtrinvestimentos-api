import {app} from './server'


const PORT = process.env.PORT || 3005
app.listen(PORT, () =>
  console.log(`GTRINVESTIMENTOS-API running on http://localhost:${PORT}`),
)