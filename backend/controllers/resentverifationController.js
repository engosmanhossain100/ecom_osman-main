const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');


const resentverifationController = async (req, res) => {

  const { email } = req.body;

  let findUser = await User.find({ email: email })
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  });

  if (findUser.emailVerified) {
    return res.send({ error: `${email} user already verified` });
  } else {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "engosmanhossain100@gmail.com",
        pass: "cojq krnd tvjy eeyi",
      },
    });

    jwt.sign({ email: email }, process.env.JWT_PASS, async function (err, token) {
      const info = await transporter.sendMail({
        // from: 'engosmanhossain100@gmail.com', // sender address
        to: email, // list of receiver
        subject: "Reset Verifaction", // Subject line
        html: `
     <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p style="color: #555;">Thank you for registering with Ecom Test. Please click the button below to verify your email address:</p>
          <a href="http://localhost:5173/emailverification/${token}" style="display: inline-block; padding: 12px 20px; margin-top: 20px; background-color: #F46B5B; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p style="margin-top: 20px; color: #777;">If the button above does not work, copy and paste the following link into your browser:</p>
          <p style="color: #007bff;">http://localhost:5173/emailverification/${token}</p>
          <hr style="margin-top: 30px;" />
          <p style="color: #aaa; font-size: 12px;">Sent on: ${formattedDate}</p>
        </div>
      </body>
    </html>
             `
      });

      res.send("email send")
    });
  }
  
}

module.exports = resentverifationController