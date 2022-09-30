const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = Schema({
    email: {
        type : String,
        require: true,
    },
    first_name: {
        type: String,
        require: false,
    },
    last_name: {
        type: String,
        require: false
    },
    parent_id: {
        type: Number,
        default: 0,
    },
    parent_id: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: false 
    },
    verification_code: {
        type: String
    },
    status: {
        type: String,
        enum: ['active','in-active','deleted','registration_not_completed'],
        require: true
    },
    merchant_id: {
        type: String,
    },
    auth_provider: {
        type: String,
        enum: ['facebook','google']
    },
    account_id: {
        type: String
    },
    photo: {
        type: String
    },
    address: {
        type: String,
        require: false
    },
    dob: {
        type: Date
    },
    zip_code:{
        type: Number
    },
    state:{
        type: String,
    },
    country: {
        type: String
    },
    latitude: {
        type: Decimal128,
    },
    logitude: {
        type: Decimal128
    },
});

const User = mongoose.model('User',UserSchema);
module.exports = User;