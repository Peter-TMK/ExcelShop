const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected successfully!')
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // dbName: 'eshop-database'
// })
// .then(()=>{
//     console.log('Database Connection is ready...')
// })
// .catch((err)=> {
//     console.log(err);
// })

// //Server
// app.listen(PORT, ()=>{

//     console.log('server is running http://localhost:3000');
// })


