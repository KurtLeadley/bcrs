/**
 * Title: models/User.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongooseDisabled = require("mongoose-disable");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    dropDups: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },

  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address!",
    ],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "standard"],
    default: "standard",
  },
  securityQuestions: {
    type: [String],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 6,
    select: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

// Enable mongoose disable plugin
UserSchema.plugin(mongooseDisabled, { validateBeforeDisable: false });

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match user entered password to
// hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Generate and hash password token
// UserSchema.methods.getResetPasswordToken = function () {
//   // Generate token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash token and set to resetPasswordToken field
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Set expire to 10 min
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("User", UserSchema);
