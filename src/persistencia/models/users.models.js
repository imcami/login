import mongoose from 'mongoose'

const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmid: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', usersSchema);
module.exports = User;

