const express = require('express');
const app = express();
// require('dotenv').config()
require('dotenv/config')
const api = process.env.API_URL
const PORT = process.env.PORT

app.get(api+'/products', (req, res)=>{
    res.send('Hello ExcelShop!')
})

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
})