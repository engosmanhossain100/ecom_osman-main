const express = require('express');
const createpayment = require('../../controllers/createPaymentController');
const route = express.Router()

route.post("createpayment", createpayment);

module.exports = route;