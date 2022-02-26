const express = require('express')
const dotenv = require('dotenv').config()
const authRoute = require('./routes/authRoute')
const wizardRoute = require('./routes/wizardRoutes')
const cors = require('cors')

const app = express()

app.use(cors())

//json parser & unlencoded
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//app routes
app.use('/api/auth', authRoute)
app.use('/api/wizards', wizardRoute)

app.listen({PORT} = process.env, () => console.log(`listening on port ${PORT}`))