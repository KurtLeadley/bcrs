/**
 * Title: models/User.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongooseDisabled = require('mongoose-disable');
const uniqueValidator = require('mongoose-unique-validator');
const UserSecurityAnswer = require('./UserSecurityAnswers');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
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
      required: [true, 'Email is required!'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'standard',
    },
    avatar: {
      type: String,
    },
    securityAnswers: {
      type: [UserSecurityAnswer],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: 6,
    },
  },
  { timestamps: { createdAt: 'dateCreated', updatedAt: 'dateModified' } }
);

// Enable mongoose disable plugin
UserSchema.plugin(mongooseDisabled, { validateBeforeDisable: false });
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
