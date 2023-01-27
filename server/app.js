const express = require('express');
const app = express();
const morgan = require('morgan')

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());
app.use(morgan('tiny'));

// require('dotenv').config()
require('dotenv/config')
const api = process.env.API_URL
const PORT = process.env.PORT

app.get(`${api}/products`, (req, res)=>{
    const products = {
        id: 1,
        prodName: "Laptop",
        qty: 5
    }
    res.send(products)
})

app.post(`${api}/products`, (req, res)=>{
    const productName = req.body;
    console.log(productName)
    res.send(productName)
})

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
})