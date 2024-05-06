const express = require('express')
const route = express.Router()

const {
    getAllCVE,
    getCVE,
    searchCVE
} = require('../controllers/cveController')

route.get('/lists' , getAllCVE)

route.get('/:id', getCVE)

route.post('/search', searchCVE)

module.exports = route