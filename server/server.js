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


