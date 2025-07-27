const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');
const nameValidation = require("../Validations/nameValidation");
const emailValidation = require("../Validations/emailValidation");


let registrationController = async (req, res) => {

  const { name, email, password } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  });

  if (!name || !email || !password) {
    return res.send("Please fill the all fields")
  }

  if (!nameValidation(name)) {
    return res.status(401).json({ message: `Invalid Name` })
  }

  if (!emailValidation(email)) {
    return res.status(401).json({ message: `Invalid Email` })
  }

  if (password.length < 6 || password.length > 10) {
    return res.status(401).json({ message: `Password must be between 6 and 10 characters` })
  }

  let existingUser = await User.find({ email: email })

  if (existingUser.length > 0) {
    return res.status(400).json({ message: `Email already exists` })
  }
  else {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "engosmanhossain100@gmail.com",
        pass: "cojq krnd tvjy eeyi",
      },
    });

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    bcrypt.hash(password, 10, async function (err, hash) {

      jwt.sign({ email: email }, process.env.JWT_PASS, async function (err, token) {

        const info = await transporter.sendMail({
          // from: 'engosmanhossain100@gmail.com', // sender address
          to: email, // list of receiver
          subject: "Email verification Ecom Test", // Subject line
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
      });

      // setTimeout(async ()=>{
      //  await User.findOneAndUpdate({ email:email }, {otp:""});
      //  console.log("done done");
      // },10000)

      const user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp

      }).save();

      res.send({
        name: user.name,
        email: user.email,
        role: user.role
      });
    });

  }

};

module.exports = registrationController