import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import entitiesRoutes from './routes/entities.route.js'

dotenv.config()

const app = express()
app.use(cookieParser())
const PORT = process.env.PORT || 5001

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

app.use(express.json()) // allows us to accept json data in req.body

const corsOptions = {
  origin: ['https://annual-report-tracker-and-reminders-app-2.onrender.com'],
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.static(path.join(_dirname, '..', 'frontend', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, '..', 'frontend', 'build', 'index.html'))
})

app.use('/api/users', userRoutes)
app.use('/api/entities', entitiesRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log('Server started at http://localhost:' + PORT)
})