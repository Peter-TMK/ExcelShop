const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
// const Product = require('./models/product.model')
const productRouter = require('./routes/product.route')
require('dotenv/config')
const api = process.env.API_URL
const PORT = process.env.PORT
const cors = require('cors');

app.use(cors());
app.options('*', cors())

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json())
app.use(morgan('tiny'))

//Routes
app.use(`${api}/products`, productRouter)

module.exports = app;
