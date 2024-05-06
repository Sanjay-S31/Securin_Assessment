const express = require('express')
const mongoose = require('mongoose')
const cveRoute = require('./routes/cveRoute')

// const fs = require('fs')
// const CVEModel = require('./models/cveModel')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/SecurinDB')
    .then(result => {
        app.listen('4000', () => {
            console.log("Server connected on port 4000")
            console.log("Database Connected")
        })
    })
    .catch(error => {
        console.log("Database Connection Failed")
        console.log(error)
    })


// Route
app.use('/api/cves', cveRoute)


