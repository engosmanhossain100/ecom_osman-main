// const axios = require('axios');
// const url = "https://sandbox.aamarpay.com/jsonpost.php";

// async function createpayment(req, res) {
//     const data = {
//         store_id: "aamarpaytest",
//         tran_id: new Date().getMilliseconds(),
//         success_url: "http://www.merchantdomain.com/successpage.html",
//         fail_url: "http://www.merchantdomain.com/failedpage.html",
//         cancel_url: "http://www.merchantdomain.com/cancelpage.html",
//         amount: req.body.amount || "10.0", 
//         currency: "BDT",
//         signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
//         desc: req.body.desc || "Merchant Registration Payment",
//         cus_name: req.body.cus_name || "Name",
//         cus_email: req.body.cus_email || "payer@merchantcusomter.com",
//         cus_add1: req.body.cus_add1 || "House B-158 Road 22",
//         cus_add2: req.body.cus_add2 || "Mohakhali DOHS",
//         cus_city: req.body.cus_city || "Dhaka",
//         cus_state: req.body.cus_state || "Dhaka",
//         cus_postcode: req.body.cus_postcode || "1206",
//         cus_country: req.body.cus_country || "Bangladesh",
//         cus_phone: req.body.cus_phone || "+8801704",
//         type: "json"
//     };

//     const headers = {
//         'Content-Type': 'application/json'
//     };

//     try {
//         const response = await axios.post(url, data, { headers });
//         console.log(response.data);
//         res.status(200).json(response.data); 
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Payment creation failed', details: error.message });
//     }
// }

// module.exports = createpayment;



// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }
  
//     const paymentData = {
//       store_id: "aamarpaytest",
//       tran_id: "123123173",
//       success_url: "http://www.merchantdomain.com/successpage.html",
//       fail_url: "http://www.merchantdomain.com/failedpage.html",
//       cancel_url: "http://www.merchantdomain.com/cancelpage.html",
//       amount: "10.0",
//       currency: "BDT",
//       signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
//       desc: "Merchant Registration Payment",
//       cus_name: "Name",
//       cus_email: "payer@merchantcusomter.com",
//       cus_add1: "House B-158 Road 22",
//       cus_add2: "Mohakhali DOHS",
//       cus_city: "Dhaka",
//       cus_state: "Dhaka",
//       cus_postcode: "1206",
//       cus_country: "Bangladesh",
//       cus_phone: "+8801704",
//       type: "json",
//     };
  
//     try {
//       const response = await fetch("https://sandbox.aamarpay.com/jsonpost.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });
  
//       const data = await response.json();
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: "Payment request failed", details: error.message });
//     }
//   }
  
