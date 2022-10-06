const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const schema = mongoose.Schema();

const userSchema = new schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
})

export default mongoose.model('Users', userSchema);