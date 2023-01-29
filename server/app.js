const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
const api = process.env.API_URL
const PORT = process.env.PORT
const cors = require('cors');

app.use(cors());
app.options('*', cors())

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json())
app.use(morgan('tiny'))

const productRouter = require('./routes/product.route')
const categoryRouter = require('./routes/category.route')
const orderRouter = require('./routes/order.route')
const userRouter = require('./routes/user.route')

//Routes
app.use(`${api}/products`, productRouter)
app.use(`${api}/categories`, categoryRouter)
// app.use(`${api}/orders`, orderRouter)
// app.use(`${api}/users`, userRouter)

module.exports = app;
