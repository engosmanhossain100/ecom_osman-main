const axios = require('axios');
const url = "https://sandbox.aamarpay.com/jsonpost.php";

async function createpayment (req, res) {

    const data = {
        store_id: "aamarpaytest",
        tran_id: new Date().getMilliseconds(),
        success_url: "http://www.merchantdomain.com/successpage.html",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancelpage.html",
        amount: "10.0",
        currency: "BDT",
        signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
        desc: "Merchant Registration Payment",
        cus_name: "Name",
        cus_email: "payer@merchantcusomter.com",
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json"
    };
    
    axios.post('https://sandbox.aamarpay.com/jsonpost.php', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
     

}

module.exports = createpayment