const express = require('express')
const route = express.Router()

const auth = require('./auth')
const productroutes = require('./productroutes')
const paymentroutes = require('./paymentroutes')


route.use('/auth', auth)

route.use('/product', productroutes)
route.use('/payment', paymentroutes )

module.exports = route