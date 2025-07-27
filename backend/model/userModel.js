const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    emailVerified : {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', "Merchant", "user"],
        default: "admin"
    },
    otp: String,
})

module.exports = mongoose.model("User", userSchema)