const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');


let forgotpassController = async (req, res) => {

  const { email } = req.body;

  let existingUser = await User.find({ email: email })
  const currentTime = new Date().toLocaleString();

  if (existingUser.length > 0) {

    jwt.sign({ email: email }, process.env.JWT_PASS, async function (err, token) {

      // const token = jwt.sign({ email }, process.env.JWT_PASS, { expiresIn: "10m" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "engosmanhossain100@gmail.com",
          pass: "cojq krnd tvjy eeyi",
        },
      });

      const info = await transporter.sendMail({
        // from: 'engosmanhossain100@gmail.com', // sender address
        to: email, // list of receiver
        subject: "This is your change password Link", // Subject line
        html: `
     <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the button below to set a new password:</p>
        <a href="http://localhost:5173/newpassword/${token}" 
           style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        <p><a href="http://localhost:5173/newpassword/${token}">http://localhost:5173/newpassword/${token}</a></p>
        <hr style="margin-top: 30px;">
        <p style="font-size: 12px; color: #777;">This request was made on: <strong>${currentTime}</strong></p>
        <p style="font-size: 12px; color: #777;">If you didn't request this, please ignore this email.</p>
      </div>
    </div>
             `
      })
    });

    res.send("check your email")

  } else {
    return res.status(401).json({
      message: `User not found`
    })
  };
}

module.exports = forgotpassController