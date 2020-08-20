const app = require('../app')

const MongoClient = require('mongodb').MongoClient

const dbName = process.env.dbName || 'KazoomTest'

// const dbName = process.env.dbName || 'KazoomTest'
const url = process.env.URL || 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()

const db = client.db(dbName)

module.exports = db;