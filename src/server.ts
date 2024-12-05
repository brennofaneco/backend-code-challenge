import express from 'express'
import publicRouter from './routes/publicRouter'
import { config } from './config'
import * as cityData from './services/data/cityData'

// Load cities
const startApp = async () => {
  await cityData.loadCities()
}

startApp()

const app = express()
const port = config.port
const host = config.host

app.use(express.json())
app.use('/', publicRouter)

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`)
})
