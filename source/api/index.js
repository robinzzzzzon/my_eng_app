const express = require('express')
const mongoose = require('mongoose')
const Route = require('./Router')

const API_PORT = 5000
const DB_URL = 'mongodb+srv://user:Qwerty123!@eng-app-cluster.cylsfnl.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

const api = express()
api.use(express.json())
api.use('/api', Route.router)

async function connectToDb() {
  try {
    await mongoose.connect(DB_URL)
    api.listen(API_PORT, () => console.log('СЕРВЕР РАБОТАЕТ'))
  } catch (e) {
    console.log(e)
  }
}

connectToDb()
