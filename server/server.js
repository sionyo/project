const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

//basic routes
app.use('/', (req,res) => {
    res.json({message:'API is running'})
})

//Dababase connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to database')
    } catch (error) {
        console.error('Failed to connect to the databse')
        process.exit(1)
    }
}

//start server
const PORT = process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})